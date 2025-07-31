"use client";

import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Slider} from "@/components/ui/slider";
import UserPlaylists from "@/components/query/user-playlists";
import {Track} from "@/models/track/Track";
import SelectTracks from "@/components/query/select-tracks";
import {Artist} from "@/models/artist/Artist";
import SelectArtists from "@/components/query/select-artists";
import {useService} from "@/hooks/useService";
import {ServiceMapLabel} from "@/models/ServiceMap";
import {Playlist} from "@/models/playlist/Playlist";

type QueryBarProps = {
    fetchPlaylistAction: (query: string, playlistLength: number, temperature: number, nicheSlider: number, selectedPlaylist: Playlist<Track<Artist>> | null, selectedTracks: Track<Artist>[], selectedArtists: Artist[]) => Promise<void>;
    isLoading: boolean;
};

export default function QueryBar({fetchPlaylistAction, isLoading}: QueryBarProps) {

    const [query, setQuery] = useState<string>("");
    const [playlistLength, setPlaylistLength] = useState<number>(10);
    const [creativity, setCreativity] = useState<number>(1);
    const [popularity, setPopularity] = useState<number>(0.5);

    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist<Track<Artist>> | null>(null);
    const [selectedTracks, setSelectedTracks] = useState<Track<Artist>[]>([]);
    const [selectedArtists, setSelectedArtists] = useState<Artist[]>([]);

    const service = useService();

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                await fetchPlaylistAction(query, playlistLength, creativity, popularity, selectedPlaylist, selectedTracks, selectedArtists)
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
                        defaultValue={[1]}
                        min={0}
                        max={2}
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

                <div className={"col-span-12 md:col-span-4 w-full items-center"}>
                    {selectedPlaylist ?
                        <div className={"flex justify-between bg-accent rounded-md p-1 px-2 text-center items-center gap-1"}>
                            <span className={"font-bold m-auto"}>Selected Playlist:</span><span className={"m-auto text-sm"}> {selectedPlaylist.title}</span>
                            <Button
                                onClick={() => setSelectedPlaylist(null)}
                                variant={"ghost"}
                                className={"m-auto"}
                            >
                                X
                            </Button>
                        </div>
                        : <UserPlaylists setSelectedPlaylistAction={setSelectedPlaylist}/>}
                </div>
                <div className={"col-span-12 md:col-span-4 w-full items-center"}>
                    <SelectTracks tracks={selectedTracks} setTracks={setSelectedTracks}/>
                </div>

                <div className={"col-span-12 md:col-span-4 w-full items-center"}>
                    <SelectArtists
                        artists={selectedArtists}
                        setArtists={setSelectedArtists}
                    />
                </div>

                <Button
                    variant={"default"}
                    size={"lg"}
                    disabled={isLoading}
                    type="submit"
                    className={"col-span-12 text-center leading-snug break-words whitespace-normal h-auto text-xl font-medium"}
                >
                    Generate {ServiceMapLabel[service!]} Playlist
                </Button>
            </div>
        </form>
    );

}