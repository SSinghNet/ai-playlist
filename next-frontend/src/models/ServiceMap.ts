import {SpotifyPlaylist} from "@/models/playlist/SpotifyPlaylist";
import {SoundCloudPlaylist} from "@/models/playlist/SoundCloudPlaylist";
import {SoundCloudArtist} from "@/models/artist/SoundCloudArtist";
import {SpotifyTrack} from "@/models/track/SpotifyTrack";
import {SoundCloudTrack} from "@/models/track/SoundCloudTrack";
import {SpotifyArtist} from "@/models/artist/SpotifyArtist";
import SoundCloudProfile from "@/models/profile/SoundCloudProfile";
import SpotifyProfile from "@/models/profile/SpotifyProfile";
import Profile from "@/models/profile/Profile";

export type ServiceType = "spotify" | "soundcloud";

export const ServiceMapLabel = {
    spotify: "Spotify",
    soundcloud: "SoundCloud"
} as const;

export const ServiceMapColor = {
    spotify: "#1ed760",
    soundcloud: "#FB7C11",
}

export type ServiceMapPlaylist = {
    spotify: SpotifyPlaylist;
    soundcloud: SoundCloudPlaylist;
};
export type ServiceMapTrack = {
    spotify: SpotifyTrack;
    soundcloud: SoundCloudTrack;
};

export type ServiceMapArtist = {
    spotify: SpotifyArtist;
    soundcloud: SoundCloudArtist;
};

export const ServiceMapProfile: Record<ServiceType, new () => Profile> = {
    spotify: SpotifyProfile,
    soundcloud: SoundCloudProfile,
};