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
import TrackTile from "@/components/new/track-tile";
import {Button} from "@/components/ui/button";
import {SpotifyPlaylist} from "@/models/playlist/SpotifyPlaylist";
import {SoundCloudPlaylist} from "@/models/playlist/SoundCloudPlaylist";
import {SpotifyTrack} from "@/models/track/SpotifyTrack";
import {SoundCloudTrack} from "@/models/track/SoundCloudTrack";
import {Playlist} from "@/models/playlist/Playlist";
import {Track} from "@/models/track/Track";
import {Artist} from "@/models/artist/Artist";
import {useService} from "@/hooks/useService";
import {useAccessToken} from "@/hooks/useAccessToken";

export default function PlaylistTile({playlist, setSelectedPlaylistAction}: {
    playlist: Playlist<Track<Artist>>
    setSelectedPlaylistAction: Dispatch<SetStateAction<Playlist<Track<Artist>> | null>>
}) {

    const [fullPlaylist, setFullPlaylist] = useState<SpotifyPlaylist | SoundCloudPlaylist | null>(null);

    const service = useService();
    const accessToken = useAccessToken();

    const fetchPlaylist = async () => {
        if (!accessToken || fullPlaylist !== null) {
            return;
        }
        try {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${service}/playlist/${playlist.key}?accessToken=${accessToken}&limit=20`, {
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
                        setSelectedPlaylistAction(fullPlaylist)
                    }}>
                        SELECT
                    </Button>}
                {fullPlaylist ? fullPlaylist.tracks.map((track: Track<Artist>) =>
                    <TrackTile
                               key={service === "spotify" ? (track as SpotifyTrack).uri : (track as SoundCloudTrack).urn}
                               track={track}/>
                ) : "Loading..."}
            </DialogContent>
        </Dialog>
    );
}