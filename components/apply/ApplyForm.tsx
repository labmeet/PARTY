"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import {
  applySchema,
  type ApplyFormValues,
  type Gender,
  DRINKING_OPTIONS,
  SMOKING_OPTIONS,
} from "@/lib/validators/applySchema";
import { submitApplication } from "@/lib/actions/submitApplication";
import { MbtiSelector } from "./MbtiSelector";
import { PhoneInput } from "./PhoneInput";
import { GenderBadge } from "./GenderBadge";
import { PersonalitySelector } from "./PersonalitySelector";
import { cn } from "@/lib/utils";

export function ApplyForm({ gender }: { gender: Gender }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplyFormValues>({
    resolver: zodResolver(applySchema),
    mode: "onTouched",
    defaultValues: {
      gender,
      name: "",
      department: "",
      lab_or_professor: "",
      phone: "",
      height: undefined,
      mbti: "",
      personality_keywords: [],
      ideal_type: "",
      deal_breaker: "",
      companion: "",
      drinking: undefined,
      smoking: undefined,
      email: "",
      agree: false as unknown as true,
    },
  });

  const onSubmit = handleSubmit((values) => {
    setServerError(null);
    startTransition(async () => {
      const result = await submitApplication(values);
      if (result.ok) {
        router.push("/apply/complete");
      } else {
        setServerError(result.error);
      }
    });
  });

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={onSubmit}
      className="space-y-8"
      noValidate
    >
      <input type="hidden" {...register("gender")} value={gender} />

      {/* 내 정보 섹션 */}
      <div>
        <SectionHeader label="내 정보" />
        <div className="space-y-5">
          <Field label="이름" error={errors.name?.message}>
            <input
              className="input-base"
              placeholder="홍길동"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
          </Field>

          <Field label="이메일" error={errors.email?.message} caption="승인 시 결과를 이 이메일로 안내드립니다.">
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              className="input-base"
              placeholder="you@kaist.ac.kr"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
          </Field>

          <Field label="학과" error={errors.department?.message}>
            <input
              className="input-base"
              placeholder="예) 전기및전자공학부, 산업디자인학과"
              aria-invalid={!!errors.department}
              {...register("department")}
            />
          </Field>

          <Field
            label="랩 이름 또는 지도교수 성함"
            error={errors.lab_or_professor?.message}
            caption="민감하신가요? 저희도 알아요… 근데 같은 랩실 걸러드릴려구요..!"
          >
            <input
              className="input-base"
              placeholder="예) OO연구실 / 김영희 교수"
              aria-invalid={!!errors.lab_or_professor}
              {...register("lab_or_professor")}
            />
          </Field>

          <Field label="전화번호" error={errors.phone?.message}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  className="input-base"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  aria-invalid={!!errors.phone}
                />
              )}
            />
          </Field>

          <Field label="키 (선택)" error={errors.height?.message}>
            <div className="relative">
              <input
                type="number"
                inputMode="numeric"
                className="input-base pr-12"
                placeholder="논문 길이 말고 본인 키"
                aria-invalid={!!errors.height}
                {...register("height", { setValueAs: (v) => v === "" || v === undefined ? undefined : Number(v) })}
              />
              <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[14px] text-fg-subtle">
                cm
              </span>
            </div>
          </Field>

          <div>
            <Controller
              name="mbti"
              control={control}
              render={({ field }) => (
                <MbtiSelector value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.mbti?.message && (
              <p className="error-text">{errors.mbti.message}</p>
            )}
          </div>

          <div>
            <Controller
              name="personality_keywords"
              control={control}
              render={({ field }) => (
                <PersonalitySelector value={field.value ?? []} onChange={field.onChange} />
              )}
            />
            {errors.personality_keywords?.message && (
              <p className="error-text">{errors.personality_keywords.message}</p>
            )}
          </div>

          <div>
            <span className="label">술 <span className="font-normal text-fg-subtle">(선택)</span></span>
            <Controller
              name="drinking"
              control={control}
              render={({ field }) => (
                <ChoiceRow
                  options={DRINKING_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div>
            <span className="label">흡연 <span className="font-normal text-fg-subtle">(선택)</span></span>
            <Controller
              name="smoking"
              control={control}
              render={({ field }) => (
                <ChoiceRow
                  options={SMOKING_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* 이상형 섹션 */}
      <div>
        <SectionHeader label="이상형" />
        <div className="space-y-5">
          <Field
            label="이상형 (자유 서술)"
            error={errors.ideal_type?.message}
            caption="10자 이상 500자 이내로 솔직하게 적어주세요."
          >
            <textarea
              rows={5}
              className="input-base resize-none leading-relaxed"
              placeholder="예) ENFP인데 왜 랩에만 있는 건지 모르겠는 사람, 학식 같이 먹다 보면 좋아질 것 같은 사람…"
              aria-invalid={!!errors.ideal_type}
              {...register("ideal_type")}
            />
          </Field>

          <Field
            label="만나고 싶지 않은 사람 (선택)"
            error={errors.deal_breaker?.message}
            caption="특정 이름을 적어도 괜찮아요. 500자 이내."
          >
            <textarea
              rows={4}
              className="input-base resize-none leading-relaxed"
              placeholder="예) 흡연자, 너무 내성적인 분, 연락이 불규칙한 분, 홍길동…"
              aria-invalid={!!errors.deal_breaker}
              {...register("deal_breaker")}
            />
          </Field>

          <Field
            label="동반자 (선택)"
            error={errors.companion?.message}
            caption="이 경우 같은 랩실원끼리 입장이 허용되어요."
          >
            <input
              className="input-base"
              placeholder="예) 같이 올 친구 이름 / 소속 랩"
              aria-invalid={!!errors.companion}
              {...register("companion")}
            />
          </Field>
        </div>
      </div>

      <div className="pt-2">
        <div className="mb-4 flex justify-center">
          <GenderBadge gender={gender} />
        </div>

        {serverError && (
          <div className="mb-3 rounded-xl border border-[#F0A0A0]/30 bg-[#F0A0A0]/10 px-4 py-3 text-center text-[13px] text-[#F0A0A0]">
            {serverError}
          </div>
        )}

        <div className="mb-5 rounded-2xl border border-border bg-bg-elevated/40 p-4 text-left">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              className="mt-[3px] h-4 w-4 shrink-0 accent-[#B6E9CC]"
              aria-invalid={!!errors.agree}
              {...register("agree")}
            />
            <span className="text-[13px] leading-relaxed text-fg-muted">
              <Link
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-fg underline underline-offset-4 hover:text-primary"
              >
                개인정보 수집·이용
              </Link>
              {" 및 "}
              <span className="font-semibold text-fg">환불 규정</span>
              에 동의합니다.
              <br />
              <span className="text-[12px] text-fg-subtle">
                환불: 행사 7일 전까지 전액 환불 · 이후 불가
              </span>
            </span>
          </label>
          {errors.agree?.message && (
            <p className="error-text mt-2">{errors.agree.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className={cn("btn-primary", pending && "animate-pulse")}
        >
          {pending ? "제출 중…" : "신청서 제출하기"}
        </button>

        <p className="mt-3 text-center text-[11px] leading-relaxed text-fg-subtle">
          제출한다고 바로 만나는 거 아닙니다. 심사 있어요.
          <br />
          논문 심사보다는 빠릅니다.
        </p>
      </div>
    </motion.form>
  );
}

function ChoiceRow<V extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly { readonly value: V; readonly label: string }[];
  value: V | undefined;
  onChange: (v: V | undefined) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const selected = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(selected ? undefined : o.value)}
            className={cn(
              "h-9 rounded-full border px-4 text-[13px] font-medium transition-all",
              selected
                ? "border-primary bg-primary text-bg-base shadow-glow"
                : "border-border-strong bg-bg-elevated/60 text-fg-muted hover:border-primary/50 hover:text-fg"
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">{label}</span>
      <span className="h-px flex-1 bg-border-strong" />
    </div>
  );
}

function Field({
  label,
  caption,
  error,
  children,
}: {
  label: string;
  caption?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="field-wrap">
      <span className="label">{label}</span>
      {children}
      {error ? (
        <p className="error-text">{error}</p>
      ) : caption ? (
        <p className="caption">{caption}</p>
      ) : null}
    </label>
  );
}
