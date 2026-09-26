import React, { useState } from 'react';
import { railFenceEncrypt, railFenceDecrypt } from '../../utils/classicalCiphers';
import { Copy, Check, GitCommit, Sparkles } from 'lucide-react';

export default function RailFence() {
  const [inputText, setInputText] = useState('KRIPTOGRAFIYA');
  const [rails, setRails] = useState(3);
  const [mode, setMode] = useState('encrypt');
  const [copied, setCopied] = useState(false);

  const cleanText = inputText.toUpperCase().replace(/\s+/g, '');
  const encResult = railFenceEncrypt(cleanText, rails);
  const decResult = railFenceDecrypt(cleanText, rails);

  const outputText = mode === 'encrypt' ? encResult.ciphertext : decResult;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Zigzag panjara matritsasini yaratish
  const len = cleanText.length;
  const grid = Array.from({ length: rails }, () => Array(len).fill('·'));
  if (len > 0 && rails > 1) {
    let r = 0;
    let dir = 1;
    for (let c = 0; c < len; c++) {
      grid[r][c] = cleanText[c];
      r += dir;
      if (r === rails - 1 || r === 0) dir = -dir;
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white">Rail Fence (O'rin Almashtirish Shifri)</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30 font-mono">
              Transpozitsiya
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Zigzag panjarasi bo'yicha siljitish
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          O'rin almashtirish (Transposition) shifrlari harflarning o'zini o'zgartirmaydi, balki ularning joylashuv tartibini o'zgartiradi.
          Rail Fence shifrida matn diagonal bo'ylab zigzag shaklida yoziladi va satrma-satr o'qib olinadi.
        </p>
      </div>

      <div className="space-y-5">
        
        {/* Controls */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300">
              Relslar (qatlamlar) soni: <span className="text-sky-400 font-mono font-bold">{rails} ta qator</span>
            </label>
            <div className="flex gap-2">
              {[2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setRails(n)}
                  className={`px-2.5 py-0.5 text-xs rounded font-mono transition-colors ${
                    rails === n
                      ? 'bg-sky-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {n} rels
                </button>
              ))}
            </div>
          </div>

          <input
            type="range"
            min="2"
            max="6"
            value={rails}
            onChange={(e) => setRails(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />
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
                  className={`px-2 py-0.5 rounded ${mode === 'encrypt' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                >
                  Shifrlash
                </button>
                <button
                  onClick={() => setMode('decrypt')}
                  className={`px-2 py-0.5 rounded ${mode === 'decrypt' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                >
                  Deshifrlash
                </button>
              </div>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Matn kiriting..."
              rows={3}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-slate-100 focus:outline-none focus:border-sky-500/60"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                Natija:
              </label>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 font-medium"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Nusxalandi!" : "Nusxalash"}</span>
              </button>
            </div>
            <div className="w-full p-3 rounded-xl bg-slate-950/80 border border-sky-900/40 text-sm font-mono text-sky-300 min-h-[85px] break-words glow-cyan">
              {outputText || <span className="text-slate-600">Natija bu yerda ko'rinadi...</span>}
            </div>
          </div>
        </div>

        {/* Visual Zigzag Fence */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <GitCommit className="w-4 h-4 text-sky-400" />
              Vizual Zigzag Panjarasi (Zig-Zag Fence Layout)
            </h4>
            <span className="text-[11px] text-slate-400 font-mono">Qatorma-qator o'qish yo'nalishi</span>
          </div>

          <div className="overflow-x-auto p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="space-y-2 font-mono text-sm min-w-max">
              {grid.map((row, rIdx) => (
                <div key={rIdx} className="flex items-center gap-2">
                  <span className="w-16 text-xs text-sky-400/80 font-bold shrink-0">
                    Rels {rIdx + 1}:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {row.map((char, cIdx) => (
                      <span
                        key={cIdx}
                        className={`w-7 h-7 flex items-center justify-center rounded font-bold transition-all ${
                          char !== '·'
                            ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                            : 'text-slate-800'
                        }`}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            Harflar zigzag bo'yicha to'ldiriladi, so'ngra 1-rels, 2-rels va 3-rels harflari ketma-ket birlashtirilib shifrmatn hosil qilinadi.
          </p>
        </div>

      </div>

    </div>
  );
}
