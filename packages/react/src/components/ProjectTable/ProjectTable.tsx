import { Link } from "react-router-dom";

import { CommandCenter } from "./CommandCenter/CommandCenter";
import { useProjectTableController } from "./hooks/useProjectTableController";
import { ProjectTableCell } from "./ProjectTableCell";
import { ProjectTableHeaderCell } from "./ProjectTableHeaderCell";
import { PropertyModal } from "./PropertyModal";
import { Error } from "../Error/Error";

interface ProjectTableProps {
  onSaveCell?: (entityId: string, slug: string, newValue: string) => void;
}

export const ProjectTable: React.FC<ProjectTableProps> = () => {
  const {
    headerCells,
    error,
    rows,
    propertyModal,
    openPropertyModal,
    closePropertyModal,
    onCreateProperty,
  } = useProjectTableController();

  return (
    <div>
      {error && <Error />}
      <CommandCenter onCreatePorperty={openPropertyModal} />
      <PropertyModal
        open={propertyModal.open}
        property={propertyModal.property}
        onCreateProperty={onCreateProperty}
        onClose={closePropertyModal}
      />
      <table className="w-full text-sm text-white border-separate border-spacing-0" role="grid">
        <thead className="bg-[#1a1a1a] text-gray-400 border-b border-gray-700">
          <tr role="row">
            <th className="w-10 p-2 font-medium text-gray-500 bg-[#1a1a1a] sticky left-0 z-20">
              #
            </th>
            {headerCells.map((cell) => (
              <ProjectTableHeaderCell
                key={cell.key}
                property={cell.property}
                colIndex={cell.colIndex}
                onClick={cell.onClick}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className="border-b border-gray-800" role="row">
              <td
                role="gridcell"
                className="p-2 text-center text-gray-400 bg-[#1a1a1a] sticky left-0 z-10"
              >
                <Link to={row.link}>{row.index}</Link>
              </td>
              {row.cells.map((cell) => (
                <ProjectTableCell {...cell} key={cell.key} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
