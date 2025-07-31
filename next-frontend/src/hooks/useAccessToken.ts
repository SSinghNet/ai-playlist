import {useSession} from "next-auth/react";
import {Session} from "@/models/Session";

export function useAccessToken() : string | null {
    const {data: sessionData} = useSession();
    const session = sessionData as Session;
    if (!session) {
        return null;
    }
    return session?.token.access_token;
}