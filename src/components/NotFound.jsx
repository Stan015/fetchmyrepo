import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get("page");
    setCurrentPage(page);
  }, []);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <Helmet>
        <title>
          The page you are looking for is not found on this Github profile.
        </title>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </Helmet>
      <img
        className="p-4 w-2/5 max-md:w-5/6 max-sm:w-full"
        src="../404-page.svg"
        alt="404-Page not found"
      />
      <h1 className="text-2xl leading-10 font-bold mb-4">PAGE NOT FOUND</h1>
      <Button>
        <Link to={`/repositories?page=${currentPage}`}>Go Back</Link>
      </Button>
    </div>
  );
};

export default NotFound;
