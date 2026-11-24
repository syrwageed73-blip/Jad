'use client';

import React, { useState } from 'react';
import { skillsData } from '@/data/skills';
import { Server, Database, Cloud, ShieldCheck, Check, Search, Terminal, Sparkles } from 'lucide-react';

export default function TechnicalExpertise() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; desc: string; exp: string; level: string } | null>(null);

  const categoryIcons = [
    <Server key="srv" className="w-4 h-4 text-[#c8f56a]" />,
    <Database key="db" className="w-4 h-4 text-[#c8f56a]" />,
    <Cloud key="ops" className="w-4 h-4 text-[#c8f56a]" />,
    <ShieldCheck key="sec" className="w-4 h-4 text-[#c8f56a]" />,
  ];

  return (
    <section id="expertise" className="relative border-b border-[#1c2024] bg-[#08090a]">
      {/* Section Header */}
      <div className="border-b border-[#1c2024] px-4 sm:px-10 lg:px-14 py-4 sm:py-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#c8f56a] font-bold">—</span>
          <h2 className="text-[var(--text-primary)] font-semibold tracking-wider uppercase text-xs">
            technical expertise
          </h2>
          <span className="text-[var(--text-muted)]">/ 04 core categories</span>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#0d0f12] border border-[#1c2024] focus-within:border-[#c8f56a] transition-colors text-xs font-mono flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-[var(--text-dim)] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="filter backend tools..."
              className="bg-transparent text-xs text-[var(--text-primary)] outline-hidden w-full sm:w-48 placeholder:text-[var(--text-dim)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[10px] text-[var(--text-dim)] hover:text-[var(--text-primary)] shrink-0 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <span className="text-[10px] text-[#c8f56a] border border-[#c8f56a]/30 px-2 py-1 bg-[#c8f56a]/10 hidden sm:inline font-mono shrink-0">
            100% PURE BACKEND
          </span>
        </div>
      </div>

      {/* 4 Categorized Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#1c2024]">
        {skillsData.map((category, catIdx) => {
          const filteredSkills = category.skills.filter(
            (s) =>
              s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.description.toLowerCase().includes(searchQuery.toLowerCase())
          );

          return (
            <div
              key={catIdx}
              className="p-5 sm:p-8 flex flex-col justify-between bg-[#08090a] hover:bg-[#0c0e11]/50 transition-colors"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-2 mb-2">
                  {categoryIcons[catIdx]}
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">
                    {category.title}
                  </h3>
                </div>
                <p className="text-[11px] font-mono text-[var(--text-muted)] mb-6">
                  {category.subtitle}
                </p>

                {/* Skills List in Category */}
                <div className="space-y-3.5">
                  {filteredSkills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      onClick={() => {
                        setSelectedSkill({
                          name: skill.name,
                          desc: skill.description,
                          exp: skill.experience,
                          level: skill.level,
                        });
                      }}
                      className="p-3 border border-[#1c2024] bg-[#0c0d10] hover:border-[#c8f56a]/70 hover:bg-[#101216] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="font-bold text-[var(--text-primary)] group-hover:text-[#c8f56a] transition-colors">
                          {skill.name}
                        </span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 border ${
                            skill.highlight
                              ? 'text-[#c8f56a] border-[#c8f56a]/30 bg-[#c8f56a]/5'
                              : 'text-[var(--text-dim)] border-[#1c2024]'
                          }`}
                        >
                          {skill.level}
                        </span>
                      </div>

                      <p className="text-[10px] text-[var(--text-muted)] font-mono leading-relaxed mt-1">
                        {skill.description}
                      </p>

                      <div className="mt-2 pt-1.5 border-t border-[#1c2024]/60 flex items-center justify-between text-[9px] text-[var(--text-dim)] font-mono">
                        <span>EXP: {skill.experience}</span>
                        {skill.highlight && (
                          <span className="text-[#c8f56a] flex items-center gap-1 font-semibold">
                            <Check className="w-2.5 h-2.5" /> PRIMARY
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {filteredSkills.length === 0 && (
                    <div className="text-[11px] text-[var(--text-dim)] font-mono py-4 text-center border border-dashed border-[#1c2024]">
                      No match for &quot;{searchQuery}&quot;
                    </div>
                  )}
                </div>
              </div>

              {/* Category Footer Counter */}
              <div className="mt-8 pt-4 border-t border-[#1c2024] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
                <span>{filteredSkills.length} PRODUCTION TOOLS</span>
                <span className="text-[#c8f56a]">0{catIdx + 1}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Skill Quick Detail Modal / Drawer */}
      {selectedSkill && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-mono text-xs"
          onClick={() => setSelectedSkill(null)}
        >
          <div
            className="w-full max-w-md bg-[#090b0d] border border-[#c8f56a]/40 p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#1c2024] pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#c8f56a]" />
                <span className="font-bold text-sm text-[var(--text-primary)] uppercase">
                  {selectedSkill.name}
                </span>
              </div>
              <span className="text-[10px] text-[#c8f56a] border border-[#c8f56a]/30 px-1.5 py-0.5">
                {selectedSkill.level}
              </span>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {selectedSkill.desc}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-[#1c2024] text-[10px] text-[var(--text-dim)]">
              <span>EXPERIENCE: {selectedSkill.exp}</span>
              <button
                onClick={() => setSelectedSkill(null)}
                className="px-3 py-1 bg-[#c8f56a] text-[#08090a] font-bold text-[10px] uppercase hover:bg-[#d6f88b] transition-colors cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Engineering Philosophy Banner */}
      <div className="border-t border-[#1c2024] p-5 sm:p-8 bg-[#060708] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
        <div className="flex items-start gap-3">
          <span className="text-[#c8f56a] font-bold">01</span>
          <div>
            <div className="text-[var(--text-primary)] font-bold mb-1">ACID Compliance</div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Strict transactional boundary protection and zero phantom writes.
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-[#c8f56a] font-bold">02</span>
          <div>
            <div className="text-[var(--text-primary)] font-bold mb-1">Idempotency First</div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Safe distributed retries with cryptographic deduplication keys.
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-[#c8f56a] font-bold">03</span>
          <div>
            <div className="text-[var(--text-primary)] font-bold mb-1">p99 Latency Budget</div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Sub-15ms standard across high-traffic cached endpoints.
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-[#c8f56a] font-bold">04</span>
          <div>
            <div className="text-[var(--text-primary)] font-bold mb-1">Zero-Trust Security</div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Asymmetric token issuance, mTLS transport, and audited access controls.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
