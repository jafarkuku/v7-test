import { renderHook, act, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { Property } from "@v7-product-interview-task/api";

import { createMockProperty } from "@/test-utils/factory";

import { usePropertyActionsController } from "../usePropertyActionsController";

const mockProperty: Property = createMockProperty();
const updateProperty = vi.fn(() => Promise.resolve(mockProperty));
const deleteProperty = vi.fn(() => Promise.resolve());
vi.mock("@/hooks/useProject", () => ({
  useProject: () => ({
    updateProperty: updateProperty,
    deleteProperty: deleteProperty,
  }),
}));

describe("usePropertyActionsController", () => {
  const onCloseModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize state from the property", () => {
    const { result } = renderHook(() => usePropertyActionsController(mockProperty, onCloseModal));

    expect(result.current.state).toEqual({
      name: mockProperty.name,
      tool: mockProperty.tool,
      inputPrompt: "",
      inputSelectorOpen: false,
    });
  });

  it("should update name with dispatch", () => {
    const { result } = renderHook(() => usePropertyActionsController(mockProperty, onCloseModal));

    act(() => {
      result.current.dispatch({ type: "setName", name: "Updated Name" });
    });

    expect(result.current.state.name).toBe("Updated Name");
  });

  it("should toggle selector", () => {
    const { result } = renderHook(() => usePropertyActionsController(mockProperty, onCloseModal));

    expect(result.current.state.inputSelectorOpen).toBe(false);

    act(() => {
      result.current.dispatch({ type: "toggleSelector" });
    });

    expect(result.current.state.inputSelectorOpen).toBe(true);
  });

  it("should call updateProperty and then close modal", async () => {
    const { result } = renderHook(() => usePropertyActionsController(mockProperty, onCloseModal));

    act(() => {
      result.current.handleUpdateProperty();
    });

    expect(updateProperty).toHaveBeenCalledWith(
      mockProperty.id,
      expect.objectContaining({
        name: mockProperty.name,
        tool: mockProperty.tool,
        type: mockProperty.type,
      }),
    );

    await waitFor(() => {
      expect(onCloseModal).toHaveBeenCalled();
    });
  });

  it("should call deleteProperty and then close modal", async () => {
    const { result } = renderHook(() => usePropertyActionsController(mockProperty, onCloseModal));

    act(() => {
      result.current.handleDeleteProperty();
    });

    expect(deleteProperty).toHaveBeenCalledWith(mockProperty.id);

    await waitFor(() => {
      expect(onCloseModal).toHaveBeenCalled();
    });
  });
});
