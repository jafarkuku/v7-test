import { Entity, Property, PropertyType } from "@v7-product-interview-task/api";

export type PropertyTool = Property["tool"] | "gpt_4_1" | "gemini_2_0_flash";

type Provider = "OpenAI" | "Google" | "Anthropic" | "Other";

type ToolInfo = {
  label: string;
  provider: Provider;
  icon: "gpt" | "gemini" | "claude" | "custom";
  variant?: string;
  rateLimited?: boolean;
  new?: boolean;
  acceptsInput?: boolean;
  acceptsPrompt?: boolean;
};

export const PROPERTY_TOOL_METADATA: Record<PropertyTool, ToolInfo> = {
  manual: {
    label: "User input",
    provider: "Other",
    icon: "custom",
    acceptsInput: false,
  },
  code: {
    label: "Python tool",
    provider: "Other",
    icon: "custom",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  ocr: {
    label: "OCR",
    provider: "Other",
    icon: "custom",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  web_search: {
    label: "Web Search",
    provider: "Other",
    icon: "custom",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  gpt_4o_mini: {
    label: "GPT 4o Mini",
    provider: "OpenAI",
    icon: "gpt",
    acceptsInput: true,
    acceptsPrompt: true,
    rateLimited: true,
  },
  gemini_1_5_pro: {
    label: "Gemini 1.5 Pro",
    provider: "Google",
    icon: "gemini",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  claude_3_5_sonnet: {
    label: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    icon: "claude",
    new: true,
    acceptsInput: true,
    acceptsPrompt: true,
  },
  claude_3_5_haiku: {
    label: "Claude 3.5 Haiku",
    provider: "Anthropic",
    icon: "claude",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  whisper: {
    label: "Whisper",
    provider: "OpenAI",
    icon: "gpt",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  bing_search: {
    label: "Bing Search",
    provider: "Other",
    icon: "custom",
    acceptsInput: true,
    acceptsPrompt: true,
  },

  url_scrape: {
    label: "URL Scrape",
    provider: "Other",
    icon: "custom",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  http: {
    label: "HTTP",
    provider: "Other",
    icon: "custom",
    acceptsInput: true,
    acceptsPrompt: true,
  },

  aws_ocr: {
    label: "AWS OCR",
    provider: "Other",
    icon: "custom",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  gpt_4: {
    label: "GPT 4",
    provider: "OpenAI",
    icon: "gpt",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  gpt_4_1: {
    label: "GPT 4.1",
    provider: "OpenAI",
    icon: "gpt",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  gpt_4o: {
    label: "GPT 4o",
    provider: "OpenAI",
    icon: "gpt",
    acceptsInput: true,
    acceptsPrompt: true,
    new: true,
  },
  gpt_3_5: {
    label: "GPT 3.5",
    provider: "OpenAI",
    icon: "gpt",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  gpt_4o_azure: {
    label: "GPT 4o (Azure)",
    provider: "OpenAI",
    icon: "gpt",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  gpt_3_5_azure: {
    label: "GPT 3.5 (Azure)",
    provider: "OpenAI",
    icon: "gpt",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  o1: {
    label: "o1",
    provider: "OpenAI",
    icon: "gpt",
    acceptsInput: true,
    acceptsPrompt: true,
    rateLimited: true,
  },
  o1_mini: {
    label: "o1 Mini",
    provider: "OpenAI",
    icon: "gpt",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  go: {
    label: "go",
    provider: "OpenAI",
    icon: "gpt",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  gemini_pro: {
    label: "Gemini Pro",
    provider: "Google",
    icon: "gemini",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  gemini_2_0_flash: {
    label: "Gemini 2.0 Flash",
    provider: "Google",
    icon: "gemini",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  gemini_1_5_flash: {
    label: "Gemini 1.5 Flash",
    provider: "Google",
    icon: "gemini",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  gemini_pro_vision: {
    label: "Gemini Vision",
    provider: "Google",
    icon: "gemini",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  claude_3_opus: {
    label: "Claude 3 Opus",
    provider: "Anthropic",
    icon: "claude",
    acceptsInput: true,
    acceptsPrompt: true,
  },

  claude_3_sonnet: {
    label: "Claude 3 Sonnet",
    provider: "Anthropic",
    icon: "claude",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  claude_3_haiku: {
    label: "Claude 3 Haiku",
    provider: "Anthropic",
    icon: "claude",
    acceptsInput: true,
    acceptsPrompt: true,
  },

  claude_3_5_sonnet_vertex_ai: {
    label: "Claude 3.5 Sonnet (Vertex)",
    provider: "Anthropic",
    icon: "claude",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  claude_3_sonnet_vertex_ai: {
    label: "Claude 3 Sonnet (Vertex)",
    provider: "Anthropic",
    icon: "claude",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  claude_3_haiku_vertex_ai: {
    label: "Claude 3 Haiku (Vertex)",
    provider: "Anthropic",
    icon: "claude",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  claude_3_5_haiku_vertex_ai: {
    label: "Claude 3.5 Haiku (Vertex)",
    provider: "Anthropic",
    icon: "claude",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  claude_3_opus_vertex_ai: {
    label: "Claude 3 Opus (Vertex)",
    provider: "Anthropic",
    icon: "claude",
    acceptsInput: true,
    acceptsPrompt: true,
  },

  imagen: {
    label: "Imagen",
    provider: "Google",
    icon: "gemini",
    acceptsInput: true,
    acceptsPrompt: true,
  },
  dall_e_3: {
    label: "DALL·E 3",
    provider: "OpenAI",
    icon: "gpt",
    acceptsInput: true,
    acceptsPrompt: true,
  },
};

export const PROPERTY_TYPES: Record<PropertyType, string> = {
  text: "Text",
  pdf: "PDF",
  single_select: "Single Select",
  multi_select: "Multi Select",
  user_select: "User Select",
  collection: "Collection",
  file_collection: "File Collection",
  reference: "Reference",
  file: "File",
  json: "JSON",
  url: "URL",
};

export const ENTITY_FIELD_STATUS_LABELS: Record<Entity["fields"][string]["status"], string> = {
  idle: "Waiting for configuration",
  uploading: "Uploading",
  waiting: "Waiting for configuration",
  computing: "Calculating",
  complete: "Complete",
  error: "Error",
  skip: "Skipped",
};
