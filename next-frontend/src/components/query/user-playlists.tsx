import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import PlaylistTile from "@/components/query/playlist-tile";
import {SoundCloudPlaylist, SpotifyPlaylist} from "@/models/Playlist";
import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {Session} from "@/models/Session";
import {toast} from "sonner";

export default function UserPlaylists({service, setSelectedPlaylist}: {
    service: "soundcloud" | "spotify",
    setSelectedPlaylist: Dispatch<SetStateAction<SpotifyPlaylist | SoundCloudPlaylist | null>>
}) {
    const [userPlaylists, setUserPlaylists] = useState<SpotifyPlaylist[] | SoundCloudPlaylist[] | null>(null);
    const [hasPrevious, setHasPrevious] = useState<boolean>(false);
    const [hasNext, setHasNext] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);

    const limit = 5;

    const {data: sessionData} = useSession();
    const session = sessionData as Session;
    const accessToken = session?.token.access_token;

    useEffect(() => {
        fetchUserPlaylists();
    }, [offset]);

    const fetchUserPlaylists = async () => {
        if (!accessToken) {
            return;
        }
        try {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${service}/profile/playlists?accessToken=${accessToken}&limit=${limit}&offset=${offset}`, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }).then(async (response) => {
                if (response.status !== 200) {
                    toast.error("An error occurred while fetching user playlists. Please try again.");
                    console.error(response);
                    return;
                }
                const data = await response.json();

                setUserPlaylists(
                    service === "spotify" ? data.playlists as SpotifyPlaylist[] :
                        data as SoundCloudPlaylist[]
                );
                setHasNext(data.hasNext!);
                setHasPrevious(data.hasPrevious!);
            });
        } catch (err) {
            toast.error("Failed getting user playlists. Try signing out and back in or try again later.");
            console.error("Failed to fetch playlists:", err);
        }
    };

    return accessToken && (
        <Dialog>
            <DialogTrigger
                className={"w-full bg-accent text-accent-foreground shadow-xs hover:bg-accent/90 rounded-md p-2"}
                onClick={() => !userPlaylists && fetchUserPlaylists()}
            >
                Use Playlist
            </DialogTrigger>
            <DialogContent className={"overflow-y-auto max-h-full"}>
                <DialogHeader>
                    <DialogTitle>Playlist List</DialogTitle>
                    <DialogDescription>
                        Choose a playlist to inspire your new generated playlist.
                    </DialogDescription>
                </DialogHeader>
                {
                    userPlaylists ? userPlaylists.map((playlist) =>
                            <PlaylistTile
                                key={service === "spotify" ? (playlist as SpotifyPlaylist).spotifyId : (playlist as SoundCloudPlaylist).urn}
                                playlist={playlist}
                                service={service}
                                setSelectedPlaylist={setSelectedPlaylist}
                            />
                        )
                        : "Loading..."
                }
                <div className={"flex flex-row justify-between w-full"}>
                    {
                        hasPrevious && (
                            <Button onClick={() => {
                                setOffset(offset - limit)
                            }}>Back</Button>
                        )
                    }
                    {
                        hasNext && (
                            <Button onClick={() => {
                                setOffset(offset + limit)
                            }}>Next</Button>
                        )
                    }
                </div>

            </DialogContent>
        </Dialog>
    );
}