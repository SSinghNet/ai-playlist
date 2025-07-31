import {Track} from "@/models/track/Track";
import {SpotifyArtist} from "@/models/artist/SpotifyArtist";
import SpotifyArtistJSON from "@/models/artist/json/SpotifyArtistJSON";
import SpotifyTrackJSON from "@/models/track/json/SpotifyTrackJSON";

export class SpotifyTrack extends Track<SpotifyArtist> {
    id: string;
    uri: string;

    constructor(
        name: string,
        artists: SpotifyArtist[],
        durationMs: number,
        id: string,
        uri: string,
        imageUrl?: string,
    ) {
        super(name, artists, durationMs, imageUrl);
        this.id = id;
        this.uri = uri;
    }

    public get key(): string {
        return this.uri;
    }

    public get url(): string{
        return `https://open.spotify.com/track/${this.uri.replace("spotify:track:", "")}`
    }

    public static fromJSON(data: SpotifyTrackJSON): SpotifyTrack {
        return new SpotifyTrack(
            data.name,
            data.artists.map((a: SpotifyArtistJSON) => SpotifyArtist.fromJSON(a)),
            data.durationMs,
            data.id,
            data.uri,
            data.imageUrl!,
        )
    }
}
