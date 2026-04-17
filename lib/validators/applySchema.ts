import { z } from "zod";

export const genderEnum = z.enum(["female", "male"]);
export type Gender = z.infer<typeof genderEnum>;

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
  mbti: z
    .string()
    .trim()
    .regex(/^[EIei][NSns][TFtf][JPjp]$/, "MBTI 4글자를 선택해주세요"),
  ideal_type: z
    .string()
    .trim()
    .min(10, "이상형을 10자 이상 작성해주세요")
    .max(500, "500자 이내로 작성해주세요"),
  email: z.string().trim().email("올바른 이메일 형식이 아닙니다"),
});

export type ApplyFormValues = z.input<typeof applySchema>;
export type ApplyParsed = z.output<typeof applySchema>;
