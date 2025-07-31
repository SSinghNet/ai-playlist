import PlaylistDialog from "@/components/new/playlist-dialog";
import PlaylistCardSkeleton from "@/components/playlist/playlist-card-skeleton";
import {Playlist} from "@/models/playlist/Playlist";
import {Artist} from "@/models/artist/Artist";
import {Track} from "@/models/track/Track";
import {Dispatch, SetStateAction} from "react";

export default function PlaylistSection({setPlaylist, playlist, isLoading,}: {
    setPlaylist: Dispatch<SetStateAction<Playlist<Track<Artist>> | null>>,
    playlist: Playlist<Track<Artist>>,
    isLoading: boolean,
}) {
    return (
        <div className={"p-5"}>
            {playlist && !isLoading ?
                <PlaylistDialog
                    setPlaylistAction={setPlaylist}
                    playlist={playlist}
                    key={playlist.key}
                />
                : (
                    isLoading ? <PlaylistCardSkeleton/> :
                        <div
                            className="flex flex-col items-center gap-4 w-11/12 text-center font-light py-8 text-lg">
                            Describe a vibe, a moment, or a mood and we’ll instantly generate a personalized
                            playlist. Type anything from “sad girl indie for studying” to “hype gym tracks” or even
                            just “surprise me” for a totally unexpected mix. Whether it’s a genre, an era, a
                            feeling, or a fictional setting, your perfect soundtrack starts with one simple prompt.
                        </div>
                )
            }
        </div>
    );
}