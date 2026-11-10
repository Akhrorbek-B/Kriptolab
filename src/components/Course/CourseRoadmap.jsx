import React from 'react';
import { GraduationCap, ArrowRight, CheckCircle2, PlayCircle } from 'lucide-react';
import { COURSE_MODULES, ALL_LESSONS, TOTAL_MINUTES } from '../../data/courseData';
import useCourseProgress from '../../hooks/useCourseProgress';
import { MODULE_COLORS } from './moduleColors';

/** Bosh sahifadagi "O'quv yo'li" bloki: modullar ketma-ketligi va progress. */
export default function CourseRoadmap({ navigate }) {
  const progress = useCourseProgress();
  const next = progress.nextLesson;
  const started = progress.doneCount > 0;

  return (
    <section className="relative rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 space-y-6 overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
      <div className="relative flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300">
            <GraduationCap className="w-4 h-4" /> O'quv yo'li
          </span>
          <h2 className="text-2xl font-extrabold text-white">Kriptografiyani 0 dan bosqichma-bosqich o'rganing</h2>
          <p className="text-sm text-slate-400 max-w-2xl">
            {COURSE_MODULES.length} modul, {ALL_LESSONS.length} dars, ~{Math.round(TOTAL_MINUTES / 60)} soat. Har bir dars nazariya,
            qo'lda yechilgan misol, laboratoriya va o'zini tekshirish savollaridan iborat.
          </p>
        </div>
        <button
          onClick={() => navigate('course', started && next ? next.id : null)}
          className="btn-primary flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-all"
        >
          <PlayCircle className="w-4 h-4" />
          {started ? `Davom ettirish (${progress.percent}%)` : "Kursni boshlash"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <ol className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {COURSE_MODULES.map((mod, i) => {
          const c = MODULE_COLORS[mod.color] || MODULE_COLORS.cyan;
          const done = mod.lessons.filter((l) => progress.completed.has(l.id)).length;
          const complete = done === mod.lessons.length;
          return (
            <li key={mod.id}>
              <button
                onClick={() => navigate('course', mod.lessons[0].id)}
                className="group w-full h-full text-left rounded-2xl border border-slate-800 bg-slate-950/60 hover:border-slate-600 p-4 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className={`w-7 h-7 rounded-lg bg-gradient-to-br ${c.ring} text-white text-xs font-black flex items-center justify-center`}>
                    {i + 1}
                  </span>
                  {complete
                    ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    : <span className="text-[10px] text-slate-500">{done}/{mod.lessons.length}</span>}
                </div>
                <div className="text-sm font-bold text-slate-100 group-hover:text-white leading-snug">{mod.title}</div>
                <div className={`text-[10px] font-semibold ${c.text}`}>{mod.level}</div>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
