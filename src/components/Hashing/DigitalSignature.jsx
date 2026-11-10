import React, { useState } from 'react';
import { simulateSignature } from '../../utils/hashingUtils';
import { ShieldCheck, ShieldAlert, UserCheck, AlertTriangle } from 'lucide-react';

export default function DigitalSignature() {
  const [docText, setDocText] = useState("Alisa Bobga 1,000$ o'tkazmoqda");
  const [isTampered, setIsTampered] = useState(false);
  const [tamperedText, setTamperedText] = useState("Alisa Bobga 100,000$ o'tkazmoqda");

  // Alisa imzolaydi
  const aliceSig = simulateSignature(docText);

  // Bob qabul qilib tekshiradi
  // Agar hujumchi o'zgartirgan bo'lsa, Bob tamperedText ni oladi, lekin imzo Alisaniki qoladi
  const receivedText = isTampered ? tamperedText : docText;
  
  // Bob hisoblagan xesh
  let bobCalculatedHash = 0;
  for (let i = 0; i < receivedText.length; i++) {
    bobCalculatedHash = (bobCalculatedHash * 31 + receivedText.charCodeAt(i)) % 1000 + 1;
  }

  // Bob Alisaning ochiq kaliti bilan ochgan xesh
  const verifiedHashFromSig = aliceSig.verifiedHash;
  const isSignatureValid = bobCalculatedHash === verifiedHashFromSig;

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white">Elektron Raqamli Imzo (ERI) Laboratoriyasi</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
              Inkor Etib Bo'lmaslik (Non-Repudiation)
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            S = H(M)^d mod n, &nbsp; H' = S^e mod n
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Raqamli imzo — hujjatning yaxlitligi (o'zgartirilmaganligi) va uning muallifini qat'iy tasdiqlovchi kriptografik mexanizm.
          Alisa o'zining <strong>yopiq kaliti</strong> bilan imzo qo'yadi, Bob (va istalgan kishi) esa Alisaning <strong>ochiq kaliti</strong> orqali imzoni tekshiradi.
        </p>
      </div>

      {/* 3 Parties Interactive Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. Alice (Sender) */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4" />
              1. Alisa (Muallif)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
              Yopiq Kalit d={aliceSig.privateKey.d}
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Hujjat matni:</label>
            <textarea
              value={docText}
              onChange={(e) => setDocText(e.target.value)}
              rows={3}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">1. Xesh qiymati H(M):</span>
              <span className="text-cyan-400 font-bold">{aliceSig.hash}</span>
            </div>
            <div className="flex justify-between border-t border-slate-800/80 pt-2">
              <span className="text-slate-500">2. Raqamli imzo (S):</span>
              <span className="text-emerald-400 font-bold">S = {aliceSig.signature}</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            Alisa hujjat xeshini o'zining yopiq kalitiga ko'tarib imzo yaratadi va hujjat bilan birga jo'natadi.
          </p>
        </div>

        {/* 2. Public Channel & Eve Attack Simulator */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                2. Aloqa Kanali & Hujum
              </span>
              <span className="text-[10px] text-slate-500 font-mono">O'rtadagi Hujumchi (Eve)</span>
            </div>

            <p className="text-xs text-slate-300 mb-4">
              Uzatish jarayonida xaker hujjat matnini soxtalashtirishga urinib ko'rishi mumkin:
            </p>

            <button
              onClick={() => setIsTampered(!isTampered)}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                isTampered
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{isTampered ? "Hujum faollashtirilgan! (Tiklash)" : "Hujjatni soxtalashtirish (Hujum)"}</span>
            </button>
          </div>

          {isTampered ? (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/50 space-y-2 text-xs">
              <span className="text-red-400 font-bold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Xaker matnni o'zgartirdi:
              </span>
              <input
                type="text"
                value={tamperedText}
                onChange={(e) => setTamperedText(e.target.value)}
                className="w-full p-2 rounded bg-slate-950 border border-red-900 text-red-200 text-xs font-mono font-bold"
              />
              <p className="text-[10px] text-red-400/80">
                Lekin xaker Alisaning yopiq kalitini bilmagani sababli imzo eskisicha qoladi!
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-500">
              Kanalda o'zgartirish yo'q. Hujjat xavfsiz o'tmoqda.
            </div>
          )}
        </div>

        {/* 3. Bob (Receiver & Verifier) */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4" />
              3. Bob (Qabul Qiluvchi)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
              Ochiq Kalit e={aliceSig.publicKey.e}
            </span>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Bob qabul qilgan matn:</label>
            <div className={`p-2.5 rounded-xl border text-xs font-mono break-words ${
              isTampered ? 'bg-red-950/20 border-red-800/60 text-red-300' : 'bg-slate-950 border-slate-800 text-slate-200'
            }`}>
              {receivedText}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">1. Bob hisoblagan xesh H(M'):</span>
              <span className="text-white font-bold">{bobCalculatedHash}</span>
            </div>
            <div className="flex justify-between border-t border-slate-800/80 pt-2">
              <span className="text-slate-500">2. Imzodan ochilgan xesh Sᵉ mod n:</span>
              <span className="text-cyan-400 font-bold">{verifiedHashFromSig}</span>
            </div>
          </div>

          {/* Verification Status Banner */}
          <div className={`p-3.5 rounded-xl border text-xs flex items-center gap-3 ${
            isSignatureValid
              ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
              : 'bg-red-950/60 border-red-800 text-red-300 animate-pulse'
          }`}>
            {isSignatureValid ? (
              <>
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold">Imzo Haqiqiy! ✓</div>
                  <div className="text-[10px] text-emerald-400/80">Hujjat butunligi va Alisa ekanligi tasdiqlandi.</div>
                </div>
              </>
            ) : (
              <>
                <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
                <div>
                  <div className="font-bold">Soxtalashtirish Aniqlangan! ✗</div>
                  <div className="text-[10px] text-red-400/80">Xeshlar mos kelmadi! Hujjat bekor qilinadi.</div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
