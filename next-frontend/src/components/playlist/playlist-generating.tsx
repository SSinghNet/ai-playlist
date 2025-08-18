import LoadingSpinner from "@/components/ui/spinner";

export default function PlaylistGenerating() {

    return (
        <div
            className={"px-4 py-2 text-left rounded-sm drop-shadow-md bg-gradient-to-tr from-blue-100 to-purple-100 text-background flex flex-row items-center gap-4"}>
            <div>
                <LoadingSpinner/>
            </div>
            <div className="flex flex-col">
                Generating Playlist...
            </div>
        </div>
    );
}