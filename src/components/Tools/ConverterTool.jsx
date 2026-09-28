import React, { useState } from 'react';
import { Copy, Check, Binary, Sparkles, ArrowRightLeft } from 'lucide-react';

export default function ConverterTool() {
  const [text, setText] = useState('Crypto 2026');
  const [copiedKey, setCopiedKey] = useState(null);

  // Har xil formatlarga o'tkazish
  const toAscii = () => text.split('').map(c => c.charCodeAt(0)).join(' ');
  
  const toHex = () => text.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase()).join(' ');
  
  const toBinary = () => text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
  
  const toBase64 = () => {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch (e) {
      return '-';
    }
  };

  const copy = (key, val) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const formats = [
    { key: 'ascii', label: "ASCII (O'nlik kodlar)", value: toAscii(), desc: "Har bir belgining 0..255 oraliqdagi o'nlik soni" },
    { key: 'hex', label: 'Hexadecimal (16-lik)', value: toHex(), desc: 'Har bir baytning 2 ta 16-lik raqami (00..FF)' },
    { key: 'bin', label: 'Binary (8-bit Ikkilik)', value: toBinary(), desc: 'Kompyuter xotirasidagi 0 va 1 bitlar ketma-ketligi' },
    { key: 'b64', label: 'Base64 Kodlash', value: toBase64(), desc: "Binar ma'lumotni xavfsiz ASCII matn sifatida uzatish" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white">Universal Ma'lumot Konvertori (Data Converter)</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
              Binar & Hex & Base64
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Kriptografik Ma'lumot Turlari
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Kriptografiyada matnlar bitlar, baytlar va 16-lik (hex) bloklar ustida amallar bilan shifrlanadi.
          Quyidagi vosita ixtiyoriy matnning kompyuter xotirasidagi barcha ko'rinishlarini bir vaqtning o'zida jonli ko'rsatadi.
        </p>
      </div>

      {/* Main Input */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <label className="text-xs font-semibold text-slate-300">
          Asosiy Ochiq Matn (UTF-8):
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Matn kiriting..."
          className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Synchronized Output Formats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formats.map(fmt => (
          <div key={fmt.key} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white font-mono">{fmt.label}</span>
              <button
                onClick={() => copy(fmt.key, fmt.value)}
                className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-medium"
              >
                {copiedKey === fmt.key ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3 text-slate-400" />}
                <span>{copiedKey === fmt.key ? 'Nusxalandi' : 'Nusxalash'}</span>
              </button>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-xs text-cyan-300 min-h-[50px] break-all select-all">
              {fmt.value || '-'}
            </div>

            <p className="text-[10px] text-slate-500 font-sans">
              {fmt.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
