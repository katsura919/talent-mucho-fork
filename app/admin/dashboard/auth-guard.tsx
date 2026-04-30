"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";

const ALLOWED_EMAILS = ["hello@abiemaxey.com"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"loading" | "authenticated" | "denied">(
    "loading",
  );
  const router = useRouter();

  useEffect(() => {
    async function check() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      const email = session.user.email;
      if (email && ALLOWED_EMAILS.includes(email)) {
        setStatus("authenticated");
      } else {
        // For now, allow any authenticated session through
        // (Meri's email will be added to ALLOWED_EMAILS later)
        setStatus("authenticated");
      }
    }

    check();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/admin/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (status === "loading") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F5F0E8",
          fontFamily: "var(--font-manrope), sans-serif",
          color: "#7D6B5A",
          fontSize: 15,
        }}
      >
        Loading...
      </div>
    );
  }

  if (status === "denied") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F5F0E8",
          fontFamily: "var(--font-manrope), sans-serif",
          color: "#2A2520",
          fontSize: 15,
        }}
      >
        Access denied
      </div>
    );
  }

  return <>{children}</>;
}
