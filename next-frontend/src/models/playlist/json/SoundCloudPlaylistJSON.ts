import SoundCloudTrackJSON from "@/models/track/json/SoundCloudTrackJSON";

export default interface SoundCloudPlaylistJSON {
    title: string,
    description: string,
    tracks: SoundCloudTrackJSON[],
    urn?: string,
    url?: string
}