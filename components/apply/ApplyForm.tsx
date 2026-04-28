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
  SOLO_OPTIONS,
} from "@/lib/validators/applySchema";
import { submitApplication } from "@/lib/actions/submitApplication";
import { MbtiSelector } from "./MbtiSelector";
import { PhoneInput } from "./PhoneInput";
import { GenderBadge } from "./GenderBadge";
import { PersonalitySelector } from "./PersonalitySelector";
import { PeriodicTableSelector } from "./PeriodicTableSelector";
import { cn } from "@/lib/utils";

export function ApplyForm({
  gender,
  takenElements = [],
}: {
  gender: Gender;
  takenElements?: string[];
}) {
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
      age: undefined,
      height: undefined,
      mbti: "",
      nickname_element: "",
      personality_keywords: [],
      solo: "yes",
      ideal_type: "",
      deal_breaker: "",
      companion: "",
      drinking: undefined,
      smoking: undefined,
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

      <div>
        <SectionHeader label="Basic Info" />
        <div className="space-y-5">
          <Field label="이름" error={errors.name?.message}>
            <input
              className="input-base"
              placeholder="이름을 입력해주세요"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
          </Field>

          <Field label="학과" error={errors.department?.message}>
            <input
              className="input-base"
              placeholder="예: 전산학부, 산업디자인학과"
              aria-invalid={!!errors.department}
              {...register("department")}
            />
          </Field>

          <Field
            label="랩 이름 또는 지도교수 성함"
            error={errors.lab_or_professor?.message}
            caption="민감하시면 대략적으로 적어주셔도 괜찮아요. 같은 소속은 최대한 조정해드릴게요."
          >
            <input
              className="input-base"
              placeholder="예: OO 연구실 / 김민지 교수님"
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

          <Field label="나이" error={errors.age?.message}>
            <div className="relative">
              <input
                type="number"
                inputMode="numeric"
                className="input-base pr-12"
                placeholder="만 나이로 입력해주세요"
                aria-invalid={!!errors.age}
                {...register("age", {
                  setValueAs: (v) => (v === "" || v === undefined ? undefined : Number(v)),
                })}
              />
              <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[14px] text-fg-subtle">
                세
              </span>
            </div>
          </Field>

          <Field label="키" error={errors.height?.message}>
            <div className="relative">
              <input
                type="number"
                inputMode="numeric"
                className="input-base pr-12"
                placeholder="본인 키를 입력해주세요"
                aria-invalid={!!errors.height}
                {...register("height", {
                  setValueAs: (v) => (v === "" || v === undefined ? undefined : Number(v)),
                })}
              />
              <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[14px] text-fg-subtle">
                cm
              </span>
            </div>
          </Field>

          <div>
            <Controller
              name="nickname_element"
              control={control}
              render={({ field }) => (
                <PeriodicTableSelector
                  value={field.value}
                  onChange={field.onChange}
                  takenElements={takenElements}
                />
              )}
            />
            {errors.nickname_element?.message && (
              <p className="error-text">{errors.nickname_element.message}</p>
            )}
          </div>

          <div>
            <Controller
              name="mbti"
              control={control}
              render={({ field }) => (
                <MbtiSelector value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.mbti?.message && <p className="error-text">{errors.mbti.message}</p>}
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
            <span className="label">현재 솔로이신가요?</span>
            <Controller
              name="solo"
              control={control}
              render={({ field }) => (
                <ChoiceRow
                  options={SOLO_OPTIONS}
                  value={field.value}
                  onChange={(value) => value && field.onChange(value)}
                />
              )}
            />
          </div>

          <div>
            <span className="label">
              음주 <span className="font-normal text-fg-subtle">(선택)</span>
            </span>
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
            <span className="label">
              흡연 <span className="font-normal text-fg-subtle">(선택)</span>
            </span>
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

      <div>
        <SectionHeader label="About You" />
        <div className="space-y-5">
          <Field
            label="자기 소개 (자유 서술)"
            error={errors.ideal_type?.message}
            caption="10자 이상 500자 이내로 편하게 적어주세요."
          >
            <textarea
              rows={5}
              className="input-base resize-none leading-relaxed"
              placeholder="예: 어떤 일상을 보내는지, 어떤 대화를 좋아하는지, 어떤 사람인지 편하게 소개해주세요."
              aria-invalid={!!errors.ideal_type}
              {...register("ideal_type")}
            />
          </Field>

          <Field
            label="만나고 싶지 않은 사람 (선택)"
            error={errors.deal_breaker?.message}
            caption="실명도 괜찮아요. 500자 이내."
          >
            <textarea
              rows={4}
              className="input-base resize-none leading-relaxed"
              placeholder="예: 흡연자, 너무 이성적인 분, 연락이 불규칙한 분, 전남친/전여친"
              aria-invalid={!!errors.deal_breaker}
              {...register("deal_breaker")}
            />
          </Field>

          <Field
            label="동반인 (선택)"
            error={errors.companion?.message}
            caption="같이 오는 친구가 있다면 이름 또는 소속을 적어주세요."
          >
            <input
              className="input-base"
              placeholder="예: 같이 오는 친구 이름 / 소속"
              aria-invalid={!!errors.companion}
              {...register("companion")}
            />
          </Field>
        </div>
      </div>

      <div>
        <SectionHeader label="Payment" />
        <div className="overflow-hidden rounded-[28px] border border-primary/20 bg-[linear-gradient(135deg,rgba(182,233,204,0.16),rgba(182,233,204,0.06))]">
          <div className="border-b border-primary/15 px-5 py-4 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              Payment Info
            </p>
            <p className="mt-1 font-serif text-[20px] font-bold text-fg sm:text-[22px]">
              참가비 입금 안내
            </p>
          </div>

          <div className="px-5 py-5 sm:px-6">
            <p className="text-[14px] leading-[1.8] text-fg-muted sm:text-[14.5px]">
              참가비 입금완료 후 자기 소개서 제출해주세요.
            </p>

            <div className="mt-4 rounded-[20px] border border-white/8 bg-black/10 px-4 py-4">
              <div className="flex items-center gap-2 text-[14px]">
                <span className="text-fg-muted">참가비</span>
                <span className="line-through decoration-[1.5px] text-fg-subtle">50,000원</span>
                <span className="font-semibold text-fg">35,000원</span>
              </div>
              <p className="mt-3 font-serif text-[18px] font-bold tracking-[0.02em] text-fg sm:text-[20px]">
                토스뱅크 1002-5364-8003 ㄱㄴㅇ
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[12px] text-fg">
                반드시 본인 이름으로 입금
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[12px] text-fg">
                모집인원 마감시 100% 환불 보장
              </span>
            </div>
          </div>
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
                개인정보 수집 및 이용
              </Link>
              {" 및 "}
              <span className="font-semibold text-fg">환불 규정</span>에 동의합니다.
              <br />
              <span className="text-[12px] text-fg-subtle">
                환불: 행사 7일 전까지 전액 환불, 이후 환불 불가
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
          {pending ? "제출 중..." : "자기 소개서 제출하기"}
        </button>

        <p className="mt-3 text-center text-[11px] leading-relaxed text-fg-subtle">
          제출했다고 바로 매칭이 확정되지는 않습니다.
          <br />
          심사를 거쳐 순차적으로 안내드릴게요.
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
                : "border-border-strong bg-bg-elevated/60 text-fg-muted hover:border-primary/50 hover:text-fg",
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
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
        {label}
      </span>
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
