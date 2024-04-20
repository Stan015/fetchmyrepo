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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import RepositoryListSkeleton from "./skeletons/RepositoryListSkeleton";
// import { Button } from "./ui/button";

const RepositoryList = () => {
  const [repositories, setRepositories] = useState([]);
  const [reposPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  // const [noRepoName, setNoRepoName] = useState(false)
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // get current page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const _page = parseInt(params.get("page")) || 1;
    setPage(_page);
  }, [location.search]);
  //

  // fetch repositories
  useEffect(() => {
    const fetchRepositories = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.github.com/users/Stan015/repos`,
          {
            headers: {
              Authorization: `token ${
                import.meta.env.VITE_REACT_APP_GITHUB_TOKEN
              }`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data = await response.json();
        setRepositories(data);

        setTotalPages(Math.ceil(data.length / reposPerPage));
      } catch (error) {
        setError(error.message);
        // console.error("Error fetching repositories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [reposPerPage]);

  if (loading) {
    return <RepositoryListSkeleton />;
  }

  if (error) {
    throw new Error(error)
  }

  // console.log(repositories);

  const handlePrev = () => {
    const prevPageNumber = Math.max(page - 1, 1);
    navigate(`/repositories?page=${prevPageNumber}`);
  };

  const handleNext = () => {
    const nextPage = Math.min(page + 1, totalPages);
    navigate(`/repositories?page=${nextPage}`);
  };

  const getCurrentPageFromURL = () => {
    const params = new URLSearchParams(location.search);
    return parseInt(params.get("page")) || 1;
  };

  const currentPage = getCurrentPageFromURL();

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchQuery(searchValue);

    if (searchValue === "") {
      navigate(`/repositories?page=${currentPage}`);
      setPage(currentPage);
    } else {
      setPage(1);
    }
  };

  const startIndex = (page - 1) * reposPerPage;
  const endIndex = page * reposPerPage;

  const filteredRepositories = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedRepositories = filteredRepositories.slice(
    startIndex,
    endIndex
  );

  return (
    <div className="flex flex-col w-full items-center min-h-full gap-6 pt-10">
      <div className="flex gap-2 w-full items-center max-md:w-4/5 max-lg:w-3/5 lg:w-3/6">
        <Input
          type="search"
          placeholder="Search repo by name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {/* <Button>
          <Link className="w-full h-full" to={'/repositories/new'}>Create New Repo</Link>
        </Button> */}
      </div>
      <Card className="flex flex-col items-center max-md:w-4/5 max-lg:w-3/5 lg:w-3/6">
        <CardHeader className="mb-4">
          {/* {error && <div>Error: {error}</div>} */}
          <CardTitle className="text-3xl text-center mb-2 max-sm:text-2xl uppercase">
            My Repositories
          </CardTitle>
          <CardDescription className="text-center text-base">
            This is a list of my github repositories, click on any to view
            project details.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full w-full">
          {/* {noRepoName && <p>No Repository with this name.</p>} */}
          <ul className="flex flex-col w-full items-center text-center gap-4 h-full">
            {displayedRepositories.map((repo) => (
              <li
                key={repo.id}
                className="leading-10 border-border border-2 rounded-sm p-1 w-full text-lg transition-all hover:bg-violet-700"
              >
                <Link
                  className="block w-full h-full"
                  to={`/repositories/${repo.name}?page=${page}`}
                >
                  {repo.name}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={
                    page === 1
                      ? "pointer-events-none bg-violet-500 p-2 pr-4 opacity-30 transition-all"
                      : "bg-violet-600 p-2 pr-4 hover:bg-violet-700 transition-all cursor-pointer"
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
                      ? "pointer-events-none bg-violet-500 p-2 pl-4 opacity-30 transition-all"
                      : "bg-violet-600 p-2 pl-4 hover:bg-violet-700 transition-all cursor-pointer"
                  }
                  onClick={handleNext}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
      <footer className="flex w-full h-[7rem] items-center justify-around gap-4 mt-4 border-t-[1px] border-t-slate-800 p-2">
        <p className="text-center max-sm:w-1/2 max-sm:text-sm">{`"Everyone's got a blank page and a pen 🖊️"`}</p>
        <span className="text-center max-sm:w-1/2 max-sm:text-sm">
          &copy;{` Stanley Azi ${new Date().getFullYear()}`}
        </span>
      </footer>
    </div>
  );
};

export default RepositoryList;
