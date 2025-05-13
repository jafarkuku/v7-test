import {
  Type,
  Hash,
  File,
  Database,
  CheckCircle,
  CheckSquare,
  Link as LinkIcon,
  ArrowUpRight,
  Code,
  LucideIcon,
} from "lucide-react";

import { Property } from "@v7-product-interview-task/api";

import { InputField } from "@/components/ui/Input/Input";
import List from "@/components/ui/List/List";

import { usePropertyTypePickerController } from "./hooks/usePropertyTypePickerController";

const ICONS: Record<Property["type"], LucideIcon> = {
  text: Type,
  number: Hash,
  file: File,
  json: Code,
  url: LinkIcon,
  collection: Database,
  single_select: CheckCircle,
  multi_select: CheckSquare,
  reference: ArrowUpRight,
  file_collection: File,
};

export interface PropertyTypePickerProps {
  onCreateProperty: (property: Property) => void;
  onError: () => void;
}

export const PropertyTypePicker: React.FC<PropertyTypePickerProps> = ({
  onCreateProperty,
  onError,
}) => {
  const { query, propertyTypes, handleCreateProperty, handleTextChange } =
    usePropertyTypePickerController(onCreateProperty, onError);

  return (
    <div
      data-testid="property-type-picker"
      aria-label="Property type picker"
      className="flex flex-col gap-3"
    >
      <InputField
        autoFocus
        placeholder="Search"
        value={query}
        onChange={handleTextChange}
        className="mb-2"
      />

      <List
        items={propertyTypes}
        className="max-h-80 overflow-auto"
        renderItem={([type, label]) => {
          const Icon = ICONS[type as Property["type"]];
          return (
            <div
              role="option"
              onClick={handleCreateProperty(type)}
              className="flex items-center gap-3 px-4 py-2 text-gray-200 hover:bg-gray-800 cursor-pointer"
            >
              <Icon className="w-5 h-5 text-gray-400" />
              <span className="flex-1">{label}</span>
            </div>
          );
        }}
      />
    </div>
  );
};
