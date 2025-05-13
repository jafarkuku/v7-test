import { useEffect, useMemo, useState } from "react";

import type { Command } from "@/components/ProjectTable/CommandCenter/types";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";

export function useCommandCenterController({ onCreatePorperty }: { onCreatePorperty: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const closeModal = () => {
    setIsOpen(false);
  };

  useKeyboardShortcut({ key: "k", meta: true }, () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  });

  const commands: Command[] = useMemo(
    () => [
      {
        id: "create-property",
        label: "Create new table property",
        description: "Add a new column to the table",
        action: onCreatePorperty,
      },
      {
        id: "2",
        label: "Another command",
        description: "Not configured",
        action: () => {},
      },
    ],
    [onCreatePorperty],
  );

  const filtered = useMemo(() => {
    return commands.filter(({ label }) => label.toLowerCase().includes(query.toLowerCase()));
  }, [commands, query]);

  useEffect(() => {
    setSelected(0);
  }, [filtered]);

  useEffect(() => {
    return () => {
      setQuery("");
    };
  }, []);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          setSelected((prev) => Math.min(prev + 1, filtered.length - 1));
          break;
        case "ArrowUp":
          setSelected((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          filtered[selected].action();
          setQuery("");
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [filtered, selected]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return {
    isOpen,
    query,
    selected,
    commands: filtered,
    handleTextChange,
    setSelected,
    closeModal,
  };
}
