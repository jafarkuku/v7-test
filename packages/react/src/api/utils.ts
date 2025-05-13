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
  const base: Pick<AddPropertyRequest, "name" | "tool" | "description" | "inputs"> = {
    name: "New Property",
    tool: "gpt_4_1" as AddPropertyRequest["tool"],
    description: "",
    inputs: [],
  };

  switch (type) {
    case "pdf":
      return {
        ...base,
        type,
        config: {
          splitter: "none",
        },
      };

    case "reference":
      return {
        ...base,
        type,
        config: {
          project_id: projectId,
          entity_limit: 0,
        },
      };
    case "collection":
    case "file_collection":
      return {
        ...base,
        type,
      };

    case "single_select":
    case "multi_select":
    case "user_select":
      return {
        ...base,
        type,
        config: {},
      };

    default:
      return {
        ...base,
        type,
      };
  }
};

type UpdateRequestBase = {
  name: string;
  tool: PropertyTool;
  description: string | null;
};

type BuildArgs =
  | (UpdateRequestBase & { type: "pdf" })
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
    case "pdf":
      return {
        ...base,
        type: args.type,
        config: {
          splitter: "none",
        },
      };

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
    case "user_select":
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
      };
  }
}
