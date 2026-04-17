"use client";

import { cn } from "@/lib/utils";

const AXES: Array<{ pair: [string, string]; labels: [string, string] }> = [
  { pair: ["E", "I"], labels: ["외향 E", "내향 I"] },
  { pair: ["S", "N"], labels: ["감각 S", "직관 N"] },
  { pair: ["T", "F"], labels: ["사고 T", "감정 F"] },
  { pair: ["J", "P"], labels: ["판단 J", "인식 P"] },
];

export function MbtiSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const chars = value.padEnd(4, " ").split("");

  const setAxis = (idx: number, char: string) => {
    const next = [...chars];
    next[idx] = char;
    onChange(next.join("").trim());
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="label mb-0">MBTI</span>
        <span className="font-display text-xl tracking-[0.15em] text-primary">
          {value ? value.toUpperCase().padEnd(4, "·") : "····"}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {AXES.map((axis, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            {axis.pair.map((c, j) => {
              const selected = chars[i]?.toUpperCase() === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setAxis(i, c)}
                  className={cn(
                    "rounded-xl border py-3 text-[13px] font-medium transition-all",
                    selected
                      ? "border-primary bg-primary text-bg-card shadow-glow"
                      : "border-border bg-bg-elevated/50 text-fg-muted hover:border-border-strong hover:text-fg"
                  )}
                >
                  <span className="block font-display text-lg tracking-wider">
                    {c}
                  </span>
                  <span className="mt-0.5 block text-[10px] text-fg-subtle">
                    {axis.labels[j]}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
