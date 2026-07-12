"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TeamPageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/core-committee");
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
      <div className="text-center space-y-4">
        <div className="w-10 h-10 rounded-full border-2 border-t-accent border-border/20 animate-spin mx-auto" />
        <p className="text-xs uppercase font-extrabold tracking-widest animate-pulse">Entering Reveal Ceremony...</p>
      </div>
    </div>
  );
}
