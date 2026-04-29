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

function trimOrNull(v: FormDataEntryValue | null): string | null {
  const s = String(v ?? "").trim();
  return s.length === 0 ? null : s;
}

export async function createQrPostAction(formData: FormData) {
  if (!isAuthed()) redirect("/admin/login");
  const prompt = trimOrNull(formData.get("prompt"));
  const body = trimOrNull(formData.get("body"));

  if (!prompt) redirect("/admin?error=prompt");

  const slug = newSlug();
  const supabase = createAdminClient();
  const { error } = await supabase.from("qr_posts").insert({
    slug,
    prompt,
    body,
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

export async function submitPrivateMessageAction(formData: FormData) {
  const target = String(formData.get("target_element") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const authorRaw = String(formData.get("author_label") ?? "").trim();
  const author = authorRaw.length > 0 ? authorRaw.slice(0, 40) : null;

  if (!target) redirect("/m");
  if (!body || body.length > 500) {
    redirect(`/m/${encodeURIComponent(target)}?error=1`);
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("private_messages").insert({
    target_element: target,
    body,
    author_label: author,
  });
  if (error) redirect(`/m/${encodeURIComponent(target)}?error=2`);

  redirect(`/m/${encodeURIComponent(target)}/thanks`);
}
