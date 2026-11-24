'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy, Clock, Globe, ShieldCheck, UserCheck } from 'lucide-react';
import { LinkedinIcon } from './SocialIcons';
import { sound } from '@/utils/sound';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const linkedinUrl = 'https://www.linkedin.com/in/jad-aldassouki-28842543a/';
  const linkedinHandle = 'jad-aldassouki-28842543a';

  const handleCopyLink = () => {
    sound.playClick(950, 0.03);
    navigator.clipboard.writeText(linkedinUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative border-b border-[#1c2024] bg-[#08090a]">
      {/* Section Header matching reference */}
      <div className="border-b border-[#1c2024] px-6 sm:px-10 lg:px-14 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#c8f56a] font-bold">—</span>
          <h2 className="text-[var(--text-primary)] font-semibold tracking-wider uppercase text-xs">
            contact
          </h2>
          <span className="text-[var(--text-muted)]">/ professional network</span>
        </div>

        <span className="text-[10px] text-[#c8f56a] border border-[#c8f56a]/30 px-2 py-0.5 bg-[#c8f56a]/10 font-mono hidden sm:inline">
          LINKEDIN VERIFIED
        </span>
      </div>

      {/* Main 2-Column Split Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Left Column: Editorial Headline & Overview */}
        <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#1c2024] bg-[#090b0d]">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#c8f56a]">
              <span className="w-2 h-2 rounded-full bg-[#c8f56a] animate-pulse-lime" />
              <span className="uppercase tracking-widest font-semibold">DIRECT MESSAGING ACTIVE</span>
            </div>

            <h3 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] uppercase leading-[1.1]">
              HAVE A PROJECT IN MIND? <br />
              LET&apos;S CONNECT.
            </h3>

            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-mono max-w-lg">
              Looking for a junior backend role, and open to freelance work on APIs, LLM integration, data pipelines, and documentation. Reach out directly on LinkedIn to discuss requirements, architecture, or engineering opportunities.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-[var(--text-muted)]">
              <span className="border border-[#1c2024] px-2.5 py-1 bg-[#0c0d10]">
                JUNIOR BACKEND ROLES
              </span>
              <span className="border border-[#1c2024] px-2.5 py-1 bg-[#0c0d10]">
                FREELANCE API WORK
              </span>
              <span className="border border-[#1c2024] px-2.5 py-1 bg-[#0c0d10]">
                AI ORCHESTRATION &amp; RAG
              </span>
            </div>
          </div>

          <div className="pt-10 space-y-3 font-mono text-xs text-[var(--text-muted)] border-t border-[#1c2024]/60">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#c8f56a]" />
              <span>AVERAGE RESPONSE: WITHIN 24 HOURS</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#c8f56a]" />
              <span>LOCATION: DAMASCUS, SYRIA (UTC +3)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Focused LinkedIn Profile Showcase Card */}
        <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-[#08090a]">
          <div className="space-y-6">
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-[#1c2024] pb-4">
              <div className="flex items-center gap-3">
                <span className="font-pixel text-3xl sm:text-4xl text-[var(--text-primary)] font-bold">
                  01
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                  PRIMARY CONTACT
                </span>
              </div>

              <span className="text-[10px] font-mono text-[#c8f56a] border border-[#c8f56a]/30 px-2 py-0.5 bg-[#c8f56a]/10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f56a] animate-pulse-lime" />
                DMS OPEN
              </span>
            </div>

            {/* Profile Identity Block */}
            <div className="p-6 bg-[#0c0d10] border border-[#1c2024] space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 border border-[#1c2024] bg-[#070809] flex items-center justify-center">
                    <LinkedinIcon className="w-6 h-6 text-[#c8f56a]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-lg sm:text-xl font-bold uppercase tracking-wider text-[var(--text-primary)]">
                      LINKEDIN
                    </h4>
                    <p className="text-xs font-mono text-[#c8f56a]">
                      in/{linkedinHandle}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 px-2.5 py-1 border border-[#1c2024] hover:border-[#c8f56a] text-[10px] font-mono text-[var(--text-muted)] hover:text-[#c8f56a] transition-colors cursor-pointer"
                  title="Copy LinkedIn profile link"
                >
                  {copied ? <Check className="w-3 h-3 text-[#c8f56a]" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-mono leading-relaxed pt-1">
                Professional network, engineering background, recommendations, and direct messaging. Connect with me directly for opportunities and project inquiries.
              </p>

              <div className="pt-2 border-t border-[#1c2024]/60 flex items-center justify-between text-[10px] font-mono text-[var(--text-dim)]">
                <span>PROFILE: JAD ALDASSOUKI</span>
                <span className="text-[#c8f56a]">PYTHON / AI / DATA</span>
              </div>
            </div>
          </div>

          {/* Direct CTA Action Button */}
          <div className="pt-8">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick(900, 0.03)}
              className="w-full py-4 border border-[#1c2024] hover:border-[#c8f56a] bg-[#0c0e11] hover:bg-[#c8f56a] text-[var(--text-primary)] hover:text-[#08090a] font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>CONNECT ON LINKEDIN</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Status & Availability Strip */}
      <div className="border-t border-[#1c2024] px-6 sm:px-10 lg:px-14 py-5 bg-[#060708] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <UserCheck className="w-3.5 h-3.5 text-[#c8f56a]" />
          <span>STATUS: OPEN FOR NEW OPPORTUNITIES &amp; COLLABORATIONS</span>
        </div>

        <div className="flex items-center gap-6 text-[11px]">
          <span className="text-[#c8f56a]">DIRECT LINKEDIN INBOX MONITORED</span>
        </div>
      </div>
    </section>
  );
}
