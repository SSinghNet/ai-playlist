import SpotifyArtistJSON from "@/models/artist/json/SpotifyArtistJSON";

export default interface SpotifyTrackJSON {
    name: string,
    artists: SpotifyArtistJSON[],
    durationMs: number,
    id: string,
    uri: string,
    imageUrl?: string,
}