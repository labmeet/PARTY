"use client";

import { forwardRef } from "react";

function format(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  onChange: (value: string) => void;
};

export const PhoneInput = forwardRef<HTMLInputElement, Props>(
  function PhoneInput({ onChange, value, ...rest }, ref) {
    return (
      <input
        ref={ref}
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        placeholder="010-1234-5678"
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(format(e.target.value))}
        {...rest}
      />
    );
  }
);
