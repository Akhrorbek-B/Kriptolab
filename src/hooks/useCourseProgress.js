import { useCallback, useSyncExternalStore } from 'react';
import { ALL_LESSONS } from '../data/courseData';

/**
 * Kurs progressi brauzerning localStorage'ida saqlanadi.
 * useSyncExternalStore yordamida barcha komponentlar (Hero, Kurs, Navbar)
 * bir xil holatni ko'radi va boshqa tablarda ham sinxronlashadi.
 */
const KEY = 'kriptolab.course.v1';
const EMPTY = { completed: [], lastLesson: null };

let cache = null;
const listeners = new Set();

function read() {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : EMPTY;
    cache = {
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      lastLesson: typeof parsed.lastLesson === 'string' ? parsed.lastLesson : null,
    };
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private rejim — progress faqat seans davomida saqlanadi */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb) {
  listeners.add(cb);
  const onStorage = (e) => {
    if (e.key === KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', onStorage);
  };
}

export default function useCourseProgress() {
  const state = useSyncExternalStore(subscribe, read, () => EMPTY);

  const setCompleted = useCallback((id, done = true) => {
    const cur = read();
    const set = new Set(cur.completed);
    if (done) set.add(id);
    else set.delete(id);
    write({ ...cur, completed: [...set] });
  }, []);

  const visit = useCallback((id) => {
    const cur = read();
    if (cur.lastLesson !== id) write({ ...cur, lastLesson: id });
  }, []);

  const reset = useCallback(() => write(EMPTY), []);

  const completedSet = new Set(state.completed);
  const doneCount = ALL_LESSONS.filter((l) => completedSet.has(l.id)).length;
  const nextLesson = ALL_LESSONS.find((l) => !completedSet.has(l.id)) || null;

  return {
    completed: completedSet,
    lastLesson: state.lastLesson,
    doneCount,
    total: ALL_LESSONS.length,
    percent: Math.round((doneCount / ALL_LESSONS.length) * 100),
    nextLesson,
    setCompleted,
    visit,
    reset,
  };
}
