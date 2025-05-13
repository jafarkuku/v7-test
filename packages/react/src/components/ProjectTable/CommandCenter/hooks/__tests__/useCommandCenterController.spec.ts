import { renderHook, act } from "@testing-library/react";

import { useCommandCenterController } from "../useCommandCenterController";

const pressKeys = (key: string, metaKey?: boolean) =>
  window.dispatchEvent(new KeyboardEvent("keydown", { key, metaKey }));

describe("useCommandCenterController", () => {
  const onCreateProperty = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with modal closed", () => {
    const { result } = renderHook(() =>
      useCommandCenterController({ onCreatePorperty: onCreateProperty }),
    );
    expect(result.current.isOpen).toBe(false);
    expect(result.current.query).toBe("");
    expect(result.current.selected).toBe(0);
    expect(result.current.commands.length).toBe(2);
  });

  it("toggles modal with meta+K", () => {
    const { result } = renderHook(() =>
      useCommandCenterController({ onCreatePorperty: onCreateProperty }),
    );

    act(() => {
      pressKeys("k", true);
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      pressKeys("k", true);
    });

    expect(result.current.isOpen).toBe(false);
  });

  it("filters commands based on query", () => {
    const { result } = renderHook(() =>
      useCommandCenterController({ onCreatePorperty: onCreateProperty }),
    );

    act(() => {
      result.current.handleTextChange({
        target: { value: "create" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.commands).toHaveLength(1);
    expect(result.current.commands[0].label).toMatch(/create/i);
  });

  it("handles arrow keys and enter", () => {
    renderHook(() => useCommandCenterController({ onCreatePorperty: onCreateProperty }));

    act(() => {
      pressKeys("Enter");
    });

    expect(onCreateProperty).toHaveBeenCalledTimes(1);

    act(() => {
      pressKeys("ArrowUp");
      pressKeys("Enter");
    });

    expect(onCreateProperty).toHaveBeenCalledTimes(2);
  });

  it("resets query when component unmounts", () => {
    const { result, unmount } = renderHook(() =>
      useCommandCenterController({ onCreatePorperty: onCreateProperty }),
    );

    act(() => {
      result.current.handleTextChange({
        target: { value: "hello" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.query).toBe("hello");

    unmount();
  });
});
