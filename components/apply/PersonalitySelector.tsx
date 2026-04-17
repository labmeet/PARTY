"use client";

import { PERSONALITY_KEYWORDS } from "@/lib/validators/applySchema";
import { cn } from "@/lib/utils";

interface Props {
  value: string[];
  onChange: (v: string[]) => void;
}

export function PersonalitySelector({ value, onChange }: Props) {
  const toggle = (kw: string) => {
    if (value.includes(kw)) {
      onChange(value.filter((k) => k !== kw));
    } else if (value.length < 3) {
      onChange([...value, kw]);
    }
  };

  return (
    <div>
      <span className="label">성격 키워드 <span className="text-fg-subtle font-normal">(최대 3개)</span></span>
      <div className="flex flex-wrap gap-2">
        {PERSONALITY_KEYWORDS.map((kw) => {
          const selected = value.includes(kw);
          return (
            <button
              key={kw}
              type="button"
              onClick={() => toggle(kw)}
              className={cn(
                "h-9 rounded-full border px-4 text-[13px] font-medium transition-all",
                selected
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-border-strong bg-bg-elevated/60 text-fg-muted hover:border-primary/50 hover:text-fg"
              )}
            >
              {kw}
            </button>
          );
        })}
      </div>
    </div>
  );
}
