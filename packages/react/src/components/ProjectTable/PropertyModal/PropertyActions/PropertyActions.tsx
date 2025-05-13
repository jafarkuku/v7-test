import React from "react";

import { Property } from "@v7-product-interview-task/api";

import { Button } from "@/components/ui/Button/Button";
import { InputField } from "@/components/ui/Input/Input";
import { Text } from "@/components/ui/Text/Text";
import { PROPERTY_TOOL_METADATA, PROPERTY_TYPES } from "@/constants";

import { usePropertyActionsController } from "./hooks/usePropertyActionsController";
import { InputPromptEditor } from "./InputPromptEditor";
import { ToolSelector } from "./ToolSelector";

export interface PropertyActionsProps {
  property: Property;
  onCloseModal: () => void;
}

export const PropertyActions: React.FC<PropertyActionsProps> = ({ property, onCloseModal }) => {
  const { state, dispatch, handleUpdateProperty, handleDeleteProperty } =
    usePropertyActionsController(property, onCloseModal);

  return (
    <div data-testid="property-actions" className="bg-[#1a1a1a] rounded-lg">
      <div className="mb-4">
        <InputField
          placeholder="Property name"
          value={state.name}
          onChange={(e) => dispatch({ type: "setName", name: e.target.value })}
        />
      </div>

      <div className="flex justify-between mb-4">
        <Text className="text-gray-400">Type</Text>
        <Text className="text-gray-400">{PROPERTY_TYPES[property.type]}</Text>
      </div>

      <ToolSelector
        tool={state.tool}
        onChange={(tool) => dispatch({ type: "setTool", tool: tool as Property["tool"] })}
      />

      {PROPERTY_TOOL_METADATA[state.tool].acceptsInput && (
        <InputPromptEditor
          value={state.inputPrompt}
          isPromptOpen={!!PROPERTY_TOOL_METADATA[state.tool].acceptsPrompt}
          onToggle={() => dispatch({ type: "toggleSelector" })}
          onChange={(val) => dispatch({ type: "setPrompt", prompt: val })}
        />
      )}

      <div className="flex justify-end gap-4">
        <Button onClick={handleDeleteProperty} variant="ghost">
          Delete
        </Button>
        <Button onClick={handleUpdateProperty} variant="primary">
          Save
        </Button>
      </div>
    </div>
  );
};
