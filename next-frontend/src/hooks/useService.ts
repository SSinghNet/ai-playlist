import {useAccessToken} from "@/hooks/useAccessToken";
import {useSession} from "next-auth/react";
import {Session} from "@/models/Session";
import {ServiceType} from "@/models/ServiceMap";
import {useDemoMode} from "@/context/DemoModeContext";

export function useService(): ServiceType | null{
    const {demoMode} = useDemoMode();

    const {data: sessionData} = useSession();
    const session = sessionData as Session;
    const accessToken = useAccessToken();

    if (demoMode) {
        return "demo";
    }

    if (!accessToken) {
        return null;
    }

    return session.token.sub.includes("soundcloud") ? "soundcloud" : "spotify";
}