"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { applySchema, type ApplyFormValues, type Gender } from "@/lib/validators/applySchema";
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
      email: "",
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

          <Field label="랩 이름 또는 지도교수 성함" error={errors.lab_or_professor?.message}>
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
                placeholder="170"
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
              placeholder="예) 연구에 진지하고 유머감각 있는 분, 퇴근 후 같이 맥주 한 잔 할 수 있는 분, 대화가 잘 통하고 가치관이 맞는 분…"
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

        <button
          type="submit"
          disabled={pending}
          className={cn("btn-primary", pending && "animate-pulse")}
        >
          {pending ? "제출 중…" : "신청서 제출하기"}
        </button>

        <p className="mt-3 text-center text-[11px] text-fg-subtle">
          제출 시 개인정보 처리방침에 동의하는 것으로 간주됩니다.
        </p>
      </div>
    </motion.form>
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
    <label className="block">
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
