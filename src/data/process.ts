import { ProcessStep } from '@/types';

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Understand',
    tagline: 'Requirements, Data Contracts & Traffic Modeling',
    description:
      'Every rock-solid system begins with precise requirements. We analyze data access patterns, expected RPS (requests per second), read/write ratios, SLA requirements, and network topology before writing a single line of code.',
    deliverables: [
      'Traffic & Load Profile Model',
      'Entity-Relationship (ER) Draft',
      'API Contract Specification (OpenAPI)',
      'Service Boundary Definition',
    ],
    codeSample: {
      filename: 'traffic_profile.yml',
      language: 'yaml',
      code: `service: order_management
target_rps: 15000
p99_latency_budget_ms: 25
read_write_ratio: "70:30"
data_consistency: "linearizable"
sla_uptime_target: 99.99%`,
    },
  },
  {
    number: '02',
    title: 'Architect',
    tagline: 'Database Schema, Indexing & Distributed Systems',
    description:
      'Designing relational and document schemas with strict normalization, compound indexes, caching strategies, and event message brokers. We prevent deadlocks, N+1 queries, and race conditions at the design phase.',
    deliverables: [
      'PostgreSQL / Redis Caching Topology',
      'Compound Index & Partitioning Strategy',
      'Event Bus Architecture (RabbitMQ/Kafka)',
      'Fault-Tolerance & Circuit Breaker Map',
    ],
    codeSample: {
      filename: '001_core_schema.sql',
      language: 'sql',
      code: `-- Partitioned & Index-Optimized Storage
CREATE TABLE orders (
    order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL,
    total_cents BIGINT NOT NULL CHECK (total_cents >= 0),
    state VARCHAR(24) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX CONCURRENTLY idx_orders_acc_date 
ON orders (account_id, created_at DESC);`,
    },
  },
  {
    number: '03',
    title: 'Develop',
    tagline: 'Clean Code, Strict Typing & Domain-Driven Logic',
    description:
      'Writing modular, testable, and strictly-typed backend services. Implementing repository patterns, dependency injection, declarative validation, idempotent endpoint contracts, and atomic transactions.',
    deliverables: [
      'Type-Safe Service Layer (TS / Python)',
      'Unit & Integration Test Suite',
      'Structured JSON Logging & Tracing',
      'Comprehensive Error Recovery Handlers',
    ],
    codeSample: {
      filename: 'order.service.ts',
      language: 'typescript',
      code: `export async function processOrder(
  db: DatabaseClient,
  order: CreateOrderDTO
): Promise<Result<OrderEntity, DomainError>> {
  return await db.transaction(async (tx) => {
    const locked = await tx.inventory.acquireLock(order.sku, order.qty);
    if (!locked) return Result.fail(new InsufficientStockError());
    const entity = await tx.orders.insert(order);
    await tx.outbox.publish('order.created', entity);
    return Result.ok(entity);
  });
}`,
    },
  },
  {
    number: '04',
    title: 'Optimize',
    tagline: 'k6 Load Testing, Query Profiling & Memory Tuning',
    description:
      'Rigorous load testing to find bottlenecks before real users do. Analyzing PostgreSQL execution plans with EXPLAIN ANALYZE, eliminating garbage collection spikes, and verifying multi-tiered Redis caching efficiency.',
    deliverables: [
      'k6 Distributed Stress Test Reports',
      'Query Plan Optimization Logs',
      'Redis Cache Invalidation Strategy',
      'Memory Leak & CPU Profiling Analysis',
    ],
    codeSample: {
      filename: 'load_test_k6.js',
      language: 'javascript',
      code: `import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 5000 },
    { duration: '1m', target: 15000 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<25'], // 99% under 25ms
  },
};`,
    },
  },
  {
    number: '05',
    title: 'Deploy',
    tagline: 'Automated CI/CD, Containerization & Telemetry',
    description:
      'Containerized deployment with zero-downtime rolling updates. Provisioning health endpoints, Prometheus scrapers, OpenTelemetry distributed tracing, and automated rollback alert triggers.',
    deliverables: [
      'Hardened Multi-Stage Dockerfile',
      'Automated GitHub Actions CI/CD Pipeline',
      'Prometheus & Grafana Dashboard Configs',
      'Zero-Downtime Rollout Strategy',
    ],
    codeSample: {
      filename: 'Dockerfile',
      language: 'dockerfile',
      code: `FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && \\
    adduser --system --uid 1001 backend
COPY --chown=backend:nodejs dist ./dist
COPY --chown=backend:nodejs package.json ./
USER backend
EXPOSE 8080
CMD ["node", "dist/server.js"]`,
    },
  },
];
