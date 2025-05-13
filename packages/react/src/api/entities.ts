import {
  Entity,
  getEntities as getEntitiesAPI,
} from "@v7-product-interview-task/api";

export async function getEntities({ workspaceId, projectId }: {
  workspaceId: string;
  projectId: string;
}): Promise<Entity[]> {
  const apiKey = import.meta.env.VITE_API_KEY;

  const entities = await getEntitiesAPI({ apiKey, workspaceId, projectId });

  return entities;
}