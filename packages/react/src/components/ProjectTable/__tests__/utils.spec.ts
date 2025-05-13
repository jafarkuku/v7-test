import { Entity, Property } from "@v7-product-interview-task/api";

import { createMockProperty, DEFAULT_ENTITY } from "@/test-utils/factory";

import { buildRows } from "../utils";

describe("buildRows", () => {
  const workspaceId = "ws-1";
  const projectId = "prj-1";

  const properties: Property[] = [
    createMockProperty({ id: "prop-1", slug: "ebitda", name: "EBITDA" }),
    createMockProperty({ id: "prop-2", slug: "company-year", name: "Company Year" }),
    createMockProperty({ id: "prop-3", slug: "cash-flow1", name: "Cash Flow" }),
  ];

  const entityId = DEFAULT_ENTITY.id;
  const entities: Entity[] = [DEFAULT_ENTITY];

  it("returns a single row with 3 cells and correct initial values", () => {
    const rows = buildRows({
      entities,
      properties,
      workspaceId,
      projectId,
    });

    expect(rows).toHaveLength(1);

    const row = rows[0];
    expect(row.key).toBe(entityId);
    expect(row.index).toBe(1);
    expect(row.link).toBe(`/ws-1/projects/prj-1/entities/${entityId}`);
    expect(row.cells).toHaveLength(3);

    // Validate actual resolved initial values
    expect(row.cells[0].initialValue).toContain("£494 million"); // ebitda.tool_value.value
    expect(row.cells[1].initialValue).toBe("1999"); // company-year.tool_value.value
    expect(row.cells[2].initialValue).toBe("Strong"); // cash-flow1.tool_value.value
  });

  it("attaches working onSave function when onSaveCell is provided", () => {
    const onSaveCell = vi.fn();

    const rows = buildRows({
      entities,
      properties,
      workspaceId,
      projectId,
      onSaveCell,
    });

    const cell = rows[0].cells[0];
    expect(cell.onSave).toBeDefined();

    cell.onSave?.("new value");
    expect(onSaveCell).toHaveBeenCalledWith(entityId, "ebitda", "new value");
  });

  it("does not attach onSave if onSaveCell is not provided", () => {
    const rows = buildRows({
      entities,
      properties,
      workspaceId,
      projectId,
    });

    expect(rows[0].cells[0].onSave).toBeUndefined();
  });
});
