'use client'

import {signIn, signOut} from "next-auth/react";
import {Button} from "@/components/ui/button";
import SpotifyLogoFull from "@/components/spotify-logo-full";
import {useEffect} from "react";
import {useService} from "@/hooks/useService";
import {useAccessToken} from "@/hooks/useAccessToken";
import {useDemoMode} from "@/context/DemoModeContext";
import {useRouter} from "next/navigation";


export default function LoginWithProviders() {
    const accessToken = useAccessToken();
    const service = useService();
    const router = useRouter();

    const {setDemoMode} = useDemoMode();

    const fetchProfile = async () => {
        if (service === "demo") return null;
        if (accessToken) {
            return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${service}/profile/playlists?accessToken=${accessToken}&limit=1&offset=0`, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            });
        }
        return null;
    }

    useEffect(() => {
        if (service === "demo") return;
        if (service) {
            fetchProfile().then(async (res) => {
                if (res!.status !== 200) {
                    await signOut();
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [service, accessToken]);

    const border = service === "spotify" ? "border-[#1ed760] dark:border-[#1ed760] shadow-[#1ed760] shadow-sm" : "border-[#FB7C11] dark:border-[#FB7C11] shadow-[#FB7C11] shadow-sm";

    return (
        <div className={"flex gap-2 flex-row justify-center md:justify-end"}>
            {service ? (service === "demo")
                    ? <Button
                        onClick={() => setDemoMode(false)}
                        className={`object-right border-white dark:border-white shadow-white shadow-sm`}
                        variant={"outline"}
                        size={"sm"}
                    >
                        Leave Guest Mode
                    </Button>
                    :
                    <Button
                        onClick={() => signOut()}
                        className={`object-right ${border}`}
                        variant={"outline"}
                        size={"sm"}
                    >
                        Log Out of
                        {service === "soundcloud" ? (
                            "SoundCloud"
                        ) : (
                            <SpotifyLogoFull className="w-15" inverted/>
                        )}
                    </Button> :
                <div className={"grid grid-cols-1 md:grid-cols-3 gap-2"}>
                    <Button
                        onClick={() => signIn("spotify")}
                        className={"flex border-[#1ed760] dark:border-[#1ed760] shadow-[#1ed760] shadow-sm col-span-1"}
                        variant={"outline"}
                        size={"sm"}
                    >
                        Sign In With <SpotifyLogoFull className={"w-15"} inverted={true}/>
                    </Button>
                    <Button
                        onClick={() => signIn("soundcloud")}
                        className={"flex border-[#FB7C11] dark:border-[#FB7C11] shadow-[#FB7C11] shadow-sm col-span-1"}
                        variant={"outline"}
                        size={"sm"}
                    >
                        Sign In With SoundCloud
                    </Button>

                    <Button
                        onClick={() => {
                            setDemoMode(true);
                            router.replace("/app");
                        }}
                        className={"flex border-white dark:border-white shadow-white shadow-sm col-span-1"}
                        variant={"outline"}
                        size={"sm"}
                    >
                        Sign In As Guest
                    </Button>
                </div>
            }
        </div>
    );
}