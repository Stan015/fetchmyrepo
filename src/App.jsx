import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RepositoryList from "./components/RepositoryList";
import RepositoryDetails from "./components/RepositoryDetails";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <ErrorBoundary>
                  <RepositoryList />
                </ErrorBoundary>
              }
            />
            <Route
              path="/repositories/"
              element={
                <ErrorBoundary>
                  <RepositoryList />
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
        </div>
      </Router>
    </>
  );
};

export default App;
