import { Suspense } from "react";
import AuthCallback from "@/components/AuthCallback";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCallback />
    </Suspense>
  );
}
