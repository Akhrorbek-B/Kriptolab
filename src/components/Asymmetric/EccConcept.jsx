import React, { useState } from 'react';
import { Activity, Zap } from 'lucide-react';

export default function EccConcept() {
  const [a, setA] = useState(-3);
  const [b, setB] = useState(5);

  // SVG Elliptik egri chiziq chizmasi
  const width = 360;
  const height = 240;
  const cx = width / 2;
  const cy = height / 2;
  const scale = 22;

  // Egri chiziq nuqtalarini hisoblash: y^2 = x^3 + ax + b
  const topPoints = [];
  const bottomPoints = [];

  for (let px = -3; px <= 4.5; px += 0.05) {
    const rhs = px * px * px + a * px + b;
    if (rhs >= 0) {
      const py = Math.sqrt(rhs);
      const svgX = cx + px * scale;
      const svgYTop = cy - py * scale;
      const svgYBottom = cy + py * scale;
      if (svgYTop >= 10 && svgYBottom <= height - 10) {
        topPoints.push(`${svgX},${svgYTop}`);
        bottomPoints.push(`${svgX},${svgYBottom}`);
      }
    }
  }

  const p1 = { x: -1.2, y: 2.2 };
  const p2 = { x: 1.5, y: 2.8 };
  // Kesishgan uchinchi nuqta va uning aksi
  const p3 = { x: 2.8, y: -4.5 };
  const pR = { x: 2.8, y: 4.5 };

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white">Elliptik Egri Chiziqlar Kriptografiyasi (ECC)</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/30 font-mono">
              Eng Zamonaviy Standart
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            y² = x³ + ax + b
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          ECC — Bitcoin, Ethereum, zamonaviy TLS 1.3 va xavfsiz messenjerlarda (Signal, Telegram) qo'llaniladigan asimmetrik kriptografiya turidir.
          Uning asosiy kuchi: atigi 256-bitli kalit 3072-bitli ulkan RSA kaliti bilan bir xil xavfsizlik darajasini taqdim etadi!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Controls & Math (1 col) */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-pink-400" />
            Egri Chiziq Tenglamasi
          </h4>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-center text-sm text-pink-300 font-bold">
            y² = x³ + ({a})x + ({b})
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1 text-slate-300">
                <span>Koeffitsient 'a': {a}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="2"
                value={a}
                onChange={(e) => setA(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 text-slate-300">
                <span>Koeffitsient 'b': {b}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={b}
                onChange={(e) => setB(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-400"
              />
            </div>
          </div>

          {/* Diskriminant */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] font-mono text-slate-400">
            Diskriminant: 4a³ + 27b² = {4 * a * a * a + 27 * b * b} ≠ 0 (Silliq egri chiziq sharti bajarilgan ✓)
          </div>

          {/* Geometrical Rules */}
          <div className="space-y-2 text-xs text-slate-300">
            <div className="font-bold text-slate-200">Nuqtalarni qo'shish qoidasi (P + Q = R):</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              1. P va Q nuqtalar orqali to'g'ri chiziq o'tkaziladi.<br />
              2. U egri chiziqni uchinchi nuqtada (-R) kesib o'tadi.<br />
              3. -R nuqtaning X o'qiga nisbatan akslantirilgan nuqtasi natijaviy <strong>R = P + Q</strong> nuqtani beradi.
            </p>
          </div>
        </div>

        {/* Interactive SVG Curve (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center justify-between w-full max-w-lg">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Egri Chiziqda Nuqtalarni Qo'shish Animatsiyasi
            </span>
            <span className="text-[11px] font-mono text-pink-400">P + Q = R</span>
          </div>

          {/* SVG Canvas */}
          <div className="w-full max-w-lg p-3 rounded-2xl bg-slate-950 border border-pink-900/40 glow-purple flex justify-center">
            <svg width={width} height={height} className="overflow-visible font-mono">
              {/* Grid / Axes */}
              <line x1="10" y1={cy} x2={width - 10} y2={cy} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
              <line x1={cx} y1="10" x2={cx} y2={height - 10} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
              <text x={width - 20} y={cy - 6} fill="#64748b" fontSize="10">x</text>
              <text x={cx + 6} y={20} fill="#64748b" fontSize="10">y</text>

              {/* Elliptic Curve Paths */}
              {topPoints.length > 1 && (
                <path
                  d={`M ${topPoints.join(' L ')}`}
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="2.5"
                  className="drop-shadow"
                />
              )}
              {bottomPoints.length > 1 && (
                <path
                  d={`M ${bottomPoints.join(' L ')}`}
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="2.5"
                  className="drop-shadow"
                />
              )}

              {/* Secant line connecting P and Q */}
              <line
                x1={cx + p1.x * scale}
                y1={cy - p1.y * scale}
                x2={cx + p3.x * scale}
                y2={cy - p3.y * scale}
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />

              {/* Vertical reflection line from -R to R */}
              <line
                x1={cx + p3.x * scale}
                y1={cy - p3.y * scale}
                x2={cx + pR.x * scale}
                y2={cy - pR.y * scale}
                stroke="#a855f7"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />

              {/* Point P */}
              <circle cx={cx + p1.x * scale} cy={cy - p1.y * scale} r="5" fill="#06b6d4" />
              <text x={cx + p1.x * scale - 12} y={cy - p1.y * scale - 8} fill="#22d3ee" fontSize="11" fontWeight="bold">P</text>

              {/* Point Q */}
              <circle cx={cx + p2.x * scale} cy={cy - p2.y * scale} r="5" fill="#3b82f6" />
              <text x={cx + p2.x * scale + 8} y={cy - p2.y * scale - 6} fill="#60a5fa" fontSize="11" fontWeight="bold">Q</text>

              {/* Point -R */}
              <circle cx={cx + p3.x * scale} cy={cy - p3.y * scale} r="4" fill="#64748b" />
              <text x={cx + p3.x * scale + 8} y={cy - p3.y * scale + 4} fill="#94a3b8" fontSize="10">-R</text>

              {/* Point R (P + Q) */}
              <circle cx={cx + pR.x * scale} cy={cy - pR.y * scale} r="6" fill="#10b981" />
              <text x={cx + pR.x * scale + 8} y={cy - pR.y * scale - 6} fill="#34d399" fontSize="12" fontWeight="bold">R = P+Q</text>
            </svg>
          </div>

          {/* Key comparison banner */}
          <div className="w-full max-w-lg p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-pink-400" />
              <span className="text-slate-300 font-semibold">Taqqoslash:</span>
            </div>
            <div className="flex items-center gap-3 font-mono">
              <span className="text-pink-400 font-bold">ECC 256 bit</span>
              <span className="text-slate-600">≈</span>
              <span className="text-indigo-400 font-bold">RSA 3072 bit</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">12x yengilroq!</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
