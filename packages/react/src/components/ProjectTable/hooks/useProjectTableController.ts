import { useEffect, useMemo, useState } from "react";

import { Property } from "@v7-product-interview-task/api";

import { useProject } from "@/hooks/useProject";

import type { RowData } from "../types";
import { buildRows } from "../utils";

export function useProjectTableController() {
  const { project, entities, error, handleFetchData } = useProject();

  const [propertyModal, setPropertyModal] = useState<{
    open: boolean;
    property?: Property;
  }>({ open: false });

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  const headerCells = useMemo(() => {
    return (project?.properties || []).map((property, index) => ({
      key: property.id,
      property,
      colIndex: index,
      onClick: () => {
        setPropertyModal({ open: true, property });
      },
    }));
  }, [project]);

  // I've memoized the `rows` array to avoid recalculating it on every render unless its dependencies change.
  // Each row represents an entity and contains:
  // - `key`: used as the React key for stable identity
  // - `index`: the visual row number (1-based)
  // - `link`: used to navigate to the entity detail page
  // - `cells`: each cell represents a property value for that entity
  //
  // Inside each cell object, we precompute:
  // - `initialValue`: a flattened display string derived from either tool_value, manual_value, or a status label fallback
  // - `onSave`: a stable callback to handle saving changes from that specific cell
  //
  // Precomputing `onSave` inside this memo block is important: it ensures that each ProjectTableCell receives a stable
  // function reference between renders, which prevents unnecessary re-renders caused by changing function identities.
  //
  // Without this structure, even memoized cells would re-render because the `onSave` function would be regenerated
  // inline on every render. This approach makes rendering hundreds of cells more efficient.
  const rows = useMemo<RowData[]>(() => {
    return project
      ? buildRows({
          entities,
          properties: project.properties,
          workspaceId: project.workspace_id,
          projectId: project.id,
        })
      : [];
  }, [project, entities]);

  const openPropertyModal = () => setPropertyModal({ open: true });
  const closePropertyModal = () => setPropertyModal({ open: false });
  const onCreateProperty = (property: Property) => setPropertyModal({ open: true, property });

  return {
    headerCells,
    error,
    rows,
    propertyModal,
    openPropertyModal,
    closePropertyModal,
    onCreateProperty,
  };
}
