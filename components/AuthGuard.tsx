"use client";

import { useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({
  children,
  origin,
}: {
  children: React.ReactNode;
  origin: string;
}) {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    router.push(`/auth-callback?origin=${origin}`);
  }, []);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
