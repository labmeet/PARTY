"use server";

import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  checkPassword,
  clearAdminCookie,
  isAuthed,
  setAdminCookie,
} from "./auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    redirect("/admin/login?error=1");
  }
  setAdminCookie();
  redirect("/admin");
}

export async function logoutAction() {
  clearAdminCookie();
  redirect("/admin/login");
}

function newSlug(): string {
  return randomUUID().replace(/-/g, "").slice(0, 8);
}

export async function createQrPostAction(formData: FormData) {
  if (!isAuthed()) redirect("/admin/login");

  const kind = String(formData.get("kind") ?? "");
  const target = String(formData.get("target_element") ?? "").trim();
  const topic = String(formData.get("topic") ?? "").trim();

  if (kind !== "private" && kind !== "public") {
    redirect("/admin?error=kind");
  }
  if (kind === "private" && !target) redirect("/admin?error=target");
  if (kind === "public" && !topic) redirect("/admin?error=topic");

  const slug = newSlug();
  const supabase = createAdminClient();
  const { error } = await supabase.from("qr_posts").insert({
    slug,
    kind,
    target_element: kind === "private" ? target : null,
    topic: kind === "public" ? topic : null,
  });
  if (error) redirect(`/admin?error=db`);

  revalidatePath("/admin");
  redirect(`/admin/qr/${slug}`);
}

export async function toggleQrActiveAction(formData: FormData) {
  if (!isAuthed()) redirect("/admin/login");
  const slug = String(formData.get("slug") ?? "");
  const next = String(formData.get("next") ?? "") === "true";
  const supabase = createAdminClient();
  await supabase.from("qr_posts").update({ active: next }).eq("slug", slug);
  revalidatePath("/admin");
  revalidatePath(`/admin/qr/${slug}`);
  redirect(`/admin/qr/${slug}`);
}

export async function deleteQrPostAction(formData: FormData) {
  if (!isAuthed()) redirect("/admin/login");
  const slug = String(formData.get("slug") ?? "");
  const supabase = createAdminClient();
  await supabase.from("qr_posts").delete().eq("slug", slug);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function submitQrMessageAction(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  const authorRaw = String(formData.get("author_label") ?? "").trim();
  const author = authorRaw.length > 0 ? authorRaw.slice(0, 40) : null;

  if (!slug) redirect("/");
  if (!body || body.length > 500) redirect(`/q/${slug}?error=1`);

  const supabase = createAdminClient();
  const { data: post } = await supabase
    .from("qr_posts")
    .select("id, active")
    .eq("slug", slug)
    .maybeSingle();
  if (!post || !post.active) redirect(`/q/${slug}?error=2`);

  const { error } = await supabase.from("qr_messages").insert({
    post_id: post.id,
    body,
    author_label: author,
  });
  if (error) redirect(`/q/${slug}?error=3`);

  redirect(`/q/${slug}/thanks`);
}
