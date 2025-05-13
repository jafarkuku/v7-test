import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { InputPromptEditor, type InputPromptEditorProps } from "../InputPromptEditor";

describe("InputPromptEditor", () => {
  const defaultProps: InputPromptEditorProps = {
    isPromptOpen: true,
    value: "Initial prompt",
    onToggle: vi.fn(),
    onChange: vi.fn(),
  };

  it("renders the labels and input when open", () => {
    render(<InputPromptEditor {...defaultProps} />);

    expect(screen.getByText("Inputs")).toBeInTheDocument();
    expect(screen.getByText("Select inputs")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Initial prompt")).toBeInTheDocument();
  });

  it("does not render the input when isOpen is false", () => {
    render(<InputPromptEditor {...defaultProps} isPromptOpen={false} />);

    expect(screen.queryByDisplayValue("Initial prompt")).not.toBeInTheDocument();
  });

  it("calls onToggle when the label area is clicked", () => {
    render(<InputPromptEditor {...defaultProps} />);

    fireEvent.click(screen.getByText("Inputs"));

    expect(defaultProps.onToggle).toHaveBeenCalled();
  });

  it("calls onChange when the input value changes", () => {
    render(<InputPromptEditor {...defaultProps} />);
    fireEvent.change(screen.getByDisplayValue("Initial prompt"), {
      target: { value: "Updated prompt" },
    });
    expect(defaultProps.onChange).toHaveBeenCalledWith("Updated prompt");
  });
});
