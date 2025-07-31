"use client";

import {useService} from "@/hooks/useService";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";

export default function ServiceRedirect({children}: { children: React.ReactNode; }){
    const service = useService();
    const router = useRouter();

    useEffect(() => {
        if (!service) {
            router.replace("/");
        } else {
            router.replace("/app");
        }

    }, [service, router]);

    return <>{children}</>;
}