import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RepositoryDetailsSkeleton from "./skeletons/RepositoryDetailsSkeleton";
import { Helmet } from "react-helmet-async";

const RepositoryDetails = () => {
  const { repoName } = useParams();
  const [repository, setRepository] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchClickedRepo = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/Stan015/${repoName}`,
          {
            headers: {
              Authorization: `token ${import.meta.env.VITE_REACT_APP_GITHUB_TOKEN}`,
            },
          }
        );
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
  }, []);

  if (!repository) {
    return <RepositoryDetailsSkeleton />;
  }

  // console.log(repository)

  return (
      <section className="flex w-full pt-20 justify-center">
        <Helmet>
          <title>Repository Details for {repository.name}</title>
          <link rel="icon" type="image/svg+xml" href="/logo.svg" />
          <meta name="description" content={`This contains the details of ${repository.name} and quick links to the repository.`} />
        </Helmet>
        <Card className="flex flex-col items-center max-md:w-4/5 max-lg:w-3/5 lg:w-3/6 mb-10">
          <CardHeader>
            <CardTitle className="text-3xl max-sm:text-xl text-center mb-2 uppercase">Project Name: {repository.name}</CardTitle>
            <CardDescription className="text-center text-base text-balance">{repository.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid w-full grid-cols-2 max-sm:grid-cols-1 items-center text-center gap-4">
          <p className="leading-10 border-border border-2 rounded-sm p-1">Github Username: {repository.owner.login}</p>
            <p className="leading-10 border-border border-2 rounded-sm p-1">Language: {repository.language}</p>
            <p className="leading-10 border-border border-2 rounded-sm p-1">Stars: {repository.stargazers_count}</p>
            <p className="leading-10 border-border border-2 rounded-sm p-1">Forks: {repository.forks_count}</p>
            <p className="leading-10 border-border border-2 rounded-sm p-1">Open Issues: {repository.open_issues_count}</p>
            {repository.license && <p className="leading-10 border-border border-2 rounded-sm">License: {repository.license.name}</p>}
            <p className="leading-10 border-border border-2 rounded-sm p-1">Open Issues: {repository.open_issues_count}</p>
            {repository.homepage && <Link className="leading-10 border-border border-2 rounded-sm p-1 transition-all hover:bg-violet-600" to={repository.homepage} target="_blank" rel="noopener noreferrer">Visit Live Site</Link>}
            {repository.html_url && <Link className="leading-10 border-border border-2 rounded-sm p-1 transition-all hover:bg-violet-600" to={repository.html_url} target="_blank" rel="noopener noreferrer">Visit Remote Repo</Link>}
            {/* {repository.license && <p className="leading-10 border-border border-2 rounded-sm">License: {repository.license.name}</p>} */}
            <p className="leading-10 border-border border-2 rounded-sm p-1">Date Created: {new Date(repository.created_at).toLocaleDateString()}</p>
            <p className="leading-10 border-border border-2 rounded-sm p-1">Last Updated: {new Date(repository.updated_at).toLocaleDateString()}</p>
          </CardContent>

          <CardFooter className="">
            <Link className="bg-violet-600 p-2 rounded-md hover:bg-violet-700 transition-all" to={`/repositories?page=${currentPage}`}>
              Back to Repository List
            </Link>
          </CardFooter>
        </Card>
      </section>
  );
};

export default RepositoryDetails;
