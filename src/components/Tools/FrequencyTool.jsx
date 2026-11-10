import React, { useState } from 'react';
import { UZBEK_FREQ, ENGLISH_FREQ } from '../../data/frequencyData';
import { caesarDecrypt } from '../../utils/classicalCiphers';
import { BarChart3, Sparkles } from 'lucide-react';

export default function FrequencyTool() {
  const [text, setText] = useState('KHOOR ZRUOG WKLV LV D VHFUHW PHVVDJH');
  const [language, setLanguage] = useState('EN'); // 'UZ' | 'EN'

  // Kiritilgan matndagi harflar chastotasi
  const clean = text.toUpperCase().replace(/[^A-Z]/g, '');
  const totalLetters = clean.length || 1;
  const counts = {};
  for (const char of clean) {
    counts[char] = (counts[char] || 0) + 1;
  }

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const frequencies = alphabet.map(char => {
    const count = counts[char] || 0;
    const percent = ((count / totalLetters) * 100).toFixed(1);
    const expected = language === 'UZ' ? (UZBEK_FREQ[char] || 0) : (ENGLISH_FREQ[char] || 0);
    return { char, count, percent: parseFloat(percent), expected };
  });

  // Eng ko'p uchragan harflar
  const sorted = [...frequencies].sort((a, b) => b.count - a.count).filter(x => x.count > 0);
  const mostFrequent = sorted[0]?.char || 'E';

  // Sezarni chastota orqali avtomatik buzish (Eng ko'p harfni 'E' yoki 'A' deb faraz qilamiz)
  const targetChar = language === 'UZ' ? 'A' : 'E';
  const guessedShift = ((mostFrequent.charCodeAt(0) - targetChar.charCodeAt(0)) + 26) % 26;
  const autoDecrypted = caesarDecrypt(text, guessedShift);

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white">Chastotaviy Tahlilator (Frequency Analyzer)</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
              Kriptotahlil (Al-Kindi Usuli)
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Tabiiy til statistikasi
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          9-asrda arab olimi Al-Kindi tomonidan ixtiro qilingan chastotaviy tahlil usuli monoalfavit shifrlarni oson buzishga xizmat qiladi.
          Har qanday tilda ayrim harflar (masalan, o'zbek tilida 'A', 'O'; ingliz tilida 'E', 'T') boshqalariga qaraganda ancha ko'p uchraydi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Input & Auto-Solver (1 col) */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300">Tahlil qilinuvchi matn:</label>
            <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
              <button
                onClick={() => setLanguage('UZ')}
                className={`px-2 py-0.5 rounded ${language === 'UZ' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
              >
                O'zbek
              </button>
              <button
                onClick={() => setLanguage('EN')}
                className={`px-2 py-0.5 rounded ${language === 'EN' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
              >
                Ingliz
              </button>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="Shifrlangan matnni kiriting..."
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
          />

          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Jami harflar: {clean.length} ta</span>
            <span>Eng faol harf: <strong className="text-cyan-400">{mostFrequent}</strong> ({sorted[0]?.count || 0} marta)</span>
          </div>

          {/* Smart Auto-Cracker Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-800/40 space-y-2 glow-cyan">
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Avtomatik Sezar Shifrini Ochish:</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Matnda eng ko'p uchragan '{mostFrequent}' harfi tildagi eng ko'p harf '{targetChar}' deb taxmin qilindi.
              Taxminiy siljish: <strong className="text-cyan-400 font-mono">k = {guessedShift}</strong>
            </p>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 break-words font-semibold">
              {autoDecrypted || '-'}
            </div>
          </div>
        </div>

        {/* Frequency Comparison Bars (2 cols) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              Harflar Taqsimoti Diagrammasi (%)
            </h4>
            <div className="flex items-center gap-4 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" />
                <span className="text-slate-300">Matndagi chastota</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-700" />
                <span className="text-slate-400">Tabiiy til standarti</span>
              </div>
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="overflow-x-auto p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-end gap-1.5 min-w-[550px] h-48 pt-4 pb-2 px-1">
              {frequencies.map(item => {
                const maxPercent = 15;
                const actualHeight = Math.min((item.percent / maxPercent) * 100, 100);
                const expectedHeight = Math.min((item.expected / maxPercent) * 100, 100);
                return (
                  <div key={item.char} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-0.5 h-full">
                      {/* Expected standard bar */}
                      <div
                        style={{ height: `${expectedHeight}%` }}
                        className="w-1.5 bg-slate-800 rounded-t-sm"
                        title={`Standart: ${item.expected}%`}
                      />
                      {/* Actual text bar */}
                      <div
                        style={{ height: `${actualHeight}%` }}
                        className={`w-2.5 rounded-t-sm transition-all group-hover:brightness-125 ${
                          item.percent > 0 ? 'bg-cyan-400' : 'bg-transparent'
                        }`}
                        title={`Haqiqiy: ${item.percent}% (${item.count} marta)`}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold group-hover:text-cyan-400">
                      {item.char}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            Agar diagrammadagi cho'qqilar (tepaliklar) tabiiy til me'yoriga mos kelmasa, matn almashtirish shifri bilan shifrlangan bo'lishi ehtimoli yuqori.
          </p>
        </div>

      </div>

    </div>
  );
}
