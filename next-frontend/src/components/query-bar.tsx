"use client";

import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Button} from "@/components/ui/button";

type QueryBarProps = {
    fetchPlaylistAction: (query: string, playlistLength: number) => Promise<void>;
    isLoading: boolean;
};

export default function QueryBar({fetchPlaylistAction, isLoading}: QueryBarProps) {

    const [query, setQuery] = useState<string>("");
    const [playlistLength, setPlaylistLength] = useState<number>(10);

    return (
        <div className="grid grid-cols-10 items-center gap-4 m-3">

            <Input
                placeholder={"Prompt For Your Playlist"}
                value={query}
                name={"query"}
                onChange={(e) => setQuery(e.target.value)}
                className={"col-span-10"}
            />
            <div className={"flex flex-row col-span-7 gap-1 items-center"}>
                <label htmlFor={"playlistLength"} className={"text-md"}>Length: </label>
                <Input
                    className={""}
                    type={"number"}
                    name={"playlistLength"}
                    value={playlistLength}
                    onChange={(e) => {
                        setPlaylistLength(parseInt(e.target.value))
                    }}
                />
            </div>
            <Button
                variant={"default"}
                onClick={async () => {
                    await fetchPlaylistAction(query, playlistLength)
                }}
                disabled={isLoading}
                className={"col-span-3 text-center leading-snug break-words whitespace-normal h-auto"}
            >
                Generate Playlist
            </Button>
        </div>
    );

}