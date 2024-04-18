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
import UserGitHubProfile from "./UserGitHubProfile";

const RepositoryList = () => {
  const [repositories, setRepositories] = useState([]);
  const reposPerPage = 8;
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  // const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // get current page
  const page = parseInt(new URLSearchParams(location.search).get("page")) || 1;
  //

  // fetch repositories
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/Stan015/repos?per_page=${reposPerPage}&page=${page}`,
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

        // get total pages
        const linkHeader = response.headers.get("Link");
        if (linkHeader) {
          const totalPagesMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (totalPagesMatch) {
            setTotalPages(parseInt(totalPagesMatch[1]));
          }
        }
      } catch (error) {
        // setError(error.message);
        console.error("Error fetching repositories:", error);
      }
    };

    fetchRepositories();
  }, [reposPerPage, page]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // console.log(searchQuery);

  if (repositories.length === 0) {
    return <div>Loading...</div>;
  }

  const filteredRepositories = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(repositories);

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

  return (
    <div className="flex flex-col w-full items-center h-full gap-6 pt-10">
      <UserGitHubProfile />
      <div className="flex gap-2 w-full items-center max-md:w-4/5 max-lg:w-3/5 lg:w-3/6">
        <Input
          type="search"
          placeholder="Search repo by name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {/* <Button type="submit">Search</Button> */}
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
          <ul className="flex flex-col w-full items-center text-center gap-4 h-full">
            {filteredRepositories.map((repo) => (
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
    </div>
  );
};

export default RepositoryList;
