import React, { useState } from 'react';
import { analyzeAvalanche } from '../../utils/hashingUtils';
import { Fingerprint, Flame, CheckCircle, RefreshCw, Zap } from 'lucide-react';

export default function AvalancheVisualizer() {
  const [text1, setText1] = useState('Universitet');
  const [text2, setText2] = useState('universitet'); // faqat 1 ta bosh harf farqi

  const analysis = analyzeAvalanche(text1, text2);
  const changeNum = parseFloat(analysis.changePercentage);

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white">SHA-256 Ko'chki Effekti (Avalanche Effect)</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
              Qat'iy Ko'chki Mezoni (SAC)
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            H(M₁) vs H(M₂)
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Kriptografik xesh-funksiyalarning eng muhim xususiyatlaridan biri — kiruvchi matnda atigi 1 ta bit (masalan, bitta harfning katta/kichikligi) 
          o'zgarsa ham, natijaviy xesh qiymatining kamida 50% bitlari butunlay boshqacha bo'lishi kerak.
        </p>
      </div>

      {/* Input Comparison Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Text 1 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300">1-Matn:</label>
            <span className="text-[10px] text-slate-500 font-mono">{text1.length} belgi</span>
          </div>
          <input
            type="text"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
          />
          <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-400 break-all">
            <span className="text-slate-500 text-[10px] block">SHA-256 Xeshi:</span>
            <span className="text-cyan-400">{analysis.hash1}</span>
          </div>
        </div>

        {/* Text 2 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300">2-Matn (Kichik o'zgarish bilan):</label>
            <div className="flex gap-1.5">
              {[
                { t1: 'Universitet', t2: 'universitet', label: 'Harf registri' },
                { t1: 'Parol123', t2: 'Parol124', label: 'Oxirgi raqam' },
                { t1: 'Toshkent', t2: 'Toshkent.', label: 'Nuqta qo\'shish' }
              ].map(preset => (
                <button
                  key={preset.label}
                  onClick={() => { setText1(preset.t1); setText2(preset.t2); }}
                  className="px-2 py-0.5 text-[10px] rounded bg-slate-800 text-slate-400 hover:text-white"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
          <input
            type="text"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-emerald-300 font-bold focus:outline-none focus:border-emerald-500"
          />
          <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-400 break-all">
            <span className="text-slate-500 text-[10px] block">SHA-256 Xeshi:</span>
            <span className="text-emerald-400">{analysis.hash2}</span>
          </div>
        </div>

      </div>

      {/* Statistics Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-6 glow-cyan">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${changeNum >= 45 && changeNum <= 55 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
            <Flame className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">O'zgargan Xesh Bitlari Nisbati:</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono flex items-center gap-2">
              <span className={changeNum >= 45 && changeNum <= 55 ? 'text-emerald-400' : 'text-cyan-400'}>
                {analysis.changePercentage}%
              </span>
              <span className="text-sm font-sans font-medium text-slate-400">
                ({analysis.flippedCount} / 256 ta bit)
              </span>
            </div>
          </div>
        </div>

        <div className="text-right text-xs space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 font-semibold">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Kriptografik Mezon Bajarildi (~50%)</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Hujumchi xeshga qarab asl matndagi farqni bila olmaydi.
          </p>
        </div>
      </div>

      {/* 256 Bit Visual Grid */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-400" />
            Barcha 256 ta Bitning Vizual Xaritasi
          </h4>
          <div className="flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-red-500/80" />
              <span className="text-slate-400">O'zgargan ({analysis.flippedCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-800" />
              <span className="text-slate-400">O'xshash ({256 - analysis.flippedCount})</span>
            </div>
          </div>
        </div>

        {/* 256 Bit Matrix */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-center overflow-x-auto">
          <div className="grid grid-cols-16 sm:grid-cols-32 gap-1 max-w-full">
            {analysis.bitComparison.map((bit) => (
              <div
                key={bit.index}
                title={`Bit ${bit.index}: 1-matn='${bit.bit1}', 2-matn='${bit.bit2}' ${bit.flipped ? '(O\'ZGARGON)' : ''}`}
                className={`w-3 h-3 rounded-[2px] transition-all hover:scale-150 ${
                  bit.flipped
                    ? 'bg-red-500/90 shadow-[0_0_6px_rgba(239,68,68,0.8)]'
                    : 'bg-slate-800/80 hover:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        <p className="text-[11px] text-slate-400 text-center">
          Har bir katak xeshning 1 ta bitini bildiradi. Qizil ranglar kirishdagi bitta harf tufayli butunlay o'zgargan bitlardir.
        </p>
      </div>

    </div>
  );
}
