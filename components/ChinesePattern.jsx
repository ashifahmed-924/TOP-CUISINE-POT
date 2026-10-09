"use client";

import { useId } from "react";

const tones = {
  ink: "rgba(25, 21, 20, 0.9)",
  cream: "rgba(244, 232, 209, 0.9)",
  red: "rgba(165, 28, 32, 0.9)",
  gold: "rgba(185, 146, 78, 0.9)",
};

export default function ChinesePattern({
  variant = "lattice",
  opacity = 0.05,
  scale = 1,
  tone = "ink",
  className = "",
}) {
  const uid = useId().replace(/:/g, "");
  const color = tones[tone] || tones.ink;
  const size = Math.round(80 * scale);
  const pid = `tcp-${variant}-${uid}`;

  if (variant === "cloud") {
    return (
      <svg
        className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
        aria-hidden="true"
        style={{ opacity }}
      >
        <defs>
          <pattern
            id={pid}
            width={size}
            height={size * 0.7}
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M10 28c6-10 16-10 22 0 5-8 14-8 18 0 7-6 16-4 18 6H8c1-8 6-12 12-6z"
              fill="none"
              stroke={color}
              strokeWidth="1.2"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${pid})`} />
      </svg>
    );
  }

  if (variant === "seal") {
    return (
      <svg
        className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
        aria-hidden="true"
        style={{ opacity }}
      >
        <defs>
          <pattern
            id={pid}
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="12"
              y="12"
              width={size - 24}
              height={size - 24}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
            />
            <rect
              x="20"
              y="20"
              width={size - 40}
              height={size - 40}
              fill="none"
              stroke={color}
              strokeWidth="0.8"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r="4"
              fill="none"
              stroke={color}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${pid})`} />
      </svg>
    );
  }

  if (variant === "border") {
    return (
      <svg
        className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
        aria-hidden="true"
        style={{ opacity }}
      >
        <defs>
          <pattern
            id={pid}
            width={size * 0.5}
            height={10}
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 5 H8 M12 5 H20 M24 5 H32"
              stroke={color}
              strokeWidth="1.4"
            />
            <path d="M8 2 V8 M20 2 V8" stroke={color} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${pid})`} />
      </svg>
    );
  }

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        <pattern
          id={pid}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M0 ${size / 2} H${size} M${size / 2} 0 V${size}`}
            stroke={color}
            strokeWidth="1"
          />
          <path
            d={`M0 0 L${size} ${size} M${size} 0 L0 ${size}`}
            stroke={color}
            strokeWidth="0.7"
            opacity="0.7"
          />
          <rect
            x={size * 0.28}
            y={size * 0.28}
            width={size * 0.44}
            height={size * 0.44}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
}
