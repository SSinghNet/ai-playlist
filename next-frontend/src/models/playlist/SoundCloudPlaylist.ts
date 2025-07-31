import {Playlist} from "@/models/playlist/Playlist";
import {SoundCloudTrack} from "@/models/track/SoundCloudTrack";
import SoundCloudTrackJSON from "@/models/track/json/SoundCloudTrackJSON";
import SoundCloudPlaylistJSON from "@/models/playlist/json/SoundCloudPlaylistJSON";

export class SoundCloudPlaylist extends Playlist<SoundCloudTrack> {
    private urn?: string;
    private _url?: string;

    constructor(
        title: string,
        description: string,
        tracks: SoundCloudTrack[],
        urn?: string,
        url?: string
    ) {
        super(title, description, tracks);
        this.urn = urn;
        this._url = url;
    }

    public get url(): string | null {
        return this._url ? this._url : null;
    }

    public get key(): string {
        if (this.urn) {
            return this.urn;
        }
        return this.title + this.description;
    }

    async exportPlaylist(accessToken: string): Promise<this> {
        const res = await super.exportPlaylistImpl('soundcloud',
            JSON.stringify({
                    playlist: this,
                    accessToken: accessToken
                }
            )
        );

        const {urn, url} = res as {urn: string, url: string}

        if (!urn || !url) {
            throw new Error("Error exporting playlist.")
        }

        this.urn = urn;
        this._url = url!;

        return this;
    }

    public static fromJSON(data: SoundCloudPlaylistJSON): SoundCloudPlaylist {
        return new SoundCloudPlaylist(
            data.title,
            data.description,
            data.tracks.map((t: SoundCloudTrackJSON) => SoundCloudTrack.fromJSON(t)),
            data.urn!,
            data.url!,
        );
    }
}
