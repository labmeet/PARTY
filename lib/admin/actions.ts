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

async function createQrPost(kind: "private" | "public", formData: FormData) {
  if (!isAuthed()) redirect("/admin/login");
  const prompt = trimOrNull(formData.get("prompt"));
  const body = trimOrNull(formData.get("body"));

  if (!prompt) redirect("/admin?error=prompt");

  const supabase = createAdminClient();

  // Dedupe: if same kind+prompt+body QR was created in the last 10s, return that one instead of duplicating
  const tenSecondsAgo = new Date(Date.now() - 10000).toISOString();
  const dedupe = supabase
    .from("qr_posts")
    .select("slug")
    .eq("kind", kind)
    .eq("prompt", prompt)
    .gte("created_at", tenSecondsAgo)
    .limit(1);
  if (body !== null) dedupe.eq("body", body);
  else dedupe.is("body", null);
  const { data: existing } = await dedupe;
  if (existing && existing.length > 0 && existing[0]?.slug) {
    redirect(`/admin/qr/${existing[0].slug}`);
  }

  const slug = newSlug();
  const { error } = await supabase.from("qr_posts").insert({
    slug,
    kind,
    prompt,
    body,
  });
  if (error) redirect("/admin?error=db");

  revalidatePath("/admin");
  revalidatePath(`/admin/inbox/${kind}`);
  redirect(`/admin/qr/${slug}`);
}

export async function createPrivateQrAction(formData: FormData) {
  await createQrPost("private", formData);
}

export async function createPublicQrAction(formData: FormData) {
  await createQrPost("public", formData);
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
  const target = String(formData.get("target_element") ?? "").trim() || null;

  if (!slug) redirect("/");
  if (!body || body.length > 500) {
    const back = target
      ? `/q/${slug}/to/${encodeURIComponent(target)}`
      : `/q/${slug}`;
    redirect(`${back}?error=1`);
  }

  const supabase = createAdminClient();
  const { data: post } = await supabase
    .from("qr_posts")
    .select("id, kind, active")
    .eq("slug", slug)
    .maybeSingle<{ id: string; kind: "private" | "public"; active: boolean }>();
  if (!post || !post.active) redirect(`/q/${slug}?error=2`);

  if (post.kind === "private" && !target) redirect(`/q/${slug}?error=3`);

  // Dedupe: if an identical message landed in the last 5s, skip a duplicate insert
  const fiveSecondsAgo = new Date(Date.now() - 5000).toISOString();
  const dedupeQuery = supabase
    .from("qr_messages")
    .select("id")
    .eq("post_id", post.id)
    .eq("body", body)
    .gte("created_at", fiveSecondsAgo)
    .limit(1);
  if (post.kind === "private" && target) {
    dedupeQuery.eq("target_element", target);
  }
  const { data: dupes } = await dedupeQuery;
  if (dupes && dupes.length > 0) {
    redirect(`/q/${slug}/thanks`);
  }

  const { error } = await supabase.from("qr_messages").insert({
    post_id: post.id,
    body,
    author_label: author,
    target_element: post.kind === "private" ? target : null,
  });
  if (error) redirect(`/q/${slug}?error=4`);

  redirect(`/q/${slug}/thanks`);
}
