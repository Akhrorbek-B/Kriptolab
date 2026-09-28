import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, ShieldAlert, Layers, RefreshCw, Eye } from 'lucide-react';

export default function CipherModes() {
  const [selectedPattern, setSelectedPattern] = useState('tux'); // 'tux' | 'shield' | 'stripes'
  const canvasOriginalRef = useRef(null);
  const canvasEcbRef = useRef(null);
  const canvasCbcRef = useRef(null);

  // Namuna chizish va shifrlash simulyatsiyasi
  useEffect(() => {
    const size = 64; // 64x64 pikselli kichik xavfsiz kanva
    const origCtx = canvasOriginalRef.current?.getContext('2d');
    const ecbCtx = canvasEcbRef.current?.getContext('2d');
    const cbcCtx = canvasCbcRef.current?.getContext('2d');

    if (!origCtx || !ecbCtx || !cbcCtx) return;

    // 1. Asl tasvirni shakllantirish
    const origData = origCtx.createImageData(size, size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const idx = (y * size + x) * 4;
        let isForeground = false;

        if (selectedPattern === 'tux') {
          // Oddiy siluet (Tux pengvin shakli)
          const dx = x - 32;
          const dy = y - 32;
          // Tana va bosh ellipsi
          if ((dx * dx) / 160 + (dy * dy) / 380 < 1 || (dx * dx) / 80 + ((dy + 12) * (dy + 12)) / 100 < 1) {
            isForeground = true;
          }
        } else if (selectedPattern === 'shield') {
          // Qalqon shakli
          if (x >= 18 && x <= 46 && y >= 14 && y <= 40) isForeground = true;
          if (y > 40 && y - 40 < 46 - x && y - 40 < x - 18) isForeground = true;
        } else {
          // Qora va oq chiziqlar
          if (Math.floor(x / 8) % 2 === 0) isForeground = true;
        }

        const color = isForeground ? 20 : 235; // qora yoki oq
        origData.data[idx] = color;
        origData.data[idx + 1] = color;
        origData.data[idx + 2] = color;
        origData.data[idx + 3] = 255;
      }
    }
    origCtx.putImageData(origData, 0, 0);

    // 2. ECB Rejimida shifrlash (Har bir 4 baytli piksel bir xil kalit bilan alohida XOR qilinadi)
    const ecbData = ecbCtx.createImageData(size, size);
    const key = 0xA5;
    for (let i = 0; i < origData.data.length; i += 4) {
      // Bir xil rang bir xil shifrmatn beradi!
      const val = origData.data[i];
      const encVal = (val ^ key) & 0xFF;
      ecbData.data[i] = encVal;
      ecbData.data[i + 1] = encVal;
      ecbData.data[i + 2] = encVal;
      ecbData.data[i + 3] = 255;
    }
    ecbCtx.putImageData(ecbData, 0, 0);

    // 3. CBC Rejimida shifrlash (Har bir blok oldingisi bilan zanjirlanadi + IV)
    const cbcData = cbcCtx.createImageData(size, size);
    let prev = 0x5C; // Boshlang'ich vektor (IV)
    for (let i = 0; i < origData.data.length; i += 4) {
      const val = origData.data[i];
      // C_i = E_K(P_i XOR C_{i-1})
      const chained = (val ^ prev) & 0xFF;
      const encVal = (chained * 167 + 13) & 0xFF; // kuchli psevdo-tasodifiy diffuziya
      cbcData.data[i] = encVal;
      cbcData.data[i + 1] = encVal;
      cbcData.data[i + 2] = encVal;
      cbcData.data[i + 3] = 255;
      prev = encVal;
    }
    cbcCtx.putImageData(cbcData, 0, 0);

  }, [selectedPattern]);

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white">Blok Shifrlash Rejimlari: ECB va CBC</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
              Mashhur Kripto-Paradoks
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Tux Penguin Vizual Eksperimenti
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Kriptografiyada eng mashhur ko'rgazmali dars: Nega ECB rejimi xavfli? 
          Quyidagi tasvir misolida ko'rishingiz mumkinki, ECB da ma'lumot shifrlangan bo'lsa ham, uning shakli va naqshi yaqqol ko'rinib turadi!
        </p>
      </div>

      {/* Pattern Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">Tasvir namunasini tanlang:</span>
          <div className="flex gap-2">
            {[
              { id: 'tux', label: 'Tux Pengvin' },
              { id: 'shield', label: 'Qalqon Belgisi' },
              { id: 'stripes', label: 'Zebra Chiziqlar' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPattern(p.id)}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                  selectedPattern === p.id
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3 Canvases Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Original */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col items-center space-y-4 text-center">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
            <Eye className="w-4 h-4 text-slate-400" />
            <span>1. Asl Tasvir (Plaintext)</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 shadow-lg">
            <canvas
              ref={canvasOriginalRef}
              width={64}
              height={64}
              className="w-44 h-44 image-pixelated rounded-lg"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          <p className="text-[11px] text-slate-400">
            Dastlabki ochiq piksel bloklari.
          </p>
        </div>

        {/* 2. ECB Mode */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-red-900/40 flex flex-col items-center space-y-4 text-center">
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-400">
            <ShieldAlert className="w-4 h-4" />
            <span>2. ECB Rejimi (Xavfli!)</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-950 border border-red-900/50 shadow-lg glow-red">
            <canvas
              ref={canvasEcbRef}
              width={64}
              height={64}
              className="w-44 h-44 image-pixelated rounded-lg"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          <p className="text-[11px] text-red-300/90 leading-relaxed">
            <strong className="text-red-400 font-bold">Naqsh saqlanib qoldi!</strong> Har bir oq piksel bir xil shifrlangan rangga, har bir qora piksel boshqa rangga aylandi. Siluet butunlay fosh bo'ldi.
          </p>
        </div>

        {/* 3. CBC Mode */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-emerald-900/40 flex flex-col items-center space-y-4 text-center">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>3. CBC Rejimi (Xavfsiz)</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-950 border border-emerald-900/50 shadow-lg glow-emerald">
            <canvas
              ref={canvasCbcRef}
              width={64}
              height={64}
              className="w-44 h-44 image-pixelated rounded-lg"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          <p className="text-[11px] text-emerald-300/90 leading-relaxed">
            <strong className="text-emerald-400 font-bold">To'liq xaos (Oq shovqin)!</strong> IV vektori va zanjirli XOR amali tufayli bir xil ochiq bloklar butunlay har xil tasodifiy qiymatlarga aylandi.
          </p>
        </div>

      </div>

      {/* Comparison Table */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Rejimlar Xususiyatlari Solishtirmasi
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="p-2.5">Rejim</th>
                <th className="p-2.5">Formula</th>
                <th className="p-2.5">IV Kerakmi?</th>
                <th className="p-2.5">Parallellik</th>
                <th className="p-2.5">Xavfsizlik darajasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="p-2.5 font-bold text-red-400">ECB</td>
                <td className="p-2.5 font-mono">C_i = E_K(P_i)</td>
                <td className="p-2.5 text-slate-500">Yo'q</td>
                <td className="p-2.5 text-emerald-400">Ha (Tez)</td>
                <td className="p-2.5 text-red-400">O'ta zaif (Naqshlar fosh bo'ladi)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-cyan-400">CBC</td>
                <td className="p-2.5 font-mono">C_i = E_K(P_i ⊕ C_{i-1})</td>
                <td className="p-2.5 text-emerald-400">Ha (Majburiy)</td>
                <td className="p-2.5 text-slate-500">Faqat deshifrlashda</td>
                <td className="p-2.5 text-emerald-400">Yuqori (Keng qo'llaniladi)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-indigo-400">CTR</td>
                <td className="p-2.5 font-mono">C_i = P_i ⊕ E_K(IV || i)</td>
                <td className="p-2.5 text-emerald-400">Ha (Nonce)</td>
                <td className="p-2.5 text-emerald-400">Ha (To'liq parallel)</td>
                <td className="p-2.5 text-emerald-400">O'ta yuqori (GCM bilan standart)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
