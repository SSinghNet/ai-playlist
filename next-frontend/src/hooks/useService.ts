import {useAccessToken} from "@/hooks/useAccessToken";
import {useSession} from "next-auth/react";
import {Session} from "@/models/Session";
import {ServiceType} from "@/models/ServiceMap";

export function useService(): ServiceType | null{
    const {data: sessionData} = useSession();
    const session = sessionData as Session;
    const accessToken = useAccessToken();

    if (!accessToken) {
        return null;
    }

    return session.token.sub.includes("soundcloud") ? "soundcloud" : "spotify";
}