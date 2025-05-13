import { render, screen, fireEvent } from "@testing-library/react";

import { ProjectTableCell } from "../ProjectTableCell";

describe("ProjectTableCell", () => {
  it("renders the initial value in view mode", () => {
    render(
      <table>
        <tbody>
          <tr>
            <ProjectTableCell initialValue="Alice" rowIndex={0} colIndex={0} />
          </tr>
        </tbody>
      </table>,
    );

    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("enters edit mode on click and displays input with the value", () => {
    render(
      <table>
        <tbody>
          <tr>
            <ProjectTableCell initialValue="Alice" rowIndex={0} colIndex={0} />
          </tr>
        </tbody>
      </table>,
    );

    fireEvent.click(screen.getByText("Alice"));

    expect(screen.getByDisplayValue("Alice")).toBeInTheDocument();
  });

  it("calls onSave with new value on blur when changed", () => {
    const onSave = vi.fn();

    render(
      <table>
        <tbody>
          <tr>
            <ProjectTableCell initialValue="Alice" rowIndex={0} colIndex={0} onSave={onSave} />
          </tr>
        </tbody>
      </table>,
    );

    fireEvent.click(screen.getByText("Alice"));

    const input = screen.getByDisplayValue("Alice");

    fireEvent.change(input, { target: { value: "Alicia" } });
    fireEvent.blur(input);

    expect(onSave).toHaveBeenCalledWith("Alicia");
  });

  it("does not call onSave if the value did not change", () => {
    const onSave = vi.fn();

    render(
      <table>
        <tbody>
          <tr>
            <ProjectTableCell initialValue="Alice" rowIndex={0} colIndex={0} onSave={onSave} />
          </tr>
        </tbody>
      </table>,
    );

    fireEvent.click(screen.getByText("Alice"));

    const input = screen.getByDisplayValue("Alice");

    fireEvent.blur(input); // no value change

    expect(onSave).not.toHaveBeenCalled();
  });
});
