import type { Property } from "@v7-product-interview-task/api";

import { getAddPropertyRequestBody, buildUpdatePropertyRequest } from "../utils";

const baseArgs = {
  name: "Test",
  tool: "gpt_4_1" as Property["tool"],
  description: "Some description",
};

describe("getAddPropertyRequestBody", () => {
  const projectId = "proj123";

  it("returns correct body for reference type", () => {
    const result = getAddPropertyRequestBody({ projectId, type: "reference" });

    expect(result).toEqual({
      name: "New Property",
      tool: "gpt_4_1",
      description: "",
      inputs: [],
      type: "reference",
      is_grounded: false,
      config: {
        project_id: projectId,
        entity_limit: 0,
      },
    });
  });

  test.each([["single_select"], ["multi_select"]] as const)(
    "returns correct body for type %s",
    (type) => {
      const result = getAddPropertyRequestBody({ projectId, type });

      expect(result).toEqual({
        name: "New Property",
        tool: "gpt_4_1",
        description: "",
        inputs: [],
        type,
        is_grounded: false,
        config: {
          options: [],
          default_option: null,
        },
      });
    },
  );

  it("returns correct body for other types", () => {
    const result = getAddPropertyRequestBody({ projectId, type: "text" });

    expect(result).toEqual({
      name: "New Property",
      tool: "gpt_4_1",
      description: "",
      is_grounded: false,
      inputs: [],
      type: "text",
    });
  });
});

describe("buildUpdatePropertyRequest", () => {
  it("builds update request for reference", () => {
    const result = buildUpdatePropertyRequest({
      ...baseArgs,
      type: "reference",
      projectId: "ref-project",
    });

    expect(result).toEqual({
      ...baseArgs,
      inputs: [],
      type: "reference",
      config: {
        project_id: "ref-project",
        entity_limit: 0,
      },
    });
  });

  it("builds update request for select types", () => {
    const types = ["single_select", "multi_select"] as const;

    for (const type of types) {
      const result = buildUpdatePropertyRequest({
        ...baseArgs,
        type,
      });

      expect(result).toEqual({
        ...baseArgs,
        inputs: [],
        type,
        config: {},
      });
    }
  });

  it("builds update request for collection and file_collection", () => {
    const types = ["collection", "file_collection"] as const;

    for (const type of types) {
      const result = buildUpdatePropertyRequest({
        ...baseArgs,
        type,
      });

      expect(result).toEqual({
        ...baseArgs,
        inputs: [],
        type,
      });
    }
  });

  it("builds update request for fallback types", () => {
    const result = buildUpdatePropertyRequest({
      ...baseArgs,
      type: "text",
    });

    expect(result).toEqual({
      ...baseArgs,
      inputs: [],
      type: "text",
    });
  });
});
