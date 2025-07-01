import {Dispatch, SetStateAction, useState} from "react";
import {useSession} from "next-auth/react";
import {Session} from "@/models/Session";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogHeader
} from "@/components/ui/dialog";
import {Artist, SpotifyArtist} from "@/models/Artist";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {random} from "nanoid";
import {toast} from "sonner";
import ArtistChip from "@/components/playlist/artist-chip";

export default function SelectArtists({service, artists, setArtists}: {
    service: "spotify" | "soundcloud",
    artists: Artist[],
    setArtists: Dispatch<SetStateAction<Artist[]>>
}) {
    const {data: sessionData} = useSession();
    const session = sessionData as Session;
    const accessToken = session?.token.access_token;

    const [artist, setArtist] = useState<string>("");

    const addTrack = () => {
        if (artist.length === 0) return;
        setArtists([...artists, {name:artist} as Artist]);
        setArtist("");
    }

    const removeArtist = (a: Artist) => {
        setArtists(artists => artists.filter(b => b.name !== a.name));
    }

    const [topArtists, setTopArtists] = useState<SpotifyArtist[]>([]);
    const limit = 20;

    const fetchTopArtists = async () => {
        if (!accessToken) {
            return;
        }
        try {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${service}/profile/top/artists?accessToken=${accessToken}&limit=${limit}&timeRange=MEDIUM_TERM`, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }).then(async (response) => {
                if (response.status !== 200) {
                    toast.error("An error occurred while fetching top artists. Please try again.");
                    console.error(response);
                    return;
                }
                const data = await response.json();

                setTopArtists(
                    data as SpotifyArtist[]
                );
            });
        } catch (err) {
            toast.error("Failed getting top artists. Try signing out and back in or try again later.");
            console.error("Failed to fetch top artists:", err);
        }
    };

    return (
        <Dialog>
            <DialogTrigger
                className={"w-full bg-accent text-accent-foreground shadow-xs hover:bg-accent/90 rounded-md p-2"}
                onClick={fetchTopArtists}
            >
                Use Artists
            </DialogTrigger>
            <DialogContent className={"overflow-y-auto max-h-[90%] min-w-[90%]"}>
                <DialogHeader>
                    <DialogTitle>Artists</DialogTitle>
                    <DialogDescription>
                        Choose artists to inspire your new generated playlist.
                    </DialogDescription>
                    Artists:
                    {artists.length > 0 && artists.map((artist: Artist) =>
                        <div key={artist.name + random(10)} className={"flex justify-between"}>
                            <span>{artist.name}</span>
                            <Button variant={"outline"} onClick={() => removeArtist(artist)}>-</Button>
                        </div>
                    )}

                    <label htmlFor={"name"}>Artist Name: </label>
                    <Input type={"text"} name={"artist"} value={artist} onChange={(e) => setArtist(e.target.value)}/>
                    <Button type={"submit"} onClick={addTrack}>Add</Button>

                    {service === "spotify" && accessToken && topArtists &&
                        <div>
                            Top Artists:
                            <div className={"grid grid-cols-3 gap-4"}>
                                {topArtists.length == 0 && "Loading..."}
                                {topArtists.map((artist: SpotifyArtist) =>
                                    <div key={artist.uri + random(10)}
                                         className={"flex flex-row justify-between"}
                                    >
                                        <ArtistChip artist={artist} service={service}/>
                                        <Button
                                            key={artist.uri}
                                            size={"sm"}
                                            variant={"outline"}
                                            onClick={() => {
                                            setArtists([...artists, {
                                                name: artist.name,
                                            } as Artist]);
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