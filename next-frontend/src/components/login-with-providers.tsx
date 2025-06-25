'use client'

import {signIn, signOut, useSession} from "next-auth/react";
import {Session} from "@/models/Session";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import SpotifyLogoFull from "@/components/spotify-logo-full";

export default function LoginWithProviders() {

    const {data: sessionData} = useSession();
    const session = sessionData as Session;

    console.log(session);

    const service = session && session.token.sub.includes("soundcloud") ? "soundcloud" : "spotify";
    const border =  service === "spotify" ? "border-[#1ed760] dark:border-[#1ed760]" : "border-[#FB7C11] dark:border-[#FB7C11]";

    return (
        <div className={`flex flex-row items-center gap-1 w-full ${session ? "justify-between" : "justify-center"}`}>
            {session ?
                <div className="flex row items-center justify-center h-full gap-2">
                    <Image
                        src={session?.user?.image}
                        width={35}
                        height={35}
                        alt={session?.user?.name}
                        className="rounded-full"
                    />
                    <span className={"text-md"}>
                        {session?.user?.name}
                    </span>
                </div>
                : ""
            }
            <div className={"flex gap-2 flex-col"}>
                {session ?
                    <Button
                        onClick={() => signOut()}
                        className={`object-right ${border}`}
                        variant={"outline"}
                    >
                        Sign Out of {
                        session.token.sub.includes("soundcloud") ?
                            "SoundCloud"
                            : <SpotifyLogoFull className={"w-15"} inverted={true}/>}
                    </Button> :
                    <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
                        <Button
                            onClick={() => signIn("spotify")}
                            className={"flex border-[#1ed760] dark:border-[#1ed760] col-span-1"}
                            variant={"outline"}
                        >
                            Sign In With <SpotifyLogoFull className={"w-15"} inverted={true}/>
                        </Button>
                        <Button
                            onClick={() => signIn("soundcloud")}
                            className={"flex border-[#FB7C11] dark:border-[#FB7C11] col-span-1"}
                            variant={"outline"}
                        >
                            Sign In With SoundCloud
                        </Button>
                    </div>
                }
            </div>
        </div>
    );
}