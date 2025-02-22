import { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
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
import { MdEmail } from "react-icons/md";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import UserGitHubProfileSkeleton from "./skeletons/UserGitHubProfileSkeleton";
import { Helmet } from "react-helmet-async";

const UserGitHubProfile = () => {
  const { showBoundary } = useErrorBoundary();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);

      try {
        const response = await fetch(`https://api.github.com/users/Stan015`, 
        // {
        //   headers: {
        //     Authorization: `token ${
        //       import.meta.env.VITE_REACT_APP_GITHUB_TOKEN
        //     }`,
        //   },
        // }
      );
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        showBoundary(error.message);
        // console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [showBoundary]);

  // console.log(userProfile);

  if (loading) {
    return <UserGitHubProfileSkeleton />;
  }

  return (
    <div className="flex flex-col w-full items-center gap-6 pt-10">
      <Card className="flex flex-col items-center max-md:w-4/5 max-lg:w-3/5 lg:w-3/6">
        <Helmet>
          <title>{`${userProfile.name}'s Github Repository List and bio details.`}</title>
          <link rel="icon" type="image/svg+xml" href="/logo.svg" />
          <meta
            name="description"
            content={`This contains a list of public repositories and github profile card of ${userProfile.name}.`}
          />
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
            <CardDescription className="text-center text-balance">
              {userProfile.bio}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex gap-4 justify-center">
          <p className="text-center max-sm:text-sm">
            Public Repositories: {userProfile.public_repos}
          </p>
          <p className="text-center max-sm:text-sm">
            Followers: {userProfile.followers}
          </p>
        </CardContent>
        <CardFooter className="flex w-full gap-4 items-center justify-center text-center">
          <p
            className="transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1  rounded-sm hover:bg-violet-800"
            onClick={() => {
              window.location.href = `mailto:${userProfile.email}`;
            }}
            tabIndex="0"
          >
            <MdEmail size={30} />
          </p>
          <Link
            to="https://twitter.com/StanleyAzi"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm hover:bg-violet-800 p-1"
          >
            <BsTwitterX size={20} />
          </Link>
          <Link
            to="https://www.linkedin.com/in/stanleyazi/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  rounded-sm hover:bg-violet-800 p-[1px]"
          >
            <FaLinkedinIn size={25} />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserGitHubProfile;
