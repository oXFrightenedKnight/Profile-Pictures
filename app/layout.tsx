import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Providers from "@/components/Providers";
import ClerkClientProvider from "@/components/ClerkClientProvider";
import { Navbar } from "@/components/Navbar";
import Marquee from "@/components/christmas-marquee";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PFPVerse - Your best PFP service",
  description:
    "Stand out online with unique, high-quality profile pictures. Instant download after purchase.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Add your Clerk Publishable Key to the .env file");
  }
  return (
    <ClerkClientProvider publishableKey={PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={`${geist.className} font-sans antialiased`}>
          <Providers>
            <Navbar></Navbar>
            {children}
            <Analytics />
            {/* Footer */}
          </Providers>
        </body>
      </html>
    </ClerkClientProvider>
  );
}
