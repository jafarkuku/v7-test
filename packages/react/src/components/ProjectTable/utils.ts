import { Entity, Project } from "@v7-product-interview-task/api";

import { ENTITY_FIELD_STATUS_LABELS } from "@/constants";

export function buildRows({
  entities,
  properties,
  workspaceId,
  projectId,
  onSaveCell,
}: {
  entities: Entity[];
  properties: Project["properties"];
  workspaceId: string;
  projectId: string;
  onSaveCell?: (rowId: string, slug: string, value: string) => void;
}) {
  return entities.map((entity, rowIdx) => ({
    key: entity.id,
    index: rowIdx + 1,
    link: `/${workspaceId}/projects/${projectId}/entities/${entity.id}`,
    cells: properties.map((property, index) => {
      const field = entity.fields[property.slug];
      const initialValue =
        field?.tool_value?.value?.toString() ??
        field?.manual_value?.value?.toString() ??
        (field?.status ? ENTITY_FIELD_STATUS_LABELS[field.status] : "");

      const onSave = onSaveCell && ((val: string) => onSaveCell(entity.id, property.slug, val));

      return {
        key: property.id,
        initialValue,
        rowIndex: rowIdx,
        colIndex: index,
        onSave,
      };
    }),
  }));
}
