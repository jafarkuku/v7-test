import { render, screen, fireEvent } from "@testing-library/react";

import { CommandItem } from "../CommandItem";

describe("CommandItem", () => {
  it("renders label and description correctly", () => {
    render(
      <CommandItem
        label="Test Command"
        description="This is a description"
        isSelected={false}
        onClick={vi.fn()}
      />,
    );

    expect(screen.getByText("Test Command")).toBeVisible();
    expect(screen.getByText("This is a description")).toBeVisible();
  });

  it("does not render description if not provided", () => {
    render(<CommandItem label="Only Label" isSelected={false} onClick={vi.fn()} />);

    expect(screen.getByText("Only Label")).toBeVisible();
    expect(screen.queryByText("This is a description")).not.toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();

    render(<CommandItem label="Clickable" isSelected={false} onClick={onClick} />);

    fireEvent.click(screen.getByText("Clickable"));
    expect(onClick).toHaveBeenCalled();
  });
});
