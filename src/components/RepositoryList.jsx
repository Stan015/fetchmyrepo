import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const RepositoryList = () => {
  const [repositories, setRepositories] = useState([]);
  const reposPerPage = 8;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch(`https://api.github.com/users/Stan015/repos?per_page=${reposPerPage}&page=${page}`)
    //   .then((response) => response.json())
    //   .then((data) => setRepositories(data))
    //   .catch((error) => console.error("Error fetching repositories:", error));

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/Stan015/repos?per_page=${reposPerPage}&page=${page}`,
          {
            headers: {
              Authorization: "token xyz",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data = await response.json();
        setRepositories(data);

        const linkHeader = response.headers.get("Link");
        if (linkHeader) {
          const totalPagesMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (totalPagesMatch) {
            setTotalPages(parseInt(totalPagesMatch[1]));
          }
        }

        navigate(`/repositories?page=${page}`)
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchRepositories();
  }, [reposPerPage, page, navigate]);

  const handlePrev = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <h2>My Repositories</h2>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            <Link to={`/repositories/${repo.name}?page=${page}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                page === 1 ? "pointer-events-none opacity-30" : undefined
              }
              onClick={handlePrev}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={
                page === totalPages
                  ? "pointer-events-none opacity-30"
                  : undefined
              }
              onClick={handleNext}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default RepositoryList;
