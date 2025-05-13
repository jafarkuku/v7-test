import { DeleteResponse } from "../types";
import { createEndpoint, getRequestHeaders } from "./utils";

type Request = {
  workspaceId: string;
  projectId: string;
  propertyId: string;
  apiKey: string;
};

export async function deleteProperty({
  apiKey,
  workspaceId,
  projectId,
  propertyId,
}: Request): Promise<DeleteResponse> {
  const url = createEndpoint({ workspaceId, projectId, propertyId });
  const res = await fetch(url, {
    method: "DELETE",
    headers: getRequestHeaders(apiKey),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to delete property");
  }

  return res.json();
}
