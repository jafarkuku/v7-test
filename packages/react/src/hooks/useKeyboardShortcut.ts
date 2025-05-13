import { useEffect } from "react";

interface ShortcutOptions {
  key: string;
  meta?: boolean;
  eventType?: "keydown" | "keyup";
}

export function useKeyboardShortcut(
  { key, meta, eventType = "keydown" }: ShortcutOptions,
  handler: (e: KeyboardEvent) => void
) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();
      const targetKey = key.toLowerCase();

      if (pressedKey !== targetKey) {
        return;
      }

      const hasMeta = e.ctrlKey || e.metaKey;

      if (meta === true && !hasMeta) {
        return;
      }

      handler(e);
    };

    window.addEventListener(eventType, listener);

    return () => window.removeEventListener(eventType, listener);
  }, [key, meta, eventType, handler]);
}