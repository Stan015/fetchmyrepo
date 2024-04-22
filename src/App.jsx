import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RepositoryList from "./components/RepositoryList";
import RepositoryDetails from "./components/RepositoryDetails";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryUI from "./components/ErrorBoundaryUI";
import NotFound from "./components/NotFound";
import CreateRepository from "./components/CreateRepository";
import UserGitHubProfile from "./components/UserGitHubProfile";

const consoleErrorBoundary = (error) => {
  console.log(`Error caught by Error Boundary: ${error}`);
};

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path={"/"}
            element={
              <ErrorBoundary
                FallbackComponent={ErrorBoundaryUI}
                onError={consoleErrorBoundary}
              >
                <UserGitHubProfile />
                <RepositoryList />
              </ErrorBoundary>
            }
          />
          <Route
            path="/repositories/"
            element={
              <ErrorBoundary
                FallbackComponent={ErrorBoundaryUI}
                onError={consoleErrorBoundary}
              >
                <UserGitHubProfile />
                <RepositoryList />
              </ErrorBoundary>
            }
          />
          <Route
            path="/repositories/new"
            element={
              <ErrorBoundary
                FallbackComponent={ErrorBoundaryUI}
                onError={consoleErrorBoundary}
              >
                <CreateRepository />
              </ErrorBoundary>
            }
          />
          <Route
            path="/repositories/:repoName"
            element={
              <ErrorBoundary
                FallbackComponent={ErrorBoundaryUI}
                onError={consoleErrorBoundary}
              >
                <RepositoryDetails />
              </ErrorBoundary>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
