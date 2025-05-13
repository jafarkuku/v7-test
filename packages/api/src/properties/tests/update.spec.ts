import { afterEach, describe, expect, it, vi } from "vitest";

import { API_BASE_URL } from "../../constants";
import { createMockProperty } from "../../test-utils/factory";
import type { Property, UpdatePropertyRequest } from "../../types";
import { updateProperty } from "../update";

const mockProperty: Property = createMockProperty();

const payload: UpdatePropertyRequest = {
  name: "Updated Property",
  tool: "gpt_4",
  description: null,
  inputs: [],
  type: "text",
};

const request = {
  apiKey: "test-api-key",
  workspaceId: "workspace-1",
  projectId: "project-1",
  propertyId: "property-1",
  body: payload,
};

const endpoint = `${API_BASE_URL}/workspaces/${request.workspaceId}/projects/${request.projectId}/properties/${request.propertyId}`;

describe("updateProperty", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("sends PUT request and returns the updated property", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockProperty),
      })
    );
    const result = await updateProperty(request);

    expect(fetch).toHaveBeenCalledWith(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": request.apiKey,
      },
      body: JSON.stringify(payload),
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

    await expect(updateProperty(request)).rejects.toThrow(
      "Failed to update property"
    );
  });
});
