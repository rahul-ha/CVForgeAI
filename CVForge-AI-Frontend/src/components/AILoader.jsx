import { useEffect, useId } from "react";

/**
 * AILoader — Futuristic violet-gradient bouncing dots loader
 *
 * Props:
 *   size  — "sm" | "md" | "lg"  (default: "md")
 *   label — optional string rendered for screen-readers only
 */
export default function AILoader({ size = "md", label = "Loading…" }) {
  const styleId = useId().replace(/:/g, "");

  const config = {
    sm: { dot: 7,  gap: 8,  bounce: 10, scale: 1.2, glow: 16 },
    md: { dot: 10, gap: 10, bounce: 14, scale: 1.25, glow: 22 },
    lg: { dot: 14, gap: 14, bounce: 18, scale: 1.3,  glow: 30 },
  }[size] ?? { dot: 10, gap: 10, bounce: 14, scale: 1.25, glow: 22 };

  const colors = [
    { dot: "#6366f1", glow: "rgba(99,102,241,0.6)" },
    { dot: "#8b5cf6", glow: "rgba(139,92,246,0.6)" },
    { dot: "#a855f7", glow: "rgba(168,85,247,0.6)" },
  ];

  useEffect(() => {
    const { dot, bounce, scale, glow } = config;
    const keyframes = `
      @keyframes __aiBounce_${styleId} {
        0%, 80%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
        40%            { transform: translateY(-${bounce}px) scale(${scale}); opacity: 1; }
      }
      @keyframes __aiGlow_${styleId} {
        0%, 80%, 100% { transform: scale(1); opacity: 0; }
        40%            { transform: scale(${(glow / dot).toFixed(2)}); opacity: 1; }
      }
    `;
    const tag = document.createElement("style");
    tag.id = `ai-loader-kf-${styleId}`;
    tag.textContent = keyframes;
    document.head.appendChild(tag);
    return () => tag.remove();
  }, [size]); // eslint-disable-line react-hooks/exhaustive-deps

  const wrapStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  };

  const dotsStyle = {
    display: "flex",
    alignItems: "center",
    gap: config.gap,
  };

  return (
    <div style={wrapStyle} role="status" aria-label={label}>
      <div style={dotsStyle}>
        {colors.map(({ dot: color, glow: glowColor }, i) => (
          <Dot
            key={i}
            index={i}
            color={color}
            glowColor={glowColor}
            size={config.dot}
            styleId={styleId}
          />
        ))}
      </div>
      <span style={srOnly}>{label}</span>
    </div>
  );
}

function Dot({ index, color, glowColor, size, styleId }) {
  const delay = `${(index * 0.18).toFixed(2)}s`;

  const dotStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    background: color,
    flexShrink: 0,
    position: "relative",
    animation: `__aiBounce_${styleId} 1.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) ${delay} infinite`,
    willChange: "transform, opacity",
  };

  const glowStyle = {
    content: '""',
    position: "absolute",
    inset: -Math.round(size * 0.4),
    borderRadius: "50%",
    background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
    animation: `__aiGlow_${styleId} 1.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) ${delay} infinite`,
    pointerEvents: "none",
  };

  return (
    <div style={dotStyle} aria-hidden="true">
      <div style={glowStyle} />
    </div>
  );
}

const srOnly = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
};