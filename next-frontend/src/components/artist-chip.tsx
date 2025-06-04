import {Artist} from "@/models/Artist";
import Image from "next/image";
import Link from "next/link";

export default function ArtistChip({artist}: { artist: Artist }) {
    return (
        <>
            <Link
                href={`https://open.spotify.com/artist/${artist.uri.replace("spotify:artist:", "")}`}
                target="_blank"
                className={"hover:decoration-1 hover:decoration-[#1ed760] hover:underline"}
            >
                <div className={"flex flex-row gap-2 items-center"}>
                    <Image
                        src={artist.imageUrl ? artist.imageUrl : "/blank-artist-image.png"}
                        width={25}
                        height={25}
                        alt={artist.name}
                        className="rounded-full h-min aspect-square"
                    />
                    <span className={"text-sm font-light"}> {artist.name} </span>
                </div>
            </Link>
        </>
    );
}