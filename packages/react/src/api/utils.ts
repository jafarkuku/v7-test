import {
  AddPropertyRequest,
  Property,
  UpdatePropertyRequest,
} from "@v7-product-interview-task/api";

import { PropertyTool } from "@/constants";

export const getAddPropertyRequestBody = ({
  projectId,
  type,
}: {
  projectId: string;
  type: Property["type"];
}): AddPropertyRequest => {
  const base: Pick<AddPropertyRequest, "name" | "tool" | "description" | "inputs" | "is_grounded"> =
    {
      name: "New Property",
      tool: "gpt_4_1" as AddPropertyRequest["tool"],
      description: "",
      inputs: [],
      is_grounded: false,
    };

  switch (type) {
    case "file":
      return {
        ...base,
        type,
        tool: "manual",
      };
    case "number" as Property["type"]:
      return {
        ...base,
        type,
        config: {
          format: "auto",
        },
      } as AddPropertyRequest;
    case "reference":
      return {
        ...base,
        type,
        config: {
          project_id: projectId,
          entity_limit: 0,
        },
      } as AddPropertyRequest;
    case "collection":
      return {
        ...base,
        type,
        //@ts-expect-error expected
        config: {
          properties: [],
        },
      };
    case "url":
      return {
        ...base,
        type,
        tool: "manual",
      };
    case "single_select":
    case "multi_select":
      return {
        ...base,
        type,
        config: {
          options: [],
          default_option: null,
        },
      } as AddPropertyRequest;
    default:
      return {
        ...base,
        type,
      } as AddPropertyRequest;
  }
};

type UpdateRequestBase = {
  name: string;
  tool: PropertyTool;
  description: string | null;
};

type BuildArgs =
  | (UpdateRequestBase & { type: "number" })
  | (UpdateRequestBase & { type: "reference" })
  | (UpdateRequestBase & { type: "single_select" | "multi_select" | "user_select" })
  | (UpdateRequestBase & { type: "collection" | "file_collection" })
  | (UpdateRequestBase & { type: "text" | "file" | "json" | "url" });

export function buildUpdatePropertyRequest(
  args: BuildArgs & { projectId?: string },
): UpdatePropertyRequest {
  const base: Pick<UpdatePropertyRequest, "name" | "tool" | "description" | "inputs"> = {
    name: args.name,
    tool: args.tool as Property["tool"],
    description: args.description,
    inputs: [],
  };

  switch (args.type) {
    case "file":
      return {
        ...base,
        type: args.type,
      };
    case "number" as Property["type"]:
      return {
        ...base,
        type: args.type,
        config: {
          format: "auto",
        },
      } as UpdatePropertyRequest;
    case "reference":
      return {
        ...base,
        type: args.type,
        config: {
          project_id: args.projectId,
          entity_limit: 0,
        },
      };

    case "single_select":
    case "multi_select":
      return {
        ...base,
        type: args.type,
        config: {},
      };

    case "collection":
    case "file_collection":
      return {
        ...base,
        type: args.type,
      };

    default:
      return {
        ...base,
        type: args.type,
      } as UpdatePropertyRequest;
  }
}
