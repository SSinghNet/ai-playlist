import {Track} from "@/models/track/Track";
import {Artist} from "@/models/artist/Artist";
import {Playlist} from "@/models/playlist/Playlist";

export default interface GeneratePlaylistRequest {
    query: string;
    playlistLength: number;
    temperature: number;
    nicheSlider: number;
    playlist?: Playlist<Track<Artist>> | null;
    selectedTracks?: Track<Artist>[] | null;
    selectedArtists?: Artist[] | null;
}

export const GeneratePlaylistBodyString = (req: GeneratePlaylistRequest): string => JSON.stringify({
    userPrompt: req.query,
    playlistLength: req.playlistLength,
    temperature: req.temperature,
    nicheSlider: req.nicheSlider,
    tracks: [...((req.playlist?.tracks as Track<Artist>[]) || []), ...req.selectedTracks!],
    artists: req.selectedArtists as Artist[],
});