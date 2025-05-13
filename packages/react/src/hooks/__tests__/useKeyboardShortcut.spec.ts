import { renderHook } from "@testing-library/react";

import { useKeyboardShortcut } from "../useKeyboardShortcut";

const fireKey = (key: string, options: Partial<KeyboardEvent> = {}) => {
  const event = new KeyboardEvent("keydown", { key, ...options });
  window.dispatchEvent(event);
};

describe("useKeyboardShortcut", () => {
  it("calls handler on correct key press", () => {
    const handler = vi.fn();

    renderHook(() => useKeyboardShortcut({ key: "k", meta: true }, handler));

    fireKey("k"); // no meta → should not call
    expect(handler).not.toHaveBeenCalled();

    fireKey("k", { metaKey: true }); // mac
    fireKey("k", { ctrlKey: true }); // windows/linux

    expect(handler).toHaveBeenCalledTimes(2);
  });

  it("does not call handler on wrong key press", () => {
    const handler = vi.fn();

    renderHook(() => useKeyboardShortcut({ key: "k" }, handler));

    fireKey("x");
    expect(handler).not.toHaveBeenCalled();
  });

  it("removes listener on unmount", () => {
    const handler = vi.fn();

    const { unmount } = renderHook(() => useKeyboardShortcut({ key: "k" }, handler));

    unmount();
    fireKey("k");

    expect(handler).not.toHaveBeenCalled();
  });
});
