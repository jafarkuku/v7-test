import { create } from "zustand";

import { Project, Entity, UpdatePropertyRequest, Property } from "@v7-product-interview-task/api";

import { getEntities } from "@/api/entities";
import { getProject } from "@/api/projects";
import { createProperty, updateProperty, deleteProperty } from "@/api/properties";

export interface ProjectStore {
  project: Project | null;
  entities: Entity[];
  loading: boolean;
  error: {
    type: "create-property" | "fetch-data" | "update-property" | "delete-property";
  } | null;
  fetchData: (params: { workspaceId: string; projectId: string }) => Promise<void>;
  createNewProperty: (params: {
    type: Property["type"];
    workspaceId: string;
    projectId: string;
  }) => Promise<Property>;
  updateExistingProperty: (params: {
    propertyId: string;
    payload: UpdatePropertyRequest;
    workspaceId: string;
    projectId: string;
  }) => Promise<Property>;
  deleteExistingProperty: (params: {
    propertyId: string;
    workspaceId: string;
    projectId: string;
  }) => Promise<void>;
  resetError: () => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  loading: false,
  error: null,
  project: null,
  entities: [],

  // Store Muation Actions
  fetchData: async ({ workspaceId, projectId }) => {
    set({ loading: true, error: null });

    Promise.all([getProject({ workspaceId, projectId }), getEntities({ workspaceId, projectId })])
      .then(([project, entities]) => {
        set({ project, entities });
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        set({
          error: {
            type: "fetch-data",
          },
        });
      })
      .finally(() => {
        set({ loading: false });
      });
  },

  createNewProperty: async ({ type, workspaceId, projectId }) => {
    try {
      const newProperty = await createProperty({
        workspaceId,
        projectId,
        type,
      });

      set((state) => ({
        project: state.project
          ? { ...state.project, properties: [...state.project.properties, newProperty] }
          : null,
      }));

      return newProperty;
    } catch (error) {
      console.error("Failed to create property:", error);

      set({
        error: {
          type: "create-property",
        },
      });
      throw error;
    }
  },

  updateExistingProperty: async ({ propertyId, payload, workspaceId, projectId }) => {
    try {
      const updatedProperty = await updateProperty({
        workspaceId,
        projectId,
        propertyId,
        payload,
      });

      set((state) => ({
        project: state.project
          ? {
              ...state.project,
              properties: state.project.properties.map((property) =>
                property.id === propertyId ? updatedProperty : property,
              ),
            }
          : null,
      }));

      return updatedProperty;
    } catch (error) {
      console.error("Failed to update property:", error);
      set({ error: { type: "update-property" } });
      throw error;
    }
  },

  deleteExistingProperty: async ({ propertyId, workspaceId, projectId }) => {
    try {
      await deleteProperty({ workspaceId, projectId, propertyId });

      set((state) => ({
        project: state.project
          ? {
              ...state.project,
              properties: state.project.properties.filter((p) => p.id !== propertyId),
            }
          : null,
      }));
    } catch (error) {
      console.error("Failed to delete property:", error);
      set({ error: { type: "delete-property" } });
      throw error;
    }
  },

  resetError: () => {
    set({
      error: null,
    });
  },
}));
