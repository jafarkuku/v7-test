import * as api from "@v7-product-interview-task/api";

import { createMockProperty } from "@/test-utils/factory";

import { createProperty, updateProperty, deleteProperty } from "../properties";

const mocks = vi.hoisted(() => ({
  createProperty: vi.fn(),
  updateProperty: vi.fn(),
  deleteProperty: vi.fn(),
}));

vi.mock("@v7-product-interview-task/api", () => ({
  createProperty: mocks.createProperty,
  updateProperty: mocks.updateProperty,
  deleteProperty: mocks.deleteProperty,
}));

describe("property API actions", () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const workspaceId = "workspace-id";
  const projectId = "project-id";
  const propertyId = "property-id";
  const type = "text";
  const property = createMockProperty();

  it("createProperty calls API with correct params and returns property", async () => {
    mocks.createProperty.mockResolvedValue(property);

    const result = await createProperty({ workspaceId, projectId, type });

    expect(api.createProperty).toHaveBeenCalledWith({
      apiKey,
      workspaceId,
      projectId,
      body: {
        name: "New Property",
        description: "",
        inputs: [],
        tool: "gpt_4_1",
        type,
      },
    });

    expect(result).toEqual(property);
  });

  it("updateProperty calls API with correct params and returns updated property", async () => {
    const payload: api.UpdatePropertyRequest = {
      name: "Updated name",
      tool: "gpt_4",
      type: "text",
      description: "Some description",
    };

    mocks.updateProperty.mockResolvedValue(property);

    const result = await updateProperty({
      workspaceId,
      projectId,
      propertyId,
      payload,
    });

    expect(api.updateProperty).toHaveBeenCalledWith({
      apiKey,
      workspaceId,
      projectId,
      propertyId,
      body: payload,
    });

    expect(result).toEqual(property);
  });

  it("deleteProperty calls API with correct params", async () => {
    mocks.deleteProperty.mockResolvedValue(true);

    await deleteProperty({ workspaceId, projectId, propertyId });

    expect(api.deleteProperty).toHaveBeenCalledWith({
      apiKey,
      workspaceId,
      projectId,
      propertyId,
    });
  });
});
