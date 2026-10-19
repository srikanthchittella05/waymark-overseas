import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import MotionProvider from "@/components/providers/MotionProvider";
import { GsapProvider } from "@/components/providers/GsapProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import SiteNavigation from "@/components/landing/SiteNavigation";
import { ARRIVAL_BOOTSTRAP } from "@/lib/arrival-bootstrap";

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

    </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MotionProvider>
          <GsapProvider>
            <SmoothScroll>
              <a className="skip-link" href="#main-content">Skip to content</a>
              <CustomCursor />
              <SiteNavigation />
              <main id="main-content" tabIndex={-1}>{children}</main>
            </SmoothScroll>
          </GsapProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
