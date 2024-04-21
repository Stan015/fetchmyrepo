import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RepositoryList from "./components/RepositoryList";
import RepositoryDetails from "./components/RepositoryDetails";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";
import CreateRepository from "./components/CreateRepository";
import UserGitHubProfile from "./components/UserGitHubProfile";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path={"/"}
            element={
              <>
                <ErrorBoundary>
                  <UserGitHubProfile />
                  <RepositoryList />
                </ErrorBoundary>
              </>
            }
          />
          <Route
            path="/repositories/"
            element={
              <>
                <ErrorBoundary>
                  <UserGitHubProfile />
                  <RepositoryList />
                </ErrorBoundary>
              </>
            }
          />
          <Route
            path="/repositories/new"
            element={
              <ErrorBoundary>
                <CreateRepository />
              </ErrorBoundary>
            }
          />
          <Route
            path="/repositories/:repoName"
            element={
              <ErrorBoundary>
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
