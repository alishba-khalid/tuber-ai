import React from 'react';

interface LogoIconProps {
  className?: string;
  iconClassName?: string;
}

export default function LogoIcon({ className = "w-8 h-8", iconClassName = "w-4.5 h-4.5" }: LogoIconProps) {
  return (
    <div className={`${className} rounded-lg bg-gradient-to-br from-[#C5B49F] to-[#a4927d] flex items-center justify-center shadow-md shadow-black/20 transition-all duration-300 group-hover:shadow-[#C5B49F]/20 group-hover:scale-105`}>
      <svg 
        className={`${iconClassName} text-[#050B0A]`} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {/* Stylized minimalist ghost outline */}
        <path d="M18 10a6 6 0 0 0-12 0v8l2-1.5 2 1.5 2-1.5 2 1.5 2-1.5 2 1.5V10z" fill="currentColor" fillOpacity="0.2" />
        {/* Glowing/sparkling eye points */}
        <circle cx="9.5" cy="9.5" r="1" fill="currentColor" />
        <circle cx="14.5" cy="9.5" r="1" fill="currentColor" />
        {/* Subtle camera shutter/generative line in the background */}
        <path d="M12 5v2m-3.5 6.5h7" strokeWidth="1.2" strokeOpacity="0.6" />
      </svg>
    </div>
  );
}
