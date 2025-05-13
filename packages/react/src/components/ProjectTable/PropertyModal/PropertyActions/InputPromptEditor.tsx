import { InputField } from "@/components/ui/Input/Input";

export interface InputPromptEditorProps {
  isPromptOpen: boolean;
  value: string;
  onToggle: () => void;
  onChange: (val: string) => void;
}

export const InputPromptEditor: React.FC<InputPromptEditorProps> = ({
  isPromptOpen,
  value,
  onToggle,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between cursor-pointer" onClick={onToggle}>
        <span className="text-gray-400">Inputs</span>
        <span className="text-sm text-gray-500">Select inputs</span>
      </div>

      {isPromptOpen && (
        <InputField
          placeholder="Set a prompt (Press @ to mention an input)"
          multiline
          className="w-full h-24 mt-2 bg-[#1a1a1a] text-white p-3 rounded border border-gray-700 outline-none resize-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};
