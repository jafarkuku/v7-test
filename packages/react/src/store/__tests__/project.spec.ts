import { act } from "@testing-library/react";

import { getEntities } from "@/api/entities";
import { getProject } from "@/api/projects";
import { createProperty, updateProperty, deleteProperty } from "@/api/properties";
import { useProjectStore } from "@/store/project";
import { createMockEntity, createMockProject, createMockProperty } from "@/test-utils/factory";

vi.mock("@/api/projects", () => ({
  getProject: vi.fn(),
}));

vi.mock("@/api/entities", () => ({
  getEntities: vi.fn(),
}));

vi.mock("@/api/properties", () => ({
  createProperty: vi.fn(),
  updateProperty: vi.fn(),
  deleteProperty: vi.fn(),
}));

const mockProject = createMockProject();
const mockEntities = [createMockEntity()];
const mockProperty = createMockProperty();

const store = useProjectStore;

beforeEach(() => {
  store.setState({
    project: null,
    entities: [],
    loading: false,
    error: null,
  });

  vi.clearAllMocks();
});

describe("useProjectStore", () => {
  it("fetchData updates project and entities", async () => {
    vi.mocked(getProject).mockResolvedValue(mockProject);
    vi.mocked(getEntities).mockResolvedValue(mockEntities);

    await act(async () => {
      await store.getState().fetchData({ workspaceId: "w", projectId: "p" });
    });

    expect(store.getState().project).toEqual(mockProject);
    expect(store.getState().entities).toEqual(mockEntities);
    expect(store.getState().loading).toBe(false);
  });

  it("createNewProperty adds a property", async () => {
    const extendedProject = { ...mockProject, properties: [] };
    store.setState({ project: extendedProject });
    vi.mocked(createProperty).mockResolvedValue(mockProperty);

    await act(async () => {
      const created = await store.getState().createNewProperty({
        type: "text",
        workspaceId: "w",
        projectId: "p",
      });
      expect(created).toEqual(mockProperty);
    });

    expect(store.getState().project?.properties).toContainEqual(mockProperty);
  });

  it("updateExistingProperty updates a property", async () => {
    const existingProperty = { ...mockProperty, name: "Old Name" };
    const extendedProject = { ...mockProject, properties: [existingProperty] };
    store.setState({ project: extendedProject });

    const updated = { ...existingProperty, name: "New Name" };
    vi.mocked(updateProperty).mockResolvedValue(updated);

    await act(async () => {
      await store.getState().updateExistingProperty({
        propertyId: updated.id,
        payload: {
          name: "Updated name",
          tool: "gpt_4",
          type: "text",
          description: "Some description",
        },
        workspaceId: "w",
        projectId: "p",
      });
    });

    expect(store.getState().project?.properties).toContainEqual(updated);
  });

  it("deleteExistingProperty removes a property", async () => {
    const extendedProject = { ...mockProject, properties: [mockProperty] };
    store.setState({ project: extendedProject });
    vi.mocked(deleteProperty).mockResolvedValue();

    await act(async () => {
      await store.getState().deleteExistingProperty({
        propertyId: mockProperty.id,
        workspaceId: "w",
        projectId: "p",
      });
    });

    expect(store.getState().project?.properties).not.toContainEqual(mockProperty);
  });
});
