'use client'

import LoginWithProviders from "@/components/util/login-with-providers";
import Query from "@/components/prompt/query";
import {Artist} from "@/models/artist/Artist";
import {useState} from "react";
import {Playlist} from "@/models/playlist/Playlist";
import {Track} from "@/models/track/Track";
import PlaylistDialog from "@/components/playlist/playlist-dialog";
import PlaylistGenerating from "@/components/playlist/playlist-generating";

export default function App() {

    const [playlist, setPlaylist] = useState<Playlist<Track<Artist>> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <>
            <div
                className={"grid grid-cols-1 items-center md:grid-cols-2 gap-4 p-5 bg-accent shadow-xl"}>
                <div>
                    <h1 className={"text-xl font-bold text-center md:text-left"}>SSingh.Net AI Playlist Generator</h1>
                </div>
                <LoginWithProviders/>
            </div>

            <div
                className={"bg-accent-foreground/92 max-w-full m-4 rounded-md shadow-accent-foreground/92 border-accent-foreground/92 border-1 shadow-sm text-background p-8 flex flex-col gap-4"}
            >
                {loading && <PlaylistGenerating/>}
                {playlist && !loading &&
                    <PlaylistDialog
                        playlist={playlist}
                        setPlaylistAction={setPlaylist}
                        key={playlist.key}
                    />
                }
                <Query
                    setPlaylistAction={setPlaylist}
                    loading={loading}
                    setLoadingAction={setLoading}/>
            </div>
        </>
    );
}