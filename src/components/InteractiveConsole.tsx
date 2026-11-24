'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Play, CheckCircle2, Copy, Check } from 'lucide-react';

interface ConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InteractiveConsole({ isOpen, onClose }: ConsoleProps) {
  const [history, setHistory] = useState<Array<{ type: 'cmd' | 'resp' | 'error'; text: string; data?: any }>>([
    {
      type: 'resp',
      text: 'Jad Aldassouki — Ingress Terminal Gateway v2.4.0\nType "help" to inspect available backend RPC routines or click any query chip below.',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newHistory = [...history, { type: 'cmd' as const, text: `$ ${trimmed}` }];

    const lower = trimmed.toLowerCase();

    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (lower === 'help') {
      newHistory.push({
        type: 'resp',
        text: `AVAILABLE BACKEND RPC METHODS:
  • health          Check ingress nodes, Redis memory, PostgreSQL cluster
  • projects        List all 6 production architectures with metrics
  • metrics         View live p99 latency curve, RPS rates, error budgets
  • sql             Run simulated PostgreSQL EXPLAIN ANALYZE query plan
  • ping            Test roundtrip network packet latency
  • curl <path>     Simulate REST endpoint dispatch (e.g. curl /v1/auth)
  • clear           Clear terminal buffer`,
      });
    } else if (lower === 'health') {
      newHistory.push({
        type: 'resp',
        text: JSON.stringify(
          {
            status: 'HEALTHY',
            timestamp: new Date().toISOString(),
            cluster: 'prod-us-east-mesh',
            uptime_seconds: 4892104,
            uptime_pct: '99.995%',
            services: {
              api_gateway: { status: 'ONLINE', p99_latency: '8.4ms', connections: 45120 },
              redis_cluster: { status: 'HEALTHY', memory_used_mb: 412, hit_rate: '94.2%' },
              postgres_primary: { status: 'LEADER_SYNCED', active_backends: 64, idle_in_tx: 0 },
            },
          },
          null,
          2
        ),
      });
    } else if (lower === 'projects') {
      newHistory.push({
        type: 'resp',
        text: `01. API DEVELOPMENT PLATFORM    [Node.js / Express / Redis]   Throughput: 45k req/s
02. E-COMMERCE BACKEND            [Node.js / Mongo / Redlock]   Checkouts: 12.5k/min
03. REAL-TIME CHAT SYSTEM         [Node.js / Socket.io / WS]    Active: 80,000+
04. AI INTEGRATION SYSTEM         [FastAPI / pgvector / SSE]    Cache Hit: 48.3%
05. AUTHENTICATION SERVICE        [RS256 JWKS / Argon2id]       Verify: <0.8ms
06. CLOUD FILE MANAGEMENT         [Python / S3 Multipart]       RAM: <45MB flat`,
      });
    } else if (lower === 'metrics') {
      newHistory.push({
        type: 'resp',
        text: `METRICS TELEMETRY:
  RPS Ingress:     45,820 req/s  [NORMAL]
  p50 Latency:     2.1 ms
  p95 Latency:     5.4 ms
  p99 Latency:     8.4 ms
  Error Rate:      0.0004%
  TCP Handshakes:  1.2 ms avg
  Active Conns:    18,490 sockets`,
      });
    } else if (lower === 'ping') {
      newHistory.push({
        type: 'resp',
        text: `PING api.jadaldassouki.dev (10.0.4.1): 56 data bytes
64 bytes from 10.0.4.1: icmp_seq=1 ttl=64 time=7.82 ms
64 bytes from 10.0.4.1: icmp_seq=2 ttl=64 time=8.14 ms
64 bytes from 10.0.4.1: icmp_seq=3 ttl=64 time=7.69 ms
--- api.jadaldassouki.dev ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 7.69/7.88/8.14/0.19 ms`,
      });
    } else if (lower.startsWith('sql')) {
      newHistory.push({
        type: 'resp',
        text: `QUERY PLAN:
Index Scan using idx_orders_account on orders (cost=0.42..8.44 rows=1 width=72)
  Index Cond: (account_id = '018f9b2c-9941'::uuid)
  Filter: (state = 'CONFIRMED'::varchar)
Execution Time: 0.284 ms
Planning Time: 0.092 ms`,
      });
    } else if (lower.startsWith('curl')) {
      newHistory.push({
        type: 'resp',
        text: `HTTP/2 200 OK
content-type: application/json; charset=utf-8
x-ratelimit-remaining: 994
x-response-time: 6.2ms
date: ${new Date().toUTCString()}

{
  "service": "jad.systems.gateway",
  "result": "SUCCESS",
  "data_integrity": "VERIFIED_HMAC_SHA256"
}`,
      });
    } else {
      newHistory.push({
        type: 'error',
        text: `Command not recognized: "${trimmed}". Type "help" to see available backend commands.`,
      });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      runCommand(inputVal);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md">
      <div
        className={`w-full bg-[#070809] border border-[#1f2225] shadow-2xl flex flex-col font-mono text-xs transition-all duration-200 ${
          isMaximized ? 'h-full max-w-full' : 'max-w-3xl h-[88vh] sm:h-[520px]'
        }`}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d0e11] border-b border-[#1f2225] select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#c8f56a]/80 inline-block" />
            <span className="text-[11px] text-[var(--text-primary)] font-bold ml-2">
              jad@cluster-us-east: ~/api-gateway
            </span>
            <span className="text-[9px] text-[#c8f56a] border border-[#c8f56a]/30 px-1 py-0.2 bg-[#c8f56a]/10 hidden sm:inline">
              LIVE TELNET
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 text-[var(--text-muted)] hover:text-red-400 cursor-pointer"
              title="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Command Suggestion Chips */}
        <div className="px-4 py-2 bg-[#090b0d] border-b border-[#1f2225] flex items-center gap-2 overflow-x-auto text-[10px]">
          <span className="text-[var(--text-dim)] uppercase shrink-0">QUICK EXECUTE:</span>
          {['help', 'health', 'projects', 'metrics', 'ping', 'sql explain', 'clear'].map((chip) => (
            <button
              key={chip}
              onClick={() => runCommand(chip === 'sql explain' ? 'sql' : chip)}
              className="px-2 py-0.5 border border-[#1f2225] hover:border-[#c8f56a] hover:text-[#c8f56a] text-[var(--text-muted)] bg-[#0b0d0f] shrink-0 transition-colors cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Terminal Output Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-[#050607] font-mono text-[11px] leading-relaxed">
          {history.map((item, idx) => (
            <div key={idx}>
              {item.type === 'cmd' ? (
                <div className="text-[#c8f56a] font-bold">{item.text}</div>
              ) : item.type === 'error' ? (
                <div className="text-red-400">{item.text}</div>
              ) : (
                <pre className="text-[var(--text-primary)] whitespace-pre-wrap font-mono text-[11px] opacity-90">
                  {item.text}
                </pre>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Line */}
        <div className="px-4 py-2.5 bg-[#090b0d] border-t border-[#1f2225] flex items-center gap-2 font-mono text-xs">
          <span className="text-[#c8f56a] font-bold shrink-0">jad@server:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type 'help', 'health', or any command..."
            className="flex-1 bg-transparent text-[var(--text-primary)] outline-hidden font-mono text-xs caret-[#c8f56a]"
          />
          <button
            onClick={() => runCommand(inputVal)}
            className="px-2.5 py-1 bg-[#c8f56a] text-[#08090a] font-bold text-[10px] uppercase hover:bg-[#d6f88b] transition-colors cursor-pointer shrink-0"
          >
            EXEC
          </button>
        </div>
      </div>
    </div>
  );
}
