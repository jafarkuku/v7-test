import { Entity, Project, Property } from "@v7-product-interview-task/api";

import { ENTITY_FIELD_STATUS_LABELS } from "@/constants";

import { RowData } from "./types";

function getFieldInitialValue(field: Entity["fields"][string]): string {
  if (!field) {
    return "";
  }

  if (field.property_type === ("number" as Property["type"])) {
    //@ts-expect-error I can see this value in the response
    return field.tool_value?.value?.number;
  }

  if (field.property_type === "file") {
    //@ts-expect-error I can see this value in the response
    return field.manual_value?.original_filename;
  }

  return (
    field.tool_value?.value?.toString() ??
    field.manual_value?.value?.toString() ??
    ENTITY_FIELD_STATUS_LABELS[field.status]
  );
}

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
}): RowData[] {
  return entities.map((entity, rowIdx) => ({
    key: entity.id,
    index: rowIdx + 1,
    link: `/${workspaceId}/projects/${projectId}/entities/${entity.id}`,
    cells: properties.map((property, index) => {
      const field = entity.fields[property.slug];
      const initialValue = getFieldInitialValue(field);

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
