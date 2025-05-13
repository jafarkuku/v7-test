import { useCallback } from "react";

import { Property, UpdatePropertyRequest } from "@v7-product-interview-task/api";

import { useProjectContext } from "@/contexts/Project/useProjectContext";

import { useProjectStore } from "../store/project";

export const useProject = () => {
  const { workspaceId, projectId } = useProjectContext();

  const project = useProjectStore((s) => s.project);
  const entities = useProjectStore((s) => s.entities);
  const error = useProjectStore((s) => s.error);

  const createNewProperty = useProjectStore((s) => s.createNewProperty);
  const fetchData = useProjectStore((s) => s.fetchData);
  const updateExistingProperty = useProjectStore((s) => s.updateExistingProperty);
  const deleteExistingProperty = useProjectStore((s) => s.deleteExistingProperty);
  const resetError = useProjectStore((s) => s.resetError);

  const handleFetchData = useCallback(() => {
    fetchData({
      workspaceId,
      projectId,
    });
  }, [workspaceId, projectId, fetchData]);

  const createProperty = async (type: Property["type"]) => {
    const newProperty = await createNewProperty({
      type,
      workspaceId,
      projectId,
    });

    return newProperty;
  };

  const updateProperty = useCallback(
    async (propertyId: string, payload: UpdatePropertyRequest) => {
      await updateExistingProperty({
        workspaceId,
        projectId,
        propertyId,
        payload,
      });
    },
    [projectId, workspaceId, updateExistingProperty],
  );

  const deleteProperty = useCallback(
    async (propertyId: string) => {
      await deleteExistingProperty({
        workspaceId,
        projectId,
        propertyId,
      });
    },
    [deleteExistingProperty, projectId, workspaceId],
  );

  return {
    project,
    entities,
    error,
    handleFetchData,
    createProperty,
    updateProperty,
    deleteProperty,
    resetError,
  };
};
