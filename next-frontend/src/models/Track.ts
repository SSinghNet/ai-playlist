import type {Artist, SoundCloudArtist, SpotifyArtist} from "./Artist.ts";

export interface Track<T extends Artist> {
    name: string;
    artists: T[];
    durationMs: number;
    imageUrl?: string;
}

export class SpotifyTrack implements Track<SpotifyArtist> {
    name: string;
    durationMs: number;
    imageUrl?: string | undefined;
    id: string;
    uri: string;
    artists: SpotifyArtist[];

    constructor(name: string, durationMs: number, imageUrl: string | undefined, id: string, uri: string, artists: SpotifyArtist[]) {
        this.name = name;
        this.durationMs = durationMs;
        this.imageUrl = imageUrl;
        this.id = id;
        this.uri = uri;
        this.artists = artists;
    }
}

export class SoundCloudTrack implements Track<SoundCloudArtist> {
    name: string;
    durationMs: number;
    imageUrl?: string | undefined;
    urn: string;
    url: string;
    artists: SoundCloudArtist[];

    constructor(name: string, durationMs: number, imageUrl: string | undefined, urn: string, url: string, artists: SoundCloudArtist[]) {
        this.name = name;
        this.durationMs = durationMs;
        this.imageUrl = imageUrl;
        this.urn = urn;
        this.url = url;
        this.artists = artists;
    }
}