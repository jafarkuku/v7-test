import { describe, it, expect, vi, beforeEach } from "vitest";

import { API_BASE_URL } from "../../constants";
import { createMockProperty } from "../../test-utils/factory";
import type { Property } from "../../types";
import { createProperty, CreatePropertyParams } from "../create";

const mockParams: CreatePropertyParams = {
  apiKey: "test-api-key",
  workspaceId: "workspace-1",
  projectId: "project-1",
  body: {
    name: "New Property",
    type: "text",
    tool: "gpt_4",
    description: "",
    inputs: [],
  },
};

const endpoint = `${API_BASE_URL}/workspaces/${mockParams.workspaceId}/projects/${mockParams.projectId}/properties`;

describe("createProperty", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("successfully creates a property", async () => {
    const mockProperty: Property = createMockProperty();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockProperty),
      })
    );

    const result = await createProperty(mockParams);

    expect(fetch).toHaveBeenCalledOnce();
    expect(fetch).toHaveBeenCalledWith(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": mockParams.apiKey,
      },
      body: JSON.stringify(mockParams.body),
    });

    expect(result).toEqual(mockProperty);
  });

  it("throws an error when response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ message: "Invalid input" }),
      })
    );

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(createProperty(mockParams)).rejects.toThrow(
      "Failed to create property"
    );

    expect(consoleSpy).toHaveBeenCalledWith("API error:", {
      message: "Invalid input",
    });
  });
});
