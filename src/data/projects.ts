import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'saas-backend',
    number: '01',
    title: 'SAAS MULTI-TENANT BACKEND',
    subtitle: 'Multi-Tenant REST API, Role Permissions & Organization Isolation',
    category: 'SAAS & API ARCHITECTURE',
    description:
      'A multi-tenant REST API featuring strict tenant data isolation, role-based access control, payments integration, scheduled retry jobs, and comprehensive automated testing.',
    detailedDescription:
      'Engineered with FastAPI and PostgreSQL using row-level isolation and schema tenancy. Features organizational membership trees, JWT/OAuth2 session tokens, Stripe payment integration, background retry queues for transient payment webhooks, automated pytest suites, and centralized structured JSON logging with error monitoring.',
    architectureType: 'MULTI-TENANT ASYNC REST API',
    technologies: ['FASTAPI', 'PYTHON', 'POSTGRESQL', 'REDIS', 'SQLALCHEMY', 'PYTEST'],
    metrics: [
      { label: 'Tenant Isolation', value: '100% Strict' },
      { label: 'p99 Response Time', value: '11.2 ms' },
      { label: 'Automated Test Cov', value: '94% (pytest)' },
      { label: 'Retry Reliability', value: '99.98%' },
    ],
    endpoints: [
      { method: 'POST', path: '/api/v1/auth/login', description: 'Authenticate user and issue scoped organization JWT token', status: 200, latency: '14ms' },
      { method: 'GET', path: '/api/v1/orgs/:id/tenants', description: 'Isolated tenant organization query with RBAC verification', status: 200, latency: '4ms' },
      { method: 'POST', path: '/api/v1/billing/checkout', description: 'Create subscription session with retry error handling', status: 201, latency: '28ms' },
      { method: 'GET', path: '/api/v1/health/probe', description: 'Live database pool and Redis connectivity health probe', status: 200, latency: '2ms' },
    ],
    schemaSnippet: `-- Multi-Tenant Organization Schema with Strict Isolation
CREATE TABLE organizations (
    org_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(120) NOT NULL,
    plan_tier VARCHAR(32) NOT NULL DEFAULT 'PRO',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tenant_memberships (
    membership_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(org_id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('OWNER', 'ADMIN', 'MEMBER')),
    UNIQUE (org_id, user_id)
);
CREATE INDEX idx_tenant_org ON tenant_memberships(org_id);`,
    curlSnippet: `curl -X POST https://api.jadaldassouki.dev/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "admin@acme.org", "password": "...", "org_slug": "acme"}'`,
    status: 'PRODUCTION',
    repoUrl: 'https://github.com/jadaldassouki/saas-backend-fastapi',
    liveUrl: 'https://saas-api.jadaldassouki.dev',
    role: 'Backend Developer',
  },
  {
    id: 'commerce-platform',
    number: '02',
    title: 'COMMERCE PLATFORM (KAFKA)',
    subtitle: 'Event-Driven Distributed Microservices on AWS & Terraform',
    category: 'EVENT-DRIVEN ARCHITECTURE',
    description:
      'A decoupled commerce platform with microservices for listings, orders, notifications, search and analytics that communicate asynchronously through Kafka.',
    detailedDescription:
      'Built with event-driven architecture using Apache Kafka message brokers. Separate independent services communicate via topic partitions. Background workers consume order events to update inventory in Redis, commit accounting records in PostgreSQL, and trigger real-time notifications. Infrastructure is fully codified in Terraform and deployed to AWS behind an Elastic Load Balancer.',
    architectureType: 'EVENT-DRIVEN KAFKA PIPELINE',
    technologies: ['KAFKA', 'PYTHON', 'POSTGRESQL', 'REDIS', 'AWS', 'TERRAFORM'],
    metrics: [
      { label: 'Event Throughput', value: '35,000 evt/s' },
      { label: 'Event Delivery', value: 'At-Least-Once' },
      { label: 'IaC Coverage', value: '100% Terraform' },
      { label: 'Worker Sync Jitter', value: '< 2.4 ms' },
    ],
    endpoints: [
      { method: 'POST', path: '/api/v1/orders/publish', description: 'Publish verified order event into Kafka topic', status: 202, latency: '8ms' },
      { method: 'GET', path: '/api/v1/listings/search', description: 'High-speed cached product query via Redis layer', status: 200, latency: '5ms' },
      { method: 'POST', path: '/api/v1/notifications/dispatch', description: 'Trigger decoupled email/push delivery queue', status: 200, latency: '12ms' },
      { method: 'GET', path: '/api/v1/analytics/realtime', description: 'Aggregate stream metrics computed from event topics', status: 200, latency: '9ms' },
    ],
    schemaSnippet: `-- Terraform AWS Microservice ECS Task & Kafka Topic Config
resource "aws_ecs_task_definition" "commerce_order_service" {
  family                   = "commerce-orders"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"
  container_definitions = jsonencode([{
    name      = "order-worker"
    image     = "jadaldassouki/commerce-order:latest"
    essential = true
    environment = [
      { name = "KAFKA_BROKERS", value = "kafka.internal:9092" },
      { name = "TOPIC_ORDERS", value = "prod.commerce.orders.v1" }
    ]
  }])
}`,
    curlSnippet: `curl -X POST https://commerce.jadaldassouki.dev/api/v1/orders/publish \\
  -H "X-API-Key: live_order_key" \\
  -H "Content-Type: application/json" \\
  -d '{"order_id": "ord_8892", "sku": "ITEM-41", "amount": 149.00}'`,
    status: 'PRODUCTION',
    repoUrl: 'https://github.com/jadaldassouki/commerce-platform-kafka',
    liveUrl: 'https://commerce.jadaldassouki.dev',
    role: 'Backend & Cloud Engineer',
  },
  {
    id: 'ai-orchestration',
    number: '03',
    title: 'AI AGENT ORCHESTRATION',
    subtitle: 'Tool Calling, Model Routing & Guardrails Engine',
    category: 'AI ORCHESTRATION',
    description:
      'An intelligent orchestration layer coordinating LLM agents and tools, routing each task to the optimal model, and keeping outputs structured, deterministic, and safe.',
    detailedDescription:
      'Engineered in Python to orchestrate autonomous AI agents. Features dynamic tool calling registries, semantic task classification that routes complex reasoning to frontier models (Claude/GPT-4o) and fast tasks to lightweight models, and strict Pydantic output validation guardrails to prevent schema drift and prompt injection.',
    architectureType: 'AGENTIC ROUTING & GUARDRAILS',
    technologies: ['PYTHON', 'LLM TOOL CALLING', 'MODEL ROUTING', 'GUARDRAILS', 'REDIS'],
    metrics: [
      { label: 'Token Cost Saved', value: '42.8%' },
      { label: 'Guardrail Pass Rate', value: '99.94%' },
      { label: 'Routing Latency', value: '< 24 ms' },
      { label: 'Structured Format', value: '100% JSON' },
    ],
    endpoints: [
      { method: 'POST', path: '/v1/agent/dispatch', description: 'Execute multi-step autonomous tool calling plan', status: 200, latency: '240ms' },
      { method: 'POST', path: '/v1/router/classify', description: 'Semantic classifier routing query to cheapest capable model', status: 200, latency: '18ms' },
      { method: 'POST', path: '/v1/guardrails/validate', description: 'Deterministic Pydantic schema validation & sanitization', status: 200, latency: '6ms' },
      { method: 'GET', path: '/v1/tools/registry', description: 'Inspect available registered callable agent tools', status: 200, latency: '3ms' },
    ],
    schemaSnippet: `-- Pydantic Deterministic Agent Output Guardrail Definition
from pydantic import BaseModel, Field
from typing import List, Optional

class AgentExecutionPlan(BaseModel):
    task_id: str = Field(description="UUID of the user prompt")
    chosen_model: str = Field(description="Routed model identifier")
    tool_sequence: List[str] = Field(description="Ordered list of tool calls")
    confidence_score: float = Field(ge=0.0, le=1.0)
    sanitized_output: str = Field(description="Guardrail-verified response")`,
    curlSnippet: `curl -X POST https://ai.jadaldassouki.dev/v1/agent/dispatch \\
  -H "Authorization: Bearer dev_ai_token" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Generate optimized PostgreSQL migration for multi-tenant table"}'`,
    status: 'PRODUCTION',
    repoUrl: 'https://github.com/jadaldassouki/ai-agent-orchestrator',
    liveUrl: 'https://ai.jadaldassouki.dev',
    role: 'AI & Backend Developer',
  },
  {
    id: 'rag-private-qa',
    number: '04',
    title: 'RAG & PRIVATE DOCUMENT Q&A',
    subtitle: 'Vector Similarity Retrieval with pgvector & PostgreSQL',
    category: 'RAG & VECTOR SEARCH',
    description:
      'A high-accuracy Retrieval-Augmented Generation (RAG) backend API performing Q&A over private organizational documents using pgvector and vector embeddings.',
    detailedDescription:
      'Enables secure, private document querying across internal company PDFs, markdown, and docx archives. Uses Python, FastAPI, and PostgreSQL with the pgvector extension. Features recursive text chunking with metadata tracking, cosine similarity index scans, contextual re-ranking, and strict citation attribution without hallucinations.',
    architectureType: 'SEMANTIC RAG RETRIEVAL ENGINE',
    technologies: ['FASTAPI', 'PYTHON', 'PGVECTOR', 'POSTGRESQL', 'EMBEDDINGS'],
    metrics: [
      { label: 'Retrieval Accuracy', value: '96.2%' },
      { label: 'Vector Index Scan', value: '14.8 ms' },
      { label: 'Hallucination Rate', value: '< 0.5%' },
      { label: 'Embedding Dimension', value: '1536-D' },
    ],
    endpoints: [
      { method: 'POST', path: '/api/v1/rag/query', description: 'Hybrid keyword + vector similarity Q&A query', status: 200, latency: '140ms' },
      { method: 'POST', path: '/api/v1/documents/ingest', description: 'Chunk, embed and store private document vectors', status: 201, latency: '420ms' },
      { method: 'GET', path: '/api/v1/vectors/similarity', description: 'Cosine distance probe against pgvector index', status: 200, latency: '15ms' },
      { method: 'DELETE', path: '/api/v1/documents/:id', description: 'Purge document chunks and embeddings from index', status: 204, latency: '12ms' },
    ],
    schemaSnippet: `-- pgvector Similarity Index for Private Document Q&A
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE document_embeddings (
    chunk_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL,
    chunk_index INT NOT NULL,
    chunk_text TEXT NOT NULL,
    embedding vector(1536) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- HNSW Vector Index for Sub-20ms Cosine Search
CREATE INDEX ON document_embeddings 
USING hnsw (embedding vector_cosine_ops) WITH (m = 16, ef_construction = 64);`,
    curlSnippet: `curl -X POST https://rag.jadaldassouki.dev/api/v1/rag/query \\
  -H "Authorization: Bearer org_token" \\
  -H "Content-Type: application/json" \\
  -d '{"question": "What is our fallback policy for Redis cluster failover?"}'`,
    status: 'PRODUCTION',
    repoUrl: 'https://github.com/jadaldassouki/rag-pgvector-backend',
    liveUrl: 'https://rag.jadaldassouki.dev',
    role: 'Backend & Data Engineer',
  },
  {
    id: 'data-pipelines-analytics',
    number: '05',
    title: 'DATA PIPELINES & ANALYTICS',
    subtitle: 'Airflow DAGs, dbt Transformations, Polars & Parquet',
    category: 'DATA ENGINEERING',
    description:
      'Automated data analysis and pipeline architecture utilizing columnar Parquet files, Polars high-speed processing, Airflow workflow DAGs, and dbt models.',
    detailedDescription:
      'Designed to ingest, transform, and aggregate high-volume operational logs and transactional data. Utilizes Polars and Pandas for vectorized operations that execute up to 10x faster than traditional row loops, exports compressed columnar Parquet files, orchestrates scheduled transformations using Apache Airflow & dbt, and populates analytical database views.',
    architectureType: 'COLUMNAR ETL / ELT PIPELINE',
    technologies: ['PYTHON', 'POLARS', 'PARQUET', 'AIRFLOW', 'DBT', 'POSTGRESQL'],
    metrics: [
      { label: 'Transform Speedup', value: '10x (Polars)' },
      { label: 'Storage Saved', value: '68% (Parquet)' },
      { label: 'Pipeline SLA', value: '99.95% Success' },
      { label: 'Daily Rows Processed', value: '25,000,000+' },
    ],
    endpoints: [
      { method: 'POST', path: '/v1/pipeline/trigger', description: 'Trigger parameterized Airflow DAG workflow', status: 202, latency: '18ms' },
      { method: 'GET', path: '/v1/analytics/aggregates', description: 'Fetch pre-aggregated metrics from columnar store', status: 200, latency: '8ms' },
      { method: 'POST', path: '/v1/data/ingest-parquet', description: 'Ingest compressed Parquet batch into analytics layer', status: 200, latency: '45ms' },
      { method: 'GET', path: '/v1/pipeline/dag-status', description: 'Inspect health and execution state of dbt transformation models', status: 200, latency: '5ms' },
    ],
    schemaSnippet: `-- Polars Vectorized High-Speed Log Analytics Engine
import polars as pl

def process_daily_metrics(parquet_path: str) -> pl.DataFrame:
    # Lazy evaluation on columnar Parquet dataset
    return (
        pl.scan_parquet(parquet_path)
        .filter(pl.col("status_code") < 500)
        .group_by("service_name")
        .agg([
            pl.col("latency_ms").quantile(0.99).alias("p99_latency"),
            pl.col("request_id").count().alias("total_requests"),
            pl.col("bytes_sent").sum().alias("egress_bytes")
        ])
        .collect()
    )`,
    curlSnippet: `curl -X POST https://data.jadaldassouki.dev/v1/pipeline/trigger \\
  -H "Authorization: Bearer data_pipeline_key" \\
  -H "Content-Type: application/json" \\
  -d '{"dag_id": "daily_commerce_reconciliation", "partition_date": "2026-11-23"}'`,
    status: 'PRODUCTION',
    repoUrl: 'https://github.com/jadaldassouki/data-pipeline-airflow-polars',
    liveUrl: 'https://data.jadaldassouki.dev',
    role: 'Data & Backend Developer',
  },
  {
    id: 'cloud-infra-security',
    number: '06',
    title: 'CLOUD INFRASTRUCTURE & SECURITY',
    subtitle: 'Terraform IaC, Docker, AWS, OAuth2/OIDC & OWASP Hardening',
    category: 'INFRASTRUCTURE & CYBERSECURITY',
    description:
      'Production-grade cloud infrastructure codified in Terraform on AWS, secured with OAuth2/OIDC identity validation, OWASP Top 10 mitigation, and automated pytest CI/CD.',
    detailedDescription:
      'Implements secure, zero-trust cloud architecture. Features modular Terraform configurations managing AWS VPCs, load balancers, and containerized Docker services behind Nginx reverse proxies. Hardened against OWASP Top 10 web app risks with strict input sanitization, rate limiting, and automated CI/CD security scanning using pytest, Ruff, and mypy.',
    architectureType: 'IAC CLOUD & SECURITY GATEWAY',
    technologies: ['TERRAFORM', 'AWS', 'DOCKER', 'NGINX', 'OAUTH2 / OIDC', 'PYTEST'],
    metrics: [
      { label: 'Security Score', value: 'OWASP Compliant' },
      { label: 'IaC State Sync', value: '100% Terraform' },
      { label: 'Container Size', value: '< 65 MB (Alpine)' },
      { label: 'CI/CD Pass Rate', value: '100% (pytest/Ruff)' },
    ],
    endpoints: [
      { method: 'POST', path: '/oauth/v2/token', description: 'RFC 6749 compliant OAuth2 token exchange with PKCE', status: 200, latency: '22ms' },
      { method: 'GET', path: '/.well-known/jwks.json', description: 'Public JWKS key verification endpoint', status: 200, latency: '2ms' },
      { method: 'POST', path: '/api/v1/infra/health', description: 'Infrastructure monitoring probe across AWS subnets', status: 200, latency: '6ms' },
      { method: 'POST', path: '/api/v1/security/audit', description: 'Verify token claims, tenant scope and rate limits', status: 200, latency: '4ms' },
    ],
    schemaSnippet: `-- Terraform AWS Secure VPC & Subnet Architecture
module "secure_backend_vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "jad-backend-prod-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["eu-central-1a", "eu-central-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true
  enable_vpn_gateway = false

  tags = {
    Environment = "production"
    ManagedBy   = "Terraform"
    Architect   = "Jad Aldassouki"
  }
}`,
    curlSnippet: `curl -X POST https://infra.jadaldassouki.dev/oauth/v2/token \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "grant_type=client_credentials&client_id=backend_srv&client_secret=..."`,
    status: 'ACTIVE',
    repoUrl: 'https://github.com/jadaldassouki/terraform-aws-infrastructure',
    liveUrl: 'https://infra.jadaldassouki.dev',
    role: 'Cloud & Security Architect',
  },
];
