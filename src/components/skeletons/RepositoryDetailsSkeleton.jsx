import { Skeleton } from "../ui/skeleton";

function RepositoryDetailsSkeleton() {
    return (
        <section className="flex w-full pt-20 justify-center">
        <div className="flex flex-col items-center max-md:w-4/5 max-lg:w-3/5 lg:w-3/6 gap-2">
          <div className="flex flex-col gap-2 w-full h-max" >
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-6" />
          </div>
          <div className="grid w-full grid-cols-2 max-sm:grid-cols-1 items-center text-center gap-4">
            <Skeleton className="h-10 border-border border-2 rounded-sm p-1" />
            <Skeleton className="h-10 border-border border-2 rounded-sm p-1" />
            <Skeleton className="h-10 border-border border-2 rounded-sm p-1" />
            <Skeleton className="h-10 border-border border-2 rounded-sm p-1" />
            <Skeleton className="h-10 border-border border-2 rounded-sm p-1" />
            <Skeleton className="h-10 border-border border-2 rounded-sm p-1" />
            <Skeleton className="h-10 border-border border-2 rounded-sm p-1" />
            <Skeleton className="h-10 border-border border-2 rounded-sm p-1" />
            <Skeleton className="h-10 border-border border-2 rounded-sm p-1" />
            <Skeleton className="h-10 border-border border-2 rounded-sm p-1" />
          </div>

          <div className="">
            <Skeleton className="w-32 h-10" />
          </div>
        </div>
      </section>
    )
}

export default RepositoryDetailsSkeleton;