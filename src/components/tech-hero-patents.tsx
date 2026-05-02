"use client";

/** Patents / IP theme - circuit board, stamp feel. */
export default function TechHeroPatents() {
  return (
    <svg
      viewBox="0 0 500 400"
      className="w-full h-full max-h-[420px] object-contain"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="patentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A237E" />
          <stop offset="100%" stopColor="#7B1FA2" />
        </linearGradient>
      </defs>
      {/* Simplified India outline - stylized as circuit */}
      <path
        d="M280 80 L320 100 L340 160 L330 220 L300 280 L260 320 L220 300 L180 260 L160 200 L180 140 L240 100 Z"
        stroke="#1A237E"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      {/* Circuit traces inside */}
      <path d="M240 140 L280 180 L260 240 L220 220 Z" stroke="#7B1FA2" strokeWidth="1.2" fill="none" opacity="0.7" />
      <line x1="260" y1="200" x2="300" y2="200" stroke="#1A237E" strokeWidth="1" opacity="0.5" />
      <line x1="260" y1="260" x2="220" y2="240" stroke="#1A237E" strokeWidth="1" opacity="0.5" />
      {/* Stamp / PATENTED feel */}
      <rect x="220" y="240" width="100" height="36" rx="4" stroke="#7B1FA2" strokeWidth="2" fill="none" opacity="0.9" transform="rotate(-8 270 258)" />
      <text x="270" y="262" textAnchor="middle" fill="#7B1FA2" fontSize="14" fontWeight="bold" opacity="0.9" transform="rotate(-8 270 258)">PATENTS</text>
      {/* Nodes */}
      <circle cx="260" cy="180" r="8" fill="url(#patentGrad)" opacity="0.8" />
      <circle cx="220" cy="220" r="6" fill="#FF9800" opacity="0.6" />
      <circle cx="300" cy="240" r="6" fill="#FF9800" opacity="0.6" />
    </svg>
  );
}
