import clsx from "clsx";

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "p" | "div";
  muted?: boolean;
  size?: "sm" | "base" | "lg";
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  as = "span",
  muted = false,
  size = "base",
  className,
  children,
  ...props
}) => {
  const Component = as;
  const sizeClass =
    size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base";

  return (
    <Component
      className={clsx(sizeClass, muted && "text-gray-500", className)}
      {...props}
    >
      {children}
    </Component>
  );
};
