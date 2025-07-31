import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Slider} from "@/components/ui/slider";
import {Dispatch, SetStateAction, useState} from "react";
import UserLibraryData from "@/components/new/user-library-data";
import {Playlist} from "@/models/playlist/Playlist";
import {Track} from "@/models/track/Track";
import {Artist} from "@/models/artist/Artist";
import {PlaylistFactory} from "@/models/playlist/PlaylistFactory";
import {useService} from "@/hooks/useService";
import GenericArtist from "@/models/artist/GenericArtist";
import GenericTrack from "@/models/track/GenericTrack";
import {Badge} from "@/components/ui/badge";
import AddTrackDialog from "@/components/new/add-track-dialog";
import AddArtistDialog from "@/components/new/add-artist-dialog";
import {toast} from "sonner";

interface QueryProps {
    setPlaylistAction: Dispatch<SetStateAction<Playlist<Track<Artist>> | null>>,
    setLoadingAction: Dispatch<SetStateAction<boolean>>,
    loading: boolean
}

export default function Query({setPlaylistAction, setLoadingAction, loading}: QueryProps) {

    const service = useService();

    const [query, setQuery] = useState<string>("");
    const [playlistLength, setPlaylistLength] = useState<number>(10);
    const [creativity, setCreativity] = useState<number>(1);
    const [popularity, setPopularity] = useState<number>(0.5);

    const [selectedTracks, setSelectedTracks] = useState<GenericTrack[]>([]);
    const [selectedArtists, setSelectedArtists] = useState<GenericArtist[]>([]);

    const addSelectedTrack = (track: Track<Artist>) => {
        setSelectedTracks((prev) => [
            ...prev,
            new GenericTrack(track.name, track.artists.map((a: Artist) =>
                new GenericArtist(a.name)
            ))
        ]);
    }

    const addSelectedTrackGeneric = (track: GenericTrack) => {
        setSelectedTracks((prev) => [
            ...prev,
            track
        ]);
    }

    const removeSelectedTrack = (track: GenericTrack) => {
        setSelectedTracks((prev) =>
            prev.filter((t) => t.key !== track.key)
        );
    };

    const addSelectedArtist = (artist: Artist) => {
        setSelectedArtists((prev) =>
            [...prev, new GenericArtist(artist.name)]
        );
    }

    const addSelectedArtistGeneric = (artist: GenericArtist) => {
        setSelectedArtists((prev) =>
            [...prev, artist]
        );
    }

    const removeSelectedArtist = (artist: GenericArtist) => {
        setSelectedArtists((prev) =>
            prev.filter((a) => a.key !== artist.key)
        );
    };


    const generatePlaylist = async () => {
        try {
            const req = {
                query: query,
                playlistLength: playlistLength,
                temperature: creativity,
                nicheSlider: popularity,
                playlist: null,
                selectedTracks: selectedTracks,
                selectedArtists: selectedArtists,
            }

            setLoadingAction(true);

            setPlaylistAction(
                await PlaylistFactory.generatePlaylist(
                    service ? service : "spotify", req
                ).finally(() => setLoadingAction(false))
            );
        } catch (err) {
            toast.error((err as Error).message);
        }
    }

    return (
        <>
            <div className="grid grid-cols-13 items-center gap-6">
                <div className="col-span-13 flex flex-col gap-4">
                    <div className={"flex flex-row ml-1 mt-4 items-center gap-2 flex-wrap"}>
                        <span className={"text-md font-black text-background/60 uppercase"}>
                            Sample Prompts:
                        </span>
                        <Button
                            variant={"secondary"}
                            size={"sm"}
                            className={"bg-purple-700 opacity-55"}
                            onClick={() => setQuery("Surprise Me")}
                        >
                            Surprise Me
                        </Button>
                        <Button
                            variant={"secondary"}
                            size={"sm"}
                            className={"bg-pink-600 opacity-55"}
                            onClick={() => setQuery("Songs to study and vibe")}
                        >
                            Songs to study and vibe
                        </Button>

                        <Button
                            variant={"secondary"}
                            size={"sm"}
                            className={"bg-green-600 opacity-55"}
                            onClick={() => setQuery("Chill beats for a rainy night")}
                        >
                            Chill beats for a rainy night
                        </Button>

                        <Button
                            variant={"secondary"}
                            size={"sm"}
                            className={"bg-indigo-700 opacity-55"}
                            onClick={() => setQuery("Electronic tracks that feel like outer space")}
                        >
                            Electronic tracks that feel like outer space
                        </Button>

                        <Button
                            variant={"secondary"}
                            size={"sm"}
                            className={"bg-yellow-600 opacity-55"}
                            onClick={() => setQuery("Indie songs to cry and dance to")}
                        >
                            Indie songs to cry and dance to
                        </Button>

                        <Button
                            variant={"secondary"}
                            size={"sm"}
                            className={"bg-rose-700 opacity-55"}
                            onClick={() => setQuery("Hype songs for leg day")}
                        >
                            Hype songs for leg day
                        </Button>

                        <Button
                            variant={"secondary"}
                            size={"sm"}
                            className={"bg-sky-600 opacity-55"}
                            onClick={() => setQuery("Peaceful acoustic music for a morning walk")}
                        >
                            Peaceful acoustic music for a morning walk
                        </Button>

                        <Button
                            variant={"secondary"}
                            size={"sm"}
                            className={"bg-orange-700 opacity-55"}
                            onClick={() => setQuery("Fast-paced tracks with no lyrics")}
                        >
                            Fast-paced tracks with no lyrics
                        </Button>

                        <Button
                            variant={"secondary"}
                            size={"sm"}
                            className={"bg-lime-600 opacity-55"}
                            onClick={() => setQuery("Late night road trip vibes")}
                        >
                            Late night road trip vibes
                        </Button>

                        <Button
                            variant={"secondary"}
                            size={"sm"}
                            className={"bg-blue-800 opacity-55"}
                            onClick={() => setQuery("Ambient electronic with emotional depth")}
                        >
                            Ambient electronic with emotional depth
                        </Button>

                        <Button
                            variant={"secondary"}
                            size={"sm"}
                            className={"bg-fuchsia-700 opacity-55"}
                            onClick={() => setQuery("Old school hip-hop with jazzy samples")}
                        >
                            Old school hip-hop with jazzy samples
                        </Button>

                    </div>
                    <div className={"relative"}>
                        <Input
                            placeholder={"Enter your prompt..."}
                            value={query}
                            name={"query"}
                            onChange={(e) => setQuery(e.target.value)}
                            className={"text-lg md:text-xl h-15 bg-accent/90 text-foreground shadow-accent shadow-md border-4"}
                            min={3}
                            max={100}
                            autoComplete={"off"}
                        />
                        <Button
                            variant={"secondary"}
                            className={"absolute top-4 right-4 p-0 m-0 h-7 aspect-square bg-transparent flex items-center justify-center rounded-md text-xl"}
                            onClick={() => setQuery("")}
                        >
                            X
                        </Button>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <div className={"flex flex-row gap-2 items-center"}>
                            <span className={"text-md font-black text-background/60 uppercase"}>
                                Tracks for Inspiration:
                            </span>
                            <AddTrackDialog addSelectedTrack={addSelectedTrackGeneric} />
                            <Button
                                variant={"secondary"}
                                className={"p-0 m-0 h-7 aspect-square font-black text-red-500 bg-transparent hover:bg-transparent outline-0 shadow-none flex items-center justify-center rounded-md text-2xl"}
                                onClick={() => setSelectedTracks([])}
                            >
                                x
                            </Button>
                        </div>
                        {selectedTracks.length > 0 ? <div className={"flex flex-row gap-2 flex-wrap"}>
                            {selectedTracks.map((track) => (
                                <Badge
                                    key={`${track.key}-badge`}
                                    variant={"secondary"}
                                >
                                    {track.name} - {track.artists.map((a) => a.name).join(', ')}
                                    <Button
                                        variant={"outline"}
                                        className={"p-0 m-0 h-4 w-4 dark:bg-transparent outline-white rounded-full"}
                                        onClick={() => removeSelectedTrack(track)}
                                    >
                                        X
                                    </Button>
                                </Badge>
                            ))}
                        </div> : <span className={"opacity-40 text-sm"}>Add tracks to inspire your playlist...</span>}

                        <div className={"flex flex-row gap-2 items-center"}>
                            <span className={"text-md font-black text-background/60 uppercase"}>
                                Artists for Inspiration:
                            </span>
                            <AddArtistDialog addSelectedArtist={addSelectedArtistGeneric} />
                            <Button
                                variant={"secondary"}
                                className={"p-0 m-0 h-7 aspect-square font-black text-red-500 bg-transparent hover:bg-transparent outline-0 shadow-none flex items-center justify-center rounded-md text-2xl"}
                                onClick={() => setSelectedArtists([])}
                            >
                                x
                            </Button>
                        </div>
                        {selectedArtists.length > 0 ? <div className={"flex flex-row gap-2 flex-wrap"}>
                            {selectedArtists.map((a) => (
                                <Badge
                                    key={`${a.key}-badge`}
                                    variant={"secondary"}
                                >
                                    {a.name}
                                    <Button
                                        variant={"outline"}
                                        className={"p-0 m-0 h-4 w-4 dark:bg-transparent outline-white rounded-full"}
                                        onClick={() => removeSelectedArtist(a)}
                                    >
                                        X
                                    </Button>
                                </Badge>
                            ))}
                        </div> : <span className={"opacity-40 text-sm"}>Add artists to inspire your playlist...</span>}
                    </div>
                </div>
                <div
                    className="flex flex-col w-full col-span-13 md:col-span-13 lg:col-span-3 border-1 border-accent/10 rounded-md px-4 py-2 shadow-md ">
                    <label htmlFor={"playlistLength"} className={"text-md font-light"}>Length</label>
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
                <div
                    className="flex flex-col w-full col-span-13 md:col-span-13 lg:col-span-3 border-1 border-accent/10 rounded-md px-4 py-2 shadow-md ">
                    <label htmlFor={"creativity"} className={"text-md font-light"}>Creativity</label>
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
                <div
                    className="flex flex-col w-full col-span-13 md:col-span-13 lg:col-span-3 border-1 border-accent/10 rounded-md px-4 py-2 shadow-md ">
                    <label htmlFor={"popularity"} className={"text-md font-light"}>Popularity</label>
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
                <Button
                    className={"col-span-13 md:col-span-13 lg:col-span-4 shadow-accent shadow-sm border-accent border-1 h-full font-black text-2xl"}
                    variant={"secondary"}
                    size={"lg"}
                    disabled={loading}
                    onClick={generatePlaylist}
                >
                    Generate Playlist
                </Button>

            </div>
            {service &&
                <UserLibraryData
                    addSelectedTrack={addSelectedTrack}
                    addSelectedArtist={addSelectedArtist}
                />
            }
        </>
    )
}