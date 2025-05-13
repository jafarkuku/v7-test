import { act, renderHook } from "@testing-library/react";

import { Project } from "@v7-product-interview-task/api";

import { useProject } from "@/hooks/useProject";

import { useProjectTableController } from "../useProjectTableController";

describe("useProjectTableController", () => {
  const { project, entities } = useProject(); // we have mocked this globally so safe to call
  const proj = project as Project;

  it("initializes headerCells correctly", () => {
    const { result } = renderHook(() => useProjectTableController());

    expect(result.current.headerCells).toHaveLength(2);
    expect(result.current.headerCells[0]).toEqual({
      colIndex: 0,
      key: proj.properties[0].id,
      onClick: expect.any(Function),
      property: proj.properties[0],
    });
    expect(result.current.headerCells[1]).toEqual({
      colIndex: 1,
      key: proj.properties[1].id,
      onClick: expect.any(Function),
      property: proj.properties[1],
    });
  });

  it("initializes rows correctly", () => {
    const { result } = renderHook(() => useProjectTableController());

    expect(result.current.rows).toHaveLength(2);
    expect(result.current.rows).toEqual([
      {
        index: 1,
        key: entities[0].id,
        link: `/${proj.workspace_id}/projects/${proj.id}/entities/${entities[0].id}`,
        cells: [
          {
            colIndex: 0,
            initialValue: entities[0].fields[proj.properties[0].slug].tool_value.value,
            key: proj.properties[0].id,
            onSave: undefined,
            rowIndex: 0,
          },
          {
            colIndex: 1,
            initialValue: entities[0].fields[proj.properties[1].slug].tool_value.value,
            key: proj.properties[1].id,
            onSave: undefined,
            rowIndex: 0,
          },
        ],
      },
      {
        index: 2,
        key: entities[1].id,
        link: `/${proj.workspace_id}/projects/${proj.id}/entities/${entities[1].id}`,
        cells: [
          {
            colIndex: 0,
            initialValue: entities[1].fields[proj.properties[0].slug].tool_value.value,
            key: proj.properties[0].id,
            onSave: undefined,
            rowIndex: 1,
          },
          {
            colIndex: 1,
            initialValue: entities[1].fields[proj.properties[1].slug].tool_value.value,
            key: proj.properties[1].id,
            onSave: undefined,
            rowIndex: 1,
          },
        ],
      },
    ]);
  });

  it("opens and closes property modal", () => {
    const { result } = renderHook(() => useProjectTableController());

    act(() => {
      result.current.openPropertyModal();
    });

    expect(result.current.propertyModal.open).toBe(true);

    act(() => {
      result.current.closePropertyModal();
    });

    expect(result.current.propertyModal.open).toBe(false);
  });

  it("sets property in modal on create", () => {
    const { result } = renderHook(() => useProjectTableController());
    const mockProperty = proj.properties[0];

    act(() => {
      result.current.onCreateProperty(mockProperty);
    });

    expect(result.current.propertyModal.open).toBe(true);
    expect(result.current.propertyModal.property).toEqual(mockProperty);
  });
});
