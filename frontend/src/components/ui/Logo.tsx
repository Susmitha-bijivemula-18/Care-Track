import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
}

export function CareTrackIcon({ className = "", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`text-foreground ${className}`}
      {...props}
    >
      {/* Outer C shape representing Care, Shield, and Track */}
      <path 
        d="M 21 8 A 10 10 0 1 0 21 24" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
      />
      {/* The moving tracking line/arrow */}
      <path 
        d="M 9 16 L 26 16" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
      />
      {/* The patient/node making progress */}
      <circle 
        cx="26" 
        cy="16" 
        r="3.5" 
        className="fill-brand" 
      />
    </svg>
  );
}

export function CareTrackLogo({ className = "", iconClassName = "", onClick }: LogoProps) {
  return (
    <Link to="/" onClick={onClick} className={`flex flex-col gap-0.5 group ${className}`}>
      <div className="flex items-center gap-2">
        <CareTrackIcon className={`w-8 h-8 transition-transform duration-300 group-hover:scale-105 ${iconClassName}`} />
        <span className="text-[22px] font-heading font-semibold tracking-tight text-foreground leading-none mt-1">
          CareTrack
        </span>
      </div>
      <div className="text-[10px] uppercase tracking-[0.15em] font-medium text-muted-foreground pl-[40px] leading-none">
        Less waiting. Better care.
      </div>
    </Link>
  );
}

export function CareTrackLogoCompact({ className = "", iconClassName = "", onClick }: LogoProps) {
  return (
    <Link to="/" onClick={onClick} className={`flex items-center gap-2 group ${className}`}>
      <CareTrackIcon className={`w-7 h-7 md:w-8 md:h-8 transition-transform duration-300 group-hover:scale-105 ${iconClassName}`} />
      <span className="text-lg md:text-xl font-heading font-semibold tracking-tight text-foreground">
        CareTrack
      </span>
    </Link>
  );
}
