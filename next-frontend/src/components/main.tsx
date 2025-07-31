'use client'

import {useEffect, useState} from "react";
import QuerySection from "@/components/query/query-section";
import PlaylistSection from "@/components/playlist/playlist-section";

import {Playlist} from "@/models/playlist/Playlist";
import {Artist} from "@/models/artist/Artist";
import {Track} from "@/models/track/Track";
import {useService} from "@/hooks/useService";
import {SpotifyPlaylist} from "@/models/playlist/SpotifyPlaylist";
import {ServiceMapPlaylist} from "@/models/ServiceMap";
import {SoundCloudPlaylist} from "@/models/playlist/SoundCloudPlaylist";

export default function Main() {
    const [playlist, setPlaylist] = useState<Playlist<Track<Artist>> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const service = useService();

    useEffect(() => {
        if (!service) return;

        const stored: string | null = localStorage.getItem(`playlist-${service}`);
        const parsed = stored ? JSON.parse(stored) : null;
        switch (service) {
            case 'spotify':
                return setPlaylist(SpotifyPlaylist.fromJSON(parsed) as ServiceMapPlaylist[typeof service]);
            case 'soundcloud':
                return setPlaylist(SoundCloudPlaylist.fromJSON(parsed) as ServiceMapPlaylist[typeof service]);
            default:
                throw new Error("Something went wrong.")
        }
    }, [service]);


    return (
        <div>

            <div>
                <QuerySection
                    setPlaylist={setPlaylist}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            </div>
            <div>
                {playlist ?
                    <PlaylistSection
                        setPlaylist={setPlaylist}
                        playlist={playlist}
                        isLoading={isLoading}
                    /> : ""
                }
            </div>

        </div>
    );
}