import { API_BASE_URL } from "../../constants";
import { deleteProperty } from "../delete";

const mockResponse = { success: true };

const mockFetch = vi.fn();

global.fetch = mockFetch;

describe("deleteProperty", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const request = {
    apiKey: "test-api-key",
    workspaceId: "workspace-1",
    projectId: "project-1",
    propertyId: "property-1",
  };

  const endpoint = `${API_BASE_URL}/workspaces/${request.workspaceId}/projects/${request.projectId}/properties/${request.propertyId}`;

  it("sends a DELETE request and returns success response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await deleteProperty(request);

    expect(mockFetch).toHaveBeenCalledWith(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "test-api-key",
      },
    });

    expect(result).toEqual(mockResponse);
  });

  it("throws an error if the response is not ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: "Not found" }),
    });

    await expect(deleteProperty(request)).rejects.toThrow("Not found");
  });

  it("throws a generic error if no message is returned", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({}),
    });

    await expect(deleteProperty(request)).rejects.toThrow(
      "Failed to delete property"
    );
  });
});
