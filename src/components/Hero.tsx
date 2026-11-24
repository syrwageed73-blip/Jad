'use client';

import React from 'react';
import ArchitectureVisualizer from './ArchitectureVisualizer';
import { ArrowDown, ArrowUpRight, MapPin, Globe, Shield, Terminal } from 'lucide-react';

interface HeroProps {
  onSelectProject?: (projectId: string) => void;
  onOpenTerminal?: () => void;
}

export default function Hero({ onSelectProject, onOpenTerminal }: HeroProps) {
  return (
    <section className="relative pt-16 border-b border-[#1c2024]">
      {/* 2-Column Split Screen Layout matching the reference design */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-4rem)]">
        
        {/* LEFT COLUMN: Editorial Typography & Availability Status */}
        <div className="lg:col-span-6 p-5 sm:p-10 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#1c2024] relative bg-[#08090a]">
          {/* Top content */}
          <div className="pt-4 sm:pt-10 space-y-6 sm:space-y-7">
            {/* Identity Badge */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono tracking-widest text-[#c8f56a] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f56a] animate-pulse-lime" />
                <span className="font-bold">Jad Aldassouki</span>
                <span className="text-[var(--text-dim)]">/ Python, AI and Data</span>
              </div>

              {/* Monospaced pixel-inspired main headline matching the reference */}
              <h1 className="font-pixel text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-[var(--text-primary)] tracking-tight leading-[1.15] break-words">
                back-end <br />
                developer
              </h1>
            </div>

            {/* Supporting description from CV */}
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-md leading-relaxed font-mono">
              Working mainly in Python, with a strong focus on AI orchestration, data pipelines, and cybersecurity. Engineering scalable server-side systems and reliable architectures.
            </p>

            {/* Quick Tech Tag Cloud */}
            <div className="pt-1 flex flex-wrap gap-2 text-[11px] font-mono text-[var(--text-muted)]">
              {['PYTHON', 'FASTAPI', 'POSTGRESQL', 'KAFKA', 'REDIS', 'AI ORCHESTRATION'].map((tag) => (
                <span
                  key={tag}
                  className="border border-[#1c2024] px-2 py-0.5 bg-[#0e1012] hover:border-[#c8f56a]/40 hover:text-[var(--text-primary)] transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Quick Interactive Terminal Launch banner */}
            <div className="pt-2">
              <button
                onClick={() => {
                  onOpenTerminal?.();
                }}
                className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] hover:text-[#c8f56a] border border-[#1c2024] hover:border-[#c8f56a]/60 bg-[#0a0c0e] px-3 py-2 transition-all cursor-pointer group"
              >
                <Terminal className="w-3.5 h-3.5 text-[#c8f56a] group-hover:scale-110 transition-transform" />
                <span>Launch Interactive Shell</span>
                <span className="text-[10px] text-[var(--text-dim)] ml-auto font-mono">
                  [ press to test endpoints ]
                </span>
              </button>
            </div>
          </div>

          {/* Bottom Information Row matching the reference */}
          <div className="pt-10 lg:pt-0 space-y-4">
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c8f56a] animate-pulse-lime" />
                <span className="text-[var(--text-primary)] font-semibold tracking-wider text-[11px] uppercase">
                  AVAILABLE FOR FREELANCE
                </span>
              </div>
              
              <span className="text-[#1c2024] hidden sm:inline">|</span>

              <div className="flex items-center gap-1.5 text-[11px]">
                <MapPin className="w-3 h-3 text-[#c8f56a]" />
                <span>DAMASCUS, SYRIA</span>
              </div>

              <span className="text-[#1c2024] hidden sm:inline">|</span>

              <div className="flex items-center gap-1.5 text-[11px]">
                <Globe className="w-3 h-3 text-[#c8f56a]" />
                <span>UTC +3</span>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="pt-4 border-t border-[#1c2024] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
              <a
                href="#projects"
                className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors group cursor-pointer"
              >
                <ArrowDown className="w-3.5 h-3.5 text-[#c8f56a] group-hover:translate-y-0.5 transition-transform" />
                <span className="tracking-widest uppercase text-[11px]">SCROLL TO EXPLORE</span>
              </a>

              <span className="text-[10px] text-[var(--text-dim)] hidden sm:inline font-mono">
                SEC_HASH: 0x8F9B2C • TLS 1.3
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Featured Project Showcase Box */}
        <div className="lg:col-span-6 p-5 sm:p-10 lg:p-14 flex flex-col justify-between bg-[#0a0b0d] relative">
          {/* Top metadata of the showcase */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-[var(--text-muted)] tracking-wider lowercase">
                selected project
              </span>
              <span className="flex items-center gap-1.5 text-[#c8f56a] text-[11px] tracking-wider uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f56a]" />
                PRODUCTION
              </span>
            </div>

            <h2 className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] uppercase mb-5">
              API MANAGEMENT SYSTEM
            </h2>

            {/* Featured Showcase Box with 3D/Terminal Architecture View */}
            <div className="w-full shadow-2xl">
              <ArchitectureVisualizer type="hero" title="API INGRESS & GATEWAY MESH" />
            </div>
          </div>

          {/* Bottom details of the featured showcase */}
          <div className="pt-8 space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  onSelectProject?.('saas-backend');
                }}
                className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-primary)] hover:text-[#c8f56a] transition-colors py-1 group cursor-pointer"
              >
                <span className="underline underline-offset-4 font-bold tracking-wider">VIEW PROJECT</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#c8f56a]" />
              </button>

              <span className="text-[11px] font-mono text-[#c8f56a] bg-[#c8f56a]/10 px-2 py-0.5 border border-[#c8f56a]/30">
                MULTI-TENANT REST
              </span>
            </div>

            {/* Info Grid */}
            <div className="pt-4 border-t border-[#1c2024] grid grid-cols-3 gap-2 text-[10px] font-mono uppercase">
              <div>
                <span className="text-[var(--text-dim)] block text-[9px]">ROLE</span>
                <span className="text-[var(--text-primary)] font-semibold">BACKEND DEVELOPER</span>
              </div>
              <div>
                <span className="text-[var(--text-dim)] block text-[9px]">STACK</span>
                <span className="text-[var(--text-primary)] font-semibold truncate block">PYTHON / FASTAPI / KAFKA</span>
              </div>
              <div className="text-right">
                <span className="text-[var(--text-dim)] block text-[9px]">STATUS</span>
                <span className="text-[#c8f56a] font-semibold">PUBLISHED</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
