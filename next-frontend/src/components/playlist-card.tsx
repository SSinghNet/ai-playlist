import {Playlist} from "@/models/Playlist";
import TrackCard from "@/components/track-card";
import {Button} from "@/components/ui/button";
import {useSession} from "next-auth/react";
import {SpotifySession} from "@/models/SpotifySession";
import {toast} from "sonner";
import {useState} from "react";
import SpotifyLogoFull from "@/components/spotify-logo-full";

export default function PlaylistCard({playlist} : {playlist: Playlist}){

    const [isExported, setIsExported] = useState<boolean>(false);

    const {data: sessionData} = useSession();
    const session = sessionData as SpotifySession;
    const accessToken = session?.token.access_token;

    const exportPlaylist = async () => {
        if (!accessToken) {
            return;
        }
        try {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/spotify/playlist/`, {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    playlist: playlist,
                    accessToken: accessToken
                })
            }).then((response) => {
                if (response.status !== 200) {
                    toast.error("An error occurred while exporting the playlist. Please try again.");
                    console.error(response);
                    return;
                }
                toast.success("Playlist exported successfully. You can check your account for the playlist.");
                setIsExported(true);
            });
        } catch (err) {
            toast.error("Error while exporting playlist. Try signing out and back in or try again later.");
            console.error("Failed to fetch playlist:", err);
        }
    };

    return (
        <div className="flex flex-col items-center gap-3 border-2 rounded-lg p-5">
            <span className={"text-3xl font-bold"}>{playlist.title}</span>
            <span className={"text-md"}>{playlist.description}</span>
            { accessToken ?
                    <Button
                        onClick={exportPlaylist}
                        variant={"default"}
                        disabled={isExported}
                        className={"flex items-center"}
                    >
                        Export Playlist to <SpotifyLogoFull className={"w-18"}/>
                    </Button> : <pre className={"text-sm"}>*Sign in with Spotify to export your playlist*</pre>
            }
            <div className={"m-4 grid md:grid-cols-2 xl:grid-cols-3 gap-2"}>
                {playlist.tracks?.map(track => (
                    track.name ? <TrackCard track={track} key={track.uri}/> : null
                ))}
            </div>
        </div>
    );
}