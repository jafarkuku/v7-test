import { AddPropertyRequest, Property } from "../types";
import { createEndpoint, getRequestHeaders } from "./utils";

export type CreatePropertyParams = {
  apiKey: string;
  workspaceId: string;
  projectId: string;
  body: AddPropertyRequest;
};

export const createProperty = async ({
  apiKey,
  workspaceId,
  projectId,
  body,
}: CreatePropertyParams): Promise<Property> => {
  const url = createEndpoint({ workspaceId, projectId });
  const res = await fetch(url, {
    method: "POST",
    headers: getRequestHeaders(apiKey),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("API error:", err); // We might want to add some logging utility. Ive substituted this with console.err.

    throw new Error("Failed to create property");
  }

  const data: Property = await res.json();

  return data;
};
