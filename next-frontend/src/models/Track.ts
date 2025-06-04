import type {Artist} from "./Artist.ts";

export interface Track {
    name: string;
    artists: Artist[];
    uri: string;
    durationMs: number;
    imageUrl: string;
}