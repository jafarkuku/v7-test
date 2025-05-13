import {
  getProject as getProjectAPI,
  Project
} from "@v7-product-interview-task/api";

export async function getProject({ workspaceId, projectId }: {
  workspaceId: string;
  projectId: string;
}): Promise<Project> {
  const apiKey = import.meta.env.VITE_API_KEY;

  const project = await getProjectAPI({ apiKey, workspaceId, projectId });

  return project;
}