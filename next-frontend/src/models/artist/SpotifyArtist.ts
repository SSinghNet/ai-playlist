import {Artist} from "@/models/artist/Artist";
import SpotifyArtistJSON from "@/models/artist/json/SpotifyArtistJSON";

export class SpotifyArtist extends Artist {
    private readonly id: string;
    private readonly uri: string;

    constructor(
        name: string,
        imageUrl: string,
        id: string,
        uri: string
    ) {
        super(name, imageUrl);
        this.id = id;
        this.uri = uri;
    }

    public get key(): string{
        return this.uri;
    }
    public get url(): string{
        return `https://open.spotify.com/track/${this.uri.replace("spotify:track:", "")}`;
    }

    public static fromJSON(data: SpotifyArtistJSON): SpotifyArtist {
        return new SpotifyArtist(
            data.name,
            data.imageUrl!,
            data.id,
            data.uri,
        )
    }
}

