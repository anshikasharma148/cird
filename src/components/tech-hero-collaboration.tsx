"use client";

/** Collaboration / partnership theme - abstract handshake, two entities connecting. */
export default function TechHeroCollaboration() {
  return (
    <svg
      viewBox="0 0 500 400"
      className="w-full h-full max-h-[420px] object-contain"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="collabLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1A237E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FF9800" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="collabNode" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A237E" />
          <stop offset="100%" stopColor="#3949AB" />
        </linearGradient>
      </defs>
      {/* Central connection - handshake metaphor */}
      <ellipse cx="250" cy="200" rx="100" ry="60" stroke="url(#collabLine)" strokeWidth="2" fill="none" opacity="0.8" />
      <circle cx="250" cy="200" r="24" fill="url(#collabNode)" opacity="0.9" />
      <path d="M180 200 Q250 160 320 200" stroke="#FF9800" strokeWidth="1.5" fill="none" opacity="0.7" />
      {/* Left cluster - industry */}
      <g stroke="url(#collabLine)" strokeWidth="1.2" opacity="0.85">
        <line x1="120" y1="180" x2="200" y2="190" />
        <line x1="120" y1="220" x2="200" y2="210" />
        <line x1="100" y1="200" x2="160" y2="200" />
      </g>
      <g fill="url(#collabNode)">
        <circle cx="100" cy="160" r="10" />
        <circle cx="90" cy="200" r="14" />
        <circle cx="110" cy="240" r="8" />
      </g>
      {/* Right cluster - academia */}
      <g stroke="url(#collabLine)" strokeWidth="1.2" opacity="0.85">
        <line x1="300" y1="190" x2="380" y2="180" />
        <line x1="300" y1="210" x2="380" y2="220" />
        <line x1="340" y1="200" x2="400" y2="200" />
      </g>
      <g fill="url(#collabNode)">
        <circle cx="400" cy="160" r="10" />
        <circle cx="410" cy="200" r="14" />
        <circle cx="390" cy="240" r="8" />
      </g>
      <g fill="#FF9800" opacity="0.5">
        <circle cx="250" cy="120" r="4" />
        <circle cx="250" cy="280" r="3" />
      </g>
    </svg>
  );
}
