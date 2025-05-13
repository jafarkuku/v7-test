import { InputField } from "@/components/ui/Input/Input";
import List from "@/components/ui/List/List";

import { CommandItem } from "./CommandItem";
import { useCommandCenterController } from "./hooks/useCommandCenterController";
import { Modal } from "../../ui/Modal/Modal";

type CommandCenterProps = {
  onCreatePorperty: () => void;
};

export const CommandCenter: React.FC<CommandCenterProps> = ({ onCreatePorperty }) => {
  const { isOpen, query, selected, commands, handleTextChange, closeModal } =
    useCommandCenterController({
      onCreatePorperty,
    });

  return (
    <Modal testId="command-center" open={isOpen} onClose={closeModal} ariaLabel="Command Center">
      <div className="w-100">
        <h2 id="command-center-title" className="sr-only">
          Command Center
        </h2>

        <InputField
          autoFocus
          placeholder="Type a command..."
          value={query}
          onChange={handleTextChange}
          className="mb-2"
          role="combobox"
          aria-autocomplete="list"
          aria-activedescendant={`command-${commands[selected]?.label}`}
        />

        <List
          items={commands}
          className="list-none m-0 p-0 overflow-y-auto"
          itemClassName="text-white"
          renderItem={(item, i) => (
            <CommandItem
              key={item.label}
              {...item}
              isSelected={i === selected}
              onClick={item.action}
            />
          )}
        />
      </div>
    </Modal>
  );
};
