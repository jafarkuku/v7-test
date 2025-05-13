import { createMockProject } from "@/test-utils/factory";

import { getProject } from "../projects";

const mocks = vi.hoisted(() => ({
  getProject: vi.fn(),
}));

vi.mock("@v7-product-interview-task/api", () => ({
  getProject: mocks.getProject,
}));

describe("getProject", () => {
  const mockProject = createMockProject();

  it("calls getProjectAPI with correct params and returns project", async () => {
    mocks.getProject.mockResolvedValueOnce(mockProject);

    const result = await getProject({
      workspaceId: mockProject.workspace_id,
      projectId: mockProject.id,
    });

    expect(mocks.getProject).toHaveBeenCalledWith({
      apiKey: "test-api-key",
      workspaceId: mockProject.workspace_id,
      projectId: mockProject.id,
    });

    expect(result).toEqual(mockProject);
  });
});
