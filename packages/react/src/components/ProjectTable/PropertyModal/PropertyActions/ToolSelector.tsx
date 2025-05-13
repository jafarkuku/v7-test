import { PROPERTY_TOOL_METADATA, PropertyTool } from "@/constants";

interface ToolSelectorProps {
  tool: PropertyTool;
  onChange: (tool: string) => void;
}

export const ToolSelector: React.FC<ToolSelectorProps> = ({
  tool,
  onChange,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <label htmlFor="tool-select" className="text-gray-400 w-1/3">
        Tool
      </label>
      <select
        id="tool-select"
        aria-label="Tool selector"
        className="text-white bg-[#1a1a1a] border border-gray-600 rounded px-2 py-1 w-2/3"
        value={tool}
        onChange={(e) => onChange(e.target.value)}
      >
        {Object.entries(PROPERTY_TOOL_METADATA).map(([key, meta]) => (
          <option key={key} value={key} className="bg-black text-white">
            {meta.label} {meta.rateLimited ? "[Rate limited]" : ""}
          </option>
        ))}
      </select>
    </div>
  );
};
