import { LucideIcon } from "lucide-react";

type IconProps = {
  icon: LucideIcon;
  size?: number;
};

export const Icon = ({ icon: IconComponent, size = 16 }: IconProps) => (
  <IconComponent className={`w-[${size}px] h-[${size}px]`} />
);
