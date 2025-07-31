import {Artist} from "@/models/artist/Artist";
import SoundCloudArtistJSON from "@/models/artist/json/SoundCloudArtistJSON";

export class SoundCloudArtist extends Artist {
    private readonly urn: string;
    private readonly _url: string;

    constructor(
        name: string,
        imageUrl: string,
        urn: string,
        url: string
    ) {
        super(name, imageUrl);
        this.urn = urn;
        this._url = url;
    }

    public get key(): string {
        return this.urn;
    }
    public get url(): string{
        return this._url;
    }

    public static fromJSON(data: SoundCloudArtistJSON): SoundCloudArtist {
        return new SoundCloudArtist(
            data.name,
            data.imageUrl!,
            data.urn,
            data.url,
        )
    }
}

