import GeneratePlaylistRequest, {GeneratePlaylistBodyString} from "@/models/playlist/GeneratePlaylistRequest";
import {ServiceType} from "@/models/ServiceMap";
import {SpotifyPlaylist} from "@/models/playlist/SpotifyPlaylist";
import {SoundCloudPlaylist} from "@/models/playlist/SoundCloudPlaylist";
import {Playlist} from "@/models/playlist/Playlist";
import {Track} from "@/models/track/Track";
import {Artist} from "@/models/artist/Artist";

export class PlaylistFactory {
    static async generatePlaylist(service: ServiceType, req: GeneratePlaylistRequest): Promise<Playlist<Track<Artist>>> {
        if (!req.query || req.query.length < 3 || req.query.length > 100) {
            throw new Error("Prompt must be at least 3 characters and no more than 100 characters.");
        }
        if (!req.playlistLength || req.playlistLength < 5 || req.playlistLength > 25) {
            throw new Error("Playlist length must be between 5 and 25.");
        }
        try {
            let serviceName = service;
            if (service === "demo"){
                serviceName = "spotify";
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${serviceName}/playlist/generate`, {
                method: "POST",
                body: GeneratePlaylistBodyString(req),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            if (res.status !== 200) {
                throw new Error("Error while fetching playlist. Try again later.");
            }


            const data = await res.json();
            localStorage.setItem(`playlist-${serviceName}`, JSON.stringify(data));
            switch (service) {
                case "demo":
                case 'spotify':
                    return SpotifyPlaylist.fromJSON(data) as SpotifyPlaylist;
                case 'soundcloud':
                    return SoundCloudPlaylist.fromJSON(data) as SoundCloudPlaylist;
                default:
                    throw new Error("Something went wrong.")
            }
        } catch (err: unknown) {
            throw new Error(`Failed to fetch playlist: ${(err as Error).message}`);
        }
    };
}