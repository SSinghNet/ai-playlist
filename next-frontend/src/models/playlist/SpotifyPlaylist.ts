import {Playlist} from "@/models/playlist/Playlist";
import {SpotifyTrack} from "@/models/track/SpotifyTrack";
import SpotifyTrackJSON from "@/models/track/json/SpotifyTrackJSON";
import SpotifyPlaylistJSON from "@/models/playlist/json/SpotifyPlaylistJSON";

export class SpotifyPlaylist extends Playlist<SpotifyTrack> {
    private spotifyId?: string;

    constructor(
        title: string,
        description: string,
        tracks: SpotifyTrack[],
        spotifyId?: string,
    ) {
        super(title, description, tracks);
        this.spotifyId = spotifyId;
    }

    async exportPlaylist(accessToken: string): Promise<this> {
        const res = await super.exportPlaylistImpl('spotify',
            JSON.stringify({
                    playlist: this,
                    accessToken: accessToken
                }
            )
        );
        const {spotifyId} = res as {spotifyId: string};

        if (!spotifyId) {
            throw new Error("Error exporting playlist.");
        }
        this.spotifyId = spotifyId;
        return this;
    }

    public get url(): string | null {
        if (this.spotifyId) {
            return `https://open.spotify.com/playlist/${this.spotifyId}`;
        }
        return null;
    }

    public get key(): string {
        if (this.spotifyId) {
            return this.spotifyId;
        }
        return this.title + this.description;
    }

    public static fromJSON(data: SpotifyPlaylistJSON): SpotifyPlaylist {
        return new SpotifyPlaylist(
            data.title,
            data.description,
            data.tracks.map((t: SpotifyTrackJSON) => SpotifyTrack.fromJSON(t)),
            data.spotifyId!,
        );
    }


}