import React from 'react';
import myLogo from '../church_logo.png';

interface RCCGLogoProps {
  className?: string;
  size?: number;
}

export const RCCGLogo: React.FC<RCCGLogoProps> = ({ className = "", size = 48 }) => {
  return (
    <img
      src={myLogo}
      alt="Logo"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};