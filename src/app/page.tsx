'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SelectedProjects from '@/components/SelectedProjects';
import TechnicalExpertise from '@/components/TechnicalExpertise';
import AboutSection from '@/components/AboutSection';
import ProcessSection from '@/components/ProcessSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ProjectModal from '@/components/ProjectModal';
import InteractiveConsole from '@/components/InteractiveConsole';
import { projectsData } from '@/data/projects';
import { Project } from '@/types';
import { Terminal } from 'lucide-react';

export default function Home() {
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  const handleHeroSelectProject = (projectId: string) => {
    const found = projectsData.find((p) => p.id === projectId);
    if (found) {
      setModalProject(found);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08090a] text-[#f2f4f8] font-mono selection:bg-[#c8f56a] selection:text-[#08090a]">
      {/* Subtle Technical Desktop Crosshair Cursor */}
      <CustomCursor />

      {/* Top Fixed Minimal Navbar */}
      <Navbar onOpenTerminal={() => setIsConsoleOpen(true)} />

      {/* Main Content Area */}
      <main className="w-full">
        {/* Hero Section: Split screen with typography on left, showcase on right */}
        <Hero
          onSelectProject={handleHeroSelectProject}
          onOpenTerminal={() => setIsConsoleOpen(true)}
        />

        {/* Selected Projects Section: 01 to 06 with alternating layouts */}
        <SelectedProjects projects={projectsData} />

        {/* Technical Expertise Section: 4 categorized pure backend skills */}
        <TechnicalExpertise />

        {/* About Section: Editorial philosophy, stats, and background */}
        <AboutSection />

        {/* Development Process: 5 numbered stages with code specimens */}
        <ProcessSection />

        {/* Contact Section: Inquiries, live cURL generator, and ping diagnostic */}
        <ContactSection />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Case Study Modal */}
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />

      {/* Interactive Ingress Terminal / Shell */}
      <InteractiveConsole
        isOpen={isConsoleOpen}
        onClose={() => setIsConsoleOpen(false)}
      />

      {/* Floating Quick Terminal Launcher Pill (bottom-right) */}
      <div className="fixed bottom-6 right-6 z-30 hidden sm:block">
        <button
          onClick={() => setIsConsoleOpen(true)}
          className="flex items-center gap-2 px-3 py-2 bg-[#0c0d10] border border-[#1c2024] hover:border-[#c8f56a] text-xs font-mono text-[var(--text-primary)] hover:text-[#c8f56a] shadow-xl hover:shadow-[0_0_20px_rgba(200,245,106,0.15)] transition-all cursor-pointer group"
          title="Open Backend RPC Terminal (help, health, sql, ping)"
        >
          <Terminal className="w-3.5 h-3.5 text-[#c8f56a] group-hover:scale-110 transition-transform" />
          <span className="font-bold text-[11px] tracking-wider">TERMINAL</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8f56a] animate-pulse-lime" />
        </button>
      </div>
    </div>
  );
}
