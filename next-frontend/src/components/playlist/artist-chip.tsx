import {SoundCloudArtist, SpotifyArtist} from "@/models/Artist";
import Image from "next/image";
import Link from "next/link";

export default function ArtistChip({artist, service}: {
    artist: SpotifyArtist | SoundCloudArtist,
    service?: "spotify" | "soundcloud"
}) {
    return (
        <>
            <Link
                href={ service === "spotify" ?
                    `https://open.spotify.com/artist/${(artist as SpotifyArtist).uri.replace("spotify:artist:", "")}`
                    : (artist as SoundCloudArtist).url}
                target="_blank"
                className={`hover:decoration-1 hover:underline`}
            >
                <div className={"flex flex-row gap-2 items-center"}>
                    <Image
                        src={artist.imageUrl ? artist.imageUrl : "/blank-artist-image.png"}
                        width={25}
                        height={25}
                        alt={artist.name}
                        className="rounded-full h-min aspect-square shadow-md"
                    />
                    <span className={"text-xs font-light"}> {artist.name} </span>
                </div>
            </Link>
        </>
    );
}