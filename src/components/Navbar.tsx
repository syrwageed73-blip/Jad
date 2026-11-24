'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Terminal as TerminalIcon } from 'lucide-react';

interface NavbarProps {
  onOpenTerminal?: () => void;
}

export default function Navbar({ onOpenTerminal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'about', href: '#about' },
    { name: 'expertise', href: '#expertise' },
    { name: 'projects', href: '#projects' },
    { name: 'process', href: '#process' },
    { name: 'contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#08090a]/95 backdrop-blur-md border-b border-[#1c2024] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Minimal Monogram Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group cursor-pointer"
          aria-label="Jad Aldassouki - Back-End Developer Home"
        >
          <div className="w-8 h-8 border border-[var(--text-primary)] flex items-center justify-center font-bold text-xs tracking-tighter text-[var(--text-primary)] group-hover:border-[#c8f56a] group-hover:text-[#c8f56a] transition-colors">
            JA
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--text-primary)] group-hover:text-[#c8f56a] transition-colors">
              Jad Aldassouki
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              sys.backend
            </span>
          </div>
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs tracking-wider text-[var(--text-muted)]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[var(--text-primary)] transition-colors relative py-1 hover:underline underline-offset-4 decoration-[#c8f56a]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Interactive Terminal & Connect Action */}
        <div className="flex items-center space-x-3">
          {/* Interactive Shell / Terminal Button */}
          <button
            onClick={() => onOpenTerminal?.()}
            className="flex items-center gap-2 text-xs text-[var(--text-primary)] hover:text-[#c8f56a] px-2.5 py-1.5 border border-[#1c2024] hover:border-[#c8f56a]/60 bg-[#0d0f11] transition-all cursor-pointer group"
            title="Open Interactive Backend Terminal (curl / SQL)"
          >
            <TerminalIcon className="w-3.5 h-3.5 text-[#c8f56a] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-bold text-[11px] tracking-wider">SHELL</span>
            <span className="text-[9px] bg-[#c8f56a]/15 text-[#c8f56a] px-1 py-0.2 border border-[#c8f56a]/30">
              cURL
            </span>
          </button>

          {/* Direct Connect Action */}
          <a
            href="#contact"
            className="hidden lg:flex items-center gap-1.5 text-xs text-[var(--text-primary)] hover:text-[#c8f56a] py-1 px-2.5 border border-[#1c2024] hover:border-[#c8f56a] transition-all"
          >
            <span className="text-[var(--text-muted)]">—</span>
            <span>connect</span>
          </a>

          {/* Mobile Menu Button with 44px touch target */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[#1c2024] cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1c2024] bg-[#08090a]/98 backdrop-blur-xl px-5 py-6 space-y-5 font-mono shadow-2xl">
          <nav className="flex flex-col space-y-1 text-sm text-[var(--text-muted)]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[var(--text-primary)] flex items-center justify-between py-3 px-2 border-b border-[#1c2024]/60 active:bg-[#0e1012] transition-colors"
              >
                <span className="font-semibold tracking-wider">{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-[#c8f56a]" />
              </a>
            ))}
          </nav>
          <div className="pt-3 flex items-center justify-between text-xs text-[var(--text-muted)] border-t border-[#1c2024]/80">
            <span className="flex items-center gap-2 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-[#c8f56a] animate-pulse-lime" />
              Available for freelance
            </span>
            <button
              onClick={() => {
                onOpenTerminal?.();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 border border-[#c8f56a] text-[#c8f56a] flex items-center gap-1.5 text-xs font-bold active:bg-[#c8f56a]/15 transition-colors cursor-pointer"
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>TERMINAL</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
