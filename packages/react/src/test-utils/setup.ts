import { vi } from "vitest";

import "@testing-library/jest-dom";

import { createMockEntity, createMockProject } from "./factory";

import.meta.env.VITE_API_KEY = "test-api-key";

vi.mock("@/hooks/useProject", () => ({
  useProject: () => ({
    loading: false,
    error: false,
    project: createMockProject(),
    entities: [
      createMockEntity({
        overrides: { id: "entity-1" },
        fields: {
          name: {
            created_at: "2025-01-01T00:00:00Z",
            updated_at: "2025-01-01T00:00:00Z",
            entity_id: "entity-1",
            property_id: "prop-1",
            property_type: "text",
            property_hash: "hash-1",
            tool_status: "complete",
            manual_metadata: {},
            tool_metadata: {},
            ground_truth: false,
            indexing_status: "idle",
            status: "complete",
            tool_value: {
              has_grounding: false,
              updated_by: "gpt_4_1",
              value: "Alice",
            },
            manual_value: {
              has_grounding: false,
              updated_by: null,
              value: null,
            },
            error_message: null,
            indexing_error_message: null,
            subproject_preview: null,
            tool_error_message: null,
          },
          age: {
            created_at: "2025-01-01T00:00:00Z",
            updated_at: "2025-01-01T00:00:00Z",
            entity_id: "entity-1",
            property_id: "prop-2",
            property_type: "text",
            property_hash: "hash-2",
            tool_status: "complete",
            manual_metadata: {},
            tool_metadata: {},
            ground_truth: false,
            indexing_status: "idle",
            status: "complete",
            tool_value: {
              has_grounding: false,
              updated_by: "gpt_4_1",
              value: "30",
            },
            manual_value: {
              has_grounding: false,
              updated_by: null,
              value: null,
            },
            error_message: null,
            indexing_error_message: null,
            subproject_preview: null,
            tool_error_message: null,
          },
        },
      }),
      createMockEntity({
        overrides: { id: "entity-2" },
        fields: {
          name: {
            ...createMockEntity().fields["name"],
            entity_id: "entity-2",
            property_id: "prop-1",
            tool_value: {
              has_grounding: false,
              updated_by: "gpt_4_1",
              value: "Bob",
            },
          },
          age: {
            ...createMockEntity().fields["age"],
            entity_id: "entity-2",
            property_id: "prop-2",
            tool_value: {
              has_grounding: false,
              updated_by: "gpt_4_1",
              value: "40",
            },
          },
        },
      }),
    ],
    selectedProperty: createMockProject().properties[0],
    createProperty: vi.fn(),
    updateProperty: vi.fn(),
    deleteProperty: vi.fn(),
    selectProperty: vi.fn(),
    handleFetchData: vi.fn(),
  }),
}));
