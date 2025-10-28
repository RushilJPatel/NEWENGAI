import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 40, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Circle - Compass Border */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#gradient1)"
        strokeWidth="3"
        fill="white"
      />
      
      {/* Inner Circle */}
      <circle
        cx="50"
        cy="50"
        r="38"
        stroke="url(#gradient1)"
        strokeWidth="2"
        fill="none"
        opacity="0.3"
      />
      
      {/* Compass Needle - North (pointing up) */}
      <path
        d="M 50 15 L 58 50 L 50 45 L 42 50 Z"
        fill="url(#gradient2)"
        stroke="url(#gradient1)"
        strokeWidth="1"
      />
      
      {/* Compass Needle - South (pointing down) */}
      <path
        d="M 50 85 L 42 50 L 50 55 L 58 50 Z"
        fill="#94a3b8"
        stroke="#64748b"
        strokeWidth="1"
      />
      
      {/* Center Pin */}
      <circle
        cx="50"
        cy="50"
        r="6"
        fill="url(#gradient1)"
        stroke="white"
        strokeWidth="2"
      />
      
      {/* Cardinal Direction Markers */}
      {/* North */}
      <text
        x="50"
        y="12"
        fontSize="12"
        fontWeight="bold"
        fill="url(#gradient1)"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
      >
        N
      </text>
      
      {/* East */}
      <text
        x="88"
        y="54"
        fontSize="10"
        fontWeight="bold"
        fill="#6b7280"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
      >
        E
      </text>
      
      {/* South */}
      <text
        x="50"
        y="96"
        fontSize="10"
        fontWeight="bold"
        fill="#6b7280"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
      >
        S
      </text>
      
      {/* West */}
      <text
        x="12"
        y="54"
        fontSize="10"
        fontWeight="bold"
        fill="#6b7280"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
      >
        W
      </text>
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Inline variant for use in text
export function LogoInline({ className = '' }: { className?: string }) {
  return <Logo size={28} className={`inline-block ${className}`} />;
}

