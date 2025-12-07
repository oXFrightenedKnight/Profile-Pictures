"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full border-b border-neutral-800 bg-black/60 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white hover:text-purple-400 transition">
          PFPverse
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-neutral-300">
          <Link href="/collections" className="hover:text-white transition">
            Collections
          </Link>
          <Link href="/about" className="hover:text-white transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-white transition">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
