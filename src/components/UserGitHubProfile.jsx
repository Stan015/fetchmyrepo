import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md"
import { BsTwitterX} from "react-icons/bs"
import { FaLinkedinIn} from "react-icons/fa"
import UserGitHubProfileSkeleton from "./skeletons/UserGitHubProfileSkeleton";
import { Helmet } from "react-helmet-async";

const UserGitHubProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/Stan015`, {
          headers: {
            Authorization: `token ${
              import.meta.env.VITE_REACT_APP_GITHUB_TOKEN
            }`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // console.log(userProfile);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <UserGitHubProfileSkeleton />;
  }

  return (
    <Card className="flex flex-col items-center max-md:w-4/5 max-lg:w-3/5 lg:w-3/6">
    <Helmet>
          <title>{`${userProfile.name}'s Github Repository List and bio details.`}</title>
          <link rel="icon" type="image/svg+xml" href="/logo.svg" />
          <meta name="description" content={`This contains a list of public repositories and github profile card of ${userProfile.name}.`} />
        </Helmet>
      <CardHeader className="flex flex-row gap-4 justify-center ">
        <div className="">
          <div className="flex gap-4 items-center justify-center mb-2">
          <Avatar className="">
          <AvatarImage src={userProfile.avatar_url} />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
            <CardTitle className="">{userProfile.name}</CardTitle>
          </div>
          <CardDescription className="text-center text-balance">{userProfile.bio}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex gap-4 justify-center">
        <p className="text-center max-sm:text-sm">Public Repositories: {userProfile.public_repos}</p>
        <p className="text-center max-sm:text-sm">Followers: {userProfile.followers}</p>
      </CardContent>
      <CardFooter className="flex w-full gap-4 items-center justify-center text-center">
        <p className="transition-all hover:text-violet-600" onClick={() => {window.location.href = `mailto:${userProfile.email}`}}><MdEmail size={30} /></p>
        <Link
          to="https://twitter.com/StanleyAzi"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all hover:text-violet-600"
        >
          <BsTwitterX size={20} />
        </Link>
        <Link
          to="https://www.linkedin.com/in/stanley-azi-475044217/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all hover:text-violet-600"
        >
          <FaLinkedinIn size={25} />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default UserGitHubProfile;
