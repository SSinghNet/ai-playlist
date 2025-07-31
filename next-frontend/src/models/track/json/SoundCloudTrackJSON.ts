import SoundCloudArtistJSON from "@/models/artist/json/SoundCloudArtistJSON";

export default interface SoundCloudTrackJSON {
    name: string,
    durationMs: number,
    urn: string,
    url: string,
    artists: SoundCloudArtistJSON[],
    imageUrl?: string,
}