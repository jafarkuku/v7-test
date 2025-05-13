import { ButtonHTMLAttributes } from "react";

import clsx from "clsx";
import { LucideIcon, Loader2 } from "lucide-react";

type ButtonProps = {
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  icon: Icon,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) => {
  const isIconOnly = Icon && !children;
  const isDisabled = disabled || loading;

  const base =
    "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

  const sizeClasses = {
    sm: isIconOnly ? "w-7 h-7 p-1" : "px-3 py-1.5 text-sm",
    md: isIconOnly ? "w-8 h-8 p-2" : "px-4 py-2 text-sm",
    lg: isIconOnly ? "w-10 h-10 p-2.5" : "px-5 py-2.5 text-base",
  }[size];

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400",
    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400 disabled:bg-gray-300",
    ghost:
      "bg-transparent text-gray-300 hover:bg-gray-800 focus:ring-gray-600 disabled:text-gray-500",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400",
  };

  return (
    <button
      className={clsx(base, sizeClasses, variants[variant], className)}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin w-4 h-4" />
      ) : (
        <>
          {Icon && (
            <Icon
              className={clsx("inline", children ? "mr-2" : "", "w-4 h-4")}
            />
          )}
          {children}
        </>
      )}
    </button>
  );
};
