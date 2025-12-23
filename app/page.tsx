"use client";

import Image from "next/image";
import Link from "next/link";
import { trpc } from "./_trpc/client";
import Marquee from "@/components/christmas-marquee";

export default function HomePage() {
  return (
    <>
      <Marquee></Marquee>
      <main className="min-h-screen bg-gradient-to-b from-white to-neutral-100 text-black mt-[9vh]">
        {/* HERO */}
        <section className="px-6 lg:px-12 py-24 flex flex-col items-center text-center gap-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-3xl">
            Premium jerk profile pics for the boyyyys.
          </h1>

          <p className="text-lg md:text-xl text-neutral-300 max-w-xl">
            Get to see new arrivals torray.
          </p>

          <Link
            href="/collections"
            className="mt-6 px-8 py-4 bg-purple-500 hover:bg-purple-600 transition rounded-xl text-lg font-semibold shadow-xl text-white"
          >
            Explore Collections
          </Link>
        </section>

        {/* PREVIEW GRID */}
        <section className="px-6 lg:px-12 py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Choose from more than 67+ premium-ultra pro profile pictures
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <PreviewCard src="/michael-jordan.jpg" />
            <PreviewCard src="/kai-cenat.jpg" />
            <PreviewCard src="/my-cr-deck.jpg" />
            <PreviewCard src="/neymar-jr.jpg" />
          </div>
        </section>

        {/* MEME CTA */}
        <section className="px-6 lg:px-12 py-24 flex flex-col items-center text-center gap-6">
          <h2 className="text-4xl md:text-5xl font-bold max-w-2xl">"I don need editing"</h2>

          <p className="text-neutral-300 max-w-xl text-lg">
            Man those collections. Get yo edit now boi.
          </p>

          <Link
            href="/collections"
            className="mt-4 px-10 py-4 bg-white text-black hover:bg-neutral-200 transition rounded-xl text-lg font-semibold shadow-xl"
          >
            Browse Collections
          </Link>
        </section>

        {/* TESTIMONIAL — 100% Real Person, Please Don't Fact Check */}
        <section className="px-6 lg:px-12 py-20">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-10">
              Loved by professionals, champions, and definitely-real people like him 👇
            </h2>

            <div className="bg-neutral-800 rounded-2xl p-8 shadow-xl border border-neutral-700">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src="/michael-jordan.jpg"
                    alt="Michelle Jorden"
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="text-lg italic text-neutral-300 max-w-xl">
                  “Oh boi this is the best site ever. I absolutely love Neymar Jr. picture and Clash
                  Royale collection was an absolute game changer for me. Puttin' those balls in the
                  pocket yeah.”
                </p>

                <p className="text-sm font-semibold text-neutral-400">
                  — Mikael Jorden, CEO of Brawl Stars
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-neutral-800 rounded-2xl p-8 shadow-xl border border-neutral-700">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src="/sigma-review.jpg"
                    alt="Michelle Jorden"
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="text-lg italic text-neutral-300 max-w-xl">“what”</p>

                <p className="text-sm font-semibold text-neutral-400">— Sigma, Idk who that is</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2025 PFP Store. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

function PreviewCard({ src }: { src: string }) {
  return (
    <div className="relative aspect-square rounded-xl overflow-hidden group shadow-md">
      <Image
        src={src}
        alt="pfp preview"
        fill
        className="object-cover group-hover:scale-110 transition duration-300"
      />
    </div>
  );
}
