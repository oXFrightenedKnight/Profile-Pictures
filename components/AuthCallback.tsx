"use client";

import { trpc } from "@/app/_trpc/client";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { data, isLoading, isSuccess, error, isError } = trpc.authCallback.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (isSuccess && data?.success) {
      router.push(origin ? `/${origin}` : "/");
    }
  }, [isSuccess, router, origin, data]);

  useEffect(() => {
    if (!isError) return;

    const code = (error as any)?.data?.code;
    if (code === "UNAUTHORIZED") {
      router.push("/https://helping-python-92.accounts.dev/sign-up");
    }
  }, [isError, error, router]);

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="w-8 h-8 animate-spin" />
        <h3>Setting Up Your Account.</h3>
        <p>This won't take long</p>
      </div>
    </div>
  );
};

export default AuthCallback;
