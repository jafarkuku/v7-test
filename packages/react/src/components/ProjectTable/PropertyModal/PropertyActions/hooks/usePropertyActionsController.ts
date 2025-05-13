import { useCallback, useReducer } from "react";

import { Property } from "@v7-product-interview-task/api";

import { buildUpdatePropertyRequest } from "@/api/utils";
import { PropertyTool } from "@/constants";
import { useProject } from "@/hooks/useProject";

export type FormState = {
  name: Property["name"];
  tool: PropertyTool;
  inputPrompt: string;
  inputSelectorOpen: boolean;
};

type FormAction =
  | { type: "setName"; name: string }
  | { type: "setTool"; tool: PropertyTool }
  | { type: "setPrompt"; prompt: string }
  | { type: "toggleSelector" };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "setName":
      return {
        ...state,
        name: action.name,
      };
    case "setTool":
      return {
        ...state,
        tool: action.tool,
      };
    case "setPrompt":
      return {
        ...state,
        inputPrompt: action.prompt,
      };
    case "toggleSelector":
      return {
        ...state,
        inputSelectorOpen: !state.inputSelectorOpen,
      };
  }
}

export function usePropertyActionsController(property: Property, onCloseModal: () => void) {
  const [state, dispatch] = useReducer(formReducer, {
    name: property.name,
    tool: property.tool,
    inputPrompt: "",
    inputSelectorOpen: false,
  });

  const { updateProperty, deleteProperty } = useProject();

  const handleUpdateProperty = useCallback(() => {
    const payload = buildUpdatePropertyRequest({
      type: property.type,
      name: state.name,
      tool: state.tool as Property["tool"],
      description: property.description,
    });

    updateProperty(property.id, payload).then(onCloseModal).catch(onCloseModal);
  }, [property, state, updateProperty, onCloseModal]);

  const handleDeleteProperty = useCallback(() => {
    deleteProperty(property.id).then(onCloseModal).catch(onCloseModal);
  }, [property.id, deleteProperty, onCloseModal]);

  return {
    state,
    dispatch,
    handleUpdateProperty,
    handleDeleteProperty,
  };
}
