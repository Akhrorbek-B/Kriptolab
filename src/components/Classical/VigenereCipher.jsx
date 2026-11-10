import React, { useState } from 'react';
import { vigenereEncrypt, vigenereDecrypt } from '../../utils/classicalCiphers';
import { Copy, Check, Grid, RotateCcw } from 'lucide-react';

export default function VigenereCipher() {
  const [inputText, setInputText] = useState('KRIPTOGRAFIYA');
  const [key, setKey] = useState('KALIT');
  const [mode, setMode] = useState('encrypt');
  const [copied, setCopied] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [highlightRow, setHighlightRow] = useState(null);
  const [highlightCol, setHighlightCol] = useState(null);

  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '') || 'A';
  const outputText = mode === 'encrypt'
    ? vigenereEncrypt(inputText, cleanKey)
    : vigenereDecrypt(inputText, cleanKey);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Kalit takrorlanishi
  const generateAlignedKey = () => {
    let res = '';
    let kIdx = 0;
    for (let i = 0; i < inputText.length; i++) {
      const code = inputText[i].toUpperCase().charCodeAt(0);
      if (code >= 65 && code <= 90) {
        res += cleanKey[kIdx % cleanKey.length];
        kIdx++;
      } else {
        res += ' ';
      }
    }
    return res;
  };

  const alignedKey = generateAlignedKey();

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white">Vigenère Shifri (Polialfavit Shifrlash)</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-mono">
              Tabula Recta
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Formula: <span className="text-indigo-400">C_i = (P_i + K_i) mod 26</span>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          16-asrda Blez de Vijener tomonidan mukammallashtirilgan ushbu shifr deyarli 300 yil davomida buzilmas («le chiffre indéchiffrable») hisoblangan.
          Chunki u bitta harfni turli o'rinlarda turli siljishlar bilan shifrlab, oddiy chastotaviy tahlilni samarasiz qiladi.
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
                {['KALIT', 'SECRET', 'CRYPTO', 'TASHKENT'].map(k => (
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
              placeholder="Masalan: KALIT"
              className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-cyan-400 focus:outline-none focus:border-indigo-500/60 font-bold"
            />

            {/* Key Alignment illustration */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-xs space-y-1">
              <div className="flex text-slate-400">
                <span className="w-16 text-slate-500">Matn:</span>
                <span className="text-slate-200 tracking-widest">{inputText || '-'}</span>
              </div>
              <div className="flex text-indigo-400 font-bold">
                <span className="w-16 text-slate-500">Kalit:</span>
                <span className="tracking-widest">{alignedKey || '-'}</span>
              </div>
            </div>
          </div>

          {/* Inputs & Outputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  {mode === 'encrypt' ? 'Ochiq matn (Plaintext)' : 'Shifrmatn (Ciphertext)'}
                </label>
                <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[11px]">
                  <button
                    onClick={() => setMode('encrypt')}
                    className={`px-2 py-0.5 rounded ${mode === 'encrypt' ? 'bg-indigo-500 text-white font-bold' : 'text-slate-400'}`}
                  >
                    Shifrlash
                  </button>
                  <button
                    onClick={() => setMode('decrypt')}
                    className={`px-2 py-0.5 rounded ${mode === 'decrypt' ? 'bg-indigo-500 text-white font-bold' : 'text-slate-400'}`}
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
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-slate-100 focus:outline-none focus:border-indigo-500/60"
              />
            </div>

            {/* Output */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  {mode === 'encrypt' ? 'Natijaviy Shifrmatn' : 'Tiklagan Ochiq Matn'}
                </label>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Nusxalandi!" : "Nusxalash"}</span>
                </button>
              </div>
              <div className="w-full p-3 rounded-xl bg-slate-950/80 border border-indigo-900/40 text-sm font-mono text-indigo-300 min-h-[105px] break-words glow-purple">
                {outputText || <span className="text-slate-600">Natija bu yerda ko'rinadi...</span>}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowTable(!showTable)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <Grid className="w-3.5 h-3.5 text-indigo-400" />
              <span>{showTable ? "Tabula Recta jadvalini yashirish" : "Tabula Recta (26x26 Jadval)ni ochish"}</span>
            </button>
            <button
              onClick={() => { setInputText('KRIPTOGRAFIYA'); setKey('KALIT'); }}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Qayta tiklash</span>
            </button>
          </div>

        </div>

        {/* Side Explanation & Interactive letter tester */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Vijener Koordinata Tahlilchisi
          </h4>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3">
            <p className="text-slate-400 leading-relaxed">
              Jadvalda matn harfi satr (Row) va kalit harfi ustun (Column) kesishmasidagi harf tanlanadi:
            </p>

            <div className="flex items-center justify-around py-2 border-y border-slate-800 text-center font-mono">
              <div>
                <div className="text-[10px] text-slate-500">Matn harfi (P)</div>
                <div className="text-lg font-bold text-cyan-400">
                  {inputText[0] ? inputText[0].toUpperCase() : 'A'}
                </div>
              </div>
              <div className="text-slate-600 text-lg">+</div>
              <div>
                <div className="text-[10px] text-slate-500">Kalit harfi (K)</div>
                <div className="text-lg font-bold text-indigo-400">
                  {cleanKey[0] || 'A'}
                </div>
              </div>
              <div className="text-slate-600 text-lg">=</div>
              <div>
                <div className="text-[10px] text-slate-500">Shifr harfi (C)</div>
                <div className="text-lg font-bold text-emerald-400">
                  {vigenereEncrypt(inputText[0] || 'A', cleanKey[0] || 'A')}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400">
              <span className="font-semibold text-slate-200">Kasiski Hujumi:</span> Agar kalit uzunligi $m$ bo'lsa, har $m$-chi harf bitta alohida Sezar shifriga aylanadi.
            </div>
          </div>
        </div>

      </div>

      {/* Tabula Recta Matrix */}
      {showTable && (
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-indigo-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-2">
              <Grid className="w-4 h-4" />
              Tabula Recta (26 × 26 Vigenère Kvadrat Jadvali)
            </h4>
            <span className="text-[11px] text-slate-400">Kursor bilan katakni tanlang</span>
          </div>

          <div className="overflow-x-auto max-h-80 border border-slate-800 rounded-xl bg-slate-950 p-2">
            <table className="w-full text-center font-mono text-[10px] border-collapse">
              <thead>
                <tr>
                  <th className="p-1 text-slate-600 bg-slate-900 sticky left-0 z-20">#</th>
                  {alphabet.map((c, ci) => (
                    <th key={c} className={`p-1 font-bold ${highlightCol === ci ? 'bg-indigo-600 text-white' : 'text-indigo-400'}`}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {alphabet.map((rChar, ri) => (
                  <tr key={rChar} className={highlightRow === ri ? 'bg-slate-800/80' : ''}>
                    <td className={`p-1 font-bold sticky left-0 z-10 ${highlightRow === ri ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-cyan-400'}`}>
                      {rChar}
                    </td>
                    {alphabet.map((cChar, ci) => {
                      const encChar = String.fromCharCode(((ri + ci) % 26) + 65);
                      const isTarget = highlightRow === ri && highlightCol === ci;
                      return (
                        <td
                          key={ci}
                          onMouseEnter={() => { setHighlightRow(ri); setHighlightCol(ci); }}
                          className={`p-1 cursor-pointer transition-colors ${
                            isTarget 
                              ? 'bg-emerald-500 text-slate-950 font-bold scale-125 rounded' 
                              : (highlightRow === ri || highlightCol === ci)
                                ? 'bg-slate-800 text-slate-200'
                                : 'text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          {encChar}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
