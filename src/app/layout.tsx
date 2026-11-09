import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import MotionProvider from "@/components/providers/MotionProvider";
import { GsapProvider } from "@/components/providers/GsapProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import SiteNavigation from "@/components/landing/SiteNavigation";
import SiteFooter from "@/components/layout/SiteFooter";
import Analytics from "@/components/monitoring/Analytics";
import { ARRIVAL_BOOTSTRAP } from "@/lib/arrival-bootstrap";
import { ProfileProvider } from "@/lib/engine/profile";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Waymark — A bigger world. A clearer next step.",
  description:
    "A new perspective on your study-abroad journey. Explore the possibilities, find your direction, and take the next step with Waymark.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script id="waymark-arrival" dangerouslySetInnerHTML={{ __html: ARRIVAL_BOOTSTRAP }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Waymark",
              description:
                "Turn I want to study abroad into a dated plan. Pick a destination and intake, and every deadline is counted back from departure.",
              url: "https://waymark.example",
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Analytics />
        <MotionProvider>
          <GsapProvider>
            <SmoothScroll>
              <a className="skip-link" href="#main-content">Skip to content</a>
              <CustomCursor />
              <SiteNavigation />
              <main id="main-content" tabIndex={-1}>
                <ProfileProvider>{children}</ProfileProvider>
              </main>
              <SiteFooter />
            </SmoothScroll>
          </GsapProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
