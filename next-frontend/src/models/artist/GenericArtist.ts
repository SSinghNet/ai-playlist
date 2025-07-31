import {Artist} from "@/models/artist/Artist";
import {random} from "nanoid";

export default class GenericArtist extends Artist {

    constructor(
        name: string,
    ) {
        super(name);
    }

    private _key : string | undefined;
    public get key(): string {
        if (!this._key){
            this._key = this.name + random(10);
        }
        return this._key;
    }
    public get url(): string {
        return "#";
    }

}