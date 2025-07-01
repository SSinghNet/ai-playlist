import LoginWithProviders from "@/components/util/login-with-providers";
import QueryBar from "@/components/query/query-bar";
import {toast} from "sonner";
import {SoundCloudPlaylist, SpotifyPlaylist} from "@/models/Playlist";
import {Dispatch, SetStateAction} from "react";
import {Track} from "@/models/Track";
import {Artist} from "@/models/Artist";

export default function QuerySection({setPlaylist, isLoading, setIsLoading, service}: {
    setPlaylist: Dispatch<SetStateAction<SpotifyPlaylist | SoundCloudPlaylist | null>>,
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    service: "soundcloud" | "spotify"
}) {


    const fetchPlaylist = async (query: string, playlistLength: number, temperature: number,
                                 nicheSlider: number, playlist: SpotifyPlaylist | SoundCloudPlaylist | null, selectedTracks: Track<Artist>[], selectedArtists: Artist[]) => {
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
                    tracks: [...((playlist?.tracks as Track<Artist>[]) || []), ...selectedTracks],
                    artists: selectedArtists as Artist[],
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
            <div className={"flex flex-col p-5 text-center justify-baseline gap-4"}>
                <h1 className={"text-5xl font-bold text-center"}>SSingh.Net AI Playlist Generator</h1>
                <p className={"text-lg"}>Music should match the moment — and now, it can. With just a few words, you can
                    describe a feeling, a memory, a setting, or even a made-up scene, and receive a playlist that
                    captures it perfectly. Whether you&#39;re seeking calm piano for deep focus, dreamy pop for
                    late-night drives, or energetic beats to keep you moving, this tool creates a curated selection of
                    songs tailored to your prompt. No more endless scrolling or skipping through tracks that don’t fit.
                    It&#39;s a new way to discover music—personal, intuitive, and surprisingly spot-on. Just type what
                    you’re feeling and press go. The soundtrack to your life is only a sentence away.</p>
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