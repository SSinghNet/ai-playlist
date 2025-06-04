'use client'

import QueryBar from "@/components/query-bar";
import {useEffect, useState} from "react";
import {Playlist} from "@/models/Playlist";
import PlaylistCard from "@/components/playlist-card";
import PlaylistCardSkeleton from "@/components/playlist-card-skeleton";
import {toast} from "sonner";

export default function PlaylistGenerator() {
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const stored = localStorage.getItem("playlist");
        setPlaylist(stored ? JSON.parse(stored) : null);
    }, []);


    const fetchPlaylist = async (query: string, playlistLength: number) => {
        if (!query || query.length < 3 || query.length > 100) {
            toast.info("Prompt must be at least 3 characters and no more than 100 characters.");
            return;
        }
        if(!playlistLength || playlistLength < 5 || playlistLength > 50) {
            toast.info("Playlist length must be between 5 and 50.");
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/spotify/playlist/generate?userPrompt=${query}&playlistLength=${playlistLength}`);

            const data = await res.json();

            if (res.status !== 200) {
                toast.error("Error while fetching playlist. Try again later.");
                throw new Error("Failed to generate playlist");
            }
            setPlaylist(data);
            localStorage.setItem("playlist", JSON.stringify(data));
            setIsLoading(false);
        } catch (err) {
            console.error("Failed to fetch playlist:", err);
            toast.error("Error while fetching playlist. Try again later.");
        }
    };


    return (
        <>
            <QueryBar fetchPlaylistAction={fetchPlaylist} isLoading={isLoading}/>
            {
                playlist && !isLoading ?
                    <PlaylistCard playlist={playlist}/>
                    : (
                        isLoading ? <PlaylistCardSkeleton/> :
                            <div className="flex flex-col items-center gap-4 border-2 rounded-lg p-5 w-11/12 text-center font-light py-8 text-lg">
                                Describe a vibe, a moment, or a mood and we’ll instantly generate a personalized playlist. Type anything from “sad girl indie for studying” to “hype gym tracks” or even just “surprise me” for a totally unexpected mix. Whether it’s a genre, an era, a feeling, or a fictional setting, your perfect soundtrack starts with one simple prompt.
                            </div>
                    )
            }
        </>
    );
}