import { type Gender } from "@/lib/validators/applySchema";

const LABEL: Record<Gender, string> = { female: "여성", male: "남성" };

export function GenderBadge({ gender }: { gender: Gender }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-primary">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
      {LABEL[gender]} 참가 신청
    </div>
  );
}
