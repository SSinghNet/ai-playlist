import {Artist} from "@/models/artist/Artist";

export abstract class Track<T extends Artist> {
    name: string;
    artists: T[];
    durationMs: number;
    _imageUrl?: string;

    protected constructor(
        name: string,
        artists: T[],
        durationMs: number,
        imageUrl?: string
    ) {
        this.name = name;
        this.artists = artists;
        this.durationMs = durationMs;
        this._imageUrl = imageUrl;
    }

    public get imageUrl(): string {
        if (this._imageUrl) {
            return this._imageUrl;
        }
        return "/blank-song-image.jpg";
    }

    public get duration(): string {
        const totalSeconds = Math.floor(this.durationMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    public abstract get url(): string;
    public abstract get key(): string;
}

