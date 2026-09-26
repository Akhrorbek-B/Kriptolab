import React, { useState } from 'react';
import { simulateAesRound, toHex } from '../../utils/modernCiphers';
import { Binary, ArrowRight, ArrowLeft, RotateCcw, Cpu, Layers, CheckCircle } from 'lucide-react';

export default function AesVisualizer() {
  const [inputText, setInputText] = useState('KRIPTOGRAFIYA123'); // 16 bayt
  const [keyText, setKeyText] = useState('MAXFIYKALIT99999');  // 16 bayt
  const [currentStep, setCurrentStep] = useState(0); // 0..4

  const paddedInput = (inputText + '                ').slice(0, 16);
  const paddedKey = (keyText + '                ').slice(0, 16);

  const aesData = simulateAesRound(paddedInput, paddedKey);

  const steps = [
    {
      id: 0,
      title: "0. Boshlang'ich Holat (Initial State)",
      desc: "16 baytli (128 bit) ochiq matn 4×4 o'lchamli baytlar matritsasiga (State) ustunlar bo'yicha joylashtiriladi.",
      state: aesData.initial,
      badge: "State Matritsa",
      color: "border-slate-700"
    },
    {
      id: 1,
      title: "1. SubBytes (S-Box Almashtirishi)",
      desc: "Har bir bayt GF(2⁸) maydonidagi nochiziqli S-Box jadvali orqali boshqa baytga almashtiriladi (Chiziqli tahlilga qarshi himoya).",
      state: aesData.afterSubBytes,
      badge: "Nochiziqlilik",
      color: "border-cyan-500/50"
    },
    {
      id: 2,
      title: "2. ShiftRows (Satrlarni Davriy Siljitish)",
      desc: "0-satr o'zgarmaydi, 1-satr 1 bayt chapga, 2-satr 2 bayt chapga, 3-satr 3 bayt chapga davriy suriladi.",
      state: aesData.afterShiftRows,
      badge: "Permutatsiya",
      color: "border-indigo-500/50"
    },
    {
      id: 3,
      title: "3. MixColumns (Ustunlarni Aralashtirish)",
      desc: "Har bir ustun Galois maydoni GF(2⁸) ustida fiksirlangan matritsaga ko'paytiriladi. Bitta bayt o'zgarishi barcha 4 baytga tarqaladi (Diffuziya).",
      state: aesData.afterMixColumns,
      badge: "Diffuziya (GF 2^8)",
      color: "border-purple-500/50"
    },
    {
      id: 4,
      title: "4. AddRoundKey (Raund Kaliti bilan XOR)",
      desc: "Hosil bo'lgan State matritsasi Raund Kaliti (Round Key) bilan bitma-bit XOR amali orqali qo'shiladi.",
      state: aesData.afterAddRoundKey,
      badge: "XOR Amali",
      color: "border-emerald-500/50"
    }
  ];

  const activeStepObj = steps[currentStep];

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white">AES (Advanced Encryption Standard) Raund Simulyatori</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
              128-bit Rijndael
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Standart SP-Tarmoq (SPN)
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          AES algoritmi 128-bitli ma'lumot bloklarini 10 (AES-128), 12 (AES-192) yoki 14 (AES-256) ta raund davomida 
          qayta-qayta 4 ta transformatsiyadan o'tkazadi. Quyida bitta standart raundning ichki bosqichlarini qadamma-qadam ko'rishingiz mumkin.
        </p>
      </div>

      {/* Input controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">
            16 baytli matn (128 bit blok):
          </label>
          <input
            type="text"
            maxLength={16}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
          />
          <span className="text-[10px] text-slate-500 font-mono">
            Uzunlik: {inputText.length}/16 bayt
          </span>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">
            16 baytli raund kaliti (Round Key):
          </label>
          <input
            type="text"
            maxLength={16}
            value={keyText}
            onChange={(e) => setKeyText(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-indigo-300 font-bold focus:outline-none focus:border-indigo-500"
          />
          <span className="text-[10px] text-slate-500 font-mono">
            Uzunlik: {keyText.length}/16 bayt
          </span>
        </div>
      </div>

      {/* Step Navigation Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {steps.map((st) => (
            <button
              key={st.id}
              onClick={() => setCurrentStep(st.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono whitespace-nowrap transition-all ${
                currentStep === st.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              Bosqich {st.id}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="p-1.5 rounded-lg bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            disabled={currentStep === steps.length - 1}
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="p-1.5 rounded-lg bg-cyan-600 disabled:opacity-40 hover:bg-cyan-500 text-slate-950 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Description & 4x4 State Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Explanation Card */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
              {activeStepObj.badge}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Qadam {currentStep + 1} / {steps.length}
            </span>
          </div>

          <h4 className="text-base font-bold text-white">
            {activeStepObj.title}
          </h4>

          <p className="text-xs text-slate-300 leading-relaxed">
            {activeStepObj.desc}
          </p>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] space-y-2 text-slate-400">
            <div className="font-semibold text-slate-300">Har bir katak ko'rinishi:</div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-slate-900 text-cyan-400 font-mono font-bold">
                0x7C
              </span>
              <span>16-lik (Hex) bayt qiymati</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                's'
              </span>
              <span>ASCII belgisi (agar mavjud bo'lsa)</span>
            </div>
          </div>
        </div>

        {/* 4x4 Matrix Display */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col items-center justify-center">
          <div className="flex items-center justify-between w-full max-w-md">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              State Matritsasi (4 × 4 Bayt)
            </span>
            <span className="text-[10px] text-cyan-400 font-mono">16 Bayt = 128 Bit</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-900/40 glow-cyan">
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
              {activeStepObj.state.map((row, r) => 
                row.map((byte, c) => {
                  const hex = toHex(byte);
                  const char = byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : '·';
                  return (
                    <div
                      key={`${r}-${c}`}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/80 flex flex-col items-center justify-center transition-all hover:scale-105 shadow-inner"
                    >
                      <span className="text-xs sm:text-sm font-mono font-black text-cyan-300">
                        {hex}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 mt-0.5">
                        '{char}'
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="flex items-center justify-between w-full max-w-md text-xs text-slate-500 pt-2 font-mono">
            <span>Ustun 0</span>
            <span>Ustun 1</span>
            <span>Ustun 2</span>
            <span>Ustun 3</span>
          </div>
        </div>

      </div>

    </div>
  );
}
