import React, { useState } from 'react';
import { QUIZ_QUESTIONS, CTF_CHALLENGES } from '../../data/quizData';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Flag, 
  Unlock, 
  Lock, 
  Sparkles,
  Award
} from 'lucide-react';

export default function QuizArena() {
  const [subTab, setSubTab] = useState('quiz'); // 'quiz' | 'ctf'

  // Quiz state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  // CTF state
  const [ctfAnswers, setCtfAnswers] = useState({});
  const [ctfSolved, setCtfSolved] = useState({});
  const [showHints, setShowHints] = useState({});

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const isAnswered = selectedAnswers[currentQ.id] !== undefined;

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    const newAnswers = { ...selectedAnswers, [currentQ.id]: idx };
    setSelectedAnswers(newAnswers);

    if (idx === currentQ.answer) {
      // Little spark
    }
  };

  const nextQuestion = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
      // Trigger confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowResult(false);
  };

  const score = Object.keys(selectedAnswers).reduce((acc, qId) => {
    const q = QUIZ_QUESTIONS.find(x => x.id === parseInt(qId));
    return q && selectedAnswers[qId] === q.answer ? acc + 1 : acc;
  }, 0);

  // CTF tekshirish
  const handleCtfSubmit = (challenge) => {
    const userVal = (ctfAnswers[challenge.id] || '').trim().toUpperCase();
    const correctVal = challenge.solution.trim().toUpperCase();

    if (userVal === correctVal) {
      setCtfSolved({ ...ctfSolved, [challenge.id]: true });
      try {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      } catch (e) {}
    } else {
      alert("Noto'g'ri javob! Maslahatni (Hint) ochib qayta urinib ko'ring.");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white">Bilimni Sinash: Viktorina & Mini-CTF</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 font-mono">
              Talabalar Reytingi
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSubTab('quiz')}
              className={`px-3 py-1 text-xs rounded-lg font-semibold transition-all ${
                subTab === 'quiz' ? 'bg-yellow-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Test Savollari ({QUIZ_QUESTIONS.length})
            </button>
            <button
              onClick={() => setSubTab('ctf')}
              className={`px-3 py-1 text-xs rounded-lg font-semibold transition-all ${
                subTab === 'ctf' ? 'bg-yellow-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Mini-CTF Shifr Buzish ({CTF_CHALLENGES.length})
            </button>
          </div>
        </div>
      </div>

      {/* QUIZ TAB */}
      {subTab === 'quiz' && (
        <div className="max-w-3xl mx-auto space-y-6">
          
          {!showResult ? (
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
              
              {/* Progress Bar & Counter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-400">
                    Savol {currentIndex + 1} / {QUIZ_QUESTIONS.length}
                  </span>
                  <span className="text-yellow-400 font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-yellow-950 border border-yellow-800">
                    {currentQ.category}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                {currentQ.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentQ.id] === idx;
                  const isCorrect = idx === currentQ.answer;

                  let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900";
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-300 font-semibold";
                    } else if (isSelected) {
                      btnStyle = "bg-red-950/40 border-red-500 text-red-300";
                    } else {
                      btnStyle = "bg-slate-950 border-slate-900 text-slate-600 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next */}
              {isAnswered && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-yellow-400">Izoh: </strong>
                    {currentQ.explanation}
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={nextQuestion}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 hover:brightness-110 transition-all shadow-md"
                    >
                      <span>{currentIndex === QUIZ_QUESTIONS.length - 1 ? "Natijani ko'rish" : "Keyingi savol"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Quiz Score Card */
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-6 glow-cyan">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-yellow-400" />
              </div>

              <div>
                <h4 className="text-2xl font-extrabold text-white">
                  Sinov Muvaffaqiyatli Yakunlandi!
                </h4>
                <p className="text-sm text-slate-400 mt-1">
                  Kriptografiya asoslari bo'yicha yakuniy ko'rsatkichingiz
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 max-w-sm mx-auto space-y-2">
                <div className="text-4xl font-black font-mono text-yellow-400">
                  {score} / {QUIZ_QUESTIONS.length}
                </div>
                <div className="text-xs text-slate-400">
                  To'g'ri javoblar: {Math.round((score / QUIZ_QUESTIONS.length) * 100)}%
                </div>
                <div className="pt-2 text-sm font-bold text-emerald-400">
                  {score >= 10 ? "⭐ A'lo daraja (Kripto Mutaxassis)" : score >= 7 ? "👍 Yaxshi natija (Tadqiqotchi)" : "📚 Qoniqarli (Mavzularni qayta takrorlang)"}
                </div>
              </div>

              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Qaytadan topshirish</span>
              </button>
            </div>
          )}

        </div>
      )}

      {/* CTF MISSIONS TAB */}
      {subTab === 'ctf' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CTF_CHALLENGES.map((challenge) => {
            const isSolved = ctfSolved[challenge.id];
            const isHintOpen = showHints[challenge.id];

            return (
              <div
                key={challenge.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                  isSolved
                    ? 'bg-emerald-950/20 border-emerald-800/80 glow-emerald'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-yellow-400 flex items-center gap-1.5">
                      <Flag className="w-4 h-4" />
                      {challenge.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 font-mono">
                      {challenge.difficulty}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {challenge.story}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-cyan-300 break-words">
                    <span className="text-slate-500 text-[10px] block font-sans">Qo'lga kiritilgan shifrmatn:</span>
                    <strong>{challenge.ciphertext}</strong>
                  </div>

                  {/* Hint Toggle */}
                  <div>
                    <button
                      onClick={() => setShowHints({ ...showHints, [challenge.id]: !isHintOpen })}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium underline"
                    >
                      {isHintOpen ? "Maslahatni yopish" : "💡 Maslahat olish"}
                    </button>
                    {isHintOpen && (
                      <div className="mt-1.5 p-2 rounded bg-indigo-950/30 border border-indigo-900/50 text-[11px] text-indigo-300">
                        {challenge.hint}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="space-y-2 pt-2 border-t border-slate-800/60">
                  {isSolved ? (
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-700/60 text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Missiya Bajarildi! (Flag qabul qilindi)</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Topilgan javobni yozing..."
                        value={ctfAnswers[challenge.id] || ''}
                        onChange={(e) => setCtfAnswers({ ...ctfAnswers, [challenge.id]: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-yellow-500 uppercase"
                      />
                      <button
                        onClick={() => handleCtfSubmit(challenge)}
                        className="w-full py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-slate-950 text-xs font-bold transition-colors"
                      >
                        Shifrni ochish (Tekshirish)
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
