import clsx from "clsx";

type CommandItemProps = {
  label: string;
  description?: string;
  isSelected: boolean;
  onClick: () => void;
};

export const CommandItem: React.FC<CommandItemProps> = ({
  label,
  description,
  isSelected,
  onClick,
}) => {
  return (
    <div
      id={`command-${label}`}
      role="option"
      aria-selected={isSelected}
      onClick={onClick}
      className={clsx(
        isSelected && "bg-[#333]",
        "p-2 cursor-pointer text-white hover:bg-gray-800 flex flex-col",
      )}
    >
      <label data-testid="command-label" className="font-bold">
        {label}
      </label>
      {description && <span className="text-sm text-gray-400 mt-1">{description}</span>}
    </div>
  );
};
