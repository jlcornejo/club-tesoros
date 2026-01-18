import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

// Icono de Regalo con gradiente vibrante
export const GiftIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="giftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF1493" />
        <stop offset="100%" stopColor="#FF6D00" />
      </linearGradient>
      <filter id="giftShadow">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>
    {/* Caja principal */}
    <rect x="12" y="24" width="40" height="32" rx="4" fill="url(#giftGradient)" filter="url(#giftShadow)" />
    {/* Tapa */}
    <rect x="8" y="16" width="48" height="12" rx="3" fill="#FFB800" filter="url(#giftShadow)" />
    {/* Lazo vertical */}
    <rect x="28" y="8" width="8" height="48" rx="2" fill="#00D4FF" />
    {/* Lazo horizontal */}
    <rect x="8" y="20" width="48" height="8" rx="2" fill="#76FF03" />
    {/* Moño */}
    <circle cx="32" cy="12" r="8" fill="#FFB800" filter="url(#giftShadow)" />
    <circle cx="26" cy="10" r="5" fill="#FFC107" />
    <circle cx="38" cy="10" r="5" fill="#FFC107" />
    {/* Detalles brillantes */}
    <circle cx="20" cy="36" r="3" fill="white" opacity="0.6" />
    <circle cx="44" cy="44" r="2" fill="white" opacity="0.6" />
  </svg>
);

// Icono de Libro con gradiente vibrante
export const BookIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFB800" />
        <stop offset="100%" stopColor="#FF6D00" />
      </linearGradient>
      <filter id="bookShadow">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>
    {/* Libro cerrado */}
    <rect x="14" y="10" width="36" height="44" rx="3" fill="url(#bookGradient)" filter="url(#bookShadow)" />
    {/* Páginas */}
    <rect x="16" y="12" width="32" height="40" rx="2" fill="white" />
    {/* Líneas de texto */}
    <rect x="20" y="18" width="24" height="2" rx="1" fill="#00D4FF" />
    <rect x="20" y="24" width="20" height="2" rx="1" fill="#FF1493" />
    <rect x="20" y="30" width="22" height="2" rx="1" fill="#76FF03" />
    <rect x="20" y="36" width="18" height="2" rx="1" fill="#9C27B0" />
    {/* Marcador */}
    <rect x="30" y="10" width="4" height="48" rx="1" fill="#FF1493" />
    {/* Estrella decorativa */}
    <path d="M32 42 L34 46 L38 46 L35 49 L36 53 L32 50 L28 53 L29 49 L26 46 L30 46 Z" fill="#FFB800" />
  </svg>
);

// Icono de Juguete (Oso de peluche) con gradiente vibrante
export const ToyIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="toyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF1493" />
        <stop offset="100%" stopColor="#E91E63" />
      </linearGradient>
      <filter id="toyShadow">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>
    {/* Cuerpo */}
    <ellipse cx="32" cy="38" rx="16" ry="18" fill="url(#toyGradient)" filter="url(#toyShadow)" />
    {/* Cabeza */}
    <circle cx="32" cy="22" r="12" fill="url(#toyGradient)" filter="url(#toyShadow)" />
    {/* Orejas */}
    <circle cx="22" cy="14" r="6" fill="#FF6D00" />
    <circle cx="42" cy="14" r="6" fill="#FF6D00" />
    {/* Ojos */}
    <circle cx="28" cy="20" r="3" fill="white" />
    <circle cx="36" cy="20" r="3" fill="white" />
    <circle cx="28" cy="21" r="2" fill="#000" />
    <circle cx="36" cy="21" r="2" fill="#000" />
    {/* Nariz */}
    <ellipse cx="32" cy="26" rx="3" ry="2" fill="#000" />
    {/* Sonrisa */}
    <path d="M 28 28 Q 32 31 36 28" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Barriga */}
    <ellipse cx="32" cy="40" rx="10" ry="12" fill="#FFB800" opacity="0.6" />
    {/* Corazón en la barriga */}
    <path d="M32 36 L34 38 L32 42 L30 38 Z" fill="#FF1493" />
    <circle cx="30.5" cy="37.5" r="2" fill="#FF1493" />
    <circle cx="33.5" cy="37.5" r="2" fill="#FF1493" />
  </svg>
);

// Icono de Feria (Carrusel) con gradiente vibrante
export const FeriaIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="feriaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00D4FF" />
        <stop offset="100%" stopColor="#0099FF" />
      </linearGradient>
      <filter id="feriaShadow">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>
    {/* Base */}
    <rect x="16" y="50" width="32" height="6" rx="3" fill="#9C27B0" filter="url(#feriaShadow)" />
    {/* Poste central */}
    <rect x="30" y="20" width="4" height="30" fill="#FFB800" />
    {/* Techo del carrusel */}
    <ellipse cx="32" cy="20" rx="20" ry="8" fill="url(#feriaGradient)" filter="url(#feriaShadow)" />
    {/* Punta del techo */}
    <path d="M 32 8 L 38 20 L 26 20 Z" fill="#FF1493" />
    <circle cx="32" cy="8" r="3" fill="#FFB800" />
    {/* Caballitos/asientos */}
    <circle cx="20" cy="38" r="6" fill="#FF1493" filter="url(#feriaShadow)" />
    <circle cx="32" cy="42" r="6" fill="#76FF03" filter="url(#feriaShadow)" />
    <circle cx="44" cy="38" r="6" fill="#FFB800" filter="url(#feriaShadow)" />
    {/* Cadenas */}
    <line x1="26" y1="20" x2="20" y2="38" stroke="#FFC107" strokeWidth="2" />
    <line x1="32" y1="20" x2="32" y2="42" stroke="#FFC107" strokeWidth="2" />
    <line x1="38" y1="20" x2="44" y2="38" stroke="#FFC107" strokeWidth="2" />
    {/* Detalles brillantes */}
    <circle cx="32" cy="20" r="2" fill="white" opacity="0.8" />
  </svg>
);

// Icono de Videojuego (Gamepad) con gradiente vibrante
export const GameIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="gameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9C27B0" />
        <stop offset="100%" stopColor="#7B1FA2" />
      </linearGradient>
      <filter id="gameShadow">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>
    {/* Cuerpo del control */}
    <rect x="8" y="20" width="48" height="24" rx="12" fill="url(#gameGradient)" filter="url(#gameShadow)" />
    {/* Grips */}
    <ellipse cx="14" cy="44" rx="8" ry="10" fill="#7B1FA2" filter="url(#gameShadow)" />
    <ellipse cx="50" cy="44" rx="8" ry="10" fill="#7B1FA2" filter="url(#gameShadow)" />
    {/* D-Pad */}
    <rect x="16" y="28" width="4" height="12" rx="1" fill="#00D4FF" />
    <rect x="12" y="32" width="12" height="4" rx="1" fill="#00D4FF" />
    {/* Botones */}
    <circle cx="44" cy="28" r="3" fill="#FF1493" />
    <circle cx="50" cy="32" r="3" fill="#FFB800" />
    <circle cx="44" cy="36" r="3" fill="#76FF03" />
    <circle cx="38" cy="32" r="3" fill="#00D4FF" />
    {/* Botones centrales */}
    <rect x="28" y="30" width="3" height="3" rx="1" fill="white" opacity="0.6" />
    <rect x="33" y="30" width="3" height="3" rx="1" fill="white" opacity="0.6" />
  </svg>
);

// Icono de Estrella épica
export const StarIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFB800" />
        <stop offset="100%" stopColor="#FFC107" />
      </linearGradient>
      <filter id="starGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <path
      d="M32 8 L38 24 L56 26 L42 38 L46 56 L32 46 L18 56 L22 38 L8 26 L26 24 Z"
      fill="url(#starGradient)"
      filter="url(#starGlow)"
    />
    <path
      d="M32 14 L36 26 L48 28 L38 36 L41 48 L32 41 L23 48 L26 36 L16 28 L28 26 Z"
      fill="white"
      opacity="0.4"
    />
  </svg>
);
