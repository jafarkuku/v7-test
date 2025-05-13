import { renderHook, act } from "@testing-library/react";

import { createMockProperty } from "@/test-utils/factory";

import { usePropertyTypePickerController } from "../usePropertyTypePickerController";

const mockProperty = createMockProperty();
const createProperty = vi.fn(() => Promise.resolve(mockProperty));
vi.mock("@/hooks/useProject", () => ({
  useProject: () => ({
    createProperty,
  }),
}));

describe("usePropertyTypePickerController", () => {
  const onCreateProperty = vi.fn();
  const onError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns filtered property types based on query", () => {
    const { result } = renderHook(() => usePropertyTypePickerController(onCreateProperty, onError));

    expect(result.current.propertyTypes).toHaveLength(10);

    act(() => {
      result.current.handleTextChange({
        target: { value: "number" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.propertyTypes).toHaveLength(1);
  });

  it("calls createProperty and then onCreateProperty", async () => {
    const { result } = renderHook(() => usePropertyTypePickerController(onCreateProperty, onError));

    const createHandler = result.current.handleCreateProperty("text");

    await act(async () => {
      await createHandler();
    });

    expect(onCreateProperty).toHaveBeenCalledWith(mockProperty);
  });
});
