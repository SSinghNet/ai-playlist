import {Track} from "@/models/track/Track";
import {SoundCloudArtist} from "@/models/artist/SoundCloudArtist";
import SoundCloudArtistJSON from "@/models/artist/json/SoundCloudArtistJSON";
import SoundCloudTrackJSON from "@/models/track/json/SoundCloudTrackJSON";

export class SoundCloudTrack extends Track<SoundCloudArtist> {
    urn: string;
    _url: string;

    constructor(
        name: string,
        durationMs: number,
        urn: string,
        url: string,
        artists: SoundCloudArtist[],
        imageUrl?: string,
    ) {
        super(name, artists, durationMs, imageUrl);
        this.urn = urn;
        this._url = url;
    }

    public get key(){
        return this.urn;
    }

    public get url(): string{
        return this._url;
    }

    public static fromJSON(data: SoundCloudTrackJSON): SoundCloudTrack {
        return new SoundCloudTrack(
            data.name,
            data.durationMs,
            data.urn,
            data.url,
            data.artists.map((a: SoundCloudArtistJSON) => SoundCloudArtist.fromJSON(a)),
            data.imageUrl!,
        );
    }
}
