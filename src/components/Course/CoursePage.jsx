import React, { useCallback, useEffect, useState } from 'react';
import {
  GraduationCap, Clock, BookOpen, CheckCircle2, Circle, ChevronLeft, ChevronRight,
  Target, FlaskConical, ArrowRight, RotateCcw, ListChecks, PlayCircle, Layers, XCircle,
} from 'lucide-react';
import Markdown from '../Markdown';
import { COURSE_MODULES, ALL_LESSONS, TOTAL_MINUTES, findLesson } from '../../data/courseData';
import useCourseProgress from '../../hooks/useCourseProgress';
import { MODULE_COLORS } from './moduleColors';


function ProgressBar({ percent, className = '' }) {
  return (
    <div className={`h-2 w-full rounded-full bg-slate-800 overflow-hidden ${className}`} role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500" style={{ width: `${percent}%` }} />
    </div>
  );
}

/* ─────────────────────────────── Overview ─────────────────────────────── */

function CourseOverview({ navigate }) {
  const progress = useCourseProgress();
  const resumeId = progress.nextLesson?.id || ALL_LESSONS[0].id;
  const started = progress.doneCount > 0 || progress.lastLesson;

  return (
    <div className="space-y-10 section-enter">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/40 p-6 sm:p-10">
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_320px] items-center">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              <GraduationCap className="w-3.5 h-3.5" /> To'liq o'quv kursi · Bepul
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Kriptografiya <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">0 dan professional darajagacha</span>
            </h1>
            <p className="text-slate-400 max-w-2xl leading-relaxed">
              Hech qanday oldindan bilim talab qilinmaydi. Har bir dars oldingisiga tayanadi: nazariya, qo'lda yechilgan misollar,
              interaktiv laboratoriya va o'zini tekshirish savollari. Sezar shifridan TLS 1.3 va kvantdan keyingi kriptografiyagacha.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => navigate('course', started ? resumeId : ALL_LESSONS[0].id)}
                className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-all"
              >
                <PlayCircle className="w-4 h-4" />
                {started ? 'Davom ettirish' : 'Birinchi darsni boshlash'}
                <ArrowRight className="w-4 h-4" />
              </button>
              {progress.doneCount > 0 && (
                <button
                  onClick={() => { if (window.confirm('Barcha progress o\'chirilsinmi?')) progress.reset(); }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 border border-slate-700 hover:text-white hover:border-slate-500 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" /> Qaytadan boshlash
                </button>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 space-y-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { v: COURSE_MODULES.length, l: 'modul', icon: Layers },
                { v: ALL_LESSONS.length, l: 'dars', icon: BookOpen },
                { v: `${Math.round(TOTAL_MINUTES / 60)} soat`, l: "o'qish", icon: Clock },
              ].map(({ v, l, icon: Icon }) => (
                <div key={l} className="rounded-xl bg-slate-900 border border-slate-800 py-3">
                  <Icon className="w-4 h-4 mx-auto text-cyan-400 mb-1" />
                  <div className="text-lg font-black text-white">{v}</div>
                  <div className="text-[11px] text-slate-500">{l}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-400">Sizning progressingiz</span>
                <span className="font-bold text-cyan-300">{progress.doneCount}/{progress.total} · {progress.percent}%</span>
              </div>
              <ProgressBar percent={progress.percent} />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: BookOpen, t: 'Nazariya', d: "Sodda tilda, misollar va formulalar bilan" },
          { icon: Target, t: 'Aniq maqsadlar', d: "Har dars boshida nimani o'rganishingiz ko'rsatiladi" },
          { icon: FlaskConical, t: 'Laboratoriya', d: "Algoritmni simulyatorda o'z qo'lingiz bilan sinang" },
          { icon: ListChecks, t: "O'zini tekshirish", d: "Har dars oxirida izohli savollar" },
        ].map(({ icon: Icon, t, d }) => (
          <div key={t} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 flex gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{t}</div>
              <div className="text-xs text-slate-400 leading-relaxed">{d}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Modules */}
      <section className="space-y-5">
        <h2 className="text-xl font-extrabold text-white">O'quv dasturi</h2>
        <ol className="relative space-y-5">
          {COURSE_MODULES.map((mod, mi) => {
            const c = MODULE_COLORS[mod.color] || MODULE_COLORS.cyan;
            const done = mod.lessons.filter((l) => progress.completed.has(l.id)).length;
            const pct = Math.round((done / mod.lessons.length) * 100);
            const mins = mod.lessons.reduce((s, l) => s + l.minutes, 0);
            return (
              <li key={mod.id} className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
                <div className="p-5 flex flex-wrap items-start gap-4 border-b border-slate-800/70">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.ring} flex items-center justify-center text-white font-black shadow-lg flex-shrink-0`}>
                    {mi + 1}
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-white">{mod.title}</h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${c.soft} ${c.text}`}>{mod.level}</span>
                    </div>
                    <p className="text-sm text-slate-400 mt-1">{mod.summary}</p>
                    <div className="text-xs text-slate-500 mt-1">{mod.lessons.length} dars · ~{mins} daqiqa</div>
                  </div>
                  <div className="w-full sm:w-40">
                    <div className="text-right text-xs text-slate-400 mb-1">{done}/{mod.lessons.length}</div>
                    <ProgressBar percent={pct} />
                  </div>
                </div>
                <ul className="divide-y divide-slate-800/60">
                  {mod.lessons.map((l, li) => {
                    const isDone = progress.completed.has(l.id);
                    return (
                      <li key={l.id}>
                        <button
                          onClick={() => navigate('course', l.id)}
                          className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-slate-800/40 transition-colors group"
                        >
                          {isDone
                            ? <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            : <Circle className="w-4 h-4 text-slate-600 flex-shrink-0" />}
                          <span className="text-xs font-mono text-slate-500 w-8">{mi + 1}.{li + 1}</span>
                          <span className={`flex-1 text-sm ${isDone ? 'text-slate-400' : 'text-slate-200'} group-hover:text-white`}>{l.title}</span>
                          {l.practice && <FlaskConical className="w-3.5 h-3.5 text-slate-600" title="Laboratoriya bor" />}
                          <span className="text-xs text-slate-500 w-14 text-right">{l.minutes} daq</span>
                          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}

/* ─────────────────────────────── Lesson ─────────────────────────────── */

function LessonCheck({ questions, onAllCorrect }) {
  const [answers, setAnswers] = useState({});

  const correctCount = questions.filter((q, i) => answers[i] === q.answer).length;
  const allCorrect = correctCount === questions.length;

  useEffect(() => {
    if (allCorrect) onAllCorrect();
  }, [allCorrect, onAllCorrect]);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-bold text-white">
          <ListChecks className="w-5 h-5 text-cyan-400" /> O'zingizni tekshiring
        </h2>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${allCorrect ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
          {correctCount}/{questions.length} to'g'ri
        </span>
      </div>

      {questions.map((q, qi) => {
        const picked = answers[qi];
        const answered = picked !== undefined;
        const right = picked === q.answer;
        return (
          <div key={qi} className="space-y-3">
            <p className="text-sm font-semibold text-slate-100">{qi + 1}. {q.q}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {q.options.map((opt, oi) => {
                const isPicked = picked === oi;
                const reveal = answered && right && oi === q.answer;
                let cls = 'border-slate-700 bg-slate-950/50 hover:border-slate-500 text-slate-300';
                if (reveal) cls = 'border-emerald-500/60 bg-emerald-500/10 text-emerald-200';
                else if (isPicked && !right) cls = 'border-red-500/60 bg-red-500/10 text-red-200';
                return (
                  <button
                    key={oi}
                    disabled={answered && right}
                    onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                    className={`text-left text-sm px-3.5 py-2.5 rounded-xl border transition-colors disabled:cursor-default ${cls}`}
                  >
                    <span className="font-mono text-xs text-slate-500 mr-2">{String.fromCharCode(65 + oi)})</span>
                    {opt}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div className={`flex gap-2 text-sm rounded-xl px-3.5 py-2.5 ${right ? 'bg-emerald-500/5 text-emerald-200/90' : 'bg-red-500/5 text-red-200/90'}`}>
                {right ? <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" /> : <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                <span>{right ? q.explain : "Noto'g'ri. Matnni yana bir bor ko'rib chiqing va boshqa variantni tanlang."}</span>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}

function LessonSidebar({ currentId, navigate, completed }) {
  return (
    <nav aria-label="Kurs mundarijasi" className="space-y-4">
      {COURSE_MODULES.map((mod, mi) => {
        const c = MODULE_COLORS[mod.color] || MODULE_COLORS.cyan;
        return (
          <div key={mod.id}>
            <div className={`text-[11px] font-bold uppercase tracking-wider mb-1.5 ${c.text}`}>
              {mi + 1}. {mod.title}
            </div>
            <ul className="space-y-0.5">
              {mod.lessons.map((l) => {
                const active = l.id === currentId;
                const done = completed.has(l.id);
                return (
                  <li key={l.id}>
                    <button
                      onClick={() => navigate('course', l.id)}
                      aria-current={active ? 'page' : undefined}
                      className={`w-full flex items-start gap-2 text-left text-[13px] px-2.5 py-1.5 rounded-lg transition-colors ${
                        active ? 'bg-cyan-500/10 text-cyan-200' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      {done
                        ? <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-emerald-400 flex-shrink-0" />
                        : <Circle className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${active ? 'text-cyan-400' : 'text-slate-600'}`} />}
                      <span className="leading-snug">{l.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

function LessonView({ lessonId, navigate }) {
  const progress = useCourseProgress();
  const found = findLesson(lessonId);
  const { visit, setCompleted } = progress;

  const exists = Boolean(found);
  useEffect(() => {
    if (exists) visit(lessonId);
  }, [lessonId, exists, visit]);

  const markDone = useCallback(() => setCompleted(lessonId, true), [lessonId, setCompleted]);

  if (!found) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-slate-400">Bunday dars topilmadi.</p>
        <button onClick={() => navigate('course')} className="text-cyan-400 hover:underline">Kurs mundarijasiga qaytish</button>
      </div>
    );
  }

  const { lesson, index, prev, next } = found;
  const mod = COURSE_MODULES.find((m) => m.id === lesson.moduleId);
  const c = MODULE_COLORS[mod.color] || MODULE_COLORS.cyan;
  const isDone = progress.completed.has(lesson.id);

  return (
    <div className="grid gap-8 lg:grid-cols-[270px_minmax(0,1fr)] section-enter">
      {/* Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-32 max-h-[calc(100vh-9rem)] overflow-y-auto pr-2 no-scrollbar space-y-4">
          <button onClick={() => navigate('course')} className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-300">
            <ChevronLeft className="w-3.5 h-3.5" /> Kurs mundarijasi
          </button>
          <div>
            <div className="flex justify-between text-[11px] text-slate-500 mb-1.5">
              <span>Progress</span><span>{progress.percent}%</span>
            </div>
            <ProgressBar percent={progress.percent} />
          </div>
          <LessonSidebar currentId={lesson.id} navigate={navigate} completed={progress.completed} />
        </div>
      </aside>

      {/* Content */}
      <article className="min-w-0 max-w-3xl space-y-8">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button onClick={() => navigate('course')} className="text-slate-500 hover:text-cyan-300 lg:hidden">← Mundarija</button>
            <span className={`font-semibold px-2 py-0.5 rounded-full border ${c.soft} ${c.text}`}>{lesson.moduleTitle}</span>
            <span className="text-slate-500">Dars {index + 1} / {ALL_LESSONS.length}</span>
            <span className="flex items-center gap-1 text-slate-500"><Clock className="w-3 h-3" /> {lesson.minutes} daqiqa</span>
            <span className="text-slate-500">· {lesson.level}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{lesson.title}</h1>

          {lesson.goals?.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-white mb-2">
                <Target className="w-4 h-4 text-cyan-400" /> Dars oxirida siz:
              </div>
              <ul className="space-y-1.5">
                {lesson.goals.map((g) => (
                  <li key={g} className="flex gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-cyan-500/70 flex-shrink-0" /> {g}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </header>

        <Markdown source={lesson.content} />

        {lesson.practice && (
          <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-indigo-500/5 p-5 flex flex-wrap items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-cyan-300" />
            </div>
            <div className="flex-1 min-w-[180px]">
              <div className="text-sm font-bold text-white">Amaliyot</div>
              <div className="text-sm text-slate-400">{lesson.practice.label}</div>
            </div>
            <button
              onClick={() => navigate(lesson.practice.tab, lesson.practice.sub)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
            >
              Laboratoriyani ochish <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {lesson.check?.length > 0 && (
          <LessonCheck key={lesson.id} questions={lesson.check} onAllCorrect={markDone} />
        )}

        {/* Footer navigation */}
        <footer className="space-y-4 pt-2">
          <button
            onClick={() => setCompleted(lesson.id, !isDone)}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold border transition-colors ${
              isDone
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/15'
                : 'border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isDone ? "Dars o'zlashtirildi ✓" : "Darsni o'zlashtirildi deb belgilash"}
          </button>

          <div className="grid gap-3 sm:grid-cols-2">
            {prev ? (
              <button onClick={() => navigate('course', prev.id)} className="group text-left rounded-xl border border-slate-800 hover:border-slate-600 p-4 transition-colors">
                <div className="flex items-center gap-1 text-xs text-slate-500"><ChevronLeft className="w-3.5 h-3.5" /> Oldingi dars</div>
                <div className="text-sm font-semibold text-slate-200 group-hover:text-white mt-1">{prev.title}</div>
              </button>
            ) : <div />}
            {next ? (
              <button
                onClick={() => { if (!isDone) setCompleted(lesson.id, true); navigate('course', next.id); }}
                className="group text-right rounded-xl border border-cyan-500/30 bg-cyan-500/5 hover:border-cyan-400/60 p-4 transition-colors"
              >
                <div className="flex items-center justify-end gap-1 text-xs text-cyan-400">Keyingi dars <ChevronRight className="w-3.5 h-3.5" /></div>
                <div className="text-sm font-semibold text-slate-100 group-hover:text-white mt-1">{next.title}</div>
              </button>
            ) : (
              <button
                onClick={() => { setCompleted(lesson.id, true); navigate('quiz'); }}
                className="text-right rounded-xl border border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-400/60 p-4 transition-colors"
              >
                <div className="text-xs text-emerald-400">Kurs tugadi 🎓</div>
                <div className="text-sm font-semibold text-slate-100 mt-1">Yakuniy viktorinaga o'tish →</div>
              </button>
            )}
          </div>
        </footer>
      </article>
    </div>
  );
}

export default function CoursePage({ lessonId, navigate }) {
  return lessonId ? <LessonView lessonId={lessonId} navigate={navigate} /> : <CourseOverview navigate={navigate} />;
}
