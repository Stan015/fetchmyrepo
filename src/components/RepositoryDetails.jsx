import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const RepositoryDetails = () => {
  const { repoName } = useParams();
  const [repository, setRepository] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchClickedRepo = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/Stan015/${repoName}`,
        {
          headers: {
            Authorization: "token xyz",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch repository details");
        }
        const data = await response.json();
        setRepository(data);
      } catch (error) {
        console.error("Error fetching repository details:", error);
      }
    };

    fetchClickedRepo();
  }, [repoName]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get("page");
    setCurrentPage(page);
    console.log(page);
  }, []);

  if (!repository) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{repository.name}</h2>
      <p>{repository.description}</p>
      <p>Language: {repository.language}</p>
      <p>Stars: {repository.stargazers_count}</p>
      <Link to={`/repositories?page=${currentPage}`}>
        Go back to Repository List
      </Link>
    </div>
  );
};

export default RepositoryDetails;
