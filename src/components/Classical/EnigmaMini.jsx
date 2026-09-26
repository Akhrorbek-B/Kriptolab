import React, { useState } from 'react';
import { simulateEnigmaChar } from '../../utils/classicalCiphers';
import { Cpu, ArrowRight, RotateCcw, Lightbulb, Sparkles, Volume2 } from 'lucide-react';

export default function EnigmaMini() {
  const [rotor1, setRotor1] = useState(0); // 0..25
  const [rotor2, setRotor2] = useState(0);
  const [rotor3, setRotor3] = useState(0);
  const [activeLamp, setActiveLamp] = useState(null);
  const [lastTrace, setLastTrace] = useState([]);
  const [history, setHistory] = useState([]);

  // Klaviaturadagi bitta harfni bosganda
  const handleKeyPress = (char) => {
    // 1. Rotor 1 doimiy 1 tadan aylanadi
    let nextR1 = (rotor1 + 1) % 26;
    let nextR2 = rotor2;
    let nextR3 = rotor3;

    // Turnover (Rotor 1 to'liq aylansa, Rotor 2 bir marta suriladi)
    if (nextR1 === 0) {
      nextR2 = (nextR2 + 1) % 26;
      if (nextR2 === 0) {
        nextR3 = (nextR3 + 1) % 26;
      }
    }

    setRotor1(nextR1);
    setRotor2(nextR2);
    setRotor3(nextR3);

    // 2. Enigma orqali o'tkazish
    const { char: encryptedChar, trace } = simulateEnigmaChar(char, nextR1, nextR2, nextR3);
    setActiveLamp(encryptedChar);
    setLastTrace(trace);
    setHistory(prev => [...prev.slice(-15), { input: char, output: encryptedChar }]);
  };

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'],
    ['P', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', 'L']
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white">Enigma Mashinasi (Elektromexanik Rotorli Shifr)</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">
              2-Jahon Urushi Tarixi
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            3 ta Rotor + Reflektor B
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Enigma — fashistlar Germaniyasi tomonidan qo'llanilgan mashhur shifrlash mashinasi. 
          Har bir klavish bosilganda rotorlar bir qadam aylanib, elektr signalining ichki zanjirini o'zgartiradi. 
          Alan Tyuring va Bletchli-Park jamoasi «Bombe» mashinasini yaratib, ushbu shifrni buzishga muvaffaq bo'lgan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Enigma Physical Unit (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-6">
          
          {/* Top: 3 Rotors Settings */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
            <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>Rotorlar Holati (A-Z):</span>
            </div>

            <div className="flex items-center gap-3">
              {[
                { name: 'Rotor III', val: rotor3, set: setRotor3 },
                { name: 'Rotor II', val: rotor2, set: setRotor2 },
                { name: 'Rotor I', val: rotor1, set: setRotor1 },
              ].map((rot, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-slate-500 font-mono">{rot.name}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => rot.set((rot.val - 1 + 26) % 26)}
                      className="w-5 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-amber-500/40 text-amber-400 font-mono font-bold text-sm flex items-center justify-center glow-amber shadow-inner">
                      {String.fromCharCode(rot.val + 65)}
                    </div>
                    <button
                      onClick={() => rot.set((rot.val + 1) % 26)}
                      className="w-5 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setRotor1(0); setRotor2(0); setRotor3(0); setHistory([]); setActiveLamp(null); setLastTrace([]); }}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs transition-colors"
              title="Rotorlarni boshlang'ich A-A-A holatga qaytarish"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Lampboard (Chiroqlar paneli) */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              Chiroqlar Paneli (Lampboard)
            </span>
            <div className="space-y-1.5 py-1">
              {keyboardRows.map((row, rIdx) => (
                <div key={rIdx} className="flex justify-center gap-2">
                  {row.map(char => {
                    const isLit = activeLamp === char;
                    return (
                      <div
                        key={char}
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                          isLit
                            ? 'bg-amber-400 text-slate-950 shadow-[0_0_20px_4px_rgba(251,191,36,0.8)] scale-110'
                            : 'bg-slate-900 border border-slate-800 text-slate-500'
                        }`}
                      >
                        {char}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Keyboard (Klaviaturani bosish) */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Enigma Klaviaturasi (Harfni bosing)
            </span>
            <div className="space-y-1.5 py-1">
              {keyboardRows.map((row, rIdx) => (
                <div key={rIdx} className="flex justify-center gap-2">
                  {row.map(char => (
                    <button
                      key={char}
                      onClick={() => handleKeyPress(char)}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-800 hover:bg-amber-500/20 active:bg-amber-500 active:text-slate-950 border border-slate-700 text-slate-200 font-mono text-xs font-bold transition-all shadow-md active:scale-95"
                    >
                      {char}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* History Ribbon */}
          {history.length > 0 && (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-500">Tarix:</span>
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {history.map((h, i) => (
                  <span key={i} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">{h.input}</span> → <span className="text-amber-400 font-bold">{h.output}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Electrical Signal Trace (1 col) */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Elektr Signalining Yo'li (Trace)
          </h4>

          {lastTrace.length > 0 ? (
            <div className="space-y-2 font-mono text-xs">
              <p className="text-[11px] text-slate-400">
                Tugma bosilganda oqim quyidagi zanjir bo'ylab o'tib, reflektordan qaytadi:
              </p>
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                {lastTrace.map((step, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-900 last:border-0">
                    <span className="text-slate-400">{step.stage}</span>
                    <span className="font-bold px-2 py-0.5 rounded bg-slate-900 text-amber-300 border border-slate-800">
                      {step.char}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-800/30 text-[11px] text-amber-300/90 leading-relaxed">
                <strong>Enigma qoidasi:</strong> Hech bir harf hech qachon O'Z-O'ZIGA shifrlanmaydi! Bu zaiflik Alan Tyuringga uni buzishda yordam bergan.
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500 text-xs">
              Klaviaturadagi ixtiyoriy harfni bosing va signalning ichki harakatini ko'ring.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
