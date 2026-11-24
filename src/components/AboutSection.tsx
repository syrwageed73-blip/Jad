'use client';

import React from 'react';
import { ArrowUpRight, CheckCircle2, Shield, Terminal, Zap, Cpu, GraduationCap, Award } from 'lucide-react';
import { sound } from '@/utils/sound';

export default function AboutSection() {
  const stats = [
    { label: 'ACADEMIC FOCUS', value: 'IT Final Year' },
    { label: 'SPECIALIZATION', value: 'Cybersecurity' },
    { label: 'PRIMARY ENGINE', value: 'Python / FastAPI' },
    { label: 'SYSTEM ARCHITECTURE', value: 'Kafka & AI' },
  ];

  return (
    <section id="about" className="relative border-b border-[#1c2024] bg-[#08090a]">
      {/* Section Header */}
      <div className="border-b border-[#1c2024] px-6 sm:px-10 lg:px-14 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#c8f56a] font-bold">—</span>
          <h2 className="text-[var(--text-primary)] font-semibold tracking-wider uppercase text-xs">
            about
          </h2>
          <span className="text-[var(--text-muted)]">/ background & education</span>
        </div>

        <span className="text-[10px] text-[#c8f56a] border border-[#c8f56a]/30 px-2 py-0.5 bg-[#c8f56a]/10 font-mono hidden sm:inline">
          DAMASCUS, SYRIA
        </span>
      </div>

      {/* Main Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* Left Column: Big Headline & Key Focus */}
        <div className="lg:col-span-6 p-6 sm:p-10 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#1c2024]">
          <div className="space-y-6">
            <h3 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-tight lowercase">
              building the systems <br />
              behind the experience.
            </h3>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed font-mono max-w-lg">
              Final-year <span className="text-[var(--text-primary)] font-bold">Information Technology</span> student and backend developer, working mainly in <span className="text-[#c8f56a] font-bold">Python</span>, with a strong interest in <span className="text-[var(--text-primary)] font-bold">AI orchestration</span>, data engineering, and currently studying <span className="text-[#c8f56a] font-bold">cybersecurity</span>.
            </p>

            <div className="p-4 bg-[#0c0d10] border border-[#1c2024] font-mono text-xs text-[var(--text-primary)] space-y-2">
              <div className="text-[10px] text-[#c8f56a] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>CORE STRENGTHS & COGNITIVE PROFILE</span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                &ldquo;Deep, analytical thinking applied to complex distributed architectures. Approaching system edge-cases, race conditions, and security boundaries with the strategic foresight of a high-level chess player.&rdquo;
              </p>
            </div>
          </div>

          {/* Education & Focus Grid */}
          <div className="pt-10 grid grid-cols-2 gap-3 border-t border-[#1c2024] font-mono">
            {stats.map((s, i) => (
              <div key={i} className="p-3 bg-[#0c0d10] border border-[#1c2024]">
                <span className="text-[9px] text-[var(--text-dim)] block uppercase tracking-wider">{s.label}</span>
                <span className="text-sm sm:text-base font-bold text-[#c8f56a] mt-0.5 block">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: In-Depth Background from CV */}
        <div className="lg:col-span-6 p-6 sm:p-10 lg:p-14 flex flex-col justify-between bg-[#0a0b0d]">
          <div className="space-y-6 font-mono text-xs">
            {/* Education Track */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#c8f56a] font-bold uppercase text-[11px] tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>Education & Current Studies</span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 bg-[#070809] border border-[#1c2024] flex items-center justify-between">
                  <div>
                    <span className="text-[var(--text-primary)] font-bold block text-[11px]">Information Technology</span>
                    <span className="text-[10px] text-[var(--text-muted)]">Core CS, Distributed Networks & Systems</span>
                  </div>
                  <span className="text-[10px] text-[#c8f56a] border border-[#c8f56a]/30 px-1.5 py-0.5">FINAL YEAR</span>
                </div>
                <div className="p-2.5 bg-[#070809] border border-[#1c2024] flex items-center justify-between">
                  <div>
                    <span className="text-[var(--text-primary)] font-bold block text-[11px]">Cybersecurity</span>
                    <span className="text-[10px] text-[var(--text-muted)]">OWASP Top 10, Zero-Trust IAM, Cryptography & Threat Modeling</span>
                  </div>
                  <span className="text-[10px] text-yellow-400 border border-yellow-400/30 px-1.5 py-0.5">STUDYING</span>
                </div>
              </div>
            </div>

            {/* AI Orchestration & Data Focus */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#c8f56a] font-bold uppercase text-[11px] tracking-wider">
                <Cpu className="w-3.5 h-3.5" />
                <span>AI Orchestration & LLM Workflows</span>
              </div>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Passionate about coordinating autonomous LLM agents with specialized tools, routing each task dynamically to optimal models (GPT/Claude), and keeping outputs structured and verified through deterministic guardrails and pgvector RAG.
              </p>
            </div>

            {/* Open for Collaboration */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#c8f56a] font-bold uppercase text-[11px] tracking-wider">
                <Terminal className="w-3.5 h-3.5" />
                <span>Looking For & Open To</span>
              </div>
              <div className="flex flex-wrap gap-2 text-[10px]">
                <span className="border border-[#1c2024] px-2 py-1 bg-[#0c0d10] text-[var(--text-primary)]">
                  JUNIOR BACKEND ROLES
                </span>
                <span className="border border-[#1c2024] px-2 py-1 bg-[#0c0d10] text-[var(--text-primary)]">
                  FREELANCE API CONTRACTS
                </span>
                <span className="border border-[#1c2024] px-2 py-1 bg-[#0c0d10] text-[var(--text-primary)]">
                  LLM & RAG INTEGRATIONS
                </span>
                <span className="border border-[#1c2024] px-2 py-1 bg-[#0c0d10] text-[var(--text-primary)]">
                  DATA PIPELINES & ETL
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-8 border-t border-[#1c2024] flex items-center justify-between text-xs font-mono">
            <span className="text-[var(--text-muted)]">READY TO COLLABORATE?</span>
            <a
              href="#contact"
              onClick={() => sound.playClick(800, 0.02)}
              className="flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[#c8f56a] transition-colors underline underline-offset-4 font-bold"
            >
              <span>CONNECT WITH JAD</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#c8f56a]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
