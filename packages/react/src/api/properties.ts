import {
  createProperty as createPropertyAPI,
  updateProperty as updatePropertyAPI,
  deleteProperty as deletePropertyAPI,
  Property,
  UpdatePropertyRequest,
} from "@v7-product-interview-task/api";

import { getAddPropertyRequestBody } from "./utils";

export async function createProperty({
  workspaceId,
  projectId,
  type,
}: {
  workspaceId: string;
  projectId: string;
  type: Property["type"];
}): Promise<Property> {
  const apiKey = import.meta.env.VITE_API_KEY;

  const newProperty = await createPropertyAPI({
    apiKey,
    workspaceId,
    projectId,
    body: getAddPropertyRequestBody({
      projectId,
      type,
    }),
  });

  return newProperty;
}

export async function updateProperty({
  workspaceId,
  projectId,
  payload,
  propertyId,
}: {
  workspaceId: string;
  projectId: string;
  propertyId: string;
  payload: UpdatePropertyRequest;
}): Promise<Property> {
  const apiKey = import.meta.env.VITE_API_KEY;

  const newProperty = await updatePropertyAPI({
    apiKey,
    workspaceId,
    projectId,
    propertyId,
    body: payload,
  });

  return newProperty;
}

export async function deleteProperty({
  workspaceId,
  projectId,
  propertyId,
}: {
  workspaceId: string;
  projectId: string;
  propertyId: string;
}): Promise<void> {
  const apiKey = import.meta.env.VITE_API_KEY;

  await deletePropertyAPI({
    apiKey,
    workspaceId,
    projectId,
    propertyId,
  });
}
