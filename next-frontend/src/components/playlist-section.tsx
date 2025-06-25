import PlaylistCard from "@/components/playlist-card";
import PlaylistCardSkeleton from "@/components/playlist-card-skeleton";
import {SoundCloudPlaylist, SpotifyPlaylist} from "@/models/Playlist";

export default function PlaylistSection({playlist, isLoading, service}: {
    playlist: SpotifyPlaylist | SoundCloudPlaylist | null,
    isLoading: boolean,
    service: "soundcloud" | "spotify"
}) {
    return (
        <div className={"p-5"}>
            {playlist && !isLoading ?
                <PlaylistCard
                    playlist={playlist}
                    service={service}
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