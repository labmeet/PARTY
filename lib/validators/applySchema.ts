import { z } from "zod";

export const genderEnum = z.enum(["female", "male"]);
export type Gender = z.infer<typeof genderEnum>;

export const PERSONALITY_KEYWORDS = [
  "활발한", "신중한", "차분한", "유머러스한", "지적인",
  "감성적인", "독립적인", "다정한", "솔직한", "계획적인",
] as const;

export const applySchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해주세요").max(50),
  department: z.string().trim().min(1, "학과를 입력해주세요").max(100),
  lab_or_professor: z
    .string()
    .trim()
    .min(1, "랩 또는 교수 이름을 입력해주세요")
    .max(100),
  phone: z
    .string()
    .trim()
    .regex(/^01\d-?\d{3,4}-?\d{4}$/, "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)"),
  gender: genderEnum,
  height: z.number().int().min(140, "140cm 이상 입력해주세요").max(220, "220cm 이하로 입력해주세요").optional(),
  mbti: z
    .string()
    .trim()
    .regex(/^[EIei][NSns][TFtf][JPjp]$/, "MBTI 4글자를 선택해주세요"),
  personality_keywords: z
    .array(z.string().min(1))
    .min(1, "성격 키워드를 1개 이상 선택해주세요")
    .max(3, "최대 3개까지 선택할 수 있습니다"),
  ideal_type: z
    .string()
    .trim()
    .min(10, "이상형을 10자 이상 작성해주세요")
    .max(500, "500자 이내로 작성해주세요"),
  deal_breaker: z
    .string()
    .trim()
    .max(500, "500자 이내로 작성해주세요")
    .optional()
    .or(z.literal("")),
  email: z.string().trim().email("올바른 이메일 형식이 아닙니다"),
});

export type ApplyFormValues = z.input<typeof applySchema>;
export type ApplyParsed = z.output<typeof applySchema>;
