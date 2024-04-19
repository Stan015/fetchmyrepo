import { Skeleton } from "../ui/skeleton";
import UserGitHubProfileSkeleton from "./UserGitHubProfileSkeleton";

function RepositoryListSkeleton() {
  return (
    <div className="flex flex-col w-full items-center h-full gap-6 pt-10">
      <UserGitHubProfileSkeleton />
      <div className="flex gap-2 w-full items-center max-md:w-4/5 max-lg:w-3/5 lg:w-3/6 ">
      <Skeleton className="h-10 border-border border-2 rounded-sm p-1 w-full" />
      </div>
      <div className="flex flex-col items-center max-md:w-4/5 max-lg:w-3/5 lg:w-3/6 gap-5 h-max">
        <div className="flex flex-col items-center justify-center gap-3 mb-4 h-max w-full">
                    <Skeleton className="h-12 w-2/5" />
                    <Skeleton className="w-3/4 h-6" />

        </div>
        <div className="flex flex-col w-full items-center text-center gap-4 h-full">
          <Skeleton className="h-10 border-border border-2 rounded-sm p-1 w-full" />
          <Skeleton className="h-10 border-border border-2 rounded-sm p-1 w-full" />
          <Skeleton className="h-10 border-border border-2 rounded-sm p-1 w-full" />
          <Skeleton className="h-10 border-border border-2 rounded-sm p-1 w-full" />
          <Skeleton className="h-10 border-border border-2 rounded-sm p-1 w-full" />
          <Skeleton className="h-10 border-border border-2 rounded-sm p-1 w-full" />
          <Skeleton className="h-10 border-border border-2 rounded-sm p-1 w-full" />
          <Skeleton className="h-10 border-border border-2 rounded-sm p-1 w-full" />
        </div>
        <div className="flex gap-4 justify-center items-center">
          <Skeleton className="w-[5rem] h-[2.5rem]" />
          <Skeleton className="w-[2rem] h-[2.5rem]" />
          <Skeleton className="w-[5rem] h-[2.5rem]" />
        </div>
      </div>
      <div className="flex w-full h-[7rem] items-center justify-around gap-4 mt-4 p-2">
        <Skeleton className="w-[10rem] max-sm:w-1/2 h-10" />
        <Skeleton className="w-[10rem] max-sm:w-1/2 h-10" />
      </div>
    </div>
  );
}

export default RepositoryListSkeleton;
