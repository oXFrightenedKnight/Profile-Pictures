"use client";

import AuthGuard from "@/components/AuthGuard";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

export default function CollectionLayout({ children }: { children: ReactNode }) {
  const params = useParams();
  const id = params.id as string;
  return (
    <>
      <AuthGuard>{children}</AuthGuard>
    </>
  );
}
