import React, { useRef, useState } from "react";

import { InputField } from "../ui/Input/Input";

export interface ProjectTableCellProps {
  initialValue?: string;
  rowIndex: number;
  colIndex: number;
  onSave?: (newValue: string) => void;
}

/**
 * ProjectTableCell is memoized using React.memo to avoid unnecessary re-renders.
 *
 * Instead of passing the entire `field` object from the entity, we now pass only the specific,
 * primitive props that the cell actually depends on: `initialValue`.
 *
 * This has several advantages:
 * - It allows React.memo to do a shallow comparison, which is more performant and removes the
 *   need for a custom comparison function.
 * - It reduces the component's coupling to the shape of the underlying data, making it easier to
 *   reuse and test.
 * - It avoids unnecessary renders when the table component recreates the `field` object,
 *   even when its values haven't actually changed.
 *
 * This optimization is particularly important here because tables can contain hundreds of cells,
 * and reducing re-renders has a significant impact on UI responsiveness and performance.
 */
const ProjectTableCellComponent: React.FC<ProjectTableCellProps> = ({
  initialValue = "",
  rowIndex,
  colIndex,
  onSave,
}) => {
  const cellRef = useRef<HTMLTableCellElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleBlur = () => {
    setIsEditing(false);

    if (onSave && value !== initialValue) {
      onSave(value);
    }
  };

  return (
    <td
      ref={cellRef}
      role="gridcell"
      aria-rowindex={rowIndex + 1}
      aria-colindex={colIndex + 1}
      tabIndex={0}
      className="relative min-w-[180px] max-w-[240px] w-[240px] h-[30px] border border-gray-700 text-sm text-white bg-[#1a1a1a] hover:bg-[#2a2a2a] cursor-pointer overflow-visible"
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <div className="absolute top-0 left-0 z-50 w-150 max-h-auto">
          <InputField
            multiline
            className="bg-[#1a1a1a] text-white outline-none text-sm"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            autoFocus
          />
        </div>
      ) : (
        <div className="px-3 whitespace-nowrap overflow-hidden text-ellipsis leading-[30px] h-[30px]">
          <span className="text-white">{value}</span>
        </div>
      )}
    </td>
  );
};

export const ProjectTableCell = React.memo(ProjectTableCellComponent);
