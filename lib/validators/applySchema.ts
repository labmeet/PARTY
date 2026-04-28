import { z } from "zod";

export const genderEnum = z.enum(["female", "male"]);
export type Gender = z.infer<typeof genderEnum>;

export const PERSONALITY_KEYWORDS = [
  // Extraversion (E)
  "활발한", "사교적인", "에너지 넘치는",
  // Agreeableness (A)
  "다정한", "배려심 많은", "공감 잘 하는", "온화한",
  // Conscientiousness (C)
  "계획적인", "성실한", "꼼꼼한",
  // Openness (O)
  "호기심 많은", "창의적인", "모험적인", "지적인",
  // Emotional Stability / N-reversed
  "차분한", "여유로운", "긍정적인",
  // Cross-cutting (natural in dating context, fills gaps)
  "유머러스한", "솔직한", "감성적인", "신중한", "독립적인",
] as const;

export const DRINKING_OPTIONS = [
  { value: "heavy",    label: "말술" },
  { value: "moderate", label: "적당히 홀짝" },
  { value: "social",   label: "모임에서만" },
  { value: "none",     label: "무알콜러" },
] as const;

export const SMOKING_OPTIONS = [
  { value: "cigarette", label: "연초러" },
  { value: "vape",      label: "전담러" },
  { value: "none",      label: "무" },
] as const;

export const SOLO_OPTIONS = [
  { value: "yes", label: "예" },
  { value: "no", label: "아니오" },
] as const;

export type DrinkingValue = (typeof DRINKING_OPTIONS)[number]["value"];
export type SmokingValue  = (typeof SMOKING_OPTIONS)[number]["value"];
export type SoloValue = (typeof SOLO_OPTIONS)[number]["value"];

const drinkingEnum = z.enum(["heavy", "moderate", "social", "none"]);
const smokingEnum = z.enum(["cigarette", "vape", "none"]);
const soloEnum = z.enum(["yes", "no"]);

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
  nickname_element: z
    .string()
    .trim()
    .min(1, "닉네임용 원소를 선택해주세요")
    .max(3, "원소 기호는 최대 3글자입니다"),
  personality_keywords: z
    .array(z.string().min(1))
    .min(1, "성격 키워드를 1개 이상 선택해주세요")
    .max(3, "최대 3개까지 선택할 수 있습니다"),
  solo: soloEnum,
  drinking: drinkingEnum.optional(),
  smoking: smokingEnum.optional(),
  ideal_type: z
    .string()
    .trim()
    .min(10, "자기 소개를 10자 이상 작성해주세요")
    .max(500, "500자 이내로 작성해주세요"),
  deal_breaker: z
    .string()
    .trim()
    .max(500, "500자 이내로 작성해주세요")
    .optional()
    .or(z.literal("")),
  companion: z
    .string()
    .trim()
    .max(200, "200자 이내로 작성해주세요")
    .optional()
    .or(z.literal("")),
  agree: z.literal(true, {
    message: "개인정보 수집·이용 및 환불 규정에 동의해주세요",
  }),
});

export type ApplyFormValues = z.input<typeof applySchema>;
export type ApplyParsed = z.output<typeof applySchema>;
