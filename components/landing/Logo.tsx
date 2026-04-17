import Image from "next/image";

export function Logo({ size = 56 }: { size?: number }) {
  return (
    <Image
      src="/bicker-transparent.png"
      alt="LabMeet"
      width={size * 2}
      height={size * 2}
      style={{ width: size * 2, height: "auto" }}
    />
  );
}
