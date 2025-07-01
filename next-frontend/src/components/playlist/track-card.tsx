import {SoundCloudTrack, SpotifyTrack} from "@/models/Track";
import Image from "next/image";
import {Card, CardFooter} from "@/components/ui/card";
import ArtistChip from "@/components/playlist/artist-chip";
import {SoundCloudArtist, SpotifyArtist} from "@/models/Artist";
import SpotifyLogoFull from "@/components/spotify-logo-full";
import Link from "next/link";

export default function TrackCard({track, service}: {
    track: SpotifyTrack | SoundCloudTrack,
    service: "spotify" | "soundcloud"
}) {

    const totalSeconds = Math.floor(track.durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return (
        <Card className={"p-2 flex flex-row relative items-center w-full "}>
            <div className="flex flew-row space-between gap-3 items-center justify-center mb-4">
                <Image
                    src={track.imageUrl ? track.imageUrl : "/blank-artist-image.png"}
                    width={80}
                    height={80}
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
                        className={`text-lg font-bold hover:decoration-1 hover:underline`}
                    >
                        {track.name}
                    </Link>
                    <div className={"grid gap-2 justify-between grid-cols-1 md:grid-cols-2 xl:grid-cols-3"}>{
                        track.artists.map((artist: SpotifyArtist | SoundCloudArtist) => (
                            <ArtistChip
                                key={service === "spotify" ? (artist as SpotifyArtist).uri : (artist as SoundCloudArtist).urn}
                                artist={service === "spotify" ? artist as SpotifyArtist : artist as SoundCloudArtist}
                                service={service}
                            />
                        ))
                    }</div>
                    <span className={"text-xs font-light"}>
                        {minutes}:{seconds.toString().padStart(2, "0")}
                    </span>
                </div>
            </div>
            {service === "spotify" ?
                <CardFooter className={"absolute bottom-2 right-[-10] font-extralight text-[0.7em]"}>
                    Metadata provided by&nbsp;<SpotifyLogoFull className={"w-12"} inverted={true}/>
                </CardFooter>
                : ""
            }
        </Card>
    );
}