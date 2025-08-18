import Image from "next/image";
import Link from "next/link";
import {Artist} from "@/models/artist/Artist";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";

export default function ArtistTile({artist, addSelectedArtist}: {
    artist: Artist,
    addSelectedArtist: (artist: Artist) => void
}) {

    return (
        <Card
            className={"p-2 flex flex-row relative w-full items-center rounded-md justify-between border-0 drop-shadow-md "}>
            <div className={"flex flex-row gap-4 w-full"}>
                <Link
                    href={artist.url}
                    target="_blank"
                    className={`hover:decoration-1 hover:underline`}
                >
                    <div className={"flex flex-row gap-2 items-center"}>
                        <Image
                            src={artist.imageUrl}
                            width={25}
                            height={25}
                            alt={artist.name}
                            className="rounded-full h-min aspect-square shadow-md"
                            key={artist.key}
                        />
                        <span className={"text-xs font-light"}> {artist.name} </span>
                    </div>
                </Link>
            </div>
            <Button
                className={"p-0 m-0 aspect-square flex items-center justify-center rounded-md text-xl drop-shadow-md"}
                onClick={() => addSelectedArtist(artist)}
            >
                +
            </Button>
        </Card>
    );
}