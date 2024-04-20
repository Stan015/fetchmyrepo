import { Skeleton } from "../ui/skeleton";

function UserGitHubProfileSkeleton() {
  return (
    <div className="flex flex-col w-full items-center gap-6 pt-10">
      <div className="flex flex-col items-center max-md:w-4/5 max-lg:w-3/5 lg:w-3/6 gap-6 h-full">
        <div className="flex flex-row gap-4 justify-center ">
          <div className="flex flex-col justify-center w-full items-center">
            <div className="flex gap-4 items-center justify-center mb-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="w-32 h-10" />
            </div>
            <Skeleton className="h-4 w-[250px] max-sm:w-[100px] mb-4" />
            <Skeleton className="h-4 w-[200px] max-sm:w-[100px]" />
          </div>
        </div>
        <div className="flex gap-4 justify-center w-full">
          <Skeleton className="h-4 w-[200px] max-sm:w-[100px]" />
          <Skeleton className="h-4 w-[200px] max-sm:w-[100px]" />
        </div>
        <div className="flex w-full gap-4 items-center justify-center text-center">
          <Skeleton className="h-8 w-10 rounded-sm" />
          <Skeleton className="h-8 w-10 rounded-sm" />
          <Skeleton className="h-8 w-10 rounded-sm" />
        </div>
      </div>
    </div>
  );
}

export default UserGitHubProfileSkeleton;
