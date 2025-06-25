import type { SoundCloudTrack, SpotifyTrack, Track } from "./Track.ts";
import {Artist} from "@/models/Artist";

export interface Playlist<T extends Track<Artist>> {
    title: string;
    description: string;
    tracks: T[];
}

export class SpotifyPlaylist implements Playlist<SpotifyTrack> {
    title: string;
    description: string;
    spotifyId?: string;
    tracks: SpotifyTrack[];

    constructor(
        title: string,
        description: string,
        tracks: SpotifyTrack[] = [],
        spotifyId?: string
    ) {
        this.title = title;
        this.description = description;
        this.tracks = tracks;
        this.spotifyId = spotifyId;
    }
}

export class SoundCloudPlaylist implements Playlist<SoundCloudTrack> {
    title: string;
    description: string;
    urn?: string;
    url?: string;
    tracks: SoundCloudTrack[];

    constructor(
        title: string,
        description: string,
        tracks: SoundCloudTrack[] = [],
        urn?: string,
        url?: string
    ) {
        this.title = title;
        this.description = description;
        this.tracks = tracks;
        this.urn = urn;
        this.url = url;
    }
}
