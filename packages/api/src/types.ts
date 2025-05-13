import type { components } from "./api";

// Im omitting these in order to match what I see on the live platform
type OverridenPropertyType =
  | Exclude<
      components["schemas"]["Projects.PropertyResponse"]["type"],
      "pdf" | "user_select"
    >
  | "number";

export type Entity = components["schemas"]["Projects.Entities.EntityResponse"];
export type Property = Omit<
  components["schemas"]["Projects.PropertyResponse"],
  "type"
> & {
  type: OverridenPropertyType;
};
export type Project = Omit<
  components["schemas"]["Projects.ProjectResponse"],
  "properties"
> & {
  properties: Property[];
};

export type AddPropertyRequest = Omit<
  components["schemas"]["Projects.AddPropertyRequest"],
  "type"
> & {
  type: OverridenPropertyType;
};
export type UpdatePropertyRequest =
  components["schemas"]["Projects.UpdatePropertyRequest"];
export type UpdateBasicPropertyRequest = Omit<
  components["schemas"]["Projects.UpdateBasicPropertyRequest"],
  "type"
> & {
  type: OverridenPropertyType;
};

export type DeleteResponse = components["schemas"]["Common.DeleteResponse"];
