import ModeToggle from "@/components/mode-toggle";
import PlaylistGenerator from "@/components/playlist-generator";
import {Toaster} from "sonner";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-2">
            <Toaster position={"top-center"} richColors/>
            <PlaylistGenerator />
            <ModeToggle/>
        </div>
    );
}
