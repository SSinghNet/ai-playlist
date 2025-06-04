'use client'

import {signIn, signOut, useSession} from "next-auth/react";
import {SpotifySession} from "@/models/SpotifySession";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import SpotifyLogoFull from "@/components/spotify-logo-full";

export default function LoginWithSpotify() {

    const {data: sessionData} = useSession();
    const session = sessionData as SpotifySession;

    if (session) {
        return (
            <div className={"flex flex-row items-center gap-1 w-full justify-between"}>
                <div className="flex row items-center justify-center h-full gap-2">
                    <Image
                        src={session?.user?.image}
                        width={35}
                        height={35}
                        alt={session?.user?.name}
                        className="rounded-full"
                    />
                    <span className={"text-md"}>{session?.user?.name}</span>
                </div>
                <Button onClick={() => signOut()} className={"object-right"}>
                    Sign Out of <SpotifyLogoFull className={"w-15"}/>
                </Button>
            </div>
        )
    } else {
        return (
            <div className={"flex flex-row items-center gap-1 w-full justify-between "}>
                <div className="flex row items-center justify-center h-full gap-2">
                </div>
                <Button
                    onClick={() => signIn("spotify")}
                    className={"flex"}
                >
                    Sign In With <SpotifyLogoFull className={"w-15"}/>
                </Button>
            </div>
        )
    }
}