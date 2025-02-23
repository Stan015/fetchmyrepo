import { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
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

const RepositoryList = () => {
  const { showBoundary } = useErrorBoundary();
  const [repositories, setRepositories] = useState([]);
  const [filteredRepositories, setFilteredRepositories] = useState([]);
  const [reposPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  // const [noRepoName, setNoRepoName] = useState(false)
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
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

      try {
        const response = await fetch(
          `https://api.github.com/users/Stan015/repos`
          // {
          //   headers: {
          //     Authorization: `token ${
          //       import.meta.env.VITE_REACT_APP_GITHUB_TOKEN
          //     }`,
          //   },
          // }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data = await response.json();
        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setRepositories(sortedData);

        setTotalPages(Math.ceil(data.length / reposPerPage));
      } catch (error) {
        showBoundary(error.message);
        // console.error("Error fetching repositories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [reposPerPage, showBoundary]);

  // update search and filter
  useEffect(() => {
    const filteredRepos = repositories.filter((repo) => {
      const nameMatch = repo.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return nameMatch;
    });

    setFilteredRepositories(filteredRepos);
  }, [repositories, searchQuery]);

  useEffect(() => {
    const filteredRepos = repositories.filter((repo) => {
      const languageMatch =
        repo.language &&
        repo.language.toLowerCase().includes(languageFilter.toLowerCase());

      return languageMatch;
    });

    setFilteredRepositories(filteredRepos);
  }, [repositories, languageFilter]);

  //

  if (loading) {
    return <RepositoryListSkeleton />;
  }

  // testing error Boundary
  const testErrorBoundary = () => {
    const error = new Error("Testing error Boundary");
    showBoundary(error);
  };

  // console.log(repositories);

  const handlePrev = () => {
    const prevPageNumber = Math.max(page - 1, 1);
    if (
      isNaN(prevPageNumber) ||
      prevPageNumber < 1 ||
      prevPageNumber > totalPages
    ) {
      navigate("/notfound");
    } else {
      navigate(`/repositories?page=${prevPageNumber}`);
    }
  };

  const handleNext = () => {
    const nextPage = Math.min(page + 1, totalPages);
    if (isNaN(nextPage) || nextPage < 1 || nextPage > totalPages) {
      navigate("/notfound");
    } else {
      navigate(`/repositories?page=${nextPage}`);
    }
  };

  const getCurrentPageFromURL = () => {
    const params = new URLSearchParams(location.search);
    return parseInt(params.get("page")) || 1;
  };

  const currentPage = getCurrentPageFromURL();

  // handle search
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

  // handle filter
  const handleLanguageFilter = (e) => {
    const filterValue = e.target.value;
    // console.log(filterValue)
    setLanguageFilter(filterValue);

    if (filterValue === "") {
      navigate(`/repositories?page=${currentPage}`);
      setPage(currentPage);
    } else {
      setPage(1);
    }
  };

  // pagination
  const startIndex = (page - 1) * reposPerPage;
  const endIndex = page * reposPerPage;

  const displayedRepositories = filteredRepositories.slice(
    startIndex,
    endIndex
  );

  return (
    <div className="grid grid-cols-1 w-full justify-items-center min-h-full gap-6 pt-10">
      <div className="flex gap-2 w-full items-center h-max max-md:w-4/5 max-lg:w-3/5 lg:w-3/6">
        <Input
          type="search"
          placeholder="Search repo by name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select
          className="w-[5rem] h-[2.35rem] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-[1px] transition-all border-border px-1 text-sm rounded-sm bg-primary hover:bg-violet-800 text-cent text-gray-200"
          value={languageFilter}
          onChange={handleLanguageFilter}
          tabIndex="0"
        >
          <option value="">Filter</option>
          <option value="Javascript">Javascript</option>
          <option value="Typescript">Typescript</option>
          <option value="Java">Java</option>
          <option value="Vue">Vue</option>
          <option value="CSS">CSS</option>
          <option value="HTML">HTML</option>
        </select>
        {/* <Link className="w-[8.3rem] leading-[2.3rem] whitespace-nowrap text-center ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-[1px] transition-all border-border px-1 text-sm rounded-sm bg-primary hover:bg-violet-800 text-gray-200" to={'/repositories/new'}>&#x2b; New Repo</Link> */}
      </div>
      <Card className="flex flex-col items-center max-md:w-4/5 max-lg:w-[90%] lg:w-[90%] md:border-none">
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
        <CardContent className="flex justify-center h-full w-full">
          {/* {noRepoName && <p>No Repository with this name.</p>} */}
          <ul className="flex w-full justify-center text-center gap-4 h-full flex-wrap">
            {displayedRepositories.map((repo) => (
              <li
                key={repo.id}
                // className=" border-border border-2 rounded-sm p-1 w-full text-lg transition-all hover:bg-violet-700"
                className=" w-[20rem] p-1 text-lg"
              >
                {/* <p className="text-sm w-3/4 max-sm:w-full text-gray-400 pb-2 text-balance pointer-events-none"></p> */}
                <Link
                  className="flex flex-col items-center justify-center gap-1 h-full border-border border-2 rounded-sm transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:border-violet-700"
                  to={`/repositories/${repo.name}?page=${page}`}
                >
                  {repo.name}
                  {repo.description && (
                    <p className="text-sm  text-gray-400 pb-2 px-1 text-balance pointer-events-none">
                      {repo.description}
                    </p>
                  )}
                  <p className="text-sm  text-gray-400 pb-2 text-balance pointer-events-none">
                    {repo.language}
                  </p>
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
                      ? "pointer-events-none bg-primary p-2 pr-4 opacity-30 transition-all"
                      : "bg-primary p-2 pr-4 hover:bg-violet-800 transition-all cursor-pointer"
                  }
                  role="button"
                  tabIndex="0"
                  onClick={handlePrev}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink aria-current="page">{page}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className={
                    page === totalPages
                      ? "pointer-events-none bg-primary p-2 pl-4 opacity-30 transition-all"
                      : "bg-primary p-2 pl-4 hover:bg-violet-800 transition-all cursor-pointer"
                  }
                  role="button"
                  tabIndex="0"
                  onClick={handleNext}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
      <footer className="flex flex-col w-full h-[11rem] items-center self-end justify-center gap-6 mt-4 border-t-[1px] border-t-slate-800 p-2">
        <div className="flex w-full gap-6 text-[0.7rem] justify-center">
          <Link
            className="bg-primary p-2 text-center hover:bg-violet-800 transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:border-violet-700 cursor-pointer rounded-sm w-[8rem]"
            onClick={testErrorBoundary}
          >
            Test Error Boundary
          </Link>
          <Link
            className="bg-primary p-2 text-center hover:bg-violet-800transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:border-violet-700 cursor-pointer rounded-sm w-[8rem]"
            to={"/notfound"}
          >
            Test 404 page
          </Link>
        </div>
        <div className="flex w-full justify-around">
          <p className="text-center max-sm:w-1/2 max-sm:text-sm">{`"Everyone's got a blank page and a pen 🖊️"`}</p>
          <span className="text-center max-sm:w-1/2 max-sm:text-sm">
            &copy;{` Stanley Azi ${new Date().getFullYear()}`}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default RepositoryList;
