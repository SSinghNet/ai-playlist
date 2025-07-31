export abstract class Artist {
    readonly name: string;
    private readonly _imageUrl?: string;

    protected constructor(
        name: string,
        imageUrl?: string
    ) {
        this.name = name;
        this._imageUrl = imageUrl;
    }

    public get imageUrl(): string {
        if (this._imageUrl) {
            return this._imageUrl;
        }
        return "/blank-artist-image.png";
    }

    public abstract get key(): string;
    public abstract get url(): string;
}

