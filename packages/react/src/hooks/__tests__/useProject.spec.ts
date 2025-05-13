vi.unmock("../useProject");
import { renderHook, act } from "@testing-library/react";

import { UpdatePropertyRequest } from "@v7-product-interview-task/api";

import { ProjectStore } from "@/store/project";
import { createMockEntity, createMockProject, createMockProperty } from "@/test-utils/factory";

import { useProject } from "../useProject";

vi.mock("@/contexts/Project/useProjectContext", () => ({
  useProjectContext: () => ({
    workspaceId: "mock-ws",
    projectId: "mock-project",
  }),
}));

const mockCreateNewProperty = vi.fn();
const mockFetchData = vi.fn();
const mockUpdateExistingProperty = vi.fn();
const mockDeleteExistingProperty = vi.fn();

const mockProject = createMockProject();
const mockEntities = [createMockEntity()];
const mockProperty = createMockProperty();
vi.mock("../../store/project", () => ({
  useProjectStore: (selector: <T>(store: ProjectStore) => T) =>
    selector({
      project: mockProject,
      entities: mockEntities,
      createNewProperty: mockCreateNewProperty,
      fetchData: mockFetchData,
      updateExistingProperty: mockUpdateExistingProperty,
      deleteExistingProperty: mockDeleteExistingProperty,
    } as unknown as ProjectStore),
}));

describe("useProject", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns project and entities from store", () => {
    const { result } = renderHook(() => useProject());

    expect(result.current.project).toEqual(mockProject);
    expect(result.current.entities).toEqual(mockEntities);
  });

  it("calls fetchData with correct IDs", () => {
    const { result } = renderHook(() => useProject());

    act(() => {
      result.current.handleFetchData();
    });

    expect(mockFetchData).toHaveBeenCalledWith({
      workspaceId: "mock-ws",
      projectId: "mock-project",
    });
  });

  it("calls createNewProperty with correct args", async () => {
    mockCreateNewProperty.mockResolvedValue(mockProperty);

    const { result } = renderHook(() => useProject());

    const property = await result.current.createProperty("pdf");

    expect(mockCreateNewProperty).toHaveBeenCalledWith({
      type: "pdf",
      workspaceId: "mock-ws",
      projectId: "mock-project",
    });

    expect(property).toEqual(mockProperty);
  });

  it("calls updateExistingProperty with correct args", async () => {
    const payload: UpdatePropertyRequest = {
      name: "Updated name",
      tool: "gpt_4",
      type: "text",
      description: "Some description",
    };

    const { result } = renderHook(() => useProject());

    await result.current.updateProperty("property-123", payload);

    expect(mockUpdateExistingProperty).toHaveBeenCalledWith({
      workspaceId: "mock-ws",
      projectId: "mock-project",
      propertyId: "property-123",
      payload,
    });
  });

  it("calls deleteExistingProperty with correct args", async () => {
    const { result } = renderHook(() => useProject());

    await result.current.deleteProperty("property-123");

    expect(mockDeleteExistingProperty).toHaveBeenCalledWith({
      workspaceId: "mock-ws",
      projectId: "mock-project",
      propertyId: "property-123",
    });
  });
});
