import Profile from "@/models/profile/Profile";
import {SpotifyPlaylist} from "@/models/playlist/SpotifyPlaylist";
import {SpotifyTrack} from "@/models/track/SpotifyTrack";
import {SpotifyArtist} from "@/models/artist/SpotifyArtist";
import {TimeRange} from "@/models/TimeRange";
import SpotifyTrackJSON from "@/models/track/json/SpotifyTrackJSON";
import SpotifyArtistJSON from "@/models/artist/json/SpotifyArtistJSON";

export default class SpotifyProfile extends Profile {
    async fetchPlaylists(accessToken: string, limit: number, offset: number): Promise<{
        playlists: SpotifyPlaylist[];
        hasNext: boolean;
        hasPrev: boolean;
    }> {
        return await super.fetchPlaylistsImpl("spotify", accessToken, limit, offset) as {
            playlists: SpotifyPlaylist[];
            hasNext: boolean;
            hasPrev: boolean;
        };
    }

    async fetchTopTracks(accessToken: string, limit: number, term: TimeRange): Promise<SpotifyTrack[]> {
        try {
            return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/spotify/profile/top/tracks?accessToken=${accessToken}&limit=${limit}&timeRange=${term}`, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }).then(async (response) => {
                if (response.status !== 200) {
                    throw new Error("An error occurred while fetching top tracks. Please try again.");
                }
                const data = await response.json();

                return (data as SpotifyTrackJSON[])
                    .map((t) => SpotifyTrack.fromJSON(t)) as SpotifyTrack[];
            });
        } catch (err) {
            throw new Error(`Failed getting top tracks. Try signing out and back in or try again later: ${(err as Error).message}`);
        }
    }

    async fetchTopArtists(accessToken: string, limit: number, term: TimeRange): Promise<SpotifyArtist[]> {
        try {
            return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/spotify/profile/top/artists?accessToken=${accessToken}&limit=${limit}&timeRange=${term}`, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(async (response) => {
                if (response.status !== 200) {
                    throw new Error("An error occurred while fetching top artists. Please try again.");
                }
                const data = await response.json();

                return (data as SpotifyArtistJSON[])
                    .map((t) => SpotifyArtist.fromJSON(t)) as SpotifyArtist[];
            });
        } catch (err) {
            throw new Error(`Failed getting top artists. Try signing out and back in or try again later: ${(err as Error).message}`);
        }
    }

    async fetchPlaylist(key: string, accessToken: string): Promise<SpotifyPlaylist> {
        return await super.fetchPlaylistImpl("spotify", key, accessToken) as SpotifyPlaylist;
    }

}