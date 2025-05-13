import { render, screen, fireEvent } from "@testing-library/react";

import { PROPERTY_TOOL_METADATA, PropertyTool } from "@/constants";

import { ToolSelector } from "../ToolSelector";

describe("ToolSelector", () => {
  const mockOnChange = vi.fn();
  const defaultTool: PropertyTool = "gpt_4_1";

  it("renders the label and select input", () => {
    render(<ToolSelector tool={defaultTool} onChange={mockOnChange} />);

    const label = screen.getByLabelText("Tool selector");

    expect(label).toBeInTheDocument();
    expect(label.tagName.toLowerCase()).toBe("select");

    Object.entries(PROPERTY_TOOL_METADATA).forEach(([, meta]) => {
      const labelText = `${meta.label}${meta.rateLimited ? " [Rate limited]" : ""}`;
      expect(screen.getByRole("option", { name: labelText })).toBeInTheDocument();
    });
  });

  it("selects the correct default tool", () => {
    render(<ToolSelector tool={defaultTool} onChange={mockOnChange} />);

    const select = screen.getByLabelText("Tool selector") as HTMLSelectElement;

    expect(select.value).toBe(defaultTool);
  });

  it("calls onChange when a different tool is selected", () => {
    render(<ToolSelector tool={defaultTool} onChange={mockOnChange} />);

    const select = screen.getByLabelText("Tool selector");

    const newTool = Object.keys(PROPERTY_TOOL_METADATA).find((key) => key !== defaultTool);

    if (!newTool) {
      throw new Error("No alternative tool found in metadata");
    }

    fireEvent.change(select, { target: { value: newTool } });
    expect(mockOnChange).toHaveBeenCalledWith(newTool);
  });
});
