'use client';

import React from 'react';
import { Project } from '@/types';
import ProjectVisual from './ProjectVisual';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

export default function ProjectCard({ project, index, onOpenModal }: ProjectCardProps) {
  // Alternate image-left and image-right layouts exactly like the reference
  const isVisualLeft = index % 2 === 1;

  // The Info Block
  const InfoBlock = (
    <div className="p-5 sm:p-8 lg:p-12 flex flex-col justify-between h-full bg-[var(--bg-color)]">
      <div className="space-y-5 sm:space-y-6">
        {/* Large Pixel Project Number matching the reference image */}
        <div className="font-pixel text-3xl sm:text-5xl lg:text-6xl text-[var(--text-primary)] font-bold tracking-tight">
          {project.number}
        </div>

        {/* Project Title */}
        <div className="space-y-2">
          <h3 className="font-mono text-lg sm:text-xl lg:text-2xl font-bold uppercase tracking-wider text-[var(--text-primary)] break-words">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-mono leading-relaxed max-w-xl">
            {project.description}
          </p>
        </div>

        {/* Technologies & Category Tags */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-mono pt-2">
          <span className="flex items-center gap-1.5 text-[#c8f56a] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8f56a]" />
            REPOSITORY
          </span>

          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="text-[var(--text-muted)] uppercase">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div className="pt-8 flex items-center gap-6 text-xs font-mono">
        <button
          onClick={() => {
            onOpenModal(project);
          }}
          className="flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[#c8f56a] transition-colors group underline underline-offset-4 cursor-pointer"
        >
          <span className="font-bold tracking-wider">CASE STUDY</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#c8f56a]" />
        </button>

        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors group"
        >
          <span className="tracking-wider">GITHUB</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );

  // The Visual Block
  const VisualBlock = (
    <div className="p-3 sm:p-6 lg:p-8 flex items-center justify-center bg-[var(--bg-surface)]/30 h-full">
      <div className="w-full h-full max-w-xl">
        <ProjectVisual project={project} />
      </div>
    </div>
  );

  return (
    <article className="border-b border-[var(--border-color)]">
      {/* On desktop: 2 equal columns alternating order */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">
        {isVisualLeft ? (
          <>
            {/* Desktop: Visual Left, Mobile: Info First */}
            <div className="order-2 lg:order-1 border-b lg:border-b-0 lg:border-r border-[var(--border-color)]">
              {VisualBlock}
            </div>
            <div className="order-1 lg:order-2 border-b lg:border-b-0 border-[var(--border-color)]">
              {InfoBlock}
            </div>
          </>
        ) : (
          <>
            <div className="border-b lg:border-b-0 lg:border-r border-[var(--border-color)]">
              {InfoBlock}
            </div>
            <div className="border-b lg:border-b-0 border-[var(--border-color)]">
              {VisualBlock}
            </div>
          </>
        )}
      </div>
    </article>
  );
}
