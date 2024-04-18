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

  console.log(userProfile);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <Avatar>
            <AvatarImage src={userProfile.avatar_url} />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{userProfile.name}</CardTitle>
            <CardDescription>{userProfile.bio}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p>Public Repositories: {userProfile.public_repos}</p>
          <p>Followers: {userProfile.followers}</p>
        </CardContent>
        <CardFooter className="flex w-full gap-2">
          <p>Email: {userProfile.email}</p>
          <Link
            to="https://twitter.com/StanleyAzi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter/X: @StanleyAzi
          </Link>
          <Link
            to="https://www.linkedin.com/in/stanley-azi-475044217/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn: @StanleyAzi
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default UserGitHubProfile;
