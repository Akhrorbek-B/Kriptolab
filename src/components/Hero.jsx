import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, KeyRound, Fingerprint, SlidersHorizontal, Trophy,
  ArrowRight, GraduationCap, Zap, Shield, ChevronRight,
  Cpu, Globe2, Award, BookOpen, Sparkles,
  CheckCircle2, Code2, FlaskConical
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Animated counter hook
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = Date.now();
    const isString = typeof target === 'string';
    const numTarget = isString ? parseInt(target) : target;
    if (isNaN(numTarget)) { setCount(target); return; }
    
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * numTarget);
      setCount(current);
      if (progress >= 1) {
        setCount(target);
        clearInterval(timer);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, start]);
  return count;
}

// Matrix rain background component
function MatrixBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const chars = '01アイウエオカキクケコSALOMCRYPTOABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 12;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = new Array(cols).fill(1);
    
    const draw = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#06b6d4';
      ctx.font = `${fontSize}px 'Fira Code', monospace`;
      ctx.globalAlpha = 0.15;
      
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      ctx.globalAlpha = 1;
    };
    
    const interval = setInterval(draw, 60);
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
    />
  );
}

// Floating particle
function FloatingOrb({ color, size, top, left, delay = 0 }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none blur-3xl"
      style={{
        background: color,
        width: size,
        height: size,
        top, left,
        opacity: 0.15,
        animation: `float ${6 + delay}s ease-in-out infinite ${delay}s`,
      }}
    />
  );
}

export default function Hero({ setActiveTab, onOpenTheory }) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const count12 = useCounter(12, 1800, visible);
  const count100 = useCounter(100, 2000, visible);
  const count15 = useCounter(15, 1600, visible);

  const cards = [
    {
      id: 'classical',
      title: t('hero.card.classical.title'),
      subtitle: t('hero.card.classical.subtitle'),
      desc: t('hero.card.classical.desc'),
      icon: Lock,
      gradient: 'from-amber-500/15 via-orange-500/8 to-transparent',
      accentColor: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.3)',
      borderHover: 'hover:border-amber-500/60',
      iconBg: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400',
      badge: t('hero.card.classical.badge'),
      badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    },
    {
      id: 'modern',
      title: t('hero.card.modern.title'),
      subtitle: t('hero.card.modern.subtitle'),
      desc: t('hero.card.modern.desc'),
      icon: Cpu,
      gradient: 'from-cyan-500/15 via-sky-500/8 to-transparent',
      accentColor: '#06b6d4',
      glowColor: 'rgba(6, 182, 212, 0.3)',
      borderHover: 'hover:border-cyan-500/60',
      iconBg: 'from-cyan-500 to-blue-600',
      textColor: 'text-cyan-400',
      badge: t('hero.card.modern.badge'),
      badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    },
    {
      id: 'asymmetric',
      title: t('hero.card.asymmetric.title'),
      subtitle: t('hero.card.asymmetric.subtitle'),
      desc: t('hero.card.asymmetric.desc'),
      icon: KeyRound,
      gradient: 'from-purple-500/15 via-violet-500/8 to-transparent',
      accentColor: '#a855f7',
      glowColor: 'rgba(168, 85, 247, 0.3)',
      borderHover: 'hover:border-purple-500/60',
      iconBg: 'from-purple-500 to-pink-600',
      textColor: 'text-purple-400',
      badge: t('hero.card.asymmetric.badge'),
      badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    },
    {
      id: 'hashing',
      title: t('hero.card.hashing.title'),
      subtitle: t('hero.card.hashing.subtitle'),
      desc: t('hero.card.hashing.desc'),
      icon: Fingerprint,
      gradient: 'from-emerald-500/15 via-teal-500/8 to-transparent',
      accentColor: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.3)',
      borderHover: 'hover:border-emerald-500/60',
      iconBg: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-400',
      badge: t('hero.card.hashing.badge'),
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    },
    {
      id: 'tools',
      title: t('hero.card.tools.title'),
      subtitle: t('hero.card.tools.subtitle'),
      desc: t('hero.card.tools.desc'),
      icon: SlidersHorizontal,
      gradient: 'from-sky-500/15 via-indigo-500/8 to-transparent',
      accentColor: '#0ea5e9',
      glowColor: 'rgba(14, 165, 233, 0.3)',
      borderHover: 'hover:border-sky-500/60',
      iconBg: 'from-sky-500 to-indigo-600',
      textColor: 'text-sky-400',
      badge: t('hero.card.tools.badge'),
      badgeBg: 'bg-sky-500/10 border-sky-500/30 text-sky-400',
    },
    {
      id: 'quiz',
      title: t('hero.card.quiz.title'),
      subtitle: t('hero.card.quiz.subtitle'),
      desc: t('hero.card.quiz.desc'),
      icon: Trophy,
      gradient: 'from-yellow-500/15 via-amber-500/8 to-transparent',
      accentColor: '#eab308',
      glowColor: 'rgba(234, 179, 8, 0.3)',
      borderHover: 'hover:border-yellow-500/60',
      iconBg: 'from-yellow-500 to-orange-500',
      textColor: 'text-yellow-400',
      badge: t('hero.card.quiz.badge'),
      badgeBg: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    }
  ];

  const stats = [
    { value: `${count12}+`, label: t('hero.stat.simulators'), icon: FlaskConical, color: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
    { value: `${count100}%`, label: t('hero.stat.math'), icon: Code2, color: 'text-indigo-400', glow: 'shadow-indigo-500/20' },
    { value: `${count15}+`, label: t('hero.stat.tests'), icon: Award, color: 'text-purple-400', glow: 'shadow-purple-500/20' },
    { value: t('hero.stat.offlineVal'), label: t('hero.stat.offline'), icon: Globe2, color: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
  ];

  const features = [
    'Jonli interaktiv simulyatorlar',
    "Qadam-baqadam vizualizatsiya",
    'Matematik modellar',
    'Brute-force hujum demonstratsiyasi',
    'CTF va viktorina mashqlari',
    "3 tilda interfeys (UZ/EN/RU)",
  ];

  return (
    <div className="space-y-16 py-4">
      
      {/* ========== HERO SECTION ========== */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800/60 dark:border-slate-800/60 bg-slate-950 dark:bg-slate-950 min-h-[520px] flex flex-col justify-center">
        
        {/* Matrix background */}
        <MatrixBackground />
        
        {/* Floating orbs */}
        <FloatingOrb color="rgba(6,182,212,0.8)" size="400px" top="-10%" left="-10%" delay={0} />
        <FloatingOrb color="rgba(168,85,247,0.8)" size="350px" top="20%" left="60%" delay={2} />
        <FloatingOrb color="rgba(16,185,129,0.6)" size="250px" top="60%" left="10%" delay={4} />
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/60 to-slate-950 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(6,182,212,0.12),transparent)] pointer-events-none" />
        
        {/* Cyber grid overlay */}
        <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />

        {/* Content */}
        <div className={`relative z-10 px-8 sm:px-16 py-16 max-w-5xl mx-auto w-full text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-medium text-cyan-300 tracking-wide">{t('hero.badge')}</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6">
            <span className="block text-white/90 mb-2">{t('hero.title1')}</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent pb-2">
              {t('hero.title2')}
            </span>
            {t('hero.title3') && (
              <span className="block text-white/90">{t('hero.title3')}</span>
            )}
          </h1>

          {/* Description */}
          <p className="text-slate-300/80 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-10">
            {t('hero.desc')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <button
              id="hero-start-course-btn"
              onClick={() => setActiveTab('course')}
              className="btn-primary group relative flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{t('hero.startCourse')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-start-lab-btn"
              onClick={() => setActiveTab('classical')}
              className="group flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-sm border border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800/80 hover:border-cyan-500/50 text-slate-200 transition-all duration-300 hover:scale-105"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>{t('hero.startLab')}</span>
            </button>

            <button
              id="hero-theory-btn"
              onClick={onOpenTheory}
              className="group flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-sm border border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800/80 hover:border-indigo-500/50 text-slate-200 transition-all duration-300 hover:scale-105"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>{t('hero.textbook')}</span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="group relative p-4 rounded-2xl bg-white/3 backdrop-blur-sm border border-white/8 hover:border-cyan-500/30 transition-all duration-300 hover:bg-white/5"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon className={`w-5 h-5 ${stat.color} opacity-70`} />
                    <div className={`text-2xl sm:text-3xl font-black stat-value ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-400 text-center leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========== FEATURES STRIP ========== */}
      <div className="overflow-hidden">
        <div className="flex items-center gap-6 animate-marquee whitespace-nowrap" style={{animation: 'marquee 20s linear infinite'}}>
          {[...features, ...features].map((feat, i) => (
            <div key={i} className="flex items-center gap-2 flex-shrink-0 px-4 py-2 rounded-full bg-slate-900/60 border border-slate-800 text-xs font-medium text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ========== SECTION HEADING ========== */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-slate-900/80 border border-slate-700/60">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Laboratoriya Bo'limlari</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4">
            {t('hero.sections.title')}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {t('hero.sections.desc')}
          </p>
        </div>
      </div>

      {/* ========== CARDS GRID ========== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              id={`hero-card-${card.id}`}
              onClick={() => setActiveTab(card.id)}
              className={`group relative text-left p-6 rounded-2xl overflow-hidden border border-slate-800/80 ${card.borderHover} bg-gradient-to-br ${card.gradient} bg-slate-900/60 transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between min-h-[220px]`}
              style={{
                '--hover-shadow': card.glowColor,
                animationDelay: `${index * 80}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 25px 60px -10px ${card.glowColor}, 0 0 30px -8px ${card.glowColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '';
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Corner accent */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ background: `radial-gradient(circle, ${card.accentColor}, transparent)` }}
              />

              {/* Top row: icon + badge */}
              <div className="relative flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${card.badgeBg} font-mono tracking-wide`}>
                  {card.badge}
                </span>
              </div>

              {/* Text */}
              <div className="relative flex-1 space-y-2">
                <h3 className={`text-base font-bold text-white group-hover:${card.textColor.replace('text-', 'text-')} transition-colors`}>
                  {card.title}
                </h3>
                <p className={`text-xs font-semibold ${card.textColor} opacity-80`}>
                  {card.subtitle}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {/* Bottom CTA */}
              <div className="relative mt-5 pt-4 border-t border-white/8 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                  {t('hero.openLab')}
                </span>
                <div className={`w-7 h-7 rounded-lg bg-white/5 group-hover:bg-gradient-to-br group-hover:${card.iconBg} flex items-center justify-center transition-all duration-300`}>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ========== BOTTOM CTA BANNER ========== */}
      <div className="relative rounded-2xl overflow-hidden border border-indigo-500/20 p-8 sm:p-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-indigo-950/80" />
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20" style={{background: 'radial-gradient(circle, #7c3aed, transparent)'}} />
        
        <div className="relative z-10">
          <Shield className="w-10 h-10 text-indigo-400 mx-auto mb-4 animate-pulse-glow" />
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Kriptografiyani chuqurroq o'rganing
          </h3>
          <p className="text-slate-300/70 text-sm mb-6 max-w-lg mx-auto">
            Barcha ma'ruza materiallari, formulalar va algoritmlar tavsifi darslikda jamlangan
          </p>
          <button
            onClick={onOpenTheory}
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:scale-105"
          >
            <BookOpen className="w-4 h-4" />
            <span>Darslikni ochish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
