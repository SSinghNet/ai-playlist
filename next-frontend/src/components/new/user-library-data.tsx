import {useEffect, useState} from "react";
import {Playlist} from "@/models/playlist/Playlist";
import {Track} from "@/models/track/Track";
import {Artist} from "@/models/artist/Artist";
import Profile from "@/models/profile/Profile";
import {useAccessToken} from "@/hooks/useAccessToken";
import {useService} from "@/hooks/useService";
import {ServiceMapProfile} from "@/models/ServiceMap";
import TrackTile from "@/components/new/track-tile";
import ArtistTile from "@/components/new/artist-tile";
import LoadingSpinner from "@/components/ui/spinner";
import PlaylistTile from "@/components/new/playlist-tile";
import {TimeRange, TimeRanges} from "@/models/TimeRange";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";


interface UserLibraryDataProps {
    addSelectedTrack: (track: Track<Artist>) => void,
    addSelectedArtist: (artist: Artist) => void
}

export default function UserLibraryData({addSelectedTrack, addSelectedArtist}: UserLibraryDataProps) {

    const service = useService();
    const accessToken = useAccessToken();

    const [playlists, setPlaylists] = useState<Playlist<Track<Artist>>[] | null>(null);
    const [playlistHasPrev, setPlaylistHasPrev] = useState<boolean>(false);
    const [playlistHasNext, setPlaylistHasNext] = useState<boolean>(false);

    const limit = 12;
    const [playlistOffset, setPlaylistOffset] = useState<number>(0);

    const [tracks, setTracks] = useState<Track<Artist>[] | null>(null);
    const [artists, setArtists] = useState<Artist[] | null>(null);

    const [trackTerm, setTrackTerm] = useState<TimeRange>("SHORT_TERM");
    const [artistTerm, setArtistTerm] = useState<TimeRange>("SHORT_TERM");

    let profile: Profile;
    if (service) {
        profile = new ServiceMapProfile[service]();
    }
    useEffect(() => {
        if (!accessToken) return;
        const set = async () => {
            try {
                const playlistRes = await profile.fetchPlaylists(accessToken, limit, playlistOffset);
                setPlaylists(playlistRes.playlists);
                setPlaylistHasNext(playlistRes.hasNext);
                setPlaylistHasPrev(playlistRes.hasPrev);
            } catch (err) {
                toast.error((err as Error).message);
            }
            try {
                setTracks(await profile.fetchTopTracks(accessToken, limit, trackTerm));
            } catch (err) {
                toast.error((err as Error).message);
            }
            try {
                setArtists(await profile.fetchTopArtists(accessToken, limit, artistTerm));
            } catch (err) {
                toast.error((err as Error).message);
            }
        }
        set();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);

    useEffect(() => {
        try {
            if (!accessToken) return;
            const set = async () => {
                setPlaylists(null);
                try {
                    const playlistRes = await profile.fetchPlaylists(accessToken, limit, playlistOffset);
                    setPlaylists(playlistRes.playlists);
                    setPlaylistHasNext(playlistRes.hasNext);
                    setPlaylistHasPrev(playlistRes.hasPrev);
                } catch (err) {
                    toast.error((err as Error).message);
                }
            }
            set();
        } catch (err) {
            toast.error((err as Error).message);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playlistOffset]);

    useEffect(() => {
        try {
            if (!accessToken) return;
            const set = async () => {
                setTracks(null);
                try {
                    setTracks(await profile.fetchTopTracks(accessToken, limit, trackTerm));
                } catch (err) {
                    toast.error((err as Error).message);
                }
            }
            set();
        } catch (err) {
            toast.error((err as Error).message);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trackTerm]);

    useEffect(() => {
        try {
            if (!accessToken) return;
            const set = async () => {
                setArtists(null);
                try {
                    setArtists(await profile.fetchTopArtists(accessToken, limit, artistTerm));
                } catch (err) {
                    toast.error((err as Error).message);
                }
            }
            set();
        } catch (err) {
            toast.error((err as Error).message);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [artistTerm]);

    return (
        <>
            <div className={"flex flex-col gap-4"}>
                <span className={"text-xl font-black text-background/70 uppercase"}>
                    Your Playlists
                </span>
                <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"}>
                    {playlists ? playlists.map((playlist: Playlist<Track<Artist>>) => (
                        <PlaylistTile
                            key={playlist.key}
                            playlist={playlist}
                            addSelectedTrack={addSelectedTrack}
                        />
                    )) : <LoadingSpinner/>}
                </div>
                <div className={"flex flex-row gap-4 items-center justify-center"}>
                    <Button
                        variant={"secondary"}
                        onClick={() => setPlaylistOffset(playlistOffset - limit)}
                        disabled={!playlistHasPrev}
                    >
                        {"<"}
                    </Button>
                    <Button
                        variant={"secondary"}
                        onClick={() => setPlaylistOffset(playlistOffset + limit)}
                        disabled={!playlistHasNext}
                    >
                        {">"}
                    </Button>
                </div>
            </div>
            {service === "spotify" &&
                <div className={"flex flex-col gap-4"}>
                    <div className={"flex flex-row gap-4 items-center"}>
                        <span className={"text-xl font-black text-background/70 uppercase"}>
                            Your Top Tracks
                        </span>
                        <Select value={trackTerm} onValueChange={(e: TimeRange) => setTrackTerm(e)}>
                            <SelectTrigger
                                className={"bg-background dark:bg-background dark:hover:bg-accent text-foreground"}>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent className={"bg-background text-foreground"}>
                                {(Object.keys(TimeRanges) as TimeRange[]).map((key: TimeRange) =>
                                    <SelectItem key={`track-${key}`} value={key}>{TimeRanges[key]}</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"}>
                        {tracks ? tracks.map((track: Track<Artist>) => (
                            <TrackTile
                                track={track}
                                key={track.key + "tile" + track.key}
                                addSelectedTrack={addSelectedTrack}
                            />
                        )) : <LoadingSpinner/>}
                    </div>
                </div>
            }
            {service === "spotify" &&
                <div className={"flex flex-col gap-4"}>
                    <div className={"flex flex-row gap-4 items-center"}>
                        <span className={"text-xl font-black text-background/70 uppercase"}>
                            Your Top Artists
                        </span>
                        <Select value={artistTerm} onValueChange={(e: TimeRange) => setArtistTerm(e)}>
                            <SelectTrigger
                                className={"bg-background dark:bg-background dark:hover:bg-accent text-foreground"}>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent className={"bg-background text-foreground"}>
                                {(Object.keys(TimeRanges) as TimeRange[]).map((key: TimeRange) =>
                                    <SelectItem
                                        key={`track-${key}`}
                                        value={key}
                                    >
                                        {TimeRanges[key]}
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"}>
                        {artists ? artists.map((artist: Artist) => (
                            <ArtistTile
                                artist={artist}
                                key={artist.key + "tile" + artist.key}
                                addSelectedArtist={addSelectedArtist}
                            />
                        )) : <LoadingSpinner/>}
                    </div>
                </div>
            }
        </>
    );
}