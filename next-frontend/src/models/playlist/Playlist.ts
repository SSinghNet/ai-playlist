import {Artist} from "@/models/artist/Artist";
import {Track} from "@/models/track/Track";
import SpotifyPlaylistJSON from "@/models/playlist/json/SpotifyPlaylistJSON";
import SoundCloudPlaylistJSON from "@/models/playlist/json/SoundCloudPlaylistJSON";

export abstract class Playlist<T extends Track<Artist>> {

    title: string;
    description: string;
    tracks: T[];

    protected constructor(
        title: string,
        description: string,
        tracks: T[],
    ) {
        this.title = title;
        this.description = description;
        this.tracks = tracks;
    }

    public abstract get url() : string | null;
    public abstract get key(): string;

    abstract exportPlaylist(accessToken: string): Promise<this>;

    async exportPlaylistImpl(service: string, reqBody: string): Promise<SpotifyPlaylistJSON | SoundCloudPlaylistJSON> {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${service}/playlist/`, {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: reqBody
            });
            if (res.status !== 200) {
                throw new Error("An error occurred while exporting the playlist.Try signing out and back in or try again later. ");
            }

            const data = await res.json()
            localStorage.setItem(`playlist-${service}`, JSON.stringify(data));

            return data;
        } catch (err: unknown) {
            throw new Error(`Failed to export playlist: ${(err as Error).message}`);
        }
    }
}


