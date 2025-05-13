import { useMemo, useState } from "react";

import { Property } from "@v7-product-interview-task/api";

import { PROPERTY_TYPES } from "@/constants";
import { useProject } from "@/hooks/useProject";

export function usePropertyTypePickerController(
  onCreateProperty: (property: Property) => void,
  onError: () => void,
) {
  const [query, setQuery] = useState("");
  const { error, createProperty } = useProject();

  const propertyTypes = useMemo(() => {
    return (Object.entries(PROPERTY_TYPES) as [Property["type"], string][]).filter(([, label]) =>
      label.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }, [query]);

  const handleCreateProperty = (type: Property["type"]) => async () => {
    createProperty(type)
      .then((property) => {
        onCreateProperty(property);
      })
      .catch(onError);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return {
    query,
    error,
    propertyTypes,
    handleTextChange,
    handleCreateProperty,
  };
}
