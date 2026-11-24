'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      setEnabled(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!enabled || !visible) return null;

  return (
    <div
      className="pointer-events-none fixed z-9999 transition-transform duration-75 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Outer subtle crosshair bracket */}
      <div
        className={`transition-all duration-150 flex items-center justify-center ${
          isPointer
            ? 'w-8 h-8 border border-[#c8f56a] scale-125 bg-[#c8f56a]/10'
            : 'w-5 h-5 border border-[var(--text-muted)]/40 scale-100'
        }`}
      >
        {/* Inner center dot */}
        <div
          className={`w-1 h-1 transition-colors ${
            isPointer ? 'bg-[#c8f56a]' : 'bg-[var(--text-primary)]'
          }`}
        />
      </div>

      {/* Tiny coordinates HUD in fine mono */}
      {isPointer && (
        <span className="absolute left-6 top-3 text-[8px] font-mono text-[#c8f56a] whitespace-nowrap bg-black/80 px-1 py-0.5 border border-[#c8f56a]/40">
          SELECT
        </span>
      )}
    </div>
  );
}
