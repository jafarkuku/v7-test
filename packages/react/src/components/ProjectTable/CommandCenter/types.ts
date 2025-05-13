export type Command = {
    id: string;
    label: string;
    description?: string;
    action: () => Promise<void> | void;
  };