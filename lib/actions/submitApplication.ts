"use server";

import { applySchema, type ApplyFormValues } from "@/lib/validators/applySchema";
import { createClient } from "@/lib/supabase/server";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string; field?: keyof ApplyFormValues };

export async function submitApplication(
  input: ApplyFormValues,
): Promise<SubmitResult> {
  const parsed = applySchema.safeParse(input);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return {
      ok: false,
      error: issue.message,
      field: issue.path[0] as keyof ApplyFormValues | undefined,
    };
  }

  const DRINK_MAP: Record<string, string> = {
    heavy: "많이 마심",
    moderate: "적당히 마심",
    social: "모임에서만",
    none: "무알코올",
  };

  const SMOKE_MAP: Record<string, string> = {
    cigarette: "연초",
    vape: "전자담배",
    none: "비흡연",
  };

  const SOLO_MAP: Record<string, string> = {
    yes: "예",
    no: "아니오",
  };

  const extras: string[] = [];
  extras.push(`[닉네임 원소] ${parsed.data.nickname_element}`);
  const companion = parsed.data.companion?.trim();
  if (companion) extras.push(`[동반인] ${companion}`);
  extras.push(`[솔로 여부] ${SOLO_MAP[parsed.data.solo]}`);
  if (parsed.data.drinking) extras.push(`[음주] ${DRINK_MAP[parsed.data.drinking]}`);
  if (parsed.data.smoking) extras.push(`[흡연] ${SMOKE_MAP[parsed.data.smoking]}`);

  const idealWithExtras = extras.length
    ? `${parsed.data.ideal_type}\n\n${extras.join("\n")}`
    : parsed.data.ideal_type;

  const supabase = createClient();
  const { error } = await supabase.from("applications").insert({
    name: parsed.data.name,
    department: parsed.data.department,
    lab_or_professor: parsed.data.lab_or_professor,
    phone: parsed.data.phone,
    gender: parsed.data.gender,
    age: parsed.data.age,
    height: parsed.data.height ?? null,
    mbti: parsed.data.mbti.toUpperCase(),
    personality_keywords: parsed.data.personality_keywords,
    ideal_type: idealWithExtras,
    deal_breaker: parsed.data.deal_breaker || null,
  });

  if (error) {
    if (error.code === "23505") {
      return {
        ok: false,
        error: "이미 신청된 전화번호입니다.",
      };
    }
    if (error.code === "23514") {
      return { ok: false, error: "입력 형식이 올바르지 않습니다." };
    }
    if (error.message?.includes("fetch")) {
      return {
        ok: false,
        error: "서버 연결 오류입니다. 잠시 후 다시 시도해주세요.",
      };
    }
    return {
      ok: false,
      error: "제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  return { ok: true };
}
