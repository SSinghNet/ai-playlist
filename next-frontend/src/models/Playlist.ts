import type {Track} from "./Track.ts";

export interface Playlist {
    spotifyId?: string;
    title: string;
    description: string;
    tracks: Track[];
}