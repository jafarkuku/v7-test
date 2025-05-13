import { getEntities as getEntitiesAPI } from "@v7-product-interview-task/api";

import { createMockEntity } from "@/test-utils/factory";

import { getEntities } from "../entities";

const mocks = vi.hoisted(() => ({
  getEntities: vi.fn(),
}));

vi.mock("@v7-product-interview-task/api", () => ({
  getEntities: mocks.getEntities,
}));

describe("getEntities", () => {
  const mockEntities = [createMockEntity()];

  it("calls getEntitiesAPI with correct parameters and returns entities", async () => {
    mocks.getEntities.mockResolvedValueOnce(mockEntities);
    const result = await getEntities({ workspaceId: "abc", projectId: "123" });

    expect(getEntitiesAPI).toHaveBeenCalledWith({
      apiKey: "test-api-key",
      workspaceId: "abc",
      projectId: "123",
    });

    expect(result).toEqual(mockEntities);
  });
});
