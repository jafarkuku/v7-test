import { render, screen } from "@testing-library/react";

import { Property } from "@v7-product-interview-task/api";

import { createMockProperty } from "@/test-utils/factory";

import { PropertyActionsProps } from "../PropertyActions/PropertyActions";
import { PropertyModal } from "../PropertyModal";
import { PropertyTypePickerProps } from "../PropertyTypePicker/PropertyTypePicker";

const mockProperty = createMockProperty();
vi.mock("../PropertyTypePicker/PropertyTypePicker", () => ({
  PropertyTypePicker: ({ onCreateProperty }: PropertyTypePickerProps) => (
    <div data-testid="property-type-picker" onClick={() => onCreateProperty(mockProperty)}>
      Type Picker
    </div>
  ),
}));

vi.mock("../PropertyActions/PropertyActions", () => ({
  PropertyActions: ({ property, onCloseModal }: PropertyActionsProps) => (
    <div data-testid="property-actions" onClick={onCloseModal}>
      Editing {property.name}
    </div>
  ),
}));

describe("PropertyModal", () => {
  const onCreateProperty = vi.fn();
  const onClose = vi.fn();

  it("renders the type picker when no property is provided", () => {
    render(
      <PropertyModal
        open={true}
        property={undefined}
        onCreateProperty={onCreateProperty}
        onClose={onClose}
      />,
    );

    expect(screen.getByTestId("property-modal")).toBeVisible();
    expect(screen.getByTestId("property-type-picker")).toBeInTheDocument();
    expect(screen.queryByTestId("property-actions")).not.toBeInTheDocument();
  });

  it("renders property actions when a property is provided", () => {
    const mockProperty = { id: "123", name: "Mock Property", type: "text" } as Property;

    render(
      <PropertyModal
        open={true}
        property={mockProperty}
        onCreateProperty={onCreateProperty}
        onClose={onClose}
      />,
    );

    expect(screen.getByTestId("property-modal")).toBeVisible();
    expect(screen.getByTestId("property-actions")).toHaveTextContent("Editing Mock Property");
    expect(screen.queryByTestId("property-type-picker")).not.toBeInTheDocument();
  });

  it("does not render modal when open is false", () => {
    render(
      <PropertyModal
        open={false}
        property={undefined}
        onCreateProperty={onCreateProperty}
        onClose={onClose}
      />,
    );

    expect(screen.queryByTestId("property-modal")).not.toBeInTheDocument();
  });
});
