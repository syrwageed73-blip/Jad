'use client';

import React, { useState } from 'react';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

interface SelectedProjectsProps {
  projects: Project[];
}

export default function SelectedProjects({ projects }: SelectedProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const categories = ['ALL', 'SAAS & API', 'KAFKA', 'AI ORCHESTRATION', 'RAG & DATA', 'INFRA'];

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'SAAS & API') return p.category.includes('SAAS') || p.category.includes('API');
    if (activeFilter === 'KAFKA') return p.category.includes('EVENT') || p.technologies.includes('KAFKA');
    if (activeFilter === 'AI ORCHESTRATION') return p.category.includes('AI');
    if (activeFilter === 'RAG & DATA') return p.category.includes('RAG') || p.category.includes('DATA');
    if (activeFilter === 'INFRA') return p.category.includes('INFRASTRUCTURE') || p.category.includes('SECURITY');
    return true;
  });

  return (
    <section id="projects" className="relative border-b border-[var(--border-color)]">
      {/* Section Header exactly matching the reference: "— selected projects / 06" */}
      <div className="border-b border-[var(--border-color)] px-4 sm:px-10 lg:px-14 py-4 sm:py-6 bg-[var(--bg-color)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#c8f56a] font-bold">—</span>
          <h2 className="text-[var(--text-primary)] font-semibold tracking-wider uppercase text-xs">
            selected projects
          </h2>
          <span className="text-[var(--text-muted)]">/ 06</span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto text-[10px] font-mono py-1 max-w-full -mx-1 px-1 scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveFilter(cat);
              }}
              className={`px-2.5 py-1 transition-colors border cursor-pointer shrink-0 whitespace-nowrap ${
                activeFilter === cat
                  ? 'bg-[#c8f56a] text-[#0a0b0b] font-bold border-[#c8f56a]'
                  : 'bg-transparent text-[var(--text-muted)] border-transparent hover:border-[var(--border-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List with Alternating Cards */}
      <div>
        {filteredProjects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={idx}
            onOpenModal={(p) => setSelectedProject(p)}
          />
        ))}
      </div>

      {/* Modal for detailed case study */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
