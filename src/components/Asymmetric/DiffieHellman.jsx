import React, { useState } from 'react';
import { simulateDiffieHellman } from '../../utils/asymmetricCiphers';
import { KeyRound, ShieldCheck, ArrowRight, ArrowLeft, Sparkles, RefreshCw, Palette } from 'lucide-react';

export default function DiffieHellman() {
  const [p, setP] = useState(23);
  const [g, setG] = useState(5);
  const [a, setA] = useState(6);  // Alice private
  const [b, setB] = useState(15); // Bob private

  const dh = simulateDiffieHellman(p, g, a, b);

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white">Diffie-Hellman Kalit Almashinuvi</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
              Ochiq Kanal orqali Kalit Kelishish
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            K = (g^a)^b = (g^b)^a mod p
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          1976-yilda yaratilgan ushbu protokol ikkita tomon (Alisa va Bob)ga ochiq, hamma eshitishi mumkin bo'lgan aloqa kanali orqali 
          uchinchi shaxslarga bildirmasdan umumiy bitta maxfiy simmetrik kalit hosil qilish imkonini beradi.
        </p>
      </div>

      {/* Visual Analogy (Color Mixing) */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-amber-400" />
            Ranglar Aralashmasi Analogiyasi (Intuitiv Tushuntirish)
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center font-sans text-xs">
          
          {/* Alice color */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="font-bold text-cyan-400">1. Alisa</div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center text-[10px] text-slate-950 font-bold" title="Umumiy ochiq rang">
                Sariq
              </div>
              <span>+</span>
              <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white font-bold" title="Alisaning maxfiy rangi">
                Qizil
              </div>
              <span>=</span>
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-[10px] text-white font-bold shadow-md">
                To'q sariq
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Alisa aralashgan "To'q sariq" rangni ochiq kanaldan Bobga jo'natadi.
            </p>
          </div>

          {/* Public Channel */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-center space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Ochiq Kanal (Internet)
            </div>
            <div className="flex items-center justify-center gap-4 text-slate-500">
              <div className="flex items-center gap-1 text-orange-400 font-mono text-[11px]">
                <span>Alisa</span> <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-center gap-1 text-teal-400 font-mono text-[11px]">
                <ArrowLeft className="w-3.5 h-3.5" /> <span>Bob</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500">
              Aralashgan rangdan boshlang'ich maxfiy rangni ajratib olish (teskari amali) juda qiyin!
            </p>
          </div>

          {/* Bob color */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="font-bold text-indigo-400">2. Bob</div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center text-[10px] text-slate-950 font-bold" title="Umumiy ochiq rang">
                Sariq
              </div>
              <span>+</span>
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold" title="Bobning maxfiy rangi">
                Ko'k
              </div>
              <span>=</span>
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-[10px] text-white font-bold shadow-md">
                Zangori
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Bob o'z aralashmasini Alisaga jo'natadi va har ikkisi bir-birining aralashmasiga o'z maxfiy rangini qo'shib, BIR XIL JIGARRANG KALITGA ega bo'lishadi!
            </p>
          </div>

        </div>
      </div>

      {/* Mathematical Simulation Model */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <KeyRound className="w-4 h-4 text-cyan-400" />
          Matematik Modulli Arifmetika Modeli
        </h4>

        {/* Global Public Parameters */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-300 font-semibold">
            Barchaga ma'lum umumiy parametrlar:
          </div>
          <div className="flex items-center gap-6 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Tub son (p):</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-bold">
                p = {p}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Generator asosi (g):</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-indigo-400 font-bold">
                g = {g}
              </span>
            </div>
          </div>
        </div>

        {/* Alice vs Bob steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Alice's Box */}
          <div className="p-5 rounded-xl bg-slate-950 border border-cyan-900/40 space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-bold text-cyan-400">Alisa (Alice)</h5>
              <span className="text-[10px] font-mono text-slate-500">Ishtirokchi A</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-300 font-medium">
                Alisaning maxfiy kaliti (a = {a}):
              </label>
              <input
                type="range"
                min="2"
                max="20"
                value={a}
                onChange={(e) => setA(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs space-y-1.5">
              <div className="text-slate-400 text-[11px]">1. Ochiq kalitni hisoblash:</div>
              <div className="text-cyan-300 font-bold">
                A = gᵃ mod p = {g}^{a} mod {p} = <span className="text-white text-sm">{dh.alicePublic}</span>
              </div>
              <div className="text-[10px] text-slate-500">A Bobga jo'natiladi</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs space-y-1.5">
              <div className="text-slate-400 text-[11px]">2. Umumiy maxfiy kalitni hisoblash:</div>
              <div className="text-emerald-400 font-bold">
                K_A = Bᵃ mod p = ({dh.bobPublic})^{a} mod {p} = <span className="text-white text-base">{dh.sharedSecret}</span>
              </div>
            </div>
          </div>

          {/* Bob's Box */}
          <div className="p-5 rounded-xl bg-slate-950 border border-indigo-900/40 space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-bold text-indigo-400">Bob</h5>
              <span className="text-[10px] font-mono text-slate-500">Ishtirokchi B</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-300 font-medium">
                Bobning maxfiy kaliti (b = {b}):
              </label>
              <input
                type="range"
                min="2"
                max="20"
                value={b}
                onChange={(e) => setB(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
              />
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs space-y-1.5">
              <div className="text-slate-400 text-[11px]">1. Ochiq kalitni hisoblash:</div>
              <div className="text-indigo-300 font-bold">
                B = gᵇ mod p = {g}^{b} mod {p} = <span className="text-white text-sm">{dh.bobPublic}</span>
              </div>
              <div className="text-[10px] text-slate-500">B Alisaga jo'natiladi</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs space-y-1.5">
              <div className="text-slate-400 text-[11px]">2. Umumiy maxfiy kalitni hisoblash:</div>
              <div className="text-emerald-400 font-bold">
                K_B = Aᵇ mod p = ({dh.alicePublic})^{b} mod {p} = <span className="text-white text-base">{dh.sharedSecret}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Final Matching Result */}
        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Umumiy Maxfiy Kalit Muvaffaqiyatli Hosil Bo'ldi!
              </div>
              <p className="text-xs text-emerald-300/80">
                Alisa va Bob bir-birining maxfiy kalitlarini ko'rmasdan bitta umumiy kalitga ega bo'lishdi: K = {dh.sharedSecret}
              </p>
            </div>
          </div>

          <div className="text-right font-mono">
            <div className="text-[10px] text-slate-400">Kelishilgan Simmetrik Kalit:</div>
            <div className="text-xl font-black text-emerald-400">K = {dh.sharedSecret}</div>
          </div>
        </div>

      </div>

    </div>
  );
}
