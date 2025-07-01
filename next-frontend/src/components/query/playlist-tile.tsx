import {SoundCloudPlaylist, SpotifyPlaylist} from "@/models/Playlist";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogContent
} from "@/components/ui/dialog";
import {toast} from "sonner";
import {Dispatch, SetStateAction, useState} from "react";
import {useSession} from "next-auth/react";
import {Session} from "@/models/Session";
import {SoundCloudTrack, SpotifyTrack} from "@/models/Track";
import TrackTile from "@/components/query/track-tile";
import {Button} from "@/components/ui/button";

export default function PlaylistTile({playlist, service, setSelectedPlaylist}: {
    playlist: SpotifyPlaylist | SoundCloudPlaylist,
    service: "soundcloud" | "spotify",
    setSelectedPlaylist: Dispatch<SetStateAction<SpotifyPlaylist | SoundCloudPlaylist | null>>
}) {

    const [fullPlaylist, setFullPlaylist] = useState<SpotifyPlaylist | SoundCloudPlaylist | null>(null);

    const {data: sessionData} = useSession();
    const session = sessionData as Session;
    const accessToken = session?.token.access_token;

    const fetchPlaylist = async () => {
        if (!accessToken || fullPlaylist !== null) {
            return;
        }
        try {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${service}/playlist/${service === "spotify" ? (playlist as SpotifyPlaylist).spotifyId : (playlist as SoundCloudPlaylist).urn}?accessToken=${accessToken}&limit=20`, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }).then(async (response) => {
                if (response.status !== 200) {
                    toast.error("An error occurred while fetching playlist. Please try again.");
                    console.error(response);
                    return;
                }
                const data = await response.json();
                setFullPlaylist(data as SpotifyPlaylist);
            });
        } catch (err) {
            toast.error("Failed getting playlist. Try signing out and back in or try again later.");
            console.error("Failed to fetch playlists:", err);
        }
    };

    return (
        <Dialog>
            <DialogTrigger onClick={fetchPlaylist}>
                <Card>
                    <CardHeader>
                        <CardTitle> {playlist.title} </CardTitle>
                        <CardDescription>{playlist.description?.substring(0, 100)}{playlist.description?.length > 100 ? "..." : ""}</CardDescription>
                    </CardHeader>
                </Card>
            </DialogTrigger>
            <DialogContent className={"overflow-y-auto max-h-full"}>
                <DialogHeader>
                    <DialogTitle>{fullPlaylist && fullPlaylist.title}</DialogTitle>
                    <DialogDescription>
                        {fullPlaylist && fullPlaylist.description}
                    </DialogDescription>
                </DialogHeader>
                {fullPlaylist &&
                    <Button onClick={() => {
                        setSelectedPlaylist(fullPlaylist)
                    }}>
                        SELECT
                    </Button>}
                {fullPlaylist ? fullPlaylist.tracks.map((track: SpotifyTrack | SoundCloudTrack) =>
                    <TrackTile service={service}
                               key={service === "spotify" ? (track as SpotifyTrack).uri : (track as SoundCloudTrack).urn}
                               track={track}/>
                ) : "Loading..."}
            </DialogContent>
        </Dialog>
    );
}