import { API_BASE_URL } from "../constants";

export const createEndpoint = ({
  workspaceId,
  projectId,
  propertyId,
}: {
  workspaceId: string;
  projectId: string;
  propertyId?: string;
}) => {
  const base = `${API_BASE_URL}/workspaces/${workspaceId}/projects/${projectId}/properties`;
  return propertyId ? `${base}/${propertyId}` : base;
};
export const getRequestHeaders = (apiKey: string) => ({
  "Content-Type": "application/json",
  "X-API-KEY": apiKey,
});
