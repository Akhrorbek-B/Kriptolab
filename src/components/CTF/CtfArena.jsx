import React, { useState, useMemo } from 'react';
import { CTF_CHALLENGES_DATA } from '../../data/ctfData';
import confetti from 'canvas-confetti';
import {
  Flag, CheckCircle2, HelpCircle, Lock, Unlock,
  Search, Filter, ChevronDown, ChevronUp, Terminal,
  BookOpen, Code, Trophy, Zap, Shield, Star,
  ArrowRight, RotateCcw, Send, Eye, EyeOff
} from 'lucide-react';

// ── Difficulty badge color map ─────────────────────────────────────────
const DIFF_STYLES = {
  'Oson':  'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  "O'rta": 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  'Qiyin': 'bg-red-500/10 text-red-400 border-red-500/30',
};

const TIER_ICON = { 1: BookOpen, 2: Terminal };
const TIER_LABEL = { 1: "Qog'oz / Manual", 2: "Kompyuter / Skript" };
const TIER_COLOR = {
  1: 'from-amber-500 to-orange-600',
  2: 'from-cyan-500 to-blue-600',
};

// ── Category badge colors ──────────────────────────────────────────────
const CAT_COLORS = {
  Caesar:              'bg-amber-500/10 text-amber-300',
  Affine:              'bg-orange-500/10 text-orange-300',
  Vigenere:            'bg-yellow-500/10 text-yellow-300',
  Playfair:            'bg-lime-500/10 text-lime-300',
  'Rail Fence':        'bg-green-500/10 text-green-300',
  Atbash:              'bg-teal-500/10 text-teal-300',
  AES:                 'bg-cyan-500/10 text-cyan-300',
  'Block Modes':       'bg-sky-500/10 text-sky-300',
  DES:                 'bg-blue-500/10 text-blue-300',
  RSA:                 'bg-purple-500/10 text-purple-300',
  'Diffie-Hellman':    'bg-violet-500/10 text-violet-300',
  Hash:                'bg-emerald-500/10 text-emerald-300',
  'Digital Signature': 'bg-pink-500/10 text-pink-300',
  HMAC:                'bg-rose-500/10 text-rose-300',
  PKI:                 'bg-fuchsia-500/10 text-fuchsia-300',
  Frequency:           'bg-indigo-500/10 text-indigo-300',
  History:             'bg-slate-500/10 text-slate-300',
  'Caesar Brute':      'bg-red-500/10 text-red-300',
  XOR:                 'bg-cyan-500/10 text-cyan-300',
  Base64:              'bg-blue-500/10 text-blue-300',
  Padding:             'bg-yellow-500/10 text-yellow-300',
  CyberChef:           'bg-emerald-500/10 text-emerald-300',
  Steganography:       'bg-violet-500/10 text-violet-300',
  Encoding:            'bg-teal-500/10 text-teal-300',
  Advanced:            'bg-red-500/10 text-red-300',
};


/**
 * Individual challenge card component
 */
function ChallengeCard({ challenge, solved, onSubmit }) {
  const [answer, setAnswer] = useState('');
  const [hintVisible, setHintVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const TierIcon = TIER_ICON[challenge.tier] || Flag;
  const diffStyle = DIFF_STYLES[challenge.difficulty] || DIFF_STYLES['Oson'];
  const catColor = CAT_COLORS[challenge.category] || 'bg-slate-500/10 text-slate-300';

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    setSubmitting(true);
    setFeedback(null);

    // Try server-side validation first, fall back to local comparison
    try {
      const response = await fetch('http://localhost:8000/api/v1/ctf/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challenge_id: challenge.id, flag: answer.trim() }),
      });
      if (response.ok) {
        const data = await response.json();
        setFeedback(data);
        if (data.valid) {
          onSubmit(challenge.id, true);
          try { confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } }); } catch {}
        }
        setSubmitting(false);
        return;
      }
    } catch {
      // Backend not running — that's okay for dev
    }

    // Fallback: Flag format validation (basic check)
    const isCorrectFormat = answer.trim().toUpperCase().startsWith('UZINFOSEC{');
    setFeedback({
      valid: false,
      message: isCorrectFormat
        ? '⚠️ Backend server is not running. Start the backend to validate flags.'
        : '❌ Invalid flag format. Flags should be: UZINFOSEC{...}',
      points: 0,
    });
    setSubmitting(false);
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        solved
          ? 'bg-emerald-950/20 border-emerald-700/50 glow-emerald-sm'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
      }`}
    >
      {/* Card header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-start gap-3 group"
      >
        {/* Icon */}
        <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${TIER_COLOR[challenge.tier]} shadow-md`}>
          {solved
            ? <CheckCircle2 className="w-4 h-4 text-white" />
            : <TierIcon className="w-4 h-4 text-white" />
          }
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-white truncate">
              #{challenge.id}. {challenge.title}
            </span>
            {solved && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                ✓ Solved
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-[10px] px-1.5 py-0.5 rounded border font-mono ${diffStyle}`}>
              {challenge.difficulty}
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${catColor}`}>
              {challenge.category}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400 font-mono font-bold">
              {challenge.points} pts
            </span>
          </div>
        </div>

        {/* Expand arrow */}
        <div className="flex-shrink-0 mt-1 text-slate-500 group-hover:text-slate-300 transition-colors">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-800/60 pt-3 animate-slide-up">
          {/* Description */}
          <p className="text-xs text-slate-300 leading-relaxed">
            {challenge.description}
          </p>

          {/* Hint toggle */}
          <div>
            <button
              onClick={() => setHintVisible(!hintVisible)}
              className="flex items-center gap-1.5 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              {hintVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {hintVisible ? "Maslahatni yopish" : "💡 Maslahat olish"}
            </button>
            {hintVisible && (
              <div className="mt-1.5 p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-900/50 text-[11px] text-indigo-300 leading-relaxed font-mono">
                {challenge.hint}
              </div>
            )}
          </div>

          {/* Submit area */}
          {solved ? (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-700/60 text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Missiya Bajarildi! Flag qabul qilindi.</span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="UZINFOSEC{your_flag_here}"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  className="flex-1 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 transition-colors"
                />
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !answer.trim()}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <Send className="w-3 h-3" />
                  {submitting ? '...' : 'Tekshirish'}
                </button>
              </div>
              {feedback && (
                <div className={`p-2.5 rounded-lg text-xs font-medium ${
                  feedback.valid
                    ? 'bg-emerald-950/40 border border-emerald-700/60 text-emerald-300'
                    : 'bg-red-950/40 border border-red-700/60 text-red-300'
                }`}>
                  {feedback.message}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


/**
 * Main CTF Arena — Dual-Tier Challenge Zone
 */
export default function CtfArena() {
  const [activeTier, setActiveTier] = useState(0); // 0 = all, 1 = tier 1, 2 = tier 2
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [solvedMap, setSolvedMap] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  // Derive categories
  const categories = useMemo(() => {
    const cats = new Set(CTF_CHALLENGES_DATA.map(c => c.category));
    return ['', ...Array.from(cats).sort()];
  }, []);

  // Filter challenges
  const filtered = useMemo(() => {
    return CTF_CHALLENGES_DATA.filter(ch => {
      if (activeTier && ch.tier !== activeTier) return false;
      if (categoryFilter && ch.category !== categoryFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          ch.title.toLowerCase().includes(q) ||
          ch.description.toLowerCase().includes(q) ||
          ch.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeTier, categoryFilter, searchQuery]);

  // Stats
  const totalSolved = Object.values(solvedMap).filter(Boolean).length;
  const totalPoints = CTF_CHALLENGES_DATA
    .filter(ch => solvedMap[ch.id])
    .reduce((sum, ch) => sum + ch.points, 0);
  const maxPoints = CTF_CHALLENGES_DATA.reduce((sum, ch) => sum + ch.points, 0);

  const handleSolve = (id, success) => {
    if (success) {
      setSolvedMap(prev => ({ ...prev, [id]: true }));
    }
  };

  const resetProgress = () => {
    if (window.confirm("Barcha natijalarni o'chirmoqchimisiz?")) {
      setSolvedMap({});
    }
  };

  return (
    <div className="space-y-6">

      {/* ── Header Panel ────────────────────────────────────────────── */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-red-600 flex items-center justify-center shadow-lg">
              <Flag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                CTF Challenge Zone
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/30 font-mono">
                  {CTF_CHALLENGES_DATA.length} Challenges
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Flag formati: <code className="text-cyan-400 font-mono">UZINFOSEC{'{'} ... {'}'}</code> — 
                Tier 1: Qog'ozda yechish • Tier 2: Skript yordamida
              </p>
            </div>
          </div>

          {/* Score display */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-slate-400">Yechilgan</div>
              <div className="text-lg font-black font-mono text-yellow-400">
                {totalSolved}<span className="text-slate-600">/{CTF_CHALLENGES_DATA.length}</span>
              </div>
            </div>
            <div className="w-px h-10 bg-slate-800" />
            <div className="text-right">
              <div className="text-xs text-slate-400">Ballar</div>
              <div className="text-lg font-black font-mono text-emerald-400">
                {totalPoints}<span className="text-slate-600">/{maxPoints}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 via-amber-500 to-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${(totalSolved / CTF_CHALLENGES_DATA.length) * 100}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-500 text-right font-mono">
            {Math.round((totalSolved / CTF_CHALLENGES_DATA.length) * 100)}% completed
          </div>
        </div>

        {/* Tier tabs + controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {[
              { val: 0, label: 'Hammasi',   icon: Shield },
              { val: 1, label: 'Tier 1 · Manual (30)', icon: BookOpen },
              { val: 2, label: 'Tier 2 · Script (30)', icon: Terminal },
            ].map(tab => (
              <button
                key={tab.val}
                onClick={() => setActiveTier(tab.val)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                  activeTier === tab.val
                    ? 'bg-yellow-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <tab.icon className="w-3 h-3" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
            >
              <Filter className="w-3 h-3" />
              Filtr
            </button>
            <button
              onClick={resetProgress}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] text-slate-500 hover:text-red-400 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>

        {/* Filter row */}
        {showFilters && (
          <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 animate-slide-up">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="Qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-xs text-white placeholder-slate-600 focus:outline-none"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/50"
            >
              <option value="">Barcha kategoriyalar</option>
              {categories.filter(Boolean).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* ── Challenge list ──────────────────────────────────────────── */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
            Hech qanday topshiriq topilmadi.
          </div>
        ) : (
          filtered.map(ch => (
            <ChallengeCard
              key={ch.id}
              challenge={ch}
              solved={!!solvedMap[ch.id]}
              onSubmit={handleSolve}
            />
          ))
        )}
      </div>

      {/* ── Completion card ─────────────────────────────────────────── */}
      {totalSolved === CTF_CHALLENGES_DATA.length && (
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-yellow-500/30 text-center space-y-4 glow-amber">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-yellow-400" />
          </div>
          <h4 className="text-2xl font-extrabold text-white">
            🎉 Barcha Topshiriqlar Bajarildi!
          </h4>
          <p className="text-sm text-slate-400">
            Siz {CTF_CHALLENGES_DATA.length} ta topshiriqni muvaffaqiyatli yechdingiz va <strong className="text-yellow-400">{maxPoints}</strong> ball to'pladingiz!
          </p>
        </div>
      )}
    </div>
  );
}
