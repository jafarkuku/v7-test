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
