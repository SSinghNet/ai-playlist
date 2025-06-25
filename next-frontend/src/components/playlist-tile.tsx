import {SoundCloudPlaylist, SpotifyPlaylist} from "@/models/Playlist";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export default function PlaylistTile({playlist}: { playlist: SpotifyPlaylist | SoundCloudPlaylist }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle> {playlist.title} </CardTitle>
                <CardDescription>{playlist.description.substring(0,100)}{playlist.description.length > 100 ? "..." : ""}</CardDescription>
            </CardHeader>
        </Card>
    );
}