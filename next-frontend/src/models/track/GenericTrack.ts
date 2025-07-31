import {Track} from "@/models/track/Track";
import GenericArtist from "@/models/artist/GenericArtist";
import {random} from "nanoid";

export default class GenericTrack extends Track<GenericArtist> {
    public get url(): string {
        return "#";
    }
    private _key : string | undefined;
    public get key(): string {
        if (!this._key){
            this._key = this.name + random(10);
        }
        return this._key;
    }
    constructor(
        name: string,
        artists: GenericArtist[],
    ) {
        super(name, artists, 0);
    }
}