import {Artist} from "@/models/artist/Artist";
import {Track} from "@/models/track/Track";
import {Playlist} from "@/models/playlist/Playlist";
import {ServiceMapPlaylist, ServiceType} from "@/models/ServiceMap";
import {SpotifyPlaylist} from "@/models/playlist/SpotifyPlaylist";
import {SoundCloudPlaylist} from "@/models/playlist/SoundCloudPlaylist";
import {TimeRange} from "@/models/TimeRange";
import SpotifyPlaylistJSON from "@/models/playlist/json/SpotifyPlaylistJSON";
import SoundCloudPlaylistJSON from "@/models/playlist/json/SoundCloudPlaylistJSON";

export default abstract class Profile {

    abstract fetchPlaylists(accessToken: string, limit: number, offset: number): Promise<{
        playlists: Playlist<Track<Artist>>[];
        hasNext: boolean;
        hasPrev: boolean;
    }>;

    protected async fetchPlaylistsImpl(service: string, accessToken: string, limit: number, offset: number): Promise<{
        playlists: Playlist<Track<Artist>>[];
        hasNext: boolean;
        hasPrev: boolean;
    }> {
        try {
            return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${service}/profile/playlists?accessToken=${accessToken}&limit=${limit}&offset=${offset}`, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }).then(async (response) => {
                if (response.status !== 200) {
                    throw new Error("An error occurred while fetching user playlists. Please try again.");
                }
                const data = await response.json();

                const hasNext = (data.hasNext!);
                const hasPrevious = (data.hasPrevious!);
                switch (service) {
                    case 'spotify':
                        const playlistsS = (data.playlists as SpotifyPlaylistJSON[]).map(
                            (p) => SpotifyPlaylist.fromJSON(p)
                        ) as ServiceMapPlaylist[typeof service][];
                        return {playlists: playlistsS, hasNext: hasNext, hasPrev: hasPrevious};

                    case 'soundcloud':
                        const playlistsSC =  (data.playlists as SoundCloudPlaylistJSON[]).map(
                            (p) => SoundCloudPlaylist.fromJSON(p)
                        ) as ServiceMapPlaylist[typeof service][];
                        return {playlists: playlistsSC, hasNext: hasNext, hasPrev: hasPrevious};

                    default:
                        throw new Error("Something went wrong.");
                }
            });
        } catch (err) {
            throw new Error(`Failed getting user playlists. Try signing out and back in or try again later: ${(err as Error).message} `);
        }
    }

    abstract fetchTopTracks(accessToken: string, limit: number, term: TimeRange): Promise<Track<Artist>[]>;

    abstract fetchTopArtists(accessToken: string, limit: number, term: TimeRange): Promise<Artist[]>;

    abstract fetchPlaylist(key: string, accessToken: string): Promise<Playlist<Track<Artist>>>;

    async fetchPlaylistImpl(service: ServiceType, key: string, accessToken: string): Promise<Playlist<Track<Artist>>> {
        try {
            return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${service}/playlist/${key}?accessToken=${accessToken}&limit=20`, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }).then(async (response) => {
                if (response.status !== 200) {
                    throw new Error("Failed getting playlist. Try signing out and back in or try again later.");
                }
                const data = await response.json();
                switch (service) {
                    case 'spotify':
                        return SpotifyPlaylist.fromJSON(data) as ServiceMapPlaylist[typeof service];
                    case 'soundcloud':
                        return SoundCloudPlaylist.fromJSON(data) as ServiceMapPlaylist[typeof service];
                    default:
                        throw new Error("Something went wrong.")
                }
            });
        } catch (err) {
            throw new Error(`Failed to fetch playlists: ${(err as Error).message}`);
        }
    };
}