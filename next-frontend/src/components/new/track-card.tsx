import Image from "next/image";
import {Card} from "@/components/ui/card";
import ArtistChip from "@/components/new/artist-chip";
import Link from "next/link";
import {Artist} from "@/models/artist/Artist";
import {Track} from "@/models/track/Track";

export default function TrackCard({track}: {
    track: Track<Artist>,
}) {

    return (
        <Card className={"px-0 py-0 flex flex-row relative items-center w-full rounded-none justify-between border-0 drop-shadow-md"}>
            <div className="flex flew-row space-between gap-3 items-center justify-center">
                <Image
                    src={track.imageUrl}
                    width={70}
                    height={70}
                    alt={track.name}
                    className={"aspect-square h-min shadow-lg"}
                    key={track.key}
                />
                <div className={"flex flex-col gap-2"}>
                    <Link
                        href={track.url}
                        target="_blank"
                        className={`text-md font-bold hover:decoration-1 hover:underline`}
                    >
                        {track.name}
                    </Link>
                    <div className={"grid gap-2 justify-between grid-cols-1 md:grid-cols-2 xl:grid-cols-3"}>{
                        track.artists.map((artist: Artist) => (
                            <ArtistChip
                                key={artist.key}
                                artist={artist}
                            />
                        ))
                    }</div>
                </div>
            </div>
            <span className={"text-sm font-light mr-4"}>
                {track.duration}
            </span>
        </Card>
    );
}