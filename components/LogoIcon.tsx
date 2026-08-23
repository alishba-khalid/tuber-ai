import React from 'react';

interface LogoIconProps {
  className?: string;
  iconClassName?: string;
}

export default function LogoIcon({ className = "w-9 h-9", iconClassName = "w-5.5 h-5.5" }: LogoIconProps) {
  return (
    <div className={`${className} rounded-xl bg-gradient-to-b from-[#122823] to-[#050B0A] border border-[#225146] flex items-center justify-center shadow-lg shadow-black/40 group-hover:border-[#C5B49F]/60 group-hover:shadow-[0_0_12px_rgba(197,180,159,0.15)] transition-all duration-300`}>
      <svg 
        className={`${iconClassName} text-[#C5B49F] transition-all duration-500 group-hover:scale-110`}
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.8"
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {/* Ghost Hood */}
        <path d="M6 12C6 7.5 8.5 4 12 4s6 3.5 6 8" />
        
        {/* Floating wavy sheets */}
        <path d="M6 12c-0.5 3 0.5 6 2.5 7.5" />
        <path d="M18 12c0.5 3-0.5 6-2.5 7.5" />
        
        {/* Wavy bottom border */}
        <path d="M8.5 19.5c1.5 1 4.5 1 6 0" strokeWidth="1" strokeDasharray="2 2" className="opacity-60" />

        {/* Video Play Button in the center (representing video generation) */}
        <path d="M10.5 9.5l4 2.5-4 2.5v-5z" fill="currentColor" />

        {/* Generative AI Sparkle Star */}
        <path 
          d="M17.5 2.5l0.6 1 1 0.6-1 0.6-0.6 1-0.6-1-1-0.6 1-0.6z" 
          fill="currentColor" 
          stroke="none" 
        />
      </svg>
    </div>
  );
}
