import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Helmet } from "react-helmet-async";
// import { Link } from "react-router-dom";

const handleRefresh = () => {
  window.location.reload();
};

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const handleComponentError = (error, info) => {
      console.error("Error caught by ErrorBoundary:", error, info);
      setHasError(true);
    };
  
    const handlePromiseRejection = (event) => {
      console.error("Unhandled promise rejection caught by ErrorBoundary:", event.reason);
      setHasError(true);
    };
  
    window.addEventListener("error", handleComponentError);
    window.addEventListener("unhandledrejection", handlePromiseRejection);
  
    return () => {
      window.removeEventListener("error", handleComponentError);
      window.removeEventListener("unhandledrejection", handlePromiseRejection);
    };
  }, []);  


  if (hasError) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center">
        <Helmet>
          <title>Error Boundary: something went wrong.</title>
          <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        </Helmet>
        <img
          className="p-4 w-2/5 max-md:w-5/6 max-sm:w-full"
          src="../error.svg"
          alt="something went wrong"
        />
        <h1 className="text-2xl leading-10 font-bold mb-4 uppercase max-sm:text-[1.2rem] w-full text-center">
          Something went wrong.
        </h1>
        <Button onClick={handleRefresh}>Refresh Page</Button>
      </div>
    );
  }

  return children;
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
