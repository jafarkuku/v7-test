import { render, screen, fireEvent } from "@testing-library/react";

import { Property } from "@v7-product-interview-task/api";

import { createMockProperty } from "@/test-utils/factory";

import { PropertyActions } from "../PropertyActions";

const dispatch = vi.fn();
const handleUpdateProperty = vi.fn();
const handleDeleteProperty = vi.fn();
const mocks = vi.hoisted(() => {
  return {
    usePropertyActionsController: vi.fn(),
  };
});

vi.mock("../hooks/usePropertyActionsController", () => ({
  usePropertyActionsController: mocks.usePropertyActionsController,
}));

describe("PropertyActions", () => {
  beforeEach(() => {
    mocks.usePropertyActionsController.mockReturnValue({
      state: {
        name: "Name",
        tool: "gpt_4_1",
        inputPrompt: "",
        inputSelectorOpen: false,
      },
      dispatch,
      handleUpdateProperty,
      handleDeleteProperty,
    });
  });
  const property = createMockProperty({ type: "text", tool: "web_search" });
  const onCloseModal = vi.fn();

  it("renders the property name field, tool selector, and prompt editor", () => {
    const property: Property = {
      ...createMockProperty(),
      tool: "web_search",
    };

    render(<PropertyActions property={property} onCloseModal={onCloseModal} />);

    expect(screen.getByPlaceholderText("Property name")).toBeInTheDocument();
    expect(screen.getByLabelText("Tool selector")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Set a prompt (Press @ to mention an input)"),
    ).toBeInTheDocument();
  });

  it("calls onUpdate when Save is clicked", () => {
    render(<PropertyActions property={property} onCloseModal={onCloseModal} />);

    fireEvent.click(screen.getByText("Save"));

    expect(handleUpdateProperty).toHaveBeenCalled();
  });
});
