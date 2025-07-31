import Profile from "@/models/profile/Profile";
import {SoundCloudPlaylist} from "@/models/playlist/SoundCloudPlaylist";
import {SoundCloudTrack} from "@/models/track/SoundCloudTrack";
import {SoundCloudArtist} from "@/models/artist/SoundCloudArtist";
import {TimeRange} from "@/models/TimeRange";

export default class SoundCloudProfile extends Profile {
    async fetchPlaylists(accessToken: string, limit: number, offset: number): Promise<{
        playlists: SoundCloudPlaylist[];
        hasNext: boolean;
        hasPrev: boolean;
    }>  {
        return await super.fetchPlaylistsImpl("soundcloud", accessToken, limit, offset) as {
            playlists: SoundCloudPlaylist[];
            hasNext: boolean;
            hasPrev: boolean;
        };
    }

    fetchTopTracks(accessToken: string, limit: number, term: TimeRange): Promise<SoundCloudTrack[]> {
        throw new Error("Operation not supported.");
    }

    fetchTopArtists(accessToken: string, limit: number, term: TimeRange): Promise<SoundCloudArtist[]> {
        throw new Error("Operation not supported.");
    }

    async fetchPlaylist(key: string, accessToken: string): Promise<SoundCloudPlaylist> {
        return await super.fetchPlaylistImpl("soundcloud", key, accessToken) as SoundCloudPlaylist;
    }

}