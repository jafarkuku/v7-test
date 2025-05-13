import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CommandCenter } from "../CommandCenter";

const onCreateProperty = vi.fn();

describe("CommandCenter (no hook mocking)", () => {
  const openCommandCenter = () => {
    fireEvent.keyDown(window, { key: "k", metaKey: true }); // ⌘+K
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not be visible by default", () => {
    render(<CommandCenter onCreatePorperty={onCreateProperty} />);
    expect(screen.queryByTestId("command-center")).not.toBeInTheDocument();
  });

  it("should open when ⌘+K is pressed", async () => {
    render(<CommandCenter onCreatePorperty={onCreateProperty} />);

    openCommandCenter();

    expect(await screen.findByTestId("command-center")).toBeInTheDocument();
  });

  it("renders filtered commands and allows selecting via keyboard", async () => {
    render(<CommandCenter onCreatePorperty={onCreateProperty} />);

    openCommandCenter();

    const input = await screen.findByPlaceholderText("Type a command...");
    expect(input).toBeInTheDocument();

    // Should show both commands
    let commands = screen.getAllByTestId("command-label");
    expect(commands).toHaveLength(2);
    expect(commands[0]).toHaveTextContent("Create new table property");

    act(() => {
      fireEvent.change(input, { target: { value: "another" } });
    });

    commands = screen.getAllByTestId("command-label");
    expect(commands).toHaveLength(1);
    expect(commands[0]).toHaveTextContent("Another command");
  });

  it("executes command via Enter", async () => {
    render(<CommandCenter onCreatePorperty={onCreateProperty} />);

    openCommandCenter();

    const input = await screen.findByPlaceholderText("Type a command...");

    await userEvent.type(input, "{enter}");

    expect(onCreateProperty).toHaveBeenCalledTimes(1);
  });

  it("executes command via click", async () => {
    render(<CommandCenter onCreatePorperty={onCreateProperty} />);

    openCommandCenter();

    const label = await screen.findByText("Create new table property");
    fireEvent.click(label);

    expect(onCreateProperty).toHaveBeenCalledTimes(1);
  });
});
