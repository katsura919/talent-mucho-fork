"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ALLOWED_EMAILS = ["hello@abiemaxey.com"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"loading" | "authenticated" | "denied">(
    "loading",
  );
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("admin_auth");
    if (stored && ALLOWED_EMAILS.includes(stored)) {
      setStatus("authenticated");
    } else {
      router.replace("/admin/login");
    }
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
