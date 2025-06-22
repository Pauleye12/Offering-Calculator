import React from 'react';

interface RCCGLogoProps {
  className?: string;
  size?: number;
}

export const RCCGLogo: React.FC<RCCGLogoProps> = ({ className = "", size = 48 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle - represents unity and completeness */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="url(#goldGradient)"
        stroke="#B8860B"
        strokeWidth="2"
      />
      
      {/* Inner circle - represents the church community */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="url(#blueGradient)"
        stroke="#FFD700"
        strokeWidth="1"
      />
      
      {/* Cross - central symbol of Christianity */}
      <g transform="translate(50, 50)">
        {/* Vertical beam */}
        <rect
          x="-3"
          y="-20"
          width="6"
          height="40"
          fill="#FFD700"
          rx="1"
        />
        {/* Horizontal beam */}
        <rect
          x="-15"
          y="-3"
          width="30"
          height="6"
          fill="#FFD700"
          rx="1"
        />
        {/* Cross center highlight */}
        <circle
          cx="0"
          cy="0"
          r="4"
          fill="#FFFFFF"
          opacity="0.8"
        />
      </g>
      
      {/* Dove - symbol of the Holy Spirit */}
      <g transform="translate(35, 25) scale(0.8)">
        <path
          d="M0,10 Q5,5 10,8 Q15,5 20,10 Q15,15 10,12 Q5,15 0,10 Z"
          fill="#FFFFFF"
          opacity="0.9"
        />
        <circle cx="6" cy="9" r="1" fill="#1E40AF" />
      </g>
      
      {/* Flame - symbol of Pentecostal fire */}
      <g transform="translate(65, 25) scale(0.7)">
        <path
          d="M10,20 Q5,15 8,10 Q12,5 15,10 Q18,8 20,12 Q15,18 10,20 Z"
          fill="url(#flameGradient)"
        />
      </g>
      
      {/* Bible - foundation of faith */}
      <g transform="translate(30, 70) scale(0.6)">
        <rect x="0" y="0" width="20" height="15" fill="#8B4513" rx="1" />
        <rect x="1" y="1" width="18" height="13" fill="#DEB887" rx="1" />
        <line x1="3" y1="4" x2="17" y2="4" stroke="#8B4513" strokeWidth="0.5" />
        <line x1="3" y1="7" x2="17" y2="7" stroke="#8B4513" strokeWidth="0.5" />
        <line x1="3" y1="10" x2="17" y2="10" stroke="#8B4513" strokeWidth="0.5" />
      </g>
      
      {/* Gradients */}
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        <linearGradient id="flameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFA500" />
          <stop offset="50%" stopColor="#FF6347" />
          <stop offset="100%" stopColor="#DC143C" />
        </linearGradient>
      </defs>
    </svg>
  );
};