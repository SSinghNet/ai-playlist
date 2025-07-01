import {SoundCloudTrack, SpotifyTrack} from "@/models/Track";
import Image from "next/image";
import {Card} from "@/components/ui/card";
import ArtistChip from "@/components/playlist/artist-chip";
import {SoundCloudArtist, SpotifyArtist} from "@/models/Artist";
import Link from "next/link";

export default function TrackTile({track, service}: {
    track: SpotifyTrack | SoundCloudTrack,
    service: "spotify" | "soundcloud"
}) {

    const totalSeconds = Math.floor(track.durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return (
        <Card className={"p-2 flex flex-row relative w-full justify-between "}>
            <div className={"flex flex-row  gap-4 w-full"}>
                <Image
                    src={track.imageUrl ? track.imageUrl : "/blank-artist-image.png"}
                    width={50}
                    height={50}
                    alt={track.name}
                    className={"aspect-square h-min shadow-lg"}
                />
                <div className={"flex flex-col gap-2"}>
                    <Link
                        href={
                            service === "spotify" ?
                                `https://open.spotify.com/track/${(track as SpotifyTrack).uri.replace("spotify:track:", "")}`
                                : (track as SoundCloudTrack).url
                        }
                        target="_blank"
                        className={`text-sm font-bold hover:decoration-1 hover:underline`}
                    >
                        {track.name}
                    </Link>
                    <div className={"grid gap-2 justify-between grid-cols-1 md:grid-cols-2 xl:grid-cols-3 text-xs"}>{
                        track.artists.map((artist: SpotifyArtist | SoundCloudArtist) => (
                            <ArtistChip
                                key={service === "spotify" ? (artist as SpotifyArtist).uri : (artist as SoundCloudArtist).urn}
                                artist={service === "spotify" ? artist as SpotifyArtist : artist as SoundCloudArtist}
                                service={service}
                            />
                        ))
                    }</div>
                </div>
            </div>
            <span className={"text-xs font-light  m-auto"}>
                {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
        </Card>
    );
}