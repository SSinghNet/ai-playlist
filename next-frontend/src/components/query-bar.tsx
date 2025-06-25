"use client";

import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Slider} from "@/components/ui/slider";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {useSession} from "next-auth/react";
import {Session} from "@/models/Session";
import {toast} from "sonner";
import {SpotifyPlaylist} from "@/models/Playlist";
import PlaylistTile from "@/components/playlist-tile";

type QueryBarProps = {
    fetchPlaylistAction: (query: string, playlistLength: number, temperature: number, nicheSlider: number) => Promise<void>;
    isLoading: boolean;
    service: "soundcloud" | "spotify";
};

export default function QueryBar({fetchPlaylistAction, isLoading, service}: QueryBarProps) {

    const [query, setQuery] = useState<string>("");
    const [playlistLength, setPlaylistLength] = useState<number>(10);
    const [creativity, setCreativity] = useState<number>(0.5);
    const [popularity, setPopularity] = useState<number>(0.5);

    const [userPlaylists, setUserPlaylists] = useState<SpotifyPlaylist[]>([]);

    const {data: sessionData} = useSession();
    const session = sessionData as Session;
    const accessToken = session?.token.access_token;

    const fetchUserPlaylists = async () => {
        if (!accessToken || service !== "spotify") {
            return;
        }
        try {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${service}/profile/playlists?accessToken=${accessToken}&limit=5&offset=0`, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }).then(async (response) => {
                if (response.status !== 200) {
                    toast.error("An error occurred while fetching user playlists. Please try again.");
                    console.error(response);
                    return;
                }
                const data = await response.json();
                setUserPlaylists(data.playlists as SpotifyPlaylist[]);
            });
        } catch (err) {
            toast.error("Failed getting user playlists. Try signing out and back in or try again later.");
            console.error("Failed to fetch playlists:", err);
        }
    };

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                await fetchPlaylistAction(query, playlistLength, creativity, popularity)
            }}
        >
            <div className="grid grid-cols-12 items-center gap-4 m-6">
                <Input
                    placeholder={"Prompt For Your Playlist"}
                    value={query}
                    name={"query"}
                    onChange={(e) => setQuery(e.target.value)}
                    className={"col-span-12 text-lg md:text-xl h-15"}
                    min={3}
                    max={100}
                />
                <div className="flex flex-col w-full col-span-12 md:col-span-4 ">
                    <label htmlFor={"playlistLength"} className={"text-md opacity-75 font-light"}>Length</label>
                    <Slider
                        name={"playlistLength"}
                        defaultValue={[10]}
                        min={5}
                        max={25}
                        thumbValue={playlistLength.toString()}
                        leftLabel={"5"}
                        rightLabel={"25"}
                        step={1}
                        value={[playlistLength]}
                        onValueChange={(val) => {
                            setPlaylistLength(val[0])
                        }}
                    />
                </div>
                <div className="flex flex-col w-full col-span-12 md:col-span-4 ">
                    <label htmlFor={"creativity"} className={"text-md opacity-75 font-light"}>Creativity</label>
                    <Slider
                        name={"creativity"}
                        defaultValue={[0.5]}
                        min={0}
                        max={1}
                        step={.01}
                        leftLabel={"Predictable"}
                        rightLabel={"Creative"}
                        value={[creativity]}
                        onValueChange={(val) => {
                            setCreativity(val[0])
                        }}
                    />

                </div>
                <div className="flex flex-col w-full col-span-12 md:col-span-4 ">
                    <label htmlFor={"popularity"} className={"text-md opacity-75 font-light"}>Popularity</label>
                    <Slider
                        name={"popularity"}
                        defaultValue={[0.5]}
                        min={0}
                        max={1}
                        step={.01}
                        leftLabel={"Mainstream"}
                        rightLabel={"Niche"}
                        value={[popularity]}
                        onValueChange={(val) => {
                            setPopularity(val[0])
                        }}
                    />
                </div>

                {false && accessToken && service === "spotify" ?
                    <Dialog>
                        <DialogTrigger
                            className={"col-span-12 md:col-span-4 bg-accent text-accent-foreground shadow-xs hover:bg-accent/90 rounded-md p-2"}
                            onClick={fetchUserPlaylists}
                        >
                            Use Playlist
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Playlist List</DialogTitle>
                                <DialogDescription>
                                    Choose a playlist to inspire your new generated playlist.
                                </DialogDescription>
                            </DialogHeader>
                            {
                                userPlaylists ? userPlaylists.map((playlist) => <PlaylistTile key={playlist.spotifyId} playlist={playlist} />)
                                    : "Loading..."
                            }
                        </DialogContent>
                    </Dialog>
                    : ""}

                <Button
                    variant={"default"}
                    size={"lg"}
                    disabled={isLoading}
                    type="submit"
                    className={"col-span-12 text-center leading-snug break-words whitespace-normal h-auto text-xl font-medium"}
                >
                    Generate {service == "spotify" ? "Spotify" : "SoundCloud"} Playlist
                </Button>
            </div>
        </form>
    );

}