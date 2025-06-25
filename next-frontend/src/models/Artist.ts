export interface Artist {
    name: string;
    imageUrl: string;
}

export class SpotifyArtist implements Artist {
    name: string;
    imageUrl: string;
    id: string;
    uri: string;

    constructor(name: string, imageUrl: string, id: string, uri: string) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.id = id;
        this.uri = uri;
    }
}

export class SoundCloudArtist implements Artist {
    name: string;
    imageUrl: string;
    urn: string;
    url: string;

    constructor(name: string, imageUrl: string, urn: string, url: string) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.urn = urn;
        this.url = url;
    }
}

