'use client';
import React, { useState, useCallback } from 'react';

export default function HoverGlowCard({ className = '', children }) {
  const [mousePosition, setMousePosition] = useState(null);

  const handleMouseMove = useCallback((e) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePosition(null);
  }, []);

  return (
    <div
      className={`${className} group relative block cursor-pointer rounded-lg p-[2px] transition-all duration-300 hover:scale-[1]`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: mousePosition
            ? `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, rgb(74, 222, 128), transparent 70%)`
            : 'none',
          maskImage: 'linear-gradient(#000 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor'
        }}
      />

      <div className="relative h-full rounded-lg border-2 border-[rgb(229,231,235)] bg-white p-4 shadow-sm transition-shadow hover:border-[rgb(255,255,255,0.5)] hover:shadow-md">
        <div
          className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-50"
          style={{
            background: mousePosition
              ? `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(74, 222, 128, 0.2), transparent 40%)`
              : 'none'
          }}
        />

        <div className="relative z-10 flex h-full flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}


