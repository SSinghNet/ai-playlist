import SpotifyTrackJSON from "@/models/track/json/SpotifyTrackJSON";

export default interface SpotifyPlaylistJSON {
    title: string,
    description: string,
    tracks: SpotifyTrackJSON[],
    spotifyId?: string,
}