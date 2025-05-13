import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import type { Property } from "@v7-product-interview-task/api";

import { createMockProperty } from "@/test-utils/factory";

import { ProjectTableHeaderCell } from "../ProjectTableHeaderCell";

describe("ProjectTableHeaderCell", () => {
  const mockProperty: Property = createMockProperty();

  it("renders the property name", () => {
    render(
      <table>
        <thead>
          <tr>
            <ProjectTableHeaderCell property={mockProperty} colIndex={0} onClick={() => {}} />
          </tr>
        </thead>
      </table>,
    );

    expect(screen.getByRole("columnheader")).toHaveTextContent(mockProperty.name);
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();

    render(
      <table>
        <thead>
          <tr>
            <ProjectTableHeaderCell property={mockProperty} colIndex={1} onClick={onClick} />
          </tr>
        </thead>
      </table>,
    );

    fireEvent.click(screen.getByRole("columnheader"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
