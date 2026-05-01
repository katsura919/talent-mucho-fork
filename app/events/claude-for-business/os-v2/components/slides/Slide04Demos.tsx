"use client";

import { useState } from "react";
import type { SlideProps } from "../../types";

type SpinItem = { name: string; short?: string; desc: string; icon?: string };

export function SpinWheel({
  items,
  C,
  mono,
  sans,
  serif,
}: {
  items: SpinItem[];
  C: import("../../types").Palette;
  mono: React.CSSProperties;
  sans: React.CSSProperties;
  serif: React.CSSProperties;
}) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const wedgeAngle = 360 / items.length;
  const radius = 200;
  const onDark = "#FAF8F5";

  function spin() {
    if (spinning) return;
    const available = items
      .map((_, i) => i)
      .filter((i) => !history.includes(i));
    const pool = available.length ? available : items.map((_, i) => i);
    const targetIndex = pool[Math.floor(Math.random() * pool.length)];
    const targetMod = (((-(targetIndex + 0.5) * wedgeAngle) % 360) + 360) % 360;
    const currentMod = ((rotation % 360) + 360) % 360;
    let delta = targetMod - currentMod;
    if (delta <= 0) delta += 360;
    const spins = 5 + Math.floor(Math.random() * 3);
    const totalDelta = 360 * spins + delta;
    setSpinning(true);
    setWinner(null);
    setRotation((prev) => prev + totalDelta);
    setTimeout(() => {
      const finalRot = rotation + totalDelta;
      const finalMod = ((finalRot % 360) + 360) % 360;
      const raw =
        (((-finalMod / wedgeAngle - 0.5) % items.length) + items.length) %
        items.length;
      const derivedWinner =
        ((Math.round(raw) % items.length) + items.length) % items.length;
      setSpinning(false);
      setWinner(derivedWinner);
      setHistory((h) => [...h, derivedWinner]);
    }, 4200);
  }

  function reset() {
    setHistory([]);
    setWinner(null);
  }

  const wedgeColors = [
    C.primary,
    C.surface2,
    C.muted + "40",
    C.peach || C.surface2,
  ];

  return (
    <div style={{ maxWidth: 1500, margin: "48px auto 0" }}>
      <div
        style={{
          ...mono,
          fontSize: 12,
          fontWeight: 700,
          color: C.primary,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 22,
            height: 1,
            background: C.primary,
          }}
        />
        What we demo live
      </div>
      <div
        style={{
          ...mono,
          fontSize: 12,
          color: C.muted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 28,
          opacity: 0.7,
        }}
      >
        ↓ Pick someone in chat to spin · we demo whatever it lands on
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(360px, 1fr) 1.1fr",
          gap: 40,
          alignItems: "center",
        }}
      >
        {/* Wheel */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 460,
            justifySelf: "center",
            aspectRatio: "1 / 1",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "14px solid transparent",
              borderRight: "14px solid transparent",
              borderTop: `22px solid ${C.text}`,
              zIndex: 3,
              filter: `drop-shadow(0 4px 8px ${C.text}40)`,
            }}
          />
          <svg
            viewBox={`-${radius + 10} -${radius + 10} ${(radius + 10) * 2} ${(radius + 10) * 2}`}
            width="100%"
            height="100%"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? "transform 4.2s cubic-bezier(0.17, 0.67, 0.21, 1)"
                : "none",
              filter: `drop-shadow(0 18px 32px ${C.text}25)`,
            }}
          >
            {items.map((item, i) => {
              const startAngle = ((i * wedgeAngle - 90) * Math.PI) / 180;
              const endAngle = (((i + 1) * wedgeAngle - 90) * Math.PI) / 180;
              const x1 = radius * Math.cos(startAngle);
              const y1 = radius * Math.sin(startAngle);
              const x2 = radius * Math.cos(endAngle);
              const y2 = radius * Math.sin(endAngle);
              const largeArc = wedgeAngle > 180 ? 1 : 0;
              const path = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
              const fill = wedgeColors[i % wedgeColors.length];
              const isWinner = winner === i && !spinning;
              const midAngleDeg = i * wedgeAngle - 90 + wedgeAngle / 2;
              const midRad = (midAngleDeg * Math.PI) / 180;
              const textR = radius * 0.62;
              const textX = textR * Math.cos(midRad);
              const textY = textR * Math.sin(midRad);
              const textRotation = midAngleDeg + 90;
              const isLightWedge =
                fill === C.surface2 || fill === C.muted + "40";
              return (
                <g key={i}>
                  <path
                    d={path}
                    fill={fill}
                    stroke={C.bg}
                    strokeWidth={3}
                    style={{
                      filter: isWinner
                        ? `drop-shadow(0 0 16px ${C.primary})`
                        : undefined,
                      transition: "filter 0.4s",
                    }}
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily={String(mono.fontFamily)}
                    fontSize={13}
                    fontWeight={800}
                    fill={
                      isLightWedge
                        ? C.text
                        : fill === C.primary
                          ? C.text === "#2A2520"
                            ? onDark
                            : C.bg
                          : C.text
                    }
                    transform={`rotate(${textRotation} ${textX} ${textY})`}
                    style={{
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.short ?? item.name}
                  </text>
                </g>
              );
            })}
            <circle r={28} fill={C.text} />
            <circle r={20} fill={C.primary} />
          </svg>
        </div>

        {/* Result panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            minHeight: 320,
          }}
        >
          {winner === null ? (
            <div
              style={{
                flex: 1,
                borderRadius: 18,
                border: `2px dashed ${C.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 32,
                textAlign: "center",
                minHeight: 220,
              }}
            >
              <div>
                <div
                  style={{
                    ...mono,
                    fontSize: 12,
                    color: C.primary,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: 12,
                  }}
                >
                  Awaiting the spin
                </div>
                <div
                  style={{
                    ...serif,
                    fontSize: 22,
                    color: C.muted,
                    lineHeight: 1.4,
                  }}
                >
                  Wherever it lands, that&apos;s what we demo live.
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                borderRadius: 18,
                padding: "28px 30px",
                background: C.text,
                color: onDark,
                boxShadow: `0 24px 48px -12px ${C.text}30, 0 0 0 1px ${C.primary}40`,
              }}
            >
              <div
                style={{
                  ...mono,
                  fontSize: 12,
                  color: C.primary,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: 14,
                }}
              >
                The wheel says ~
              </div>
              <div
                style={{
                  ...sans,
                  fontSize: 36,
                  fontWeight: 800,
                  color: onDark,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  marginBottom: 14,
                }}
              >
                {items[winner].name}
              </div>
              <div
                style={{
                  ...serif,
                  fontSize: 19,
                  lineHeight: 1.55,
                  color: "rgba(250,248,245,0.8)",
                }}
              >
                {items[winner].desc}
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={spin}
              disabled={spinning}
              style={{
                flex: 1,
                minWidth: 160,
                padding: "16px 28px",
                borderRadius: 100,
                ...mono,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: spinning ? "not-allowed" : "pointer",
                background: spinning ? C.muted : C.primary,
                color: C.text === "#2A2520" ? onDark : C.bg,
                border: "none",
                boxShadow: spinning ? "none" : `0 8px 20px -4px ${C.primary}55`,
                transition: "transform 0.15s, box-shadow 0.15s",
                opacity: spinning ? 0.6 : 1,
              }}
            >
              {spinning
                ? "● Spinning..."
                : winner !== null
                  ? "↻ Spin again"
                  : "▸ SPIN"}
            </button>
            {history.length > 0 && (
              <button
                onClick={reset}
                disabled={spinning}
                style={{
                  padding: "14px 22px",
                  borderRadius: 100,
                  ...mono,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  background: "transparent",
                  color: C.muted,
                  border: `1px solid ${C.border}`,
                }}
              >
                Reset
              </button>
            )}
          </div>

          {history.length > 0 && (
            <div
              style={{
                ...mono,
                fontSize: 11,
                color: C.muted,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              Demoed so far ~{" "}
              {history.map((i) => items[i].short ?? items[i].name).join(" · ")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
