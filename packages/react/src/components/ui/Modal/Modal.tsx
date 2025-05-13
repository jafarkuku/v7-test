import { ReactNode, useEffect, useRef } from "react";

import clsx from "clsx";

import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";

interface ModalProps {
  testId?: string;
  open: boolean;
  children: ReactNode;
  ariaLabel?: string;
  onClose: () => void;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  testId,
  open,
  children,
  className,
  onClose,
  ariaLabel,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useKeyboardShortcut({ key: "Escape" }, onClose);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onClickAway = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    window.addEventListener("mousedown", onClickAway);
    return () => window.removeEventListener("mousedown", onClickAway);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      data-testid={testId || "modal"}
      className={clsx("fixed inset-0 bg-black/50 flex items-center justify-center z-50", className)}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <div ref={containerRef} className="bg-[#1a1a1a] rounded-lg p-4 w-auto relative">
        {children}
      </div>
    </div>
  );
};
