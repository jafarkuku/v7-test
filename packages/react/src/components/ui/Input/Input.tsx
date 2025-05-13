import {
  InputHTMLAttributes,
  forwardRef,
  TextareaHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import clsx from "clsx";

interface BaseProps {
  multiline?: boolean;
  rows?: number;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

type InputFieldProps = BaseProps &
  (
    | (InputHTMLAttributes<HTMLInputElement> & { multiline?: false })
    | (TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true })
  );

/**
 * A reusable input field component supporting both single-line and multiline inputs.
 */
export const InputField = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputFieldProps>(
  ({ multiline = false, rows = 3, className, autoFocus, ...props }, ref) => {
    const localRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => localRef.current as HTMLInputElement, []);

    useEffect(() => {
      if (autoFocus) {
        localRef.current?.focus();
      }
    }, [autoFocus]);

    const baseClasses = clsx(
      "w-full",
      "h-full",
      "bg-[#1a1a1a]",
      "text-white",
      "placeholder-gray-500",
      "border",
      "border-gray-600",
      "rounded-md",
      "px-3",
      "py-2",
      "text-sm",
      "shadow-sm",
      "outline-none",
      "focus:ring-2",
      "focus:ring-blue-500",
      "focus:border-blue-500",
      className,
    );

    if (multiline) {
      return (
        <textarea
          ref={localRef as React.Ref<HTMLTextAreaElement>}
          rows={rows}
          className={clsx(baseClasses, "resize-none")}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      );
    }

    return (
      <input
        ref={localRef as React.Ref<HTMLInputElement>}
        type="text"
        className={baseClasses}
        {...(props as InputHTMLAttributes<HTMLInputElement>)}
      />
    );
  },
);

InputField.displayName = "InputField";
