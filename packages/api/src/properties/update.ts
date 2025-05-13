import { API_BASE_URL } from "../constants";
import type { Property, UpdatePropertyRequest } from "../types";

type Request = {
  apiKey: string;
  workspaceId: string;
  projectId: string;
  propertyId: string;
  body: UpdatePropertyRequest;
};

export const updateProperty = async ({
  apiKey,
  workspaceId,
  projectId,
  propertyId,
  body,
}: Request): Promise<Property> => {
  const res = await fetch(
    `${API_BASE_URL}/workspaces/${workspaceId}/projects/${projectId}/properties/${propertyId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    console.error("API error:", err);
    throw new Error("Failed to update property");
  }

  const data: Property = await res.json();

  return data;
};
