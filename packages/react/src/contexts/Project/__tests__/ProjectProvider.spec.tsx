import { render } from "@testing-library/react";

import { ProjectProvider } from "../ProjectProvider";
import { useProjectContext } from "../useProjectContext";

vi.mock("react-router", () => ({
  useParams: () => ({
    workspaceId: "ws-123",
    projectId: "project-123",
  }),
}));

const Consumer = () => {
  const { workspaceId, projectId, apiKey } = useProjectContext();

  return (
    <div>
      <div data-testid="workspaceId">{workspaceId}</div>
      <div data-testid="projectId">{projectId}</div>
      <div data-testid="apiKey">{apiKey}</div>
    </div>
  );
};

describe("ProjectProvider", () => {
  it("provides context correctly when VITE_API_KEY is set", () => {
    const { getByTestId } = render(
      <ProjectProvider>
        <Consumer />
      </ProjectProvider>,
    );

    expect(getByTestId("workspaceId").textContent).toBe("ws-123");
    expect(getByTestId("projectId").textContent).toBe("project-123");
    expect(getByTestId("apiKey").textContent).toBe("test-api-key");
  });

  it("throws error if VITE_API_KEY is not set", () => {
    import.meta.env.VITE_API_KEY = "";

    const renderFn = () =>
      render(
        <ProjectProvider>
          <Consumer />
        </ProjectProvider>,
      );

    expect(renderFn).toThrowError("VITE_API_KEY is not set");
  });
});
