"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Cat =
  | "alkali"
  | "alkaline"
  | "transition"
  | "post"
  | "metalloid"
  | "nonmetal"
  | "halogen"
  | "noble"
  | "lanthanide"
  | "actinide";

type El = readonly [
  z: number,
  symbol: string,
  name: string,
  period: number,
  group: number,
  cat: Cat,
];

const ELEMENTS: readonly El[] = [
  [1, "H", "Hydrogen", 1, 1, "nonmetal"],
  [2, "He", "Helium", 1, 18, "noble"],
  [3, "Li", "Lithium", 2, 1, "alkali"],
  [4, "Be", "Beryllium", 2, 2, "alkaline"],
  [5, "B", "Boron", 2, 13, "metalloid"],
  [6, "C", "Carbon", 2, 14, "nonmetal"],
  [7, "N", "Nitrogen", 2, 15, "nonmetal"],
  [8, "O", "Oxygen", 2, 16, "nonmetal"],
  [9, "F", "Fluorine", 2, 17, "halogen"],
  [10, "Ne", "Neon", 2, 18, "noble"],
  [11, "Na", "Sodium", 3, 1, "alkali"],
  [12, "Mg", "Magnesium", 3, 2, "alkaline"],
  [13, "Al", "Aluminium", 3, 13, "post"],
  [14, "Si", "Silicon", 3, 14, "metalloid"],
  [15, "P", "Phosphorus", 3, 15, "nonmetal"],
  [16, "S", "Sulfur", 3, 16, "nonmetal"],
  [17, "Cl", "Chlorine", 3, 17, "halogen"],
  [18, "Ar", "Argon", 3, 18, "noble"],
  [19, "K", "Potassium", 4, 1, "alkali"],
  [20, "Ca", "Calcium", 4, 2, "alkaline"],
  [21, "Sc", "Scandium", 4, 3, "transition"],
  [22, "Ti", "Titanium", 4, 4, "transition"],
  [23, "V", "Vanadium", 4, 5, "transition"],
  [24, "Cr", "Chromium", 4, 6, "transition"],
  [25, "Mn", "Manganese", 4, 7, "transition"],
  [26, "Fe", "Iron", 4, 8, "transition"],
  [27, "Co", "Cobalt", 4, 9, "transition"],
  [28, "Ni", "Nickel", 4, 10, "transition"],
  [29, "Cu", "Copper", 4, 11, "transition"],
  [30, "Zn", "Zinc", 4, 12, "transition"],
  [31, "Ga", "Gallium", 4, 13, "post"],
  [32, "Ge", "Germanium", 4, 14, "metalloid"],
  [33, "As", "Arsenic", 4, 15, "metalloid"],
  [34, "Se", "Selenium", 4, 16, "nonmetal"],
  [35, "Br", "Bromine", 4, 17, "halogen"],
  [36, "Kr", "Krypton", 4, 18, "noble"],
  [37, "Rb", "Rubidium", 5, 1, "alkali"],
  [38, "Sr", "Strontium", 5, 2, "alkaline"],
  [39, "Y", "Yttrium", 5, 3, "transition"],
  [40, "Zr", "Zirconium", 5, 4, "transition"],
  [41, "Nb", "Niobium", 5, 5, "transition"],
  [42, "Mo", "Molybdenum", 5, 6, "transition"],
  [43, "Tc", "Technetium", 5, 7, "transition"],
  [44, "Ru", "Ruthenium", 5, 8, "transition"],
  [45, "Rh", "Rhodium", 5, 9, "transition"],
  [46, "Pd", "Palladium", 5, 10, "transition"],
  [47, "Ag", "Silver", 5, 11, "transition"],
  [48, "Cd", "Cadmium", 5, 12, "transition"],
  [49, "In", "Indium", 5, 13, "post"],
  [50, "Sn", "Tin", 5, 14, "post"],
  [51, "Sb", "Antimony", 5, 15, "metalloid"],
  [52, "Te", "Tellurium", 5, 16, "metalloid"],
  [53, "I", "Iodine", 5, 17, "halogen"],
  [54, "Xe", "Xenon", 5, 18, "noble"],
  [55, "Cs", "Caesium", 6, 1, "alkali"],
  [56, "Ba", "Barium", 6, 2, "alkaline"],
  [57, "La", "Lanthanum", 6, 3, "lanthanide"],
  [72, "Hf", "Hafnium", 6, 4, "transition"],
  [73, "Ta", "Tantalum", 6, 5, "transition"],
  [74, "W", "Tungsten", 6, 6, "transition"],
  [75, "Re", "Rhenium", 6, 7, "transition"],
  [76, "Os", "Osmium", 6, 8, "transition"],
  [77, "Ir", "Iridium", 6, 9, "transition"],
  [78, "Pt", "Platinum", 6, 10, "transition"],
  [79, "Au", "Gold", 6, 11, "transition"],
  [80, "Hg", "Mercury", 6, 12, "transition"],
  [81, "Tl", "Thallium", 6, 13, "post"],
  [82, "Pb", "Lead", 6, 14, "post"],
  [83, "Bi", "Bismuth", 6, 15, "post"],
  [84, "Po", "Polonium", 6, 16, "metalloid"],
  [85, "At", "Astatine", 6, 17, "halogen"],
  [86, "Rn", "Radon", 6, 18, "noble"],
  [87, "Fr", "Francium", 7, 1, "alkali"],
  [88, "Ra", "Radium", 7, 2, "alkaline"],
  [89, "Ac", "Actinium", 7, 3, "actinide"],
  [104, "Rf", "Rutherfordium", 7, 4, "transition"],
  [105, "Db", "Dubnium", 7, 5, "transition"],
  [106, "Sg", "Seaborgium", 7, 6, "transition"],
  [107, "Bh", "Bohrium", 7, 7, "transition"],
  [108, "Hs", "Hassium", 7, 8, "transition"],
  [109, "Mt", "Meitnerium", 7, 9, "transition"],
  [110, "Ds", "Darmstadtium", 7, 10, "transition"],
  [111, "Rg", "Roentgenium", 7, 11, "transition"],
  [112, "Cn", "Copernicium", 7, 12, "transition"],
  [113, "Nh", "Nihonium", 7, 13, "post"],
  [114, "Fl", "Flerovium", 7, 14, "post"],
  [115, "Mc", "Moscovium", 7, 15, "post"],
  [116, "Lv", "Livermorium", 7, 16, "post"],
  [117, "Ts", "Tennessine", 7, 17, "halogen"],
  [118, "Og", "Oganesson", 7, 18, "noble"],
];

const LANTHANIDES: readonly El[] = [
  [58, "Ce", "Cerium", 8, 1, "lanthanide"],
  [59, "Pr", "Praseodymium", 8, 2, "lanthanide"],
  [60, "Nd", "Neodymium", 8, 3, "lanthanide"],
  [61, "Pm", "Promethium", 8, 4, "lanthanide"],
  [62, "Sm", "Samarium", 8, 5, "lanthanide"],
  [63, "Eu", "Europium", 8, 6, "lanthanide"],
  [64, "Gd", "Gadolinium", 8, 7, "lanthanide"],
  [65, "Tb", "Terbium", 8, 8, "lanthanide"],
  [66, "Dy", "Dysprosium", 8, 9, "lanthanide"],
  [67, "Ho", "Holmium", 8, 10, "lanthanide"],
  [68, "Er", "Erbium", 8, 11, "lanthanide"],
  [69, "Tm", "Thulium", 8, 12, "lanthanide"],
  [70, "Yb", "Ytterbium", 8, 13, "lanthanide"],
  [71, "Lu", "Lutetium", 8, 14, "lanthanide"],
];

const ACTINIDES: readonly El[] = [
  [90, "Th", "Thorium", 9, 1, "actinide"],
  [91, "Pa", "Protactinium", 9, 2, "actinide"],
  [92, "U", "Uranium", 9, 3, "actinide"],
  [93, "Np", "Neptunium", 9, 4, "actinide"],
  [94, "Pu", "Plutonium", 9, 5, "actinide"],
  [95, "Am", "Americium", 9, 6, "actinide"],
  [96, "Cm", "Curium", 9, 7, "actinide"],
  [97, "Bk", "Berkelium", 9, 8, "actinide"],
  [98, "Cf", "Californium", 9, 9, "actinide"],
  [99, "Es", "Einsteinium", 9, 10, "actinide"],
  [100, "Fm", "Fermium", 9, 11, "actinide"],
  [101, "Md", "Mendelevium", 9, 12, "actinide"],
  [102, "No", "Nobelium", 9, 13, "actinide"],
  [103, "Lr", "Lawrencium", 9, 14, "actinide"],
];

const ALL: readonly El[] = [...ELEMENTS, ...LANTHANIDES, ...ACTINIDES];

const DISABLED: ReadonlySet<string> = new Set(["Mn", "Os"]);

const CAT_BG: Record<Cat, string> = {
  alkali: "bg-[#5C3535]/60 hover:bg-[#5C3535]",
  alkaline: "bg-[#4A2A33]/60 hover:bg-[#4A2A33]",
  transition: "bg-[#33304F]/60 hover:bg-[#33304F]",
  post: "bg-[#2A2A2A]/70 hover:bg-[#2A2A2A]",
  metalloid: "bg-[#3A3A2A]/60 hover:bg-[#3A3A2A]",
  nonmetal: "bg-[#243A4A]/60 hover:bg-[#243A4A]",
  halogen: "bg-[#1F4040]/60 hover:bg-[#1F4040]",
  noble: "bg-[#3A2640]/60 hover:bg-[#3A2640]",
  lanthanide: "bg-[#1F3A4A]/60 hover:bg-[#1F3A4A]",
  actinide: "bg-[#4A2A2A]/60 hover:bg-[#4A2A2A]",
};

export function PeriodicTableSelector({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (symbol: string | undefined) => void;
}) {
  const [hovered, setHovered] = useState<El | null>(null);
  const selected = ALL.find(([, s]) => s === value) ?? null;
  const display = hovered ?? selected;

  return (
    <div>
      <span className="label">닉네임을 선택해주세요</span>
      <p className="caption mb-3 text-fg">
        랩미 파티에서 여러분은 선택하신 원소로 닉네임을 갖게 됩니다! 원하시는 원소를 골라주세요.
        <br />
        (인기 많은 원소일 경우 저희가 다른 예쁜 원소로 배정해드립니다)
      </p>

      <div className="rounded-2xl border border-border bg-bg-elevated/40 px-2 py-3 sm:p-4">
        <div className="mx-auto mb-3 flex min-h-[60px] items-center justify-between gap-3 rounded-xl border border-border/60 bg-bg-base/50 px-4 py-3">
          {display ? (
            <div className="flex items-baseline gap-3">
              <span className="text-[10px] tabular-nums text-fg-subtle">{display[0]}</span>
              <span className="font-display text-[26px] font-bold leading-none text-primary">
                {display[1]}
              </span>
              <span className="text-[12px] text-fg-muted">{display[2]}</span>
            </div>
          ) : (
            <span className="text-[12px] text-fg-subtle">원소를 선택하면 여기에 닉네임이 표시돼요</span>
          )}
          {selected && (
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="shrink-0 text-[11px] text-fg-subtle underline underline-offset-2 hover:text-fg"
            >
              해제
            </button>
          )}
        </div>

        <div className="w-full">
          <div
            className="grid gap-[1px] sm:gap-[3px]"
            style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))" }}
          >
            {ELEMENTS.map((el) => (
              <ElementCell
                key={el[0]}
                el={el}
                isSelected={value === el[1]}
                isDisabled={DISABLED.has(el[1])}
                onSelect={onChange}
                onHover={setHovered}
                row={el[3]}
                col={el[4]}
              />
            ))}
          </div>

          <div
            className="mt-[1px] grid gap-[1px] sm:mt-[3px] sm:gap-[3px]"
            style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))" }}
          >
            {[...LANTHANIDES, ...ACTINIDES].map((el) => (
              <ElementCell
                key={el[0]}
                el={el}
                isSelected={value === el[1]}
                isDisabled={DISABLED.has(el[1])}
                onSelect={onChange}
                onHover={setHovered}
                row={el[3] === 8 ? 1 : 2}
                col={el[4] + 2}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ElementCell({
  el,
  isSelected,
  isDisabled,
  onSelect,
  onHover,
  row,
  col,
}: {
  el: El;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (sym: string | undefined) => void;
  onHover: (el: El | null) => void;
  row: number;
  col: number;
}) {
  const [, sym, name, , , cat] = el;
  return (
    <button
      type="button"
      onClick={() => {
        if (isDisabled) return;
        onSelect(isSelected ? undefined : sym);
      }}
      onMouseEnter={() => !isDisabled && onHover(el)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => !isDisabled && onHover(el)}
      onBlur={() => onHover(null)}
      disabled={isDisabled}
      aria-label={isDisabled ? `${sym} ${name} (선택 불가)` : `${sym} ${name}`}
      aria-pressed={isSelected}
      style={{ gridRow: row, gridColumn: col }}
      className={cn(
        "relative flex aspect-square items-center justify-center rounded-[5px] border border-transparent text-fg transition-all duration-150",
        CAT_BG[cat],
        isSelected &&
          "z-10 scale-[1.08] border-primary bg-primary/35 ring-2 ring-primary shadow-[0_0_18px_rgba(182,233,204,0.55)]",
        isDisabled && "cursor-not-allowed opacity-25 grayscale hover:bg-inherit",
      )}
    >
      <span className="font-display text-[10px] font-bold leading-none sm:text-[12px] md:text-[13px]">
        {sym}
      </span>
    </button>
  );
}
