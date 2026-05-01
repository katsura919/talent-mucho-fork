"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ALLOWED_EMAILS = ["hello@abiemaxey.com"];

const C = {
  bg: "#F5F0E8",
  text: "#2A2520",
  primary: "#7D6B5A",
  border: "rgba(125,107,90,0.18)",
  borderStrong: "rgba(125,107,90,0.35)",
};

function gridBg() {
  return `repeating-linear-gradient(0deg, ${C.border} 0px, ${C.border} 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, ${C.border} 0px, ${C.border} 1px, transparent 1px, transparent 60px)`;
}

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (ALLOWED_EMAILS.includes(email.trim().toLowerCase())) {
      localStorage.setItem("admin_auth", email.trim().toLowerCase());
      router.replace("/admin/dashboard");
    } else {
      setError("Access denied.");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-manrope), sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: gridBg(),
          pointerEvents: "none",
          opacity: 0.5,
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 400,
          padding: "0 24px",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${C.borderStrong}`,
            borderRadius: 16,
            padding: "48px 36px",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-instrument-serif), serif",
              fontSize: 32,
              fontWeight: 400,
              color: C.text,
              margin: "0 0 8px 0",
              textAlign: "center",
            }}
          >
            Admin
          </h1>
          <p
            style={{
              fontSize: 14,
              color: C.primary,
              margin: "0 0 32px 0",
              textAlign: "center",
              letterSpacing: "0.02em",
            }}
          >
            talentmucho.com
          </p>

          <form onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 500,
                color: C.text,
                marginBottom: 8,
              }}
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@example.com"
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: 15,
                border: `1px solid ${C.borderStrong}`,
                borderRadius: 10,
                background: "rgba(255,255,255,0.7)",
                color: C.text,
                outline: "none",
                fontFamily: "inherit",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = C.primary)}
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = C.borderStrong)
              }
            />

            {error && (
              <p style={{ fontSize: 13, color: "#b44", margin: "12px 0 0 0" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                marginTop: 20,
                padding: "13px 0",
                fontSize: 15,
                fontWeight: 600,
                fontFamily: "inherit",
                color: "#fff",
                background: C.primary,
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                transition: "background 0.2s",
                letterSpacing: "0.01em",
              }}
            >
              Login
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: 12,
            color: C.primary,
            marginTop: 24,
            opacity: 0.6,
          }}
        >
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}
