import {Dispatch, SetStateAction, useState} from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogHeader
} from "@/components/ui/dialog";
import {Track} from "@/models/track/Track";
import {Artist} from "@/models/artist/Artist";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import TrackTile from "@/components/new/track-tile";
import {SpotifyTrack} from "@/models/track/SpotifyTrack";
import {useService} from "@/hooks/useService";
import {useAccessToken} from "@/hooks/useAccessToken";

export default function SelectTracks({tracks, setTracks}: {
    tracks: Track<Artist>[],
    setTracks: Dispatch<SetStateAction<Track<Artist>[]>>
}) {

    const service = useService();
    const accessToken = useAccessToken();

    const [name, setName] = useState<string>("");
    const [artist, setArtist] = useState<string>("");

    const addTrack = () => {
        if (name.length === 0 || artist.length === 0) return;
        setTracks([...tracks, {name: name, artists: [{name: artist}]} as Track<Artist>]);
        setName("");
        setArtist("");
    };

    const removeTrack= (t : Track<Artist>) => {
        setTracks(tracks.filter(track => track.name !== t.name && track.artists[0].name !== t.artists[0].name));
    };

    const [topTracks, setTopTracks] = useState<Track<Artist>[]>([]);
    const limit = 20;

    const fetchTopTracks = async () => {
        if (!accessToken) {
            return;
        }
        try {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${service}/profile/top/tracks?accessToken=${accessToken}&limit=${limit}&timeRange=MEDIUM_TERM`, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }).then(async (response) => {
                if (response.status !== 200) {
                    toast.error("An error occurred while fetching top tracks. Please try again.");
                    console.error(response);
                    return;
                }
                const data = await response.json();

                setTopTracks(
                    data as SpotifyTrack[]
                );
            });
        } catch (err) {
            toast.error("Failed getting top tracks. Try signing out and back in or try again later.");
            console.error("Failed to fetch top tracks:", err);
        }
    };


    return (
        <Dialog>
            <DialogTrigger
                className={"w-full bg-accent text-accent-foreground shadow-xs hover:bg-accent/90 rounded-md p-2"}
                onClick={fetchTopTracks}
            >
                Use Tracks
            </DialogTrigger>
            <DialogContent className={"overflow-y-auto max-h-[90%] min-w-[90%]"}>
                <DialogHeader>
                    <DialogTitle>Tracks</DialogTitle>
                    <DialogDescription>
                        Choose tracks to inspire your new generated playlist.
                    </DialogDescription>
                    Tracks:
                    {tracks.length > 0 && tracks.map((track: Track<Artist>) =>
                        <div key={track.name + track.key} className={"flex justify-between w-full"}>
                            <span>{track.name} - {track.artists[0].name}</span>
                            <Button variant={"outline"} onClick={() => removeTrack(track)}>-</Button>
                        </div>
                    )}

                    <label htmlFor={"name"}>Track Name: </label>
                    <Input type={"text"} name={"name"} value={name} onChange={(e) => setName(e.target.value)}/>
                    <label htmlFor={"name"}>Artist Name: </label>
                    <Input type={"text"} name={"artist"} value={artist} onChange={(e) => setArtist(e.target.value)}/>
                    <Button type={"submit"} onClick={addTrack}>Add</Button>

                    {service === "spotify" && accessToken && topTracks &&
                        <div>
                            Top Tracks:
                            <div className={"grid grid-cols-2 gap-4"}>
                                {topTracks.length == 0 && "Loading..."}
                                {topTracks.map((track: Track<Artist>) =>
                                    <div key={track.key + track.name}
                                         className={"flex flex-row"}
                                    >
                                        <TrackTile
                                            key={track.key + track.name}
                                            track={track}
                                            addSelectedTrack={()=>{}}
                                        />
                                        <Button
                                            key={track.key}
                                            variant={"outline"}
                                            className={"h-full aspect-square text-3xl m-0"}
                                            onClick={() => {
                                            setTracks([...tracks, {
                                                name: track.name,
                                                artists: [{name: track.artists[0].name}]
                                            } as Track<Artist>]);
                                        }}>
                                            +
                                        </Button>
                                    </div>)
                                }
                            </div>
                        </div>
                    }
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}