import Script from "next/script";
import GoogleAnalyticsPageView from "./GoogleAnalyticsPageView"

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const isProduction = process.env.NODE_ENV === "production";

export default function GoogleAnalytics() {
    if (!isProduction || !GA_MEASUREMENT_ID) {
        return null;
    }

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
            </Script>
            <GoogleAnalyticsPageView gaId={GA_MEASUREMENT_ID} />
        </>
    );
}
