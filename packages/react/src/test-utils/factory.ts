import { Entity, Project, Property } from "@v7-product-interview-task/api";

export function createMockProperty(overrides: Partial<Property> = {}): Property {
  return {
    id: "property-01968ccf-d613-7e88-b382-7e88d31895ab",
    slug: "mock-slug",
    name: "Mock Property",
    type: "text",
    description: null,
    hash: "hash",
    input_ids: [],
    inputs: [],
    is_grounded: false,
    owner: "user",
    tool: "gpt_4",
    ...overrides,
  };
}

export const DEFAULT_ENTITY: Entity = {
  id: "01968367-1d36-7147-8e55-0b40978b7b1a",
  project_id: "01968367-1b1c-7ee0-a08a-48643b589b28",
  parent_entity_id: null,
  active_view_ids: ["01968367-1b29-7408-8d60-b781bd82a59c"],
  fields: {
    "cash-flow1": {
      created_at: "2025-05-01T17:05:53.165774Z",
      updated_at: "2025-05-01T17:07:22.028122Z",
      entity_id: "01968367-1d36-7147-8e55-0b40978b7b1a",
      error_message: null,
      ground_truth: false,
      indexing_error_message: null,
      indexing_status: "idle",
      manual_metadata: {},
      manual_value: {
        value: null,
        updated_by: null,
        raw_text: null,
      },
      property_hash: "66257449",
      property_id: "01968ccf-d613-7e88-b382-7e88d31895ab",
      property_type: "single_select",
      status: "complete",
      subproject_preview: null,
      tool_error_message: null,
      tool_metadata: {
        motivation:
          "Merlin Entertainments demonstrates consistently strong operating performance despite negative cash flow in the historical financials.",
        confidence: 0.98,
      },
      tool_status: "complete",
      tool_value: {
        value: ["Strong"],
        updated_by: "gpt_4_1",
        raw_text: "Strong",
      },
    },
    "company-year": {
      created_at: "2025-05-11T20:09:19.362956Z",
      updated_at: "2025-05-11T20:09:27.455767Z",
      entity_id: "01968367-1d36-7147-8e55-0b40978b7b1a",
      error_message: null,
      ground_truth: false,
      indexing_error_message: null,
      indexing_status: "idle",
      manual_metadata: {},
      manual_value: {
        has_grounding: false,
        updated_by: null,
        value: null,
      },
      property_hash: "73130597",
      property_id: "0196c0f7-5f09-7142-8dbc-3ec58edf0b80",
      property_type: "text",
      status: "complete",
      subproject_preview: null,
      tool_error_message: null,
      tool_metadata: {},
      tool_status: "complete",
      tool_value: {
        has_grounding: false,
        updated_by: "gpt_4_1",
        value: "1999",
      },
    },
    ebitda: {
      created_at: "2025-05-01T16:28:32.484939Z",
      updated_at: "2025-05-01T17:01:58.596421Z",
      entity_id: "01968367-1d36-7147-8e55-0b40978b7b1a",
      error_message: null,
      ground_truth: false,
      indexing_error_message: null,
      indexing_status: "idle",
      manual_metadata: {},
      manual_value: {
        has_grounding: false,
        updated_by: null,
        value: null,
      },
      property_hash: "120546509",
      property_id: "01968cad-a567-76f7-af4a-d8cd38fb7eba",
      property_type: "text",
      status: "complete",
      subproject_preview: null,
      tool_error_message: null,
      tool_metadata: {},
      tool_status: "complete",
      tool_value: {
        has_grounding: false,
        updated_by: "gpt_4_1",
        value: "£494 million (Underlying EBITDA for the year ended 29 December 2018)",
      },
    },
  },
};

export function createMockEntity({
  fields = {},
  overrides = {},
}: {
  fields?: Record<string, Entity["fields"][string]>;
  overrides?: Partial<Entity>;
} = {}): Entity {
  return {
    id: "entity-9e7d3ddd-c52c-49d0-b937-550b01104750",
    fields,
    project_id: "project-7d2321ba-9336-401b-bb71-f06a7f2bb70d",
    ...overrides,
  };
}

export function createMockProject(overrides: Partial<Project> = {}): Project {
  const now = new Date().toISOString();

  return {
    id: "project-7d2321ba-9336-401b-bb71-f06a7f2bb70d",
    name: "Mock Project",
    workspace_id: "workspace-9e7d3ddd-c52c-49d0-b937-550b01104750",
    main_view_id: null,
    parent_property: null,
    properties: [
      createMockProperty({ id: "prop-1", slug: "name", name: "Name" }),
      createMockProperty({ id: "prop-2", slug: "age", name: "Age" }),
    ],
    views: [],
    created_at: now,
    updated_at: now,
    cover_image_urls: {
      high: "https://example.com/high.jpg",
      low: "https://example.com/low.jpg",
    },
    ...overrides,
  };
}
