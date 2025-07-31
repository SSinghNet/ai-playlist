import Image from "next/image";
import {Card} from "@/components/ui/card";
import Link from "next/link";
import {Track} from "@/models/track/Track";
import {Artist} from "@/models/artist/Artist";
import {Button} from "@/components/ui/button";

export default function TrackTile({track, addSelectedTrack}: {
    track: Track<Artist>
    addSelectedTrack: (track: Track<Artist>) => void
}) {

    return (
        <Card className={"p-2 flex flex-row relative w-full items-center rounded-md justify-between border-0 drop-shadow-md "}>
            <div className={"flex flex-row gap-4 w-full"}>
                <Image
                    src={track.imageUrl}
                    width={50}
                    height={50}
                    alt={track.name}
                    className={"aspect-square h-min shadow-lg"}
                    key={track.key}
                />
                <div className={"flex flex-col gap-2"}>
                    <Link
                        href={track.url}
                        target="_blank"
                        className={`text-sm font-bold hover:decoration-1 hover:underline`}
                    >
                        {track.name}
                    </Link>
                    <div className={"text-xs"}>{
                        track.artists.map(artist => artist.name).join(', ')
                    }</div>
                </div>
            </div>
            <span className={"text-xs font-light m-auto"}>
                {track.duration}
            </span>
            <Button
                className={"p-0 m-0 aspect-square flex items-center justify-center rounded-md text-xl drop-shadow-md"}
                onClick={() => addSelectedTrack(track)}
            >
                +
            </Button>
        </Card>
    );
}