"use client";

import { ClerkProvider } from "@clerk/clerk-react";

export default function ClerkClientProvider({
  publishableKey,
  children,
}: {
  publishableKey: string;
  children: React.ReactNode;
}) {
  return <ClerkProvider publishableKey={publishableKey}>{children}</ClerkProvider>;
}
