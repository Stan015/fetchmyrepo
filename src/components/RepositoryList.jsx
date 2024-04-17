import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  // const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();


  // get current page
  const page = parseInt(new URLSearchParams(location.search).get('page')) || 1;
  
  useEffect(() => {
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

        // get total pages
        const linkHeader = response.headers.get("Link");
        if (linkHeader) {
          const totalPagesMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (totalPagesMatch) {
            setTotalPages(parseInt(totalPagesMatch[1]));
          }
        }
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchRepositories();
  }, [reposPerPage, page]);

  const handlePrev = () => {
    const prevPage = page - 1;
    if (prevPage >= 1) {
      navigate(`/repositories?page=${prevPage}`);
    }
  };

  const handleNext = () => {
    const nextPage = page + 1;
    if (nextPage <= totalPages) {
      navigate(`/repositories?page=${nextPage}`);
    }
  };

  // useEffect(() => {
  //       // update URL
  //       navigate(`/repositories?page=${page}`)
  // }, [navigate, page])
  return (
    <div>
      <h2>My Repositories</h2>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            <Link to={`/repositories/${repo.name}?page=${page}`}>
              {repo.name}
            </Link>
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
