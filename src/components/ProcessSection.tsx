'use client';

import React, { useState } from 'react';
import { processSteps } from '@/data/process';
import { Check, Code, Terminal, ChevronRight, Copy, CheckCircle2 } from 'lucide-react';
import { sound } from '@/utils/sound';

export default function ProcessSection() {
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    sound.playClick(900, 0.03);
    navigator.clipboard.writeText(processSteps[selectedStep].codeSample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="process" className="relative border-b border-[var(--border-color)]">
      {/* Section Header */}
      <div className="border-b border-[var(--border-color)] px-6 sm:px-10 lg:px-14 py-6 bg-[var(--bg-color)] flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#c8f56a] font-bold">—</span>
          <h2 className="text-[var(--text-primary)] font-semibold tracking-wider uppercase text-xs">
            development process
          </h2>
          <span className="text-[var(--text-muted)]">/ 05 stages</span>
        </div>

        <span className="text-[10px] text-[var(--text-dim)] font-mono hidden sm:inline">
          ENGINEERING_LIFECYCLE
        </span>
      </div>

      {/* Main Process Grid: 5 Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-color)]">
        {processSteps.map((step, idx) => (
          <div
            key={idx}
            onClick={() => {
              sound.playClick(850, 0.02);
              setSelectedStep(idx);
            }}
            className={`p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-all ${
              selectedStep === idx
                ? 'bg-[#0e1013] border-t-2 border-t-[#c8f56a]'
                : 'bg-[var(--bg-color)] hover:bg-[var(--bg-surface)]/20'
            }`}
          >
            <div>
              {/* Large Pixel Step Number */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-pixel text-3xl sm:text-4xl text-[#c8f56a]">
                  {step.number}
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border-color)] px-1.5 py-0.5">
                  PHASE
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="font-mono text-base font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2">
                {step.title}
              </h3>
              <p className="text-[11px] font-mono text-[#c8f56a] mb-4">
                {step.tagline}
              </p>

              {/* Description */}
              <p className="text-xs font-mono text-[var(--text-muted)] leading-relaxed mb-6">
                {step.description}
              </p>

              {/* Deliverables Checklist */}
              <div className="space-y-2 border-t border-[var(--border-color)]/60 pt-4 font-mono text-[11px]">
                <span className="text-[10px] text-[var(--text-dim)] uppercase block tracking-wider">
                  Deliverables:
                </span>
                {step.deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2 text-[var(--text-primary)]">
                    <Check className="w-3 h-3 text-[#c8f56a] mt-0.5 shrink-0" />
                    <span className="text-[10px] leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Click to inspect code button */}
            <div className="mt-8 pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-[10px] font-mono">
              <span className="text-[var(--text-muted)]">
                {selectedStep === idx ? 'VIEWING SPEC' : 'CLICK TO VIEW SPEC'}
              </span>
              <ChevronRight
                className={`w-3.5 h-3.5 text-[#c8f56a] transition-transform ${
                  selectedStep === idx ? 'rotate-90' : ''
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Code / Deliverable Inspector for Selected Step */}
      <div className="border-t border-[var(--border-color)] p-6 sm:p-10 bg-[#08090a] font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#c8f56a]" />
            <span className="text-[var(--text-primary)] font-bold uppercase tracking-wider text-xs">
              SPECIMEN: {processSteps[selectedStep].number} — {processSteps[selectedStep].title}
            </span>
            <span className="text-[11px] text-[var(--text-muted)]">
              ({processSteps[selectedStep].codeSample.filename})
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)]">
            <span>LANGUAGE: {processSteps[selectedStep].codeSample.language.toUpperCase()}</span>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 px-2 py-0.5 border border-[#1c2024] hover:border-[#c8f56a] hover:text-[#c8f56a] transition-colors cursor-pointer text-[10px]"
            >
              {copied ? <CheckCircle2 className="w-3 h-3 text-[#c8f56a]" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>
        </div>

        <pre className="p-4 bg-[#050607] border border-[var(--border-color)] text-[11px] leading-relaxed text-[var(--text-primary)] overflow-x-auto">
          <code>{processSteps[selectedStep].codeSample.code}</code>
        </pre>
      </div>
    </section>
  );
}
