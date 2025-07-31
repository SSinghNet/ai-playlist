import TrackCard from "@/components/new/track-card";
import {Button} from "@/components/ui/button";
import {Track} from "@/models/track/Track";
import {Artist} from "@/models/artist/Artist";
import {Playlist} from "@/models/playlist/Playlist";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import MusicNoteIcon from "@/components/music-note-icon";
import Profile from "@/models/profile/Profile";
import {ServiceMapProfile} from "@/models/ServiceMap";
import {useService} from "@/hooks/useService";
import {useAccessToken} from "@/hooks/useAccessToken";
import {useState} from "react";
import LoadingSpinner from "@/components/ui/spinner";
import {toast} from "sonner";

export default function PlaylistTile({playlist, addSelectedTrack}: {
    playlist: Playlist<Track<Artist>>,
    addSelectedTrack: (track: Track<Artist>) => void
}) {
    const service = useService();
    const accessToken = useAccessToken();

    let profile: Profile;
    if (service) {
        profile = new ServiceMapProfile[service]();
    }

    const [_playlist, setPlaylist] = useState(playlist);
    const [loading, setLoading] = useState(false);

    const fetchPlaylist = async () => {
        try {
            if (!accessToken || !profile) return;
            if (_playlist.tracks.length === 0) {
                setLoading(true);
                setPlaylist(await profile.fetchPlaylist(playlist.key, accessToken));
                setLoading(false);
            }
        } catch (err) {
            toast.error((err as Error).message);
        }
    }

    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger onClick={fetchPlaylist}>
                <div
                    className={"px-4 py-2 text-left rounded-sm drop-shadow-md bg-card text-foreground flex flex-row items-center gap-4 max-h-50 overflow-y-hidden"}>
                    <div>
                        <MusicNoteIcon width={25} height={25} color={"white"}/>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className={"text-md font-bold"}> {_playlist.title} </span>
                        <span
                            className={"text-sm text-foreground/75 truncate whitespace-nowrap overflow-y-hidden text-ellipsis"}>{_playlist.description}</span>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className={"overflow-y-auto max-h-11/12 min-w-2/3"}>
                <DialogHeader>
                    <DialogTitle className={"text-2xl font-bold"}>
                        {_playlist.title}
                    </DialogTitle>
                    <DialogDescription>
                        {_playlist.description}
                    </DialogDescription>
                    {!loading &&
                        <Button
                            className={"p-0 m-0 aspect-square flex items-center justify-center rounded-md text-xl drop-shadow-md"}
                            onClick={() => {
                                _playlist.tracks.forEach((t) => addSelectedTrack(t));
                                setOpen(false)
                            }}
                        >
                            +
                        </Button>
                    }
                </DialogHeader>
                <div className="flex flex-col items-center gap-3 justify-center">
                    <div className={"w-full grid grid-cols-1 gap-2 items-center justify-center"}>
                        {_playlist.tracks?.map((track: Track<Artist>) => (
                            track.key ?
                                <TrackCard
                                    track={track}
                                    key={track.key}
                                /> : null
                        ))}
                        {loading && <LoadingSpinner/>}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}