import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

// Icono de Carpa de circo para el logo
export const CircusTentIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="tentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF1493" />
        <stop offset="50%" stopColor="#FFB800" />
        <stop offset="100%" stopColor="#00D4FF" />
      </linearGradient>
      <filter id="tentGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    {/* Carpa principal */}
    <path d="M 8 52 L 32 8 L 56 52 Z" fill="url(#tentGradient)" filter="url(#tentGlow)" />
    {/* Franjas */}
    <path d="M 20 52 L 32 8 L 32 52 Z" fill="white" opacity="0.3" />
    <path d="M 44 52 L 32 8 L 32 52 Z" fill="white" opacity="0.3" />
    {/* Banderines */}
    <path d="M 32 8 L 28 4 L 32 6 L 36 4 Z" fill="#FFB800" />
    <circle cx="32" cy="4" r="3" fill="#FF1493" filter="url(#tentGlow)" />
    {/* Entrada */}
    <rect x="26" y="40" width="12" height="12" rx="2" fill="#7B1FA2" />
    {/* Base */}
    <rect x="6" y="52" width="52" height="4" rx="2" fill="#9C27B0" />
  </svg>
);

// Icono de Usuario/Perfil épico
export const UserIcon: React.FC<IconProps> = ({ size = 40, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="userGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6D00" />
        <stop offset="100%" stopColor="#FFB800" />
      </linearGradient>
      <filter id="userShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
      </filter>
    </defs>
    {/* Cuerpo */}
    <path d="M 16 56 Q 16 40 32 40 Q 48 40 48 56 Z" fill="url(#userGradient)" filter="url(#userShadow)" />
    {/* Cabeza */}
    <circle cx="32" cy="24" r="12" fill="url(#userGradient)" filter="url(#userShadow)" />
    {/* Corona */}
    <path d="M 20 18 L 24 14 L 28 18 L 32 12 L 36 18 L 40 14 L 44 18 L 42 22 L 22 22 Z" fill="#FFB800" />
    <circle cx="32" cy="12" r="3" fill="#FF1493" />
  </svg>
);

// Icono de Admin/Configuración épico
export const AdminIcon: React.FC<IconProps> = ({ size = 40, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="adminGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFB800" />
        <stop offset="100%" stopColor="#FF6D00" />
      </linearGradient>
      <filter id="adminGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    {/* Engranaje exterior */}
    <circle cx="32" cy="32" r="20" fill="url(#adminGradient)" filter="url(#adminGlow)" />
    {/* Dientes del engranaje */}
    <rect x="30" y="8" width="4" height="8" rx="1" fill="#FFB800" />
    <rect x="30" y="48" width="4" height="8" rx="1" fill="#FFB800" />
    <rect x="8" y="30" width="8" height="4" rx="1" fill="#FFB800" />
    <rect x="48" y="30" width="8" height="4" rx="1" fill="#FFB800" />
    <rect x="16" y="16" width="6" height="6" rx="1" fill="#FFB800" transform="rotate(45 19 19)" />
    <rect x="42" y="16" width="6" height="6" rx="1" fill="#FFB800" transform="rotate(-45 45 19)" />
    <rect x="16" y="42" width="6" height="6" rx="1" fill="#FFB800" transform="rotate(-45 19 45)" />
    <rect x="42" y="42" width="6" height="6" rx="1" fill="#FFB800" transform="rotate(45 45 45)" />
    {/* Centro */}
    <circle cx="32" cy="32" r="10" fill="white" />
    <circle cx="32" cy="32" r="6" fill="#FF1493" />
    <path d="M 32 28 L 34 32 L 32 36 L 30 32 Z" fill="white" />
  </svg>
);

// Icono de Salir/Logout épico
export const LogoutIcon: React.FC<IconProps> = ({ size = 40, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="logoutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF1493" />
        <stop offset="100%" stopColor="#E91E63" />
      </linearGradient>
    </defs>
    {/* Puerta */}
    <rect x="12" y="12" width="28" height="40" rx="4" fill="url(#logoutGradient)" />
    <rect x="16" y="16" width="20" height="32" rx="2" fill="white" opacity="0.3" />
    {/* Manija */}
    <circle cx="34" cy="32" r="3" fill="#FFB800" />
    {/* Flecha saliendo */}
    <path d="M 44 32 L 56 32 M 52 26 L 58 32 L 52 38" stroke="#00D4FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Icono de Lista/Mis items épico
export const ListIcon: React.FC<IconProps> = ({ size = 40, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="listGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00D4FF" />
        <stop offset="100%" stopColor="#0099FF" />
      </linearGradient>
    </defs>
    {/* Clipboard */}
    <rect x="14" y="8" width="36" height="48" rx="4" fill="url(#listGradient)" />
    <rect x="18" y="12" width="28" height="40" rx="2" fill="white" />
    {/* Clip */}
    <rect x="24" y="6" width="16" height="8" rx="3" fill="#FFB800" />
    {/* Checkmarks */}
    <circle cx="24" cy="22" r="3" fill="#76FF03" />
    <path d="M 22 22 L 24 24 L 26 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="32" y="20" width="12" height="2" rx="1" fill="#9C27B0" />
    
    <circle cx="24" cy="32" r="3" fill="#76FF03" />
    <path d="M 22 32 L 24 34 L 26 30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="32" y="30" width="10" height="2" rx="1" fill="#9C27B0" />
    
    <circle cx="24" cy="42" r="3" fill="#FFB800" />
    <rect x="32" y="40" width="8" height="2" rx="1" fill="#9C27B0" />
  </svg>
);
