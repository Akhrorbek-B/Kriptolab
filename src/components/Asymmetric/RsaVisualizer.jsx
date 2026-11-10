import React, { useState } from 'react';
import { calculateRsaKeys, rsaEncryptText, rsaDecryptText, isPrime } from '../../utils/asymmetricCiphers';
import { KeyRound, Lock, Unlock, Calculator, Sparkles } from 'lucide-react';

export default function RsaVisualizer() {
  const [p, setP] = useState(61);
  const [q, setQ] = useState(53);
  const [eVal, setEVal] = useState(17);
  const [message, setMessage] = useState('HI');
  const [copiedPub, setCopiedPub] = useState(false);
  const [copiedPriv, setCopiedPriv] = useState(false);

  const isValidP = isPrime(p);
  const isValidQ = isPrime(q) && p !== q;

  const rsa = (isValidP && isValidQ) ? calculateRsaKeys(p, q, eVal) : null;

  // Shifrlash va deshifrlash
  const encResult = rsa && rsa.isValid ? rsaEncryptText(message, rsa.e, rsa.n) : { result: [], error: null };
  const decResult = rsa && rsa.isValid && encResult.result.length > 0 
    ? rsaDecryptText(encResult.result, rsa.d, rsa.n)
    : { result: '', error: null };

  const firstChar = message[0] || 'A';
  const mCode = BigInt(firstChar.charCodeAt(0));
  const cCode = (rsa && rsa.isValid && mCode < rsa.n)
    ? (mCode ** rsa.e % rsa.n).toString()
    : '-';

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white">RSA Algoritmi (Ochiq Kalitli Kriptotizim)</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-mono">
              Faktoriizatsiya Masalasi
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            c = m^e mod n, &nbsp; m = c^d mod n
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          1977-yilda Rivest, Shamir va Adleman tomonidan yaratilgan RSA — dunyodagi eng mashhur asimmetrik shifr.
          U ikkita katta tub son ko'paytmasini faktoriizatsiya qilishning hisoblash jihatidan o'ta murakkabligiga asoslangan.
        </p>
      </div>

      {/* Prime Selection & Key Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Primes Inputs (1 col) */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Calculator className="w-4 h-4 text-purple-400" />
            1. Tub Sonlar (Primes) Tanlash
          </h4>

          {/* Quick presets */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-400">O'quv namunalari:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { p: 61, q: 53, label: 'p=61, q=53' },
                { p: 17, q: 19, label: 'p=17, q=19' },
                { p: 11, q: 13, label: 'p=11, q=13' },
                { p: 79, q: 83, label: 'p=79, q=83' },
              ].map(preset => (
                <button
                  key={preset.label}
                  onClick={() => { setP(preset.p); setQ(preset.q); }}
                  className={`px-2 py-0.5 text-[11px] rounded font-mono transition-colors ${
                    p === preset.p && q === preset.q
                      ? 'bg-purple-600 text-white font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-semibold">Birinchi tub son (p):</span>
                <span className={`font-mono text-[11px] ${isValidP ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isValidP ? 'Tub son ✓' : 'Tub emas ✗'}
                </span>
              </div>
              <input
                type="number"
                value={p}
                onChange={(e) => setP(parseInt(e.target.value) || 0)}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-purple-300 font-bold focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-semibold">Ikkinchi tub son (q):</span>
                <span className={`font-mono text-[11px] ${isValidQ ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isValidQ ? 'Tub son ✓' : 'Xato (p ≠ q bo\'lishi shart)'}
                </span>
              </div>
              <input
                type="number"
                value={q}
                onChange={(e) => setQ(parseInt(e.target.value) || 0)}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-purple-300 font-bold focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-semibold">Ochiq daraja (e):</span>
                <span className="text-[11px] text-slate-500 font-mono">gcd(e, φ) = 1</span>
              </div>
              <input
                type="number"
                value={eVal}
                onChange={(e) => setEVal(parseInt(e.target.value) || 3)}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Calculated Keys Details (2 cols) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <KeyRound className="w-4 h-4 text-purple-400" />
            2. Generatsiya Qilingan RSA Matematik Kalitlari
          </h4>

          {rsa ? (
            <div className="space-y-4 font-mono text-xs">
              
              {/* Formula steps grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[10px]">Modul (n = p × q):</span>
                  <div className="text-sm font-bold text-white">
                    n = {rsa.p.toString()} × {rsa.q.toString()} = <span className="text-purple-400">{rsa.n.toString()}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[10px]">Eyler funktsiyasi φ(n) = (p-1)(q-1):</span>
                  <div className="text-sm font-bold text-white">
                    φ(n) = ({rsa.p - 1n}) × ({rsa.q - 1n}) = <span className="text-cyan-400">{rsa.phi.toString()}</span>
                  </div>
                </div>
              </div>

              {/* Public & Private Key Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Public Key */}
                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-800/40 space-y-2 glow-cyan">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Ochiq Kalit (Public Key)
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`e=${rsa.e}, n=${rsa.n}`);
                        setCopiedPub(true);
                        setTimeout(() => setCopiedPub(false), 2000);
                      }}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300"
                    >
                      {copiedPub ? "Nusxalandi" : "Nusxalash"}
                    </button>
                  </div>
                  <div className="text-base font-bold text-cyan-300">
                    (e = {rsa.e.toString()}, n = {rsa.n.toString()})
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans">
                    Barchaga ochiq tarqatiladi. Xabarlarni shifrlash uchun ishlatiladi.
                  </p>
                </div>

                {/* Private Key */}
                <div className="p-4 rounded-xl bg-slate-950 border border-purple-800/40 space-y-2 glow-purple">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                      <Unlock className="w-3.5 h-3.5" />
                      Yopiq Kalit (Private Key)
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`d=${rsa.d}, n=${rsa.n}`);
                        setCopiedPriv(true);
                        setTimeout(() => setCopiedPriv(false), 2000);
                      }}
                      className="text-[10px] text-purple-400 hover:text-purple-300"
                    >
                      {copiedPriv ? "Nusxalandi" : "Nusxalash"}
                    </button>
                  </div>
                  <div className="text-base font-bold text-purple-300">
                    (d = {rsa.d?.toString() || 'mavjud emas'}, n = {rsa.n.toString()})
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans">
                    Faqat egasida maxfiy saqlanadi. Deshifrlash uchun ishlatiladi: d × e ≡ 1 (mod φ(n)).
                  </p>
                </div>

              </div>

            </div>
          ) : (
            <div className="p-8 text-center text-red-400 text-xs">
              Iltimos, ikkita turli haqiqiy tub son kiriting.
            </div>
          )}
        </div>

      </div>

      {/* Live Text Encryption & Decryption */}
      {rsa && rsa.isValid && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            3. Jonli Xabarni Shifrlash va Deshifrlash
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Input Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Ochiq xabar (m):
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Matn kiriting..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-white focus:outline-none focus:border-cyan-500 font-bold"
              />
              <span className="text-[10px] text-slate-500">
                ASCII kodlari: [{message.split('').map(c => c.charCodeAt(0)).join(', ')}]
              </span>
            </div>

            {/* Ciphertext Numbers */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Shifrlangan sonlar (c = mᵉ mod n):
              </label>
              <div className="p-3 rounded-xl bg-slate-950 border border-cyan-900/50 text-xs font-mono text-cyan-300 min-h-[46px] break-all glow-cyan">
                {encResult.result.length > 0 ? encResult.result.join(', ') : '-'}
              </div>
              <span className="text-[10px] text-cyan-500/80">
                Ochiq kalit (e, n) yordamida hisoblandi
              </span>
            </div>

            {/* Decrypted Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Qayta tiklangan xabar (m = cᵈ mod n):
              </label>
              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-900/50 text-sm font-mono text-emerald-400 font-bold min-h-[46px] flex items-center glow-emerald">
                {decResult.result || '-'}
              </div>
              <span className="text-[10px] text-emerald-500/80">
                Yopiq kalit (d, n) yordamida to'liq tiklandi ✓
              </span>
            </div>

          </div>

          {/* Math demonstration for first letter */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-300 flex flex-wrap items-center justify-between gap-3">
            <span>
              1-belgi '{firstChar}' (kod: {mCode.toString()}): &nbsp; 
              c = {mCode.toString()}^{rsa.e.toString()} mod {rsa.n.toString()} = <strong className="text-cyan-400">{cCode}</strong>
            </span>
            <span className="text-emerald-400">
              m = {cCode}^{rsa.d.toString()} mod {rsa.n.toString()} = <strong>{mCode.toString()} ('{firstChar}')</strong>
            </span>
          </div>

        </div>
      )}

    </div>
  );
}
