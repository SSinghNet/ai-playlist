import {Skeleton} from "@/components/ui/skeleton";

export default function PlaylistCardSkeleton() {
    return (
        <div className="flex flex-col items-center gap-4 border-2 rounded-lg p-5 w-11/12">
            <Skeleton className="h-8 w-1/3"/>
            <Skeleton className="h-3 w-full"/>
            <Skeleton className="h-3 w-full"/>
            <div className={"m-4 grid md:grid-cols-2 xl:grid-cols-3 gap-4"}>
                {
                    Array.from({length: 15}).map((_, i) => (
                        <div key={i} className="flex flex-row gap-4 items-center w-full">
                            <Skeleton className="h-[80px] w-[80px] aspect-square rounded-xl"/>
                            <div className="flex flex-col gap-4 ">
                                <Skeleton className="h-4 w-min-[100px] w-max-[300px] sm:w-max-[100px]"/>
                                <Skeleton className="h-3 w-min-[90px] w-[250px] sm:w-max-[80px]"/>
                                <Skeleton className="h-2 w-[50px]"/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
