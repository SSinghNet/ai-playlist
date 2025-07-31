import Image from "next/image";
import Link from "next/link";
import {Artist} from "@/models/artist/Artist";

export default function ArtistChip({artist}: {
    artist: Artist
}) {

    return (
        <>
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
        </>
    );
}