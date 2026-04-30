"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-browser";

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
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin/auth/callback`,
      },
    });

    setLoading(false);

    if (otpError) {
      setError(otpError.message);
      return;
    }

    setSent(true);
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
      {/* Grid overlay */}
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
          {/* Title */}
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

          {sent ? (
            /* Success state */
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: `${C.primary}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  fontSize: 22,
                }}
              >
                &#9993;
              </div>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: C.text,
                  margin: "0 0 8px 0",
                }}
              >
                Check your email
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: C.primary,
                  margin: "0 0 24px 0",
                  lineHeight: 1.5,
                }}
              >
                We sent a magic link to{" "}
                <strong style={{ color: C.text }}>{email}</strong>
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setEmail("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: C.primary,
                  fontSize: 13,
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Try a different email
              </button>
            </div>
          ) : (
            /* Form */
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
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = C.primary)
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = C.borderStrong)
                }
              />

              {error && (
                <p
                  style={{
                    fontSize: 13,
                    color: "#b44",
                    margin: "12px 0 0 0",
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  marginTop: 20,
                  padding: "13px 0",
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: "inherit",
                  color: "#fff",
                  background: loading ? C.borderStrong : C.primary,
                  border: "none",
                  borderRadius: 10,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background 0.2s",
                  letterSpacing: "0.01em",
                }}
              >
                {loading ? "Sending..." : "Send magic link"}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
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
