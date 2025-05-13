import { render, screen, fireEvent } from "@testing-library/react";

import type { Property } from "@v7-product-interview-task/api";

import { PropertyTypePicker } from "../PropertyTypePicker";

vi.mock("../hooks/usePropertyTypePickerController", () => ({
  usePropertyTypePickerController: (onCreateProperty: (p: Property) => void) => ({
    query: "",
    propertyTypes: [
      ["text", "Text"],
      ["pdf", "PDF"],
    ],
    handleTextChange: vi.fn(),
    handleCreateProperty: (type: string) => () => {
      onCreateProperty({ id: `mock-${type}` } as Property);
    },
  }),
}));

describe("PropertyTypePicker", () => {
  const mockCreate = vi.fn();
  const onError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with all property types", () => {
    render(<PropertyTypePicker onCreateProperty={mockCreate} onError={onError} />);

    expect(screen.getByPlaceholderText("Search")).toBeVisible();

    const items = screen.getAllByRole("option");
    expect(items.length).toBe(2);
    expect(screen.getByText("Text")).toBeInTheDocument();
    expect(screen.getByText("PDF")).toBeInTheDocument();
  });

  it("calls onCreateProperty with correct property when clicked", () => {
    render(<PropertyTypePicker onCreateProperty={mockCreate} onError={onError} />);

    fireEvent.click(screen.getByText("Text"));
    expect(mockCreate).toHaveBeenCalledWith({ id: "mock-text" });

    fireEvent.click(screen.getByText("PDF"));
    expect(mockCreate).toHaveBeenCalledWith({ id: "mock-pdf" });

    expect(mockCreate).toHaveBeenCalledTimes(2);
  });

  it("has correct test id and accessibility label", () => {
    render(<PropertyTypePicker onCreateProperty={mockCreate} onError={onError} />);

    const wrapper = screen.getByTestId("property-type-picker");
    expect(wrapper).toHaveAttribute("aria-label", "Property type picker");
  });
});
