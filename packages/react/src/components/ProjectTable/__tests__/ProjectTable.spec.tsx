import { fireEvent, render, screen, within } from "@testing-library/react";

import { ProjectTable } from "../ProjectTable";

vi.mock("react-router-dom", () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a data-testid="mock-link" href={to}>
      {children}
    </a>
  ),
}));

describe("ProjectTable", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("does not render any modals", () => {
    render(<ProjectTable />);

    expect(screen.queryByTestId("command-center")).toBeFalsy();
    expect(screen.queryByTestId("property-modal")).toBeFalsy();
  });

  it("renders correct headers and table cell content in the right place", () => {
    render(<ProjectTable />);

    // Check column headers (inside <th>)
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(3);
    expect(headers[1]).toHaveTextContent("Name");
    expect(headers[2]).toHaveTextContent("Age");

    // Check rows
    const rows = screen.getAllByRole("row");

    expect(rows).toHaveLength(3);

    const entityRow1 = rows[1];
    const entityRow2 = rows[2];

    // Check cell content for row 1
    const row1Cells = within(entityRow1).getAllByRole("gridcell");
    expect(row1Cells[1]).toHaveTextContent("Alice");
    expect(row1Cells[2]).toHaveTextContent("30");

    // Check cell content for row 2
    const row2Cells = within(entityRow2).getAllByRole("gridcell");
    expect(row2Cells[1]).toHaveTextContent("Bob");
    expect(row2Cells[2]).toHaveTextContent("40");
  });

  it("shows the command center when cmd k is pressed on the keyboard", () => {
    render(<ProjectTable />);

    fireEvent.keyDown(window, {
      key: "k",
      metaKey: true,
    });

    const modal = screen.getByTestId("command-center");
    expect(modal).toBeInTheDocument();
  });
  it("shows the property modal, when a cell header is pressed", () => {
    render(<ProjectTable />);

    const headerCell = screen.getAllByRole("columnheader")[1];

    fireEvent.click(headerCell);

    const modal = screen.getByTestId("property-modal");
    expect(modal).toBeInTheDocument();
  });
});
