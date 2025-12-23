import AuthGuard from "@/components/AuthGuard";
import { ReactNode } from "react";

export default function CollectionLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthGuard origin="dashboard">{children}</AuthGuard>
    </>
  );
}
