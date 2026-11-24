'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Server, Database, Shield, Zap, Terminal, Wifi, CheckCircle2, Play, RefreshCw } from 'lucide-react';
import { sound } from '@/utils/sound';

interface VisualizerProps {
  type?: 'hero' | 'api' | 'ecommerce' | 'chat' | 'ai' | 'auth' | 'storage';
  title?: string;
}

export default function ArchitectureVisualizer({
  type = 'hero',
  title = 'API CLUSTER',
}: VisualizerProps) {
  const [activeTab, setActiveTab] = useState<'topology' | 'telemetry' | 'schema'>('topology');
  const [selectedNode, setSelectedNode] = useState<'gateway' | 'services' | 'cache' | 'database'>('gateway');
  const [reqCount, setReqCount] = useState(48210);
  const [latencyHistory, setLatencyHistory] = useState<number[]>([7.2, 8.4, 7.8, 9.1, 8.0, 7.4, 8.6, 8.1, 7.9, 8.4]);
  const [isSpiking, setIsSpiking] = useState(false);
  const [activeLogIdx, setActiveLogIdx] = useState(0);

  // Live telemetry pulse simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setReqCount((prev) => prev + Math.floor(Math.random() * 12) + 4);
      setLatencyHistory((prev) => {
        const delta = (Math.random() - 0.48) * 0.6;
        const nextVal = Number(Math.max(5.8, Math.min(11.2, prev[prev.length - 1] + delta)).toFixed(1));
        return [...prev.slice(1), nextVal];
      });
      setActiveLogIdx((prev) => (prev + 1) % 6);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  const currentLatency = latencyHistory[latencyHistory.length - 1];

  const handleSimulateBurst = () => {
    sound.playClick(1000, 0.05);
    setIsSpiking(true);
    setReqCount((prev) => prev + 15000);
    setTimeout(() => setIsSpiking(false), 1200);
  };

  const logs = [
    { method: 'POST', path: '/v1/gateway/dispatch', status: 200, time: '7.2ms', ip: '10.0.4.12' },
    { method: 'GET', path: '/v1/cache/keys/user:991', status: 200, time: '0.6ms', ip: '10.0.4.19' },
    { method: 'POST', path: '/v1/auth/verify-token', status: 200, time: '1.1ms', ip: '10.0.2.88' },
    { method: 'POST', path: '/api/v2/orders/reserve', status: 201, time: '9.4ms', ip: '172.16.0.4' },
    { method: 'GET', path: '/v1/metrics/prometheus', status: 200, time: '2.8ms', ip: '10.0.1.5' },
    { method: 'PUT', path: '/api/v1/storage/commit', status: 200, time: '12.4ms', ip: '192.168.1.1' },
  ];

  const nodeDetails = {
    gateway: {
      name: 'INGRESS GATEWAY (NGINX / TRAEFIK)',
      status: 'ONLINE',
      detail: 'TLS 1.3 Termination, Token-bucket Rate Limiter, mTLS Mesh Proxy',
      metric: '45,800 active conns / 0 dropped',
    },
    services: {
      name: 'RPC MICROSERVICE WORKERS',
      status: 'ONLINE',
      detail: 'Node.js V8 & Python FastAPI async cluster, zero unhandled errors',
      metric: '32 workers balanced across 4 vCPUs',
    },
    cache: {
      name: 'REDIS DISTRIBUTED CLUSTER (7.2)',
      status: 'ONLINE',
      detail: 'Redlock distributed locks, atomic stock reserve, LRU eviction',
      metric: '94.2% cache hit rate (0.8ms avg)',
    },
    database: {
      name: 'POSTGRESQL 16 (ACID PRIMARY)',
      status: 'ONLINE',
      detail: 'Logical WAL replication, compound B-tree indexing, connection pooling',
      metric: '64 backends / 0 deadlocks',
    },
  };

  return (
    <div className="w-full h-full min-h-[340px] flex flex-col justify-between bg-[#070809] border border-[#1c2024] p-4 sm:p-5 relative overflow-hidden group select-none transition-colors">
      {/* Background Subtle Technical Grid */}
      <div className="absolute inset-0 bg-grid-subtle opacity-35 pointer-events-none" />

      {/* Top Bar of the Visualizer */}
      <div className="relative z-10 flex flex-wrap items-center justify-between border-b border-[#1c2024] pb-3 mb-3 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#c8f56a] animate-pulse-lime" />
          <span className="font-mono text-[var(--text-primary)] font-bold tracking-wider uppercase text-[11px]">
            {title}
          </span>
          <span className="text-[9px] text-[#c8f56a] border border-[#c8f56a]/30 px-1.5 py-0.5 bg-[#c8f56a]/10 hidden sm:inline">
            CLUSTER: PROD-EAST
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center border border-[#1c2024] text-[10px] font-mono">
          {(['topology', 'telemetry', 'schema'] as const).map((tab, idx) => (
            <button
              key={tab}
              onClick={() => {
                sound.playClick(850, 0.02);
                setActiveTab(tab);
              }}
              className={`px-2.5 py-1 uppercase tracking-wider transition-colors cursor-pointer ${
                idx > 0 ? 'border-l border-[#1c2024]' : ''
              } ${
                activeTab === tab
                  ? 'bg-[#c8f56a] text-[#08090a] font-bold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Visual Display Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-center my-1 min-h-[180px]">
        {activeTab === 'topology' && (
          <div className="w-full flex flex-col space-y-3">
            {/* Interactive Topology Nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px] font-mono">
              {[
                { key: 'gateway', title: 'GATEWAY', tech: 'NGINX / TRAEFIK', icon: Shield, note: 'SSL INGRESS' },
                { key: 'services', title: 'SERVICES', tech: 'NODE / FASTAPI', icon: Server, note: 'ASYNC RPC' },
                { key: 'cache', title: 'CACHE', tech: 'REDIS 7.2', icon: Activity, note: 'REDLOCK' },
                { key: 'database', title: 'STORE', tech: 'POSTGRES 16', icon: Database, note: 'ACID CLUSTER' },
              ].map((n) => {
                const Icon = n.icon;
                const isSelected = selectedNode === n.key;
                return (
                  <div
                    key={n.key}
                    onClick={() => {
                      sound.playClick(900, 0.02);
                      setSelectedNode(n.key as any);
                    }}
                    className={`border p-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#c8f56a] bg-[#c8f56a]/10 shadow-[0_0_12px_rgba(200,245,106,0.15)]'
                        : 'border-[#1c2024] bg-[#0c0d10] hover:border-[#c8f56a]/40'
                    }`}
                  >
                    <div className="text-[var(--text-muted)] mb-1 flex items-center justify-center gap-1">
                      <Icon className={`w-3 h-3 ${isSelected ? 'text-[#c8f56a]' : 'text-[var(--text-dim)]'}`} />
                      <span className="font-bold">{n.title}</span>
                    </div>
                    <div className="text-[var(--text-primary)] font-bold text-[10px]">{n.tech}</div>
                    <div className="text-[9px] text-[#c8f56a] mt-0.5">{n.note}</div>
                  </div>
                );
              })}
            </div>

            {/* Moving Packet Flow Line */}
            <div className="relative py-1.5 px-3 border border-[#1c2024] bg-[#0a0b0d] flex items-center justify-between text-[10px] text-[var(--text-muted)] font-mono overflow-hidden">
              <div className="flex items-center gap-1.5 text-[#c8f56a] shrink-0">
                <Wifi className="w-3 h-3 animate-pulse" />
                <span className="font-bold">HIGH-SPEED BACKPLANE BUS</span>
              </div>

              {/* Animated Packet Stream Particle */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="h-full w-24 bg-gradient-to-r from-transparent via-[#c8f56a]/40 to-transparent animate-packet" />
              </div>

              <div className="flex items-center gap-2 text-[9px] shrink-0">
                <span className="text-[var(--text-dim)]">10 Gbps VPC</span>
                <span className="text-[var(--text-primary)] font-bold">TLS 1.3 mTLS</span>
              </div>
            </div>

            {/* Selected Node Real-Time Inspector */}
            <div className="p-2.5 border border-[#1c2024] bg-[#08090b] font-mono text-[10px]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[#c8f56a] font-bold uppercase">{nodeDetails[selectedNode].name}</span>
                <span className="text-[var(--text-dim)]">STATUS: HEALTHY</span>
              </div>
              <p className="text-[var(--text-muted)] text-[10px] leading-relaxed">
                {nodeDetails[selectedNode].detail}
              </p>
              <div className="mt-1 text-[9px] text-[var(--text-primary)] font-semibold border-t border-[#1c2024]/60 pt-1">
                METRIC: {nodeDetails[selectedNode].metric}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'telemetry' && (
          <div className="space-y-1.5 font-mono text-[11px]">
            {logs.map((log, i) => (
              <div
                key={i}
                className={`flex items-center justify-between py-1 px-2 border transition-all ${
                  i === activeLogIdx ? 'bg-[#c8f56a]/10 border-[#c8f56a]/30' : 'bg-[#0b0c0e] border-[#1c2024]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[9px] px-1 font-bold ${
                      log.method === 'POST'
                        ? 'text-yellow-400 bg-yellow-400/10'
                        : log.method === 'GET'
                        ? 'text-[#c8f56a] bg-[#c8f56a]/10'
                        : 'text-blue-400 bg-blue-400/10'
                    }`}
                  >
                    {log.method}
                  </span>
                  <span className="text-[var(--text-primary)] text-[10px] sm:text-[11px] truncate max-w-[150px] sm:max-w-[220px]">
                    {log.path}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="text-[#c8f56a]">{log.status}</span>
                  <span className="text-[var(--text-muted)]">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'schema' && (
          <div className="bg-[#050607] p-3 border border-[#1c2024] font-mono text-[10px] leading-relaxed text-[var(--text-muted)] overflow-x-auto">
            <span className="text-purple-400">CREATE TABLE</span> <span className="text-yellow-300">cluster_telemetry</span> (
            <br />
            &nbsp;&nbsp;node_id <span className="text-blue-400">UUID PRIMARY KEY DEFAULT</span> gen_random_uuid(),
            <br />
            &nbsp;&nbsp;service_name <span className="text-blue-400">VARCHAR(64) NOT NULL</span>,
            <br />
            &nbsp;&nbsp;p99_latency_ms <span className="text-blue-400">NUMERIC(5,2) CHECK</span> (p99_latency_ms &lt; 25.0),
            <br />
            &nbsp;&nbsp;error_rate <span className="text-blue-400">NUMERIC(6,4) DEFAULT</span> 0.0000,
            <br />
            &nbsp;&nbsp;synced_at <span className="text-blue-400">TIMESTAMPTZ DEFAULT</span> NOW()
            <br />
            );
          </div>
        )}
      </div>

      {/* Bottom Telemetry Strip & Interactive Burst Button */}
      <div className="relative z-10 pt-3 border-t border-[#1c2024] flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono">
        <div className="grid grid-cols-3 gap-3 flex-1 text-center">
          <div>
            <span className="text-[var(--text-dim)] block text-[9px] uppercase">RPS Rate</span>
            <span className="text-[var(--text-primary)] font-bold">{reqCount.toLocaleString()} req/s</span>
          </div>
          <div className="border-x border-[#1c2024]">
            <span className="text-[var(--text-dim)] block text-[9px] uppercase">p99 Latency</span>
            <span className="text-[#c8f56a] font-bold">{currentLatency} ms</span>
          </div>
          <div>
            <span className="text-[var(--text-dim)] block text-[9px] uppercase">Error Rate</span>
            <span className="text-[var(--text-primary)] font-bold">0.000%</span>
          </div>
        </div>

        {/* Load Burst Simulator Trigger */}
        <button
          onClick={handleSimulateBurst}
          className={`px-2.5 py-1 text-[9px] font-bold border transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
            isSpiking
              ? 'bg-[#c8f56a] text-[#08090a] border-[#c8f56a]'
              : 'border-[#1c2024] hover:border-[#c8f56a] text-[var(--text-muted)] hover:text-[#c8f56a] bg-[#0c0d10]'
          }`}
          title="Simulate 15,000 synthetic load packets"
        >
          <Zap className="w-2.5 h-2.5" />
          <span>{isSpiking ? 'PACKETS INJECTED' : 'BURST TEST'}</span>
        </button>
      </div>
    </div>
  );
}
