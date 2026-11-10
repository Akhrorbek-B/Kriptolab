import React, { useState } from 'react';
import { caesarEncrypt, caesarDecrypt, caesarBruteForce } from '../../utils/classicalCiphers';
import { Copy, Check, RotateCcw, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function CaesarCipher() {
  const { t } = useLanguage();
  const [inputText, setInputText] = useState('SALOM DUNYO');
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState('encrypt');
  const [copied, setCopied] = useState(false);
  const [showBrute, setShowBrute] = useState(false);

  const outputText = mode === 'encrypt' 
    ? caesarEncrypt(inputText, shift)
    : caesarDecrypt(inputText, shift);

  const bruteResults = caesarBruteForce(inputText);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="space-y-6">
      
      {/* Header & Theory Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('caesar.title')}</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30 font-mono">
              {t('caesar.badge')}
            </span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {t('caesar.formula')} <span className="text-cyan-600 dark:text-cyan-400">C = (P + k) mod 26</span>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {t('caesar.desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Controls & Inputs (2 cols) */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Shift Slider */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                {t('caesar.shiftKey')} (<span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">k = {shift}</span>)
              </label>
              <div className="flex gap-2">
                {[1, 3, 13, 25].map(preset => (
                  <button
                    key={preset}
                    onClick={() => setShift(preset)}
                    className={`px-2 py-0.5 text-[11px] rounded font-mono transition-colors ${
                      shift === preset
                        ? 'bg-cyan-500 text-white dark:text-slate-950 font-bold'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    k={preset} {preset === 13 ? '(ROT13)' : ''}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="25"
              value={shift}
              onChange={(e) => setShift(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />

            {/* Quick Letter Mapping preview */}
            <div className="overflow-x-auto no-scrollbar py-1">
              <div className="flex items-center gap-1 text-[11px] font-mono min-w-max">
                <span className="text-slate-500 dark:text-slate-400">P:</span>
                {alphabet.slice(0, 13).map(char => (
                  <span key={char} className="w-5 text-center text-slate-700 dark:text-slate-300">{char}</span>
                ))}
                <span className="text-slate-400 dark:text-slate-500 mx-1">→</span>
                <span className="text-cyan-600 dark:text-cyan-400">C:</span>
                {alphabet.slice(0, 13).map(char => (
                  <span key={char} className="w-5 text-center text-cyan-600 dark:text-cyan-300 font-bold">
                    {caesarEncrypt(char, shift)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Mode Switch & Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Input Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {mode === 'encrypt' ? t('common.plaintext') : t('common.ciphertext')}
                </label>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px]">
                  <button
                    onClick={() => setMode('encrypt')}
                    className={`px-2 py-0.5 rounded ${mode === 'encrypt' ? 'bg-cyan-500 text-white dark:text-slate-950 font-bold' : 'text-slate-500 dark:text-slate-400'}`}
                  >
                    {t('common.encrypt')}
                  </button>
                  <button
                    onClick={() => setMode('decrypt')}
                    className={`px-2 py-0.5 rounded ${mode === 'decrypt' ? 'bg-cyan-500 text-white dark:text-slate-950 font-bold' : 'text-slate-500 dark:text-slate-400'}`}
                  >
                    {t('common.decrypt')}
                  </button>
                </div>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t('common.enterText')}
                rows={4}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500/60 transition-colors"
              />
            </div>

            {/* Output Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {mode === 'encrypt' ? t('common.result') : t('common.resultDecrypt')}
                </label>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 text-[11px] text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 font-medium"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? t('common.copied') : t('common.copy')}</span>
                </button>
              </div>
              <div className="w-full p-3 rounded-xl bg-cyan-50 dark:bg-slate-950/80 border border-cyan-200 dark:border-cyan-900/40 text-sm font-mono text-cyan-700 dark:text-cyan-300 min-h-[105px] break-words glow-cyan">
                {outputText || <span className="text-slate-400 dark:text-slate-600">{t('common.resultPlaceholder')}</span>}
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={() => setShowBrute(!showBrute)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-300 border border-red-200 dark:border-red-800/40 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
              <span>{showBrute ? t('caesar.bruteForceClose') : t('caesar.bruteForceOpen')}</span>
            </button>
            <button
              onClick={() => { setInputText('SALOM DUNYO'); setShift(3); }}
              className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t('caesar.reset')}</span>
            </button>
          </div>

          {/* Brute Force Table */}
          {showBrute && (
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-red-200 dark:border-red-900/50 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-red-600 dark:text-red-300 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-500 dark:text-red-400" />
                  {t('caesar.bruteTitle')}
                </h4>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{t('caesar.bruteVariants')}</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {t('caesar.bruteDesc')}
              </p>
              <div className="max-h-52 overflow-y-auto space-y-1 pr-1 font-mono text-xs">
                {bruteResults.map(item => (
                  <div 
                    key={item.shift}
                    className={`flex items-center justify-between p-1.5 rounded px-2.5 transition-colors ${
                      item.shift === shift 
                        ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40 font-bold' 
                        : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-slate-400 dark:text-slate-500 w-16">k = {item.shift}:</span>
                    <span className="truncate flex-1 text-left px-2">{item.text}</span>
                    {item.shift === shift && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-200 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300">
                        {t('caesar.currentKey')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Visual Disk / Cipher Wheel (1 col) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
          <h4 className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
            {t('caesar.disk')}
          </h4>

          {/* SVG Rotating Disk */}
          <div className="relative w-56 h-56 flex items-center justify-center">
            {/* Outer Ring (Static Plaintext) */}
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="112" cy="112" r="102" fill="none" stroke="#cbd5e1" strokeWidth="20" className="dark:stroke-slate-800" />
              {alphabet.map((char, i) => {
                const angle = (i / 26) * 2 * Math.PI;
                const x = 112 + 102 * Math.cos(angle);
                const y = 112 + 102 * Math.sin(angle);
                return (
                  <text
                    key={char}
                    x={x}
                    y={y}
                    fill="currentColor"
                    className="text-slate-600 dark:text-slate-400"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(90, ${x}, ${y})`}
                  >
                    {char}
                  </text>
                );
              })}
            </svg>

            {/* Inner Ring (Rotating Ciphertext) */}
            <div 
              className="absolute w-36 h-36 rounded-full flex items-center justify-center transition-transform duration-500 ease-out"
              style={{ transform: `rotate(${(shift / 26) * 360}deg)` }}
            >
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="62" fill="#f8fafc" stroke="#06b6d4" strokeWidth="18" strokeOpacity="0.4" className="dark:fill-slate-950" />
                {alphabet.map((char, i) => {
                  const angle = (i / 26) * 2 * Math.PI;
                  const x = 72 + 62 * Math.cos(angle);
                  const y = 72 + 62 * Math.sin(angle);
                  return (
                    <text
                      key={char}
                      x={x}
                      y={y}
                      fill="#22d3ee"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(90, ${x}, ${y})`}
                    >
                      {char}
                    </text>
                  );
                })}
              </svg>
            </div>

            {/* Center Hub */}
            <div className="absolute w-12 h-12 rounded-full bg-white dark:bg-slate-950 border border-cyan-400 dark:border-cyan-500/50 flex flex-col items-center justify-center glow-cyan">
              <span className="text-[10px] text-slate-500 dark:text-slate-400">k</span>
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 font-mono">{shift}</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs space-y-1">
            <div className="flex items-center justify-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-600" />
              <span>{t('caesar.outerRing')}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span>{t('caesar.innerRing').replace('{shift}', shift)}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
