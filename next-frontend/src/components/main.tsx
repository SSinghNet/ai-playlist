'use client'

import {useEffect, useState} from "react";
import {SoundCloudPlaylist, SpotifyPlaylist} from "@/models/Playlist";
import QuerySection from "@/components/query-section";
import PlaylistSection from "@/components/playlist-section";
import {useSession} from "next-auth/react";
import {Session} from "@/models/Session";

export default function Main() {
    const [playlist, setPlaylist] = useState<SpotifyPlaylist | SoundCloudPlaylist | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {data: sessionData} = useSession();
    const session = sessionData as Session;
    const [service, setService] = useState<"soundcloud" | "spotify">("spotify");

    useEffect(() => {
        if (!session) return;

        const resolvedService: "spotify" | "soundcloud" =
            session.token.sub.includes("soundcloud") ? "soundcloud" : "spotify";

        setService(resolvedService);

        const stored: string | null = localStorage.getItem(`playlist-${resolvedService}`);
        const parsed = stored ? JSON.parse(stored) : null;
        setPlaylist(parsed);
    }, [session]);


    return (
        <div className={"grid grid-cols-4 md:grid-cols-6 min-h-screen max-h-screen justify-between w-full"}>

            <div className={"col-span-6 md:col-span-4 overflow-y-auto h-full w-full"}>
                <QuerySection setPlaylist={setPlaylist} isLoading={isLoading} setIsLoading={setIsLoading}
                              service={service}/>
            </div>
            <div className={"border-l-1 border-[#222222] col-span-6 md:col-span-2 overflow-y-auto h-full w-full"}>
                <PlaylistSection
                    playlist={playlist}
                    isLoading={isLoading}
                    service={service}
                />
            </div>

        </div>
    );
}