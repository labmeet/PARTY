import Image from "next/image";

export function Logo({ size = 40 }: { size?: number }) {
  return (
    <Image
      src="/logo.png"
      alt="LabMeet 로고"
      width={size}
      height={size}
      className="object-contain"
      priority
    />
  );
}
