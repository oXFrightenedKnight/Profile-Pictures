"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton, SignUpButton } from "@clerk/clerk-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <nav className="w-full border-b border-neutral-800 bg-black/60 backdrop-blur-xl fixed top-0 z-50">
      <div className="max-w-6xl mx-auto flex relative items-center justify-between py-4 px-6 border-b border-zinc-200">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white hover:text-purple-400 transition">
          PFPverse
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-neutral-300">
          <Link href="/collections" className="hover:text-white transition">
            Collections
          </Link>
          <Link href="/about" className="hover:text-white transition">
            About
          </Link>
          <Link href="/dashboard" className="hover:text-white transition">
            Dashboard
          </Link>
        </div>
        <div className="hidden absolute md:flex right-6">
          <SignedOut>
            <div className="flex items-center gap-4">
              <SignInButton>
                <button className="text-neutral-300 hover:text-white transition font-medium cursor-pointer">
                  Sign in
                </button>
              </SignInButton>

              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:opacity-90 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>

        <div className="hidden md:flex">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Sheet open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
            <SheetTrigger asChild>
              <Button size="icon">
                <Menu className="h-6 w-6 text-white" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="bg-black text-white flex">
              <div className="p-2">
                <div className="flex flex-col gap-6 mt-10">
                  <Link
                    href="/collections"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Collections
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    About
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Dashboard
                  </Link>

                  <SignedOut>
                    <SignInButton />
                    <SignUpButton>
                      <Button className="w-full">Sign Up</Button>
                    </SignUpButton>
                  </SignedOut>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
