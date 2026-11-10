import React, { useState } from 'react';
import { playfairEncrypt } from '../../utils/classicalCiphers';
import { Copy, Check, Grid } from 'lucide-react';

export default function PlayfairCipher() {
  const [inputText, setInputText] = useState('MONARCHY');
  const [key, setKey] = useState('PLAYFAIR');
  const [copied, setCopied] = useState(false);
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);

  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '') || 'CIPHER';
  const { matrix, pairs, ciphertext } = playfairEncrypt(inputText, cleanKey);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ciphertext);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activePair = pairs[selectedPairIndex] || pairs[0] || 'XX';

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white">Playfair Shifri (Bigramma Shifrlash)</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
              5 × 5 Matritsa
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Birinchi bigrammali amaliy shifr (1854-yil)
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Playfair shifrida bitta harf emas, balki ikki harfli juftliklar (bigrammalar) shifrlanadi.
          Shu sababli harflarning oddiy chastotaviy tahliliga ancha chidamli hisoblanadi. (I va J harflari birlashtiriladi).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Controls (2 cols) */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Key Input */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                Kalit so'z (Keyword):
              </label>
              <div className="flex gap-2">
                {['PLAYFAIR', 'MONARCHY', 'SECURITY', 'CRYPTOLAB'].map(k => (
                  <button
                    key={k}
                    onClick={() => setKey(k)}
                    className="px-2 py-0.5 text-[11px] rounded font-mono bg-slate-800 text-slate-400 hover:text-white"
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value.toUpperCase())}
              placeholder="Masalan: PLAYFAIR"
              className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-emerald-400 focus:outline-none focus:border-emerald-500/60 font-bold"
            />
          </div>

          {/* Inputs & Pairs */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300">
              Ochiq matn (Plaintext):
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value.toUpperCase())}
              placeholder="Shifrlanuvchi so'zni kiriting..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-slate-100 focus:outline-none focus:border-emerald-500/60"
            />

            {/* Bigrams breakdown */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-400">
                Ajratilgan Bigrammalar (Harflar juftligi):
              </span>
              <div className="flex flex-wrap gap-2">
                {pairs.map((pair, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPairIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                      selectedPairIndex === idx
                        ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-400'
                        : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {pair}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                Natijaviy Shifrmatn:
              </label>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-medium"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Nusxalandi!" : "Nusxalash"}</span>
              </button>
            </div>
            <div className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-emerald-900/40 text-sm font-mono text-emerald-300 min-h-[50px] break-words glow-emerald">
              {ciphertext || <span className="text-slate-600">Natija bu yerda ko'rinadi...</span>}
            </div>
          </div>

          {/* 3 Playfair Rules explanation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-400">
            <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800 space-y-1">
              <span className="font-bold text-slate-200">1. Bir satrda:</span>
              <p>Harflar o'ng tarafdagi qo'shnisi bilan almashadi (aylana bo'yicha).</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800 space-y-1">
              <span className="font-bold text-slate-200">2. Bir ustunda:</span>
              <p>Harflar pastdagi qo'shnisi bilan almashadi (aylana bo'yicha).</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800 space-y-1">
              <span className="font-bold text-slate-200">3. To'rtburchak:</span>
              <p>Harflar gorizontal qarama-qarshi burchakdagi harfga almashadi.</p>
            </div>
          </div>

        </div>

        {/* 5x5 Matrix Visualizer */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 flex flex-col items-center">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Grid className="w-4 h-4 text-emerald-400" />
            5 × 5 Playfair Matritsasi
          </h4>

          {/* Matrix table */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <table className="border-collapse font-mono text-sm">
              <tbody>
                {matrix.map((row, r) => (
                  <tr key={r}>
                    {row.map((char, c) => {
                      const isFirst = activePair[0] === char;
                      const isSecond = activePair[1] === char;
                      return (
                        <td
                          key={c}
                          className={`w-10 h-10 text-center font-bold border border-slate-800 transition-all ${
                            isFirst
                              ? 'bg-cyan-500 text-slate-950 scale-105 rounded'
                              : isSecond
                                ? 'bg-emerald-500 text-slate-950 scale-105 rounded'
                                : 'text-slate-300 hover:bg-slate-900'
                          }`}
                        >
                          {char === 'I' ? 'I/J' : char}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-[11px] text-slate-400 text-center space-y-1">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-cyan-400" />
              <span>1-harf: <strong className="text-cyan-300 font-mono">{activePair[0]}</strong></span>
              <span className="w-2.5 h-2.5 rounded bg-emerald-400 ml-2" />
              <span>2-harf: <strong className="text-emerald-300 font-mono">{activePair[1]}</strong></span>
            </div>
            <p className="text-slate-500">Matritsadagi juftlik pozitsiyasi</p>
          </div>
        </div>

      </div>

    </div>
  );
}
