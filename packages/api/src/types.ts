import type { components } from "./api";

export type Entity = components["schemas"]["Projects.Entities.EntityResponse"];
export type Project = components["schemas"]["Projects.ProjectResponse"];
export type Property = components["schemas"]["Projects.PropertyResponse"];
export type AddPropertyRequest =
  components["schemas"]["Projects.AddPropertyRequest"];
export type AddBasicPropertyRequest =
  components["schemas"]["Projects.AddBasicPropertyRequest"];
export type AddPDFPropertyRequest =
  components["schemas"]["Projects.AddPDFPropertyRequest"];
export type AddSingleSelectPropertyRequest =
  components["schemas"]["Projects.AddSingleSelectPropertyRequest"];
export type BasicPropertyType =
  components["schemas"]["Projects.BasicPropertyType"];
export type UpdatePropertyRequest =
  components["schemas"]["Projects.UpdatePropertyRequest"];
export type UpdateBasicPropertyRequest =
  components["schemas"]["Projects.UpdateBasicPropertyRequest"];
export type UpdatePDFPropertyRequest =
  components["schemas"]["Projects.UpdatePDFPropertyRequest"];
export type UpdateSingleSelectPropertyRequest =
  components["schemas"]["Projects.UpdateSingleSelectPropertyRequest"];
export type PropertyType =
  components["schemas"]["Projects.Common.PropertyType"];

export type DeleteResponse = components["schemas"]["Common.DeleteResponse"];
