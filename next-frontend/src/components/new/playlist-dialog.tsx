import TrackCard from "@/components/new/track-card";
import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction, useState} from "react";
import Link from "next/link";
import {Track} from "@/models/track/Track";
import {Artist} from "@/models/artist/Artist";
import {Playlist} from "@/models/playlist/Playlist";
import {useAccessToken} from "@/hooks/useAccessToken";
import {useService} from "@/hooks/useService";
import {ServiceMapColor, ServiceMapLabel, ServiceType} from "@/models/ServiceMap";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import MusicNoteIcon from "@/components/music-note-icon";
import {toast} from "sonner";

export default function PlaylistDialog({setPlaylistAction, playlist}: {
    setPlaylistAction: Dispatch<SetStateAction<Playlist<Track<Artist>> | null>>,
    playlist: Playlist<Track<Artist>>
}) {

    const [isExported, setIsExported] = useState<boolean>(false);

    const service: ServiceType | null = useService();
    const accessToken = useAccessToken();

    const exportPlaylist = async () => {
        try {
            if (!accessToken) {
                return;
            }
            const exportedPlaylist = await playlist.exportPlaylist(accessToken);

            setPlaylistAction(exportedPlaylist);
            setIsExported(true);

            toast.success("Playlist exported successfully.");
        } catch (err) {
            toast.error((err as Error).message);
        }
    }

    return (<Dialog>
            <DialogTrigger>
                <div
                    className={"px-4 py-2 text-left rounded-sm drop-shadow-md bg-gradient-to-tr from-blue-600 to-purple-800 text-foreground flex flex-row items-center gap-4 max-h-50 overflow-y-hidden"}>
                    <div>
                        <MusicNoteIcon width={50} height={50} color={"white"}/>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className={"text-md font-bold"}> {playlist.title} </span>
                        <span
                            className={"text-sm text-foreground/75 truncate whitespace-nowrap overflow-y-hidden text-ellipsis"}>{playlist.description}</span>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className={"overflow-y-auto max-h-11/12 min-w-2/3"}>
                <DialogHeader>
                    <DialogTitle className={"text-2xl font-bold"}>
                        {playlist.title}
                    </DialogTitle>
                    <DialogDescription>
                        {playlist.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-3 justify-center">
                    <div className={"flex flex-col items-center gap-2"}>
                        {(accessToken && service) ?
                            <Button
                                onClick={exportPlaylist}
                                variant={"secondary"}
                                disabled={isExported}
                                className={"flex items-center"}
                            >
                                Export Playlist to {ServiceMapLabel[service]}
                            </Button> : null
                        }
                        {playlist.key && playlist.url ?
                            <>
                                <Link
                                    href={playlist.url}
                                    target={"_blank"}
                                >
                                    {service ?
                                        <Button
                                            className={`flex bg-card/85 border-2 border-[${ServiceMapColor[service]}] dark:border-[${ServiceMapColor[service]}]`}
                                            variant={"secondary"}
                                        >
                                            View Exported Playlist On {ServiceMapLabel[service]}
                                        </Button> : ""
                                    }
                                </Link>
                            </> : ""
                        }
                    </div>
                    <div className={"w-full grid grid-cols-1 gap-2"}>
                        {playlist.tracks?.map((track: Track<Artist>) => (
                            track.key ?
                                <TrackCard
                                    track={track}
                                    key={track.key}
                                /> : null
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}