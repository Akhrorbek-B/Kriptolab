import React, { useState } from 'react';
import { affineEncrypt, affineDecrypt, gcd, modInverse } from '../../utils/classicalCiphers';
import { Copy, Check, Calculator, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AffineCipher() {
  const [inputText, setInputText] = useState('UNIVERSITET');
  const [a, setA] = useState(7);
  const [b, setB] = useState(11);
  const [mode, setMode] = useState('encrypt');
  const [copied, setCopied] = useState(false);

  const isValidA = gcd(a, 26) === 1;
  const aInverse = isValidA ? modInverse(a, 26) : null;

  const resultObj = mode === 'encrypt'
    ? affineEncrypt(inputText, a, b)
    : affineDecrypt(inputText, a, b);

  const copyToClipboard = () => {
    if (resultObj.result) {
      navigator.clipboard.writeText(resultObj.result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Birinchi harf uchun qadamma-qadam hisoblash misoli
  const firstChar = (inputText.toUpperCase().match(/[A-Z]/) || ['A'])[0];
  const charX = firstChar.charCodeAt(0) - 65;
  const encY = isValidA ? (a * charX + b) % 26 : 0;
  const decX = isValidA && aInverse ? (aInverse * (encY - b + 26 * 100)) % 26 : 0;

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white">Affin Shifri (Affine Cipher)</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
              Chiziqli Arifmetika
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Shifrlash: <span className="text-cyan-400">E(x) = (ax + b) mod 26</span>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Affin shifri monoalfavit almashtirishning chiziqli matematik turidir. 
          To'g'ri deshifrlanishi uchun multiplikator <span className="text-cyan-300 font-mono">a</span> soni 
          alfavit quvvati (26) bilan o'zaro tub bo'lishi shart, ya'ni <span className="text-cyan-300 font-mono">gcd(a, 26) = 1</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Parameters & Inputs (2 cols) */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Parameter Selectors */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* a parameter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">
                  Multiplikator kaliti (<span className="text-cyan-400 font-mono font-bold">a = {a}</span>)
                </span>
                <span className="text-[11px] text-slate-400 font-mono">gcd({a}, 26) = {gcd(a, 26)}</span>
              </div>
              <select
                value={a}
                onChange={(e) => setA(parseInt(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-cyan-400 font-bold focus:outline-none focus:border-cyan-500/60"
              >
                {[1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25].map(val => (
                  <option key={val} value={val}>a = {val} (o'zaro tub)</option>
                ))}
              </select>
            </div>

            {/* b parameter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">
                  Siljish kaliti (<span className="text-indigo-400 font-mono font-bold">b = {b}</span>)
                </span>
                <span className="text-[11px] text-slate-400 font-mono">0 ... 25</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                value={b}
                onChange={(e) => setB(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400 mt-2"
              />
            </div>

          </div>

          {/* Inverse Info */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">Multiplikativ teskari son:</span>
            </div>
            <span className="text-emerald-400 font-bold">
              a⁻¹ mod 26 = {aInverse} (chunki {a} × {aInverse} mod 26 = {(a * aInverse) % 26})
            </span>
          </div>

          {/* Inputs & Outputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  {mode === 'encrypt' ? 'Ochiq matn (Plaintext)' : 'Shifrmatn (Ciphertext)'}
                </label>
                <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[11px]">
                  <button
                    onClick={() => setMode('encrypt')}
                    className={`px-2 py-0.5 rounded ${mode === 'encrypt' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                  >
                    Shifrlash
                  </button>
                  <button
                    onClick={() => setMode('decrypt')}
                    className={`px-2 py-0.5 rounded ${mode === 'decrypt' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                  >
                    Deshifrlash
                  </button>
                </div>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Matn kiriting..."
                rows={4}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-slate-100 focus:outline-none focus:border-cyan-500/60"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  {mode === 'encrypt' ? 'Natijaviy Shifrmatn' : 'Tiklagan Ochiq Matn'}
                </label>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Nusxalandi!" : "Nusxalash"}</span>
                </button>
              </div>
              <div className="w-full p-3 rounded-xl bg-slate-950/80 border border-cyan-900/40 text-sm font-mono text-cyan-300 min-h-[105px] break-words glow-cyan">
                {resultObj.result || <span className="text-slate-600">Natija bu yerda ko'rinadi...</span>}
              </div>
            </div>
          </div>

        </div>

        {/* Step-by-Step Mathematical Evaluation */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Calculator className="w-4 h-4 text-cyan-400" />
            Bosqichma-bosqich Matematika
          </h4>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3 font-mono">
            <div className="text-[11px] text-slate-400 pb-2 border-b border-slate-800">
              Harf: <span className="text-cyan-400 font-bold text-sm">'{firstChar}'</span> (alfavitdagi indeksi x = {charX})
            </div>

            {/* Shifrlash bosqichi */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500">1. Shifrlash: E(x) = (a·x + b) mod 26</span>
              <div className="p-2 rounded bg-slate-900 text-slate-200 text-[11px]">
                E({charX}) = ({a} × {charX} + {b}) mod 26<br />
                = ({a * charX + b}) mod 26 = <span className="text-cyan-400 font-bold">{encY}</span> ('{String.fromCharCode(encY + 65)}')
              </div>
            </div>

            {/* Deshifrlash bosqichi */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500">2. Deshifrlash: D(y) = a⁻¹·(y - b) mod 26</span>
              <div className="p-2 rounded bg-slate-900 text-slate-200 text-[11px]">
                D({encY}) = {aInverse} × ({encY} - {b}) mod 26<br />
                = {aInverse} × ({encY - b}) mod 26 = <span className="text-emerald-400 font-bold">{decX}</span> ('{String.fromCharCode(decX + 65)}')
              </div>
            </div>

            <div className="p-2 rounded bg-emerald-950/30 border border-emerald-800/40 text-[11px] text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Dastlabki harf to'liq tiklandi!</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
