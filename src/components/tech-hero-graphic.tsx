"use client";

/**
 * Abstract tech graphic for hero section - nodes, connections, and tech icons.
 * FITT-inspired wireframe/network style on white background.
 */
export default function TechHeroGraphic() {
  return (
    <svg
      viewBox="0 0 500 400"
      className="w-full h-full max-h-[420px] object-contain"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1A237E" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#7B1FA2" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A237E" />
          <stop offset="100%" stopColor="#3949AB" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connection lines - network feel */}
      <g stroke="url(#lineGrad)" strokeWidth="1.2" opacity="0.85">
        <line x1="80" y1="120" x2="220" y2="80" />
        <line x1="220" y1="80" x2="380" y2="100" />
        <line x1="220" y1="80" x2="250" y2="200" />
        <line x1="250" y1="200" x2="180" y2="300" />
        <line x1="250" y1="200" x2="320" y2="280" />
        <line x1="380" y1="100" x2="400" y2="220" />
        <line x1="320" y1="280" x2="400" y2="220" />
        <line x1="100" y1="200" x2="250" y2="200" />
        <line x1="80" y1="120" x2="100" y2="200" />
      </g>

      {/* Nodes */}
      <g fill="url(#nodeGrad)" filter="url(#glow)">
        <circle cx="80" cy="120" r="12" />
        <circle cx="220" cy="80" r="18" />
        <circle cx="380" cy="100" r="14" />
        <circle cx="250" cy="200" r="22" />
        <circle cx="180" cy="300" r="10" />
        <circle cx="320" cy="280" r="10" />
        <circle cx="400" cy="220" r="12" />
        <circle cx="100" cy="200" r="8" />
      </g>

      {/* Small tech icons - circuit/data feel */}
      <g fill="#1A237E" opacity="0.7">
        {/* Simple rocket shape */}
        <path transform="translate(335, 55) scale(0.7)" d="M12 2L4 6v6l8 4 8-4V6l-8-4zm0 2.18l6 3v4.64l-6 3-6-3V7.18l6-3zM10 8v4l4-2-4-2z" />
        {/* Data stack / layers */}
        <rect x="130" y="260" width="28" height="6" rx="1" />
        <rect x="130" y="270" width="35" height="6" rx="1" />
        <rect x="130" y="280" width="24" height="6" rx="1" />
        {/* Circuit node */}
        <rect x="50" y="260" width="24" height="24" rx="2" stroke="#7B1FA2" strokeWidth="1.5" fill="none" />
        <line x1="62" y1="260" x2="62" y2="248" stroke="#7B1FA2" strokeWidth="1.2" />
        <line x1="62" y1="284" x2="62" y2="296" stroke="#7B1FA2" strokeWidth="1.2" />
        <line x1="50" y1="272" x2="38" y2="272" stroke="#7B1FA2" strokeWidth="1.2" />
        <line x1="74" y1="272" x2="86" y2="272" stroke="#7B1FA2" strokeWidth="1.2" />
      </g>

      {/* Decorative dots */}
      <g fill="#FF9800" opacity="0.4">
        <circle cx="280" cy="140" r="3" />
        <circle cx="350" cy="180" r="2.5" />
        <circle cx="160" cy="240" r="2" />
      </g>
    </svg>
  );
}
