"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

declare global {
    interface Window {
        gtag?: (
            command: "config" | "event" | "js",
            targetId: string | Date,
            config?: Record<string, string>,
        ) => void;
    }
}

function PageViewTracker({ gaId }: { gaId: string }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!window.gtag) return;

        const query = searchParams.toString();
        const pagePath = query ? `${pathname}?${query}` : pathname;

        window.gtag("config", gaId, {
            page_path: pagePath,
        });
    }, [gaId, pathname, searchParams]);

    return null;
}

export default function GoogleAnalyticsPageView({ gaId }: { gaId: string }) {
    return (
        <Suspense fallback={null}>
            <PageViewTracker gaId={gaId} />
        </Suspense>
    );
}
