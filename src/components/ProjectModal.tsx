'use client';

import React from 'react';
import { Project } from '@/types';
import { X, ExternalLink, Terminal, Database, Activity, Check, Copy } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!project) return null;

  const handleCopyCurl = () => {
    if (project.curlSnippet) {
      navigator.clipboard.writeText(project.curlSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#090a0c] border border-[var(--border-color)] shadow-2xl my-4 sm:my-8 font-mono text-xs max-h-[94vh] sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-6 border-b border-[var(--border-color)] bg-[#0d0e11]">
          <div className="flex items-center gap-3">
            <span className="font-pixel text-xl sm:text-2xl text-[#c8f56a]">
              {project.number}
            </span>
            <div>
              <h3 className="text-sm sm:text-lg font-bold text-[var(--text-primary)] uppercase tracking-wider break-words">
                {project.title}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-[var(--text-muted)]">
                {project.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[#c8f56a] transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 flex-1">
          {/* Top Status & Role Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] bg-[#0c0d10] p-3 border border-[var(--border-color)]">
            <div>
              <span className="text-[var(--text-muted)] block">CATEGORY</span>
              <span className="text-[var(--text-primary)] font-bold">{project.category}</span>
            </div>
            <div>
              <span className="text-[var(--text-muted)] block">ARCHITECTURE</span>
              <span className="text-[var(--text-primary)] font-bold">{project.architectureType}</span>
            </div>
            <div>
              <span className="text-[var(--text-muted)] block">MY ROLE</span>
              <span className="text-[var(--text-primary)] font-bold">{project.role}</span>
            </div>
            <div>
              <span className="text-[var(--text-muted)] block">STATUS</span>
              <span className="text-[#c8f56a] font-bold">● {project.status}</span>
            </div>
          </div>

          {/* Deep Architectural Breakdown */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-widest text-[#c8f56a] font-bold flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Architectural Specification & Challenges</span>
            </h4>
            <p className="text-xs leading-relaxed text-[var(--text-primary)] bg-[#0d0e11] p-4 border border-[var(--border-color)]">
              {project.detailedDescription}
            </p>
          </div>

          {/* Benchmarks & Performance Metrics */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold">
              Engineering Benchmarks
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((m, i) => (
                <div key={i} className="border border-[var(--border-color)] p-3 bg-[#0c0d10]">
                  <span className="text-[10px] text-[var(--text-muted)] block">{m.label}</span>
                  <span className="text-sm font-bold text-[#c8f56a]">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Endpoints Table */}
          {project.endpoints && project.endpoints.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#c8f56a]" />
                <span>Primary API Endpoints</span>
              </h4>
              <div className="border border-[var(--border-color)] overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-[#121417] text-[var(--text-muted)] border-b border-[var(--border-color)]">
                    <tr>
                      <th className="p-2.5">Method</th>
                      <th className="p-2.5">Route Path</th>
                      <th className="p-2.5">Description</th>
                      <th className="p-2.5">Latency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)] bg-[#0c0d10]">
                    {project.endpoints.map((ep, idx) => (
                      <tr key={idx} className="hover:bg-[#14161a]">
                        <td className="p-2.5">
                          <span className={`px-1.5 py-0.5 font-bold text-[10px] ${
                            ep.method === 'POST' ? 'text-yellow-400 bg-yellow-400/10' :
                            ep.method === 'GET' ? 'text-[#c8f56a] bg-[#c8f56a]/10' :
                            ep.method === 'WS' ? 'text-purple-400 bg-purple-400/10' : 'text-blue-400 bg-blue-400/10'
                          }`}>
                            {ep.method}
                          </span>
                        </td>
                        <td className="p-2.5 text-[var(--text-primary)] font-semibold">{ep.path}</td>
                        <td className="p-2.5 text-[var(--text-muted)]">{ep.description}</td>
                        <td className="p-2.5 text-[#c8f56a]">{ep.latency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Schema Snippet */}
          {project.schemaSnippet && (
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-[#c8f56a]" />
                <span>Database Schema Extract</span>
              </h4>
              <pre className="p-3 bg-[#050607] border border-[var(--border-color)] text-[11px] leading-relaxed text-[var(--text-muted)] overflow-x-auto text-emerald-400/90">
                {project.schemaSnippet}
              </pre>
            </div>
          )}

          {/* Curl Command Snippet with Copy */}
          {project.curlSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#c8f56a]" />
                  <span>cURL Request Test</span>
                </h4>
                <button
                  onClick={handleCopyCurl}
                  className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] hover:text-[#c8f56a] transition-colors border border-[var(--border-color)] px-2 py-0.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-[#c8f56a]" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'COPIED' : 'COPY CURL'}</span>
                </button>
              </div>
              <pre className="p-3 bg-[#050607] border border-[var(--border-color)] text-[10px] leading-relaxed text-yellow-300/80 overflow-x-auto">
                {project.curlSnippet}
              </pre>
            </div>
          )}

          {/* Technologies Used */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[11px] bg-[#121417] border border-[var(--border-color)] text-[var(--text-primary)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-6 border-t border-[var(--border-color)] bg-[#0d0e11] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 text-xs text-[var(--text-primary)] hover:text-[#c8f56a] transition-colors border border-[var(--border-color)] hover:border-[#c8f56a] px-3 py-2 w-full sm:w-auto"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GITHUB REPOSITORY</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#c8f56a] text-[#0a0b0b] font-bold text-xs uppercase tracking-wider hover:bg-[#d6f88b] transition-colors cursor-pointer text-center"
          >
            CLOSE CASE STUDY
          </button>
        </div>
      </div>
    </div>
  );
}
