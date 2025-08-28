"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";

interface WindowWithGtag extends Window {
  gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
}

interface WindowWithAnalytics extends Window {
  analytics: {
    track: (event: string, properties?: Record<string, unknown>) => void;
    page: (url?: string) => void;
    identify: (userId: string, traits?: Record<string, unknown>) => void;
  };
}

interface AnalyticsProviderProps {
  children: React.ReactNode;
  gtmId?: string;
  jitsuHost?: string;
  jitsuWriteKey?: string;
}

export function AnalyticsProvider({
  children,
  gtmId,
  jitsuHost,
  jitsuWriteKey,
}: AnalyticsProviderProps) {
  return (
    <>
      {/* Google Tag Manager */}
      {gtmId && <GoogleTagManager gtmId={gtmId} />}

      {/* Jitsu Analytics */}
      {jitsuHost && jitsuWriteKey && (
        <Script
          id="jitsu-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Jitsu snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://t.jitsu.com/s/lib.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
              analytics.load("${jitsuWriteKey}", {
                host: "${jitsuHost}"
              });
              analytics.page();
              }}();
            `,
          }}
        />
      )}

      {children}
    </>
  );
}

// Analytics utilities
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && "gtag" in window) {
    (window as unknown as WindowWithGtag).gtag("event", eventName, properties);
  }

  if (typeof window !== "undefined" && "analytics" in window) {
    (window as unknown as WindowWithAnalytics).analytics.track(eventName, properties);
  }
};

export const trackPageView = (url?: string) => {
  if (typeof window !== "undefined" && "gtag" in window) {
    (window as unknown as WindowWithGtag).gtag("config", process.env.NEXT_PUBLIC_GTM_ID || "", {
      page_path: url,
    });
  }

  if (typeof window !== "undefined" && "analytics" in window) {
    (window as unknown as WindowWithAnalytics).analytics.page(url);
  }
};

export const identifyUser = (userId: string, traits?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && "analytics" in window) {
    (window as unknown as WindowWithAnalytics).analytics.identify(userId, traits);
  }
};
