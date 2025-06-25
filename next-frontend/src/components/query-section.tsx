import LoginWithProviders from "@/components/login-with-providers";
import QueryBar from "@/components/query-bar";
import {toast} from "sonner";
import {SoundCloudPlaylist, SpotifyPlaylist} from "@/models/Playlist";
import {Dispatch, SetStateAction} from "react";

export default function QuerySection({setPlaylist, isLoading, setIsLoading, service}: {
    setPlaylist: Dispatch<SetStateAction<SpotifyPlaylist | SoundCloudPlaylist | null>>,
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    service: "soundcloud" | "spotify"
}) {


    const fetchPlaylist = async (query: string, playlistLength: number, temperature: number, nicheSlider: number) => {
        if (!query || query.length < 3 || query.length > 100) {
            toast.info("Prompt must be at least 3 characters and no more than 100 characters.");
            return;
        }
        if (!playlistLength || playlistLength < 5 || playlistLength > 25) {
            toast.info("Playlist length must be between 5 and 25.");
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${service}/playlist/generate`, {
                method: "POST",
                body: JSON.stringify({
                    userPrompt: query,
                    playlistLength: playlistLength,
                    temperature: temperature,
                    nicheSlider: nicheSlider,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            const data = await res.json();

            if (res.status !== 200) {
                toast.error("Error while fetching playlist. Try again later.");
                throw new Error("Failed to generate playlist");
            }
            setPlaylist(data);
            localStorage.setItem(`playlist-${service}`, JSON.stringify(data));
            setIsLoading(false);
        } catch (err) {
            console.error("Failed to fetch playlist:", err);
            toast.error("Error while fetching playlist. Try again later.");
        }
    };

    return (
        <div className={"flex flex-col justify-between h-full"}>
            <div className={"p-5"}>
                <h1 className={"text-4xl font-bold text-center"}>SSingh.Net AI Playlist Generator</h1>
            </div>
            <div className={"flex flex-col"}>
                <QueryBar fetchPlaylistAction={fetchPlaylist} isLoading={isLoading} service={service}/>
                <div className={"bg-accent py-4 px-6 "}>
                    <LoginWithProviders/>
                </div>
            </div>
        </div>
    );
}