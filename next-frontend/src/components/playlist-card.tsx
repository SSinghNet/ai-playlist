import {SpotifyPlaylist, SoundCloudPlaylist} from "@/models/Playlist";
import TrackCard from "@/components/track-card";
import {Button} from "@/components/ui/button";
import {useSession} from "next-auth/react";
import {Session} from "@/models/Session";
import {toast} from "sonner";
import {useState} from "react";
import Link from "next/link";
import SpotifyLogoFull from "@/components/spotify-logo-full";
import {SoundCloudTrack, SpotifyTrack} from "@/models/Track";

export default function PlaylistCard({playlist, service}: {
    playlist: SpotifyPlaylist | SoundCloudPlaylist,
    service: "soundcloud" | "spotify"
}) {

    const [isExported, setIsExported] = useState<boolean>(false);

    const {data: sessionData} = useSession();
    const session = sessionData as Session;
    const accessToken = session?.token.access_token;

    const exportPlaylist = async () => {
        if (!accessToken) {
            return;
        }
        try {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${service}/playlist/`, {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    playlist: playlist,
                    accessToken: accessToken
                })
            }).then(async (response) => {
                if (response.status !== 200) {
                    toast.error("An error occurred while exporting the playlist. Please try again.");
                    console.error(response);
                    return;
                }
                toast.success("Playlist exported successfully. You can check your account for the playlist.");
                const data = await response.json();

                if (service === "spotify") {
                    (playlist as SpotifyPlaylist).spotifyId = data.spotifyId!;
                } else {
                    (playlist as SoundCloudPlaylist).urn = data.urn!;
                    (playlist as SoundCloudPlaylist).url = data.url!;
                }
                localStorage.setItem(`playlist-${service}`, JSON.stringify(playlist));
                setIsExported(true);
            });
        } catch (err) {
            toast.error("Error while exporting playlist. Try signing out and back in or try again later.");
            console.error("Failed to fetch playlist:", err);
        }
    };

    return (
        <div className="flex flex-col items-center gap-3 justify-center">
            <span className={"text-3xl font-bold"}>{playlist.title}</span>
            <span className={"text-md"}>{playlist.description}</span>
            <div className={"flex flex-col items-center gap-2"}>
                {accessToken ?
                    <Button
                        onClick={exportPlaylist}
                        variant={"default"}
                        disabled={isExported}
                        className={"flex items-center"}
                    >
                        Export Playlist to {service == "spotify" ? "Spotify" : "SoundCloud"}
                    </Button> :
                    <pre className={"text-sm"}>*Sign in with {service === "spotify" ? "Spotify" : "SoundCloud"} to export your playlist*</pre>
                }
                {service === "spotify" && (playlist as SpotifyPlaylist).spotifyId ?
                    <>
                        <Link
                            href={`https://open.spotify.com/playlist/${(playlist as SpotifyPlaylist).spotifyId}`}
                            target={"_blank"}
                        >
                            <Button
                                className={"flex border-[#1ed760] dark:border-[#1ed760]"}
                                variant={"outline"}
                            >
                                View Exported Playlist On <SpotifyLogoFull className={"w-15"} inverted={true}/>
                            </Button>
                        </Link>
                    </>
                    : (playlist as SoundCloudPlaylist).url ?
                        <>
                            <Link
                                href={(playlist as SoundCloudPlaylist).url!}
                                target={"_blank"}
                            >
                                <Button
                                    className={"flex border-[#FB7C11] dark:border-[#FB7C11]"}
                                    variant={"outline"}
                                >
                                    View Exported Playlist On SoundCloud
                                </Button>
                            </Link>
                        </> : ""
                }
            </div>
            <div className={"w-full grid grid-cols-1 gap-2"}>
                {playlist.tracks?.map((track: SpotifyTrack | SoundCloudTrack) => (
                    track.name ? <TrackCard
                        track={track}
                        key={
                            service === "spotify" ? (track as SpotifyTrack).uri : (track as SoundCloudTrack).urn
                        }
                        service={service}
                    /> : null
                ))}
            </div>
        </div>
    );
}