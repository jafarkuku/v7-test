import { memo } from "react";

import { Property } from "@v7-product-interview-task/api";

type Props = {
  property: Property;
  colIndex: number;
  onClick: () => void;
};

const ProjectTableHeaderCellComponent = ({ property, colIndex, onClick }: Props) => {
  return (
    <th
      className={"min-w-[180px] border-r border-gray-700 cursor-pointer hover:bg-gray-800"}
      role="columnheader"
      aria-rowindex={1}
      aria-colindex={colIndex + 1}
      tabIndex={0}
      onClick={onClick}
    >
      {property.name}
    </th>
  );
};

export const ProjectTableHeaderCell = memo(ProjectTableHeaderCellComponent);
