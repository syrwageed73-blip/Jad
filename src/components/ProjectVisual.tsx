'use client';

import React from 'react';
import { Project } from '@/types';
import { Database, Server, Cpu, Shield, HardDrive, MessageSquare, Zap, CheckCircle2, Lock, ArrowRight, Layers, Cloud } from 'lucide-react';

interface ProjectVisualProps {
  project: Project;
}

export default function ProjectVisual({ project }: ProjectVisualProps) {
  switch (project.id) {
    case 'saas-backend':
      return (
        <div className="w-full h-full min-h-[290px] bg-[#070809] border border-[#1c2024] p-5 flex flex-col justify-between text-xs font-mono relative overflow-hidden group">
          <div className="flex items-center justify-between border-b border-[#1c2024] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c8f56a]" />
              <span className="text-[var(--text-primary)] font-bold uppercase text-[11px]">MULTI-TENANT REST GATEWAY</span>
            </div>
            <span className="text-[10px] text-[#c8f56a] border border-[#c8f56a]/30 px-1.5 py-0.5 bg-[#c8f56a]/10">
              FASTAPI + POSTGRES
            </span>
          </div>

          <div className="py-4 space-y-3">
            <div className="bg-[#0c0d10] p-3 border border-[#1c2024]">
              <div className="flex items-center justify-between text-[11px] mb-2 text-[var(--text-muted)]">
                <span>TENANT ROUTE RESOLVER</span>
                <span className="text-[#c8f56a]">ISOLATION: VERIFIED</span>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="text-yellow-400 bg-yellow-400/10 px-1 font-bold">GET</span>
                <span className="text-[var(--text-primary)]">/api/v1/orgs/tenant_42</span>
                <ArrowRight className="w-3 h-3 text-[var(--text-dim)]" />
                <span className="text-[#c8f56a]">SCHEMA: ISOLATED</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="bg-[#090b0d] p-2 border border-[#1c2024]">
                <span className="text-[var(--text-dim)] block text-[9px]">TEST SUITE</span>
                <span className="text-[#c8f56a] font-bold">94% PYTEST</span>
              </div>
              <div className="bg-[#090b0d] p-2 border border-[#1c2024]">
                <span className="text-[var(--text-dim)] block text-[9px]">RETRY QUEUE</span>
                <span className="text-[var(--text-primary)] font-bold">REDIS CELERY</span>
              </div>
              <div className="bg-[#090b0d] p-2 border border-[#1c2024]">
                <span className="text-[var(--text-dim)] block text-[9px]">PAYMENTS</span>
                <span className="text-[#c8f56a] font-bold">IDEMPOTENT</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#1c2024] pt-3 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
            <span>P99 RESPONSE: 11.2ms</span>
            <span className="text-[#c8f56a]">ORGANIZATION RBAC: ACTIVE</span>
          </div>
        </div>
      );

    case 'commerce-platform':
      return (
        <div className="w-full h-full min-h-[290px] bg-[#070809] border border-[#1c2024] p-5 flex flex-col justify-between text-xs font-mono relative overflow-hidden group">
          <div className="flex items-center justify-between border-b border-[#1c2024] pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#c8f56a]" />
              <span className="text-[var(--text-primary)] font-bold uppercase text-[11px]">KAFKA EVENT BROKER MESH</span>
            </div>
            <span className="text-[10px] text-[#c8f56a] border border-[#c8f56a]/30 px-1.5 py-0.5 bg-[#c8f56a]/10">
              35,000 EVT/SEC
            </span>
          </div>

          <div className="py-4 space-y-3">
            <div className="bg-[#0c0d10] p-3 border border-[#1c2024] space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[var(--text-muted)]">TOPIC: prod.commerce.orders.v1</span>
                <span className="text-[#c8f56a]">PARTITIONS: 04</span>
              </div>
              <div className="w-full bg-[#141619] h-1.5 overflow-hidden">
                <div className="bg-[#c8f56a] h-full w-4/5 animate-pulse" />
              </div>
              <div className="flex items-center justify-between text-[9px] text-[var(--text-dim)]">
                <span>CONSUMER: listings, notify, analytics</span>
                <span>SYNC: AT-LEAST-ONCE</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-[#090b0d] p-2 border border-[#1c2024]">
                <span className="text-[var(--text-dim)] block text-[9px]">INFRASTRUCTURE</span>
                <span className="text-[#c8f56a] font-bold">TERRAFORM AWS</span>
              </div>
              <div className="bg-[#090b0d] p-2 border border-[#1c2024]">
                <span className="text-[var(--text-dim)] block text-[9px]">LOAD BALANCING</span>
                <span className="text-[var(--text-primary)] font-bold">AWS ALB / FARGATE</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#1c2024] pt-3 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
            <span>CONSUMER GROUP JITTER: &lt; 2.4ms</span>
            <span className="text-[#c8f56a]">EVENT LEDGER: COMMITTED</span>
          </div>
        </div>
      );

    case 'ai-orchestration':
      return (
        <div className="w-full h-full min-h-[290px] bg-[#070809] border border-[#1c2024] p-5 flex flex-col justify-between text-xs font-mono relative overflow-hidden group">
          <div className="flex items-center justify-between border-b border-[#1c2024] pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#c8f56a]" />
              <span className="text-[var(--text-primary)] font-bold uppercase text-[11px]">AI AGENT & TOOL ROUTER</span>
            </div>
            <span className="text-[10px] text-[#c8f56a] border border-[#c8f56a]/30 px-1.5 py-0.5 bg-[#c8f56a]/10">
              GUARDRAILS: ON
            </span>
          </div>

          <div className="py-4 space-y-3">
            <div className="bg-[#0c0d10] p-3 border border-[#1c2024] font-mono text-[10px] space-y-1.5">
              <div className="text-[var(--text-muted)] flex justify-between">
                <span>DYNAMIC ROUTER: COMPLEX TASK</span>
                <span className="text-[#c8f56a]">CLAUDE 3.7 / GPT-4o</span>
              </div>
              <div className="text-[var(--text-primary)]">
                TOOL CALL: execute_sql_query(table=&apos;users&apos;)
              </div>
              <div className="text-[9px] text-[#c8f56a]">
                GUARDRAIL: Pydantic Schema Validated (0 injection risks)
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="bg-[#090b0d] p-2 border border-[#1c2024]">
                <span className="text-[var(--text-dim)] block text-[9px]">TOKEN COST</span>
                <span className="text-[#c8f56a] font-bold">-42.8%</span>
              </div>
              <div className="bg-[#090b0d] p-2 border border-[#1c2024]">
                <span className="text-[var(--text-dim)] block text-[9px]">JSON OUTPUT</span>
                <span className="text-[var(--text-primary)] font-bold">100% VALID</span>
              </div>
              <div className="bg-[#090b0d] p-2 border border-[#1c2024]">
                <span className="text-[var(--text-dim)] block text-[9px]">TOOL REGISTRY</span>
                <span className="text-[var(--text-primary)] font-bold">14 TOOLS</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#1c2024] pt-3 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
            <span>AI DEV: CLAUDE CODE / CODEX CLI</span>
            <span className="text-[#c8f56a]">ROUTING: &lt; 24ms</span>
          </div>
        </div>
      );

    case 'rag-private-qa':
      return (
        <div className="w-full h-full min-h-[290px] bg-[#070809] border border-[#1c2024] p-5 flex flex-col justify-between text-xs font-mono relative overflow-hidden group">
          <div className="flex items-center justify-between border-b border-[#1c2024] pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-[#c8f56a]" />
              <span className="text-[var(--text-primary)] font-bold uppercase text-[11px]">RAG & PGVECTOR INDEX</span>
            </div>
            <span className="text-[10px] text-[#c8f56a] border border-[#c8f56a]/30 px-1.5 py-0.5 bg-[#c8f56a]/10">
              1536-D EMBEDDINGS
            </span>
          </div>

          <div className="py-4 space-y-3">
            <div className="bg-[#0c0d10] p-3 border border-[#1c2024] space-y-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[var(--text-muted)]">COSINE SIMILARITY SEARCH</span>
                <span className="text-[#c8f56a] font-bold">DISTANCE: 0.084 (HNSW)</span>
              </div>
              <div className="text-[10px] text-[var(--text-primary)]">
                &gt; Context retrieved: 4 chunks from architecture_spec.pdf
              </div>
              <div className="text-[9px] text-[#c8f56a]">
                CITATION CONFIDENCE: 96.2% • ZERO HALLUCINATION
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-[#090b0d] p-2 border border-[#1c2024]">
                <span className="text-[var(--text-dim)] block text-[9px]">DATABASE ENGINE</span>
                <span className="text-[var(--text-primary)] font-bold">POSTGRESQL + PGVECTOR</span>
              </div>
              <div className="bg-[#090b0d] p-2 border border-[#1c2024]">
                <span className="text-[var(--text-dim)] block text-[9px]">INDEX TYPE</span>
                <span className="text-[#c8f56a] font-bold">HNSW (14.8ms scan)</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#1c2024] pt-3 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
            <span>INGESTION: CHUNKING & EMBED</span>
            <span className="text-[#c8f56a]">PRIVATE DATA SECURED</span>
          </div>
        </div>
      );

    case 'data-pipelines-analytics':
      return (
        <div className="w-full h-full min-h-[290px] bg-[#070809] border border-[#1c2024] p-5 flex flex-col justify-between text-xs font-mono relative overflow-hidden group">
          <div className="flex items-center justify-between border-b border-[#1c2024] pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#c8f56a]" />
              <span className="text-[var(--text-primary)] font-bold uppercase text-[11px]">PARQUET & POLARS PIPELINE</span>
            </div>
            <span className="text-[10px] text-[#c8f56a] border border-[#c8f56a]/30 px-1.5 py-0.5 bg-[#c8f56a]/10">
              AIRFLOW + DBT
            </span>
          </div>

          <div className="py-4 space-y-3">
            <div className="bg-[#0c0d10] p-3 border border-[#1c2024] space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[var(--text-muted)]">COLUMNAR COMPRESSION: SNAPPY</span>
                <span className="text-[#c8f56a]">SAVED 68% DISK</span>
              </div>
              <div className="font-mono text-[9px] text-[var(--text-dim)] truncate">
                DAG: daily_reconciliation &bull; Polars Vectorized Lazy Execution
              </div>
              <div className="flex items-center gap-2 text-[9px] text-[#c8f56a]">
                <CheckCircle2 className="w-3 h-3" />
                <span>25,000,000 ROWS TRANSFORMED IN &lt; 4.2 SECONDS</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-[#090b0d] p-2 border border-[#1c2024]">
                <span className="text-[var(--text-dim)] block text-[9px]">SPEED VS PANDAS</span>
                <span className="text-[#c8f56a] font-bold">10x FASTER (POLARS)</span>
              </div>
              <div className="bg-[#090b0d] p-2 border border-[#1c2024]">
                <span className="text-[var(--text-dim)] block text-[9px]">ORCHESTRATION</span>
                <span className="text-[var(--text-primary)] font-bold">AIRFLOW DAGS + DBT</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#1c2024] pt-3 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
            <span>PARQUET STORAGE: COMPRESSED</span>
            <span className="text-[#c8f56a]">SLA: 99.95% SUCCESS</span>
          </div>
        </div>
      );

    case 'cloud-infra-security':
      return (
        <div className="w-full h-full min-h-[290px] bg-[#070809] border border-[#1c2024] p-5 flex flex-col justify-between text-xs font-mono relative overflow-hidden group">
          <div className="flex items-center justify-between border-b border-[#1c2024] pb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#c8f56a]" />
              <span className="text-[var(--text-primary)] font-bold uppercase text-[11px]">TERRAFORM & SECURITY GATEWAY</span>
            </div>
            <span className="text-[10px] text-[#c8f56a] border border-[#c8f56a]/30 px-1.5 py-0.5 bg-[#c8f56a]/10">
              OWASP TOP 10 HARDENED
            </span>
          </div>

          <div className="py-4 space-y-3">
            <div className="bg-[#0c0d10] p-3 border border-[#1c2024] space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[var(--text-muted)]">IAC: AWS VPC + ECS FARGATE</span>
                <span className="text-[#c8f56a]">STATE SYNCED</span>
              </div>
              <div className="font-mono text-[9px] text-[var(--text-dim)]">
                AUTH: OAuth2.0 / OIDC Token Verification &bull; Container Secrets Secured
              </div>
              <div className="flex items-center justify-between text-[9px] text-[var(--text-muted)]">
                <span>DOCKER ALPINE: &lt; 65 MB</span>
                <span className="text-[#c8f56a]">NGINX REVERSE PROXY</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-[#090b0d] p-2 border border-[#1c2024]">
                <span className="text-[var(--text-dim)] block text-[9px]">CODE QUALITY</span>
                <span className="text-[var(--text-primary)] font-bold">PYTEST, RUFF, MYPY</span>
              </div>
              <div className="bg-[#090b0d] p-2 border border-[#1c2024]">
                <span className="text-[var(--text-dim)] block text-[9px]">CI/CD PIPELINE</span>
                <span className="text-[#c8f56a] font-bold">GITHUB ACTIONS PASS</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#1c2024] pt-3 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
            <span>SECRETS & NETWORK ENCRYPTED</span>
            <span className="text-[#c8f56a]">ZERO-TRUST TOPOLOGY</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
