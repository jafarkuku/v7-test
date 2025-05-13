import { useParams } from "react-router";

import { ProjectContextType } from "./types";
import { ProjectContext } from "./useProjectContext";

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { workspaceId, projectId } = useParams() as {
    workspaceId: string;
    projectId: string;
  };

  const apiKey = import.meta.env.VITE_API_KEY;

  console.log("###### API", apiKey);

  if (!apiKey) {
    throw new Error("VITE_API_KEY is not set");
  }

  const value: ProjectContextType = {
    workspaceId,
    projectId,
    apiKey,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
