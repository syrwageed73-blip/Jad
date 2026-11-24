'use client';

import React from 'react';
import { ArrowUp, Mail, Shield } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-color)] font-mono text-xs">
      {/* Upper Status Ticker */}
      <div className="border-b border-[var(--border-color)] px-4 sm:px-10 lg:px-14 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-4 text-[11px] text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#c8f56a] animate-pulse-lime shrink-0" />
          <span className="text-[var(--text-primary)] font-semibold">
            ALL SYSTEMS OPERATIONAL
          </span>
          <span className="text-[var(--text-dim)] hidden sm:inline">
            (99.99% HISTORICAL UPTIME)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-[10px]">
          <span>LOCATION: DAMASCUS, SYRIA</span>
          <span>TIMEZONE: UTC +3</span>
          <span className="text-[#c8f56a] hidden md:inline">TLS 1.3 ENCRYPTED</span>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-14 py-8 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Logo & Identification */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 border border-[var(--text-primary)] flex items-center justify-center font-bold text-xs tracking-tighter text-[var(--text-primary)]">
            JA
          </div>
          <div>
            <div className="text-xs font-bold text-[var(--text-primary)] tracking-wide">
              JAD ALDASSOUKI // BACK-END DEVELOPER
            </div>
            <div className="text-[10px] text-[var(--text-muted)]">
              Scalable Systems &bull; Secure APIs &bull; Reliable Data
            </div>
          </div>
        </div>

        {/* Center: Precision Tagline & Copyright */}
        <div className="text-center md:text-left space-y-1">
          <p className="text-[11px] text-[var(--text-primary)] font-medium">
            Designed &amp; Developed with precision.
          </p>
          <p className="text-[10px] text-[var(--text-muted)]">
            &copy; 2026 Jad Aldassouki. All rights reserved.
          </p>
        </div>

        {/* Right: Socials & Back to Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-3 text-[var(--text-muted)]">
            <a
              href="https://www.linkedin.com/in/jad-aldassouki-28842543a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#c8f56a] transition-colors p-1"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/jadaldassouki"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#c8f56a] transition-colors p-1"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="h-4 w-[1px] bg-[var(--border-color)]" />

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[var(--border-color)] hover:border-[#c8f56a] text-[10px] text-[var(--text-primary)] hover:text-[#c8f56a] transition-colors group cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>TOP</span>
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform text-[#c8f56a]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
