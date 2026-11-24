'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Terminal as TerminalIcon, Volume2, VolumeX } from 'lucide-react';
import { sound } from '@/utils/sound';

interface NavbarProps {
  onOpenTerminal?: () => void;
}

export default function Navbar({ onOpenTerminal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    sound.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      sound.playSuccess();
    }
  };

  const navLinks = [
    { name: 'about', href: '#about' },
    { name: 'expertise', href: '#expertise' },
    { name: 'projects', href: '#projects' },
    { name: 'process', href: '#process' },
    { name: 'contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    sound.playClick(800, 0.02);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#08090a]/95 backdrop-blur-md border-b border-[#1c2024] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Minimal Monogram Logo */}
        <a
          href="#"
          onClick={handleLinkClick}
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
              onClick={handleLinkClick}
              className="hover:text-[var(--text-primary)] transition-colors relative py-1 hover:underline underline-offset-4 decoration-[#c8f56a]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Interactive Terminal & Sound Toggle */}
        <div className="flex items-center space-x-3">
          {/* Interactive Shell / Terminal Button */}
          <button
            onClick={() => {
              sound.playClick(900, 0.03);
              onOpenTerminal?.();
            }}
            className="flex items-center gap-2 text-xs text-[var(--text-primary)] hover:text-[#c8f56a] px-2.5 py-1.5 border border-[#1c2024] hover:border-[#c8f56a]/60 bg-[#0d0f11] transition-all cursor-pointer group"
            title="Open Interactive Backend Terminal (curl / SQL)"
          >
            <TerminalIcon className="w-3.5 h-3.5 text-[#c8f56a] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-bold text-[11px] tracking-wider">SHELL</span>
            <span className="text-[9px] bg-[#c8f56a]/15 text-[#c8f56a] px-1 py-0.2 border border-[#c8f56a]/30">
              cURL
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-1.5 text-[var(--text-muted)] hover:text-[#c8f56a] border border-[#1c2024] hover:border-[#c8f56a]/50 transition-colors cursor-pointer"
            title={soundEnabled ? 'Disable mechanical sound feedback' : 'Enable mechanical sound feedback'}
            aria-label="Toggle sound feedback"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#c8f56a]" /> : <VolumeX className="w-3.5 h-3.5 text-[var(--text-dim)]" />}
          </button>

          {/* Direct Connect Action */}
          <a
            href="#contact"
            onClick={handleLinkClick}
            className="hidden lg:flex items-center gap-1.5 text-xs text-[var(--text-primary)] hover:text-[#c8f56a] py-1 px-2.5 border border-[#1c2024] hover:border-[#c8f56a] transition-all"
          >
            <span className="text-[var(--text-muted)]">—</span>
            <span>connect</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[#1c2024]"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1c2024] bg-[#08090a] px-6 py-6 space-y-4 font-mono">
          <nav className="flex flex-col space-y-4 text-sm text-[var(--text-muted)]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  handleLinkClick();
                  setMobileMenuOpen(false);
                }}
                className="hover:text-[var(--text-primary)] flex items-center justify-between py-2 border-b border-[#1c2024]/50"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-[#c8f56a]" />
              </a>
            ))}
          </nav>
          <div className="pt-2 flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c8f56a] animate-pulse-lime" />
              Available for freelance
            </span>
            <button
              onClick={() => {
                onOpenTerminal?.();
                setMobileMenuOpen(false);
              }}
              className="px-2.5 py-1 border border-[#c8f56a] text-[#c8f56a] flex items-center gap-1 text-[11px]"
            >
              <TerminalIcon className="w-3 h-3" />
              <span>TERMINAL</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
