import "./assets/main.css";
import { BrowserRouter, Route, Routes } from "react-router";

import { EntityView } from "./components/EntityView";
import { FallbackPage } from "./components/FallbackPage";
import { ProjectTable } from "./components/ProjectTable/ProjectTable";
import { ProjectProvider } from "./contexts/Project/ProjectProvider";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:workspaceId/projects/:projectId">
          {/* Table view (index route) */}
          <Route
            index
            element={
              <ProjectProvider>
                <ProjectTable />
              </ProjectProvider>
            }
          />

          {/* Entity view */}
          <Route
            path="entities/:entityId"
            element={
              <ProjectProvider>
                <EntityView />
              </ProjectProvider>
            }
          />
        </Route>
        {/* Fallback route */}
        <Route path="*" element={<FallbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
