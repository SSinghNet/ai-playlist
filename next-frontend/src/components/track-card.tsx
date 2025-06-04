import {Track} from "@/models/Track";
import Image from "next/image";
import {Card, CardFooter} from "@/components/ui/card";
import ArtistChip from "@/components/artist-chip";
import {Artist} from "@/models/Artist";
import SpotifyLogoFull from "@/components/spotify-logo-full";
import Link from "next/link";

export default function TrackCard({track}: { track: Track }) {

    const totalSeconds = Math.floor(track.durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return (
        <Card className={"p-3 flex flex-row relative items-center"}>
            <div className="flex flew-row space-between gap-4 items-center justify-center mb-4">
                <Image src={track.imageUrl} width={80} height={80} alt={track.name} className={"aspect-square h-min"}/>
                <div className={"flex flex-col gap-2"}>
                    <Link
                        href={`https://open.spotify.com/track/${track.uri.replace("spotify:track:", "")}`}
                        target="_blank"
                        className={"text-lg font-bold hover:decoration-1 hover:decoration-[#1ed760] hover:underline"}
                    >
                        {track.name}
                    </Link>
                    <div className={"grid gap-2 space-between grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}>{
                        track.artists.map((artist: Artist) => (
                            <ArtistChip key={artist.uri} artist={artist}/>
                        ))
                    }</div>
                    <span className={"text-xs font-light"}> {minutes}:{seconds.toString().padStart(2, "0")}</span>
                </div>
            </div>
            <CardFooter className={"absolute bottom-2 right-[-10] font-extralight text-[0.7em]"}>
                Metadata provided by&nbsp;<SpotifyLogoFull className={"w-12"} inverted={true}/>
            </CardFooter>
        </Card>
    );
}