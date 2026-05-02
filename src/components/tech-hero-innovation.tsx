"use client";

/** Innovation / R&D theme - central hub, wireframe hand, rocket, data. */
export default function TechHeroInnovation() {
  return (
    <svg
      viewBox="0 0 500 400"
      className="w-full h-full max-h-[420px] object-contain"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="innLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1A237E" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#7B1FA2" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="innNode" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A237E" />
          <stop offset="100%" stopColor="#3949AB" />
        </linearGradient>
      </defs>
      {/* Central CPU / hub */}
      <rect x="210" y="160" width="80" height="80" rx="8" stroke="url(#innLine)" strokeWidth="2" fill="none" opacity="0.9" />
      <line x1="250" y1="160" x2="250" y2="140" stroke="#1A237E" strokeWidth="1.2" opacity="0.7" />
      <line x1="250" y1="240" x2="250" y2="260" stroke="#1A237E" strokeWidth="1.2" opacity="0.7" />
      <line x1="210" y1="200" x2="190" y2="200" stroke="#1A237E" strokeWidth="1.2" opacity="0.7" />
      <line x1="290" y1="200" x2="310" y2="200" stroke="#1A237E" strokeWidth="1.2" opacity="0.7" />
      {/* Radiating lines */}
      <g stroke="url(#innLine)" strokeWidth="1.2" opacity="0.8">
        <line x1="250" y1="200" x2="120" y2="120" />
        <line x1="250" y1="200" x2="380" y2="120" />
        <line x1="250" y1="200" x2="380" y2="280" />
        <line x1="250" y1="200" x2="120" y2="280" />
      </g>
      {/* Nodes */}
      <g fill="url(#innNode)">
        <circle cx="120" cy="120" r="10" />
        <circle cx="380" cy="120" r="10" />
        <circle cx="380" cy="280" r="10" />
        <circle cx="120" cy="280" r="10" />
      </g>
      {/* Rocket */}
      <path transform="translate(340, 80) scale(0.8)" fill="#1A237E" opacity="0.8" d="M12 2L4 6v6l8 4 8-4V6l-8-4zm0 2.18l6 3v4.64l-6 3-6-3V7.18l6-3z" />
      {/* Data stack */}
      <rect x="80" y="250" width="32" height="6" rx="1" fill="#7B1FA2" opacity="0.7" />
      <rect x="80" y="260" width="40" height="6" rx="1" fill="#7B1FA2" opacity="0.7" />
      <rect x="80" y="270" width="28" height="6" rx="1" fill="#7B1FA2" opacity="0.7" />
      {/* Wireframe hand - simple pointer */}
      <path
        d="M350 320 L370 280 L380 260 L385 240 L382 220 L370 200"
        stroke="#1A237E"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      <circle cx="382" cy="220" r="6" fill="#FF9800" opacity="0.6" />
    </svg>
  );
}
