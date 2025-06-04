import ModeToggle from "@/components/mode-toggle";
import LoginWithSpotify from "@/components/login-with-spotify";
import PlaylistGenerator from "@/components/playlist-generator";
import {Toaster} from "sonner";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-2 m-4">
            <Toaster position={"top-center"} richColors/>
            <LoginWithSpotify />
            <h1 className={"text-4xl font-bold text-center"}>SSingh.Net AI Playlist Generator</h1>
            <PlaylistGenerator />
            <ModeToggle/>
        </div>
    );
}
