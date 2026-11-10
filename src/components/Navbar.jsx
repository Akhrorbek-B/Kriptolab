import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, Lock, KeyRound, Binary, Fingerprint, 
  SlidersHorizontal, Trophy, BookOpen, Sparkles,
  Sun, Moon, Globe, Menu, X, ChevronDown,
  Flag, GraduationCap
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ activeTab, setActiveTab, onOpenTheory }) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close mobile on tab change
  useEffect(() => { setMobileOpen(false); }, [activeTab]);

  const navItems = [
    { id: 'home', label: t('nav.home'), icon: Sparkles, color: 'cyan' },
    { id: 'course', label: t('nav.course'), icon: GraduationCap, color: 'indigo' },
    { id: 'classical', label: t('nav.classical'), icon: Lock, color: 'amber' },
    { id: 'modern', label: t('nav.modern'), icon: Binary, color: 'cyan' },
    { id: 'asymmetric', label: t('nav.asymmetric'), icon: KeyRound, color: 'purple' },
    { id: 'hashing', label: t('nav.hashing'), icon: Fingerprint, color: 'emerald' },
    { id: 'tools', label: t('nav.tools'), icon: SlidersHorizontal, color: 'sky' },
    { id: 'quiz', label: t('nav.quiz'), icon: Trophy, color: 'yellow' },
    { id: 'ctf', label: 'CTF Arena', icon: Flag, color: 'red' },
  ];

  const colorMap = {
    cyan: { active: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-cyan-500/10', dot: 'bg-cyan-400', icon: 'text-cyan-400' },
    amber: { active: 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-amber-500/10', dot: 'bg-amber-400', icon: 'text-amber-400' },
    purple: { active: 'bg-purple-500/15 text-purple-300 border-purple-500/40 shadow-purple-500/10', dot: 'bg-purple-400', icon: 'text-purple-400' },
    emerald: { active: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10', dot: 'bg-emerald-400', icon: 'text-emerald-400' },
    sky: { active: 'bg-sky-500/15 text-sky-300 border-sky-500/40 shadow-sky-500/10', dot: 'bg-sky-400', icon: 'text-sky-400' },
    indigo: { active: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40 shadow-indigo-500/10', dot: 'bg-indigo-400', icon: 'text-indigo-400' },
    yellow: { active: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/40 shadow-yellow-500/10', dot: 'bg-yellow-400', icon: 'text-yellow-400' },
    red: { active: 'bg-red-500/15 text-red-300 border-red-500/40 shadow-red-500/10', dot: 'bg-red-400', icon: 'text-red-400' },
  };

  const langs = [
    { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  ];

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800/80 shadow-2xl shadow-black/20' 
          : 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50'
      }`}>
        {/* Top accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <button 
              id="navbar-logo"
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-3 group text-left transition-all flex-shrink-0"
            >
              {/* Logo mark */}
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-shadow duration-300">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <ShieldCheck className="w-4.5 h-4.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                {/* Animated ring */}
                <div className="absolute inset-0 rounded-xl border border-cyan-500/0 group-hover:border-cyan-500/30 group-hover:scale-110 transition-all duration-300" />
              </div>
              
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                    KriptoLab
                  </span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
                    EDU v2.0
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 leading-none mt-0.5">
                  {t('nav.subtitle')}
                </p>
              </div>
            </button>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              
              {/* Language Picker */}
              <div ref={langRef} className="relative">
                <button
                  id="navbar-lang-toggle"
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent hover:border-slate-700/50 transition-all"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline uppercase font-mono">{language}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {langOpen && (
                  <div className="absolute right-0 top-full mt-2 w-44 rounded-xl bg-slate-900 border border-slate-700/60 shadow-2xl shadow-black/30 overflow-hidden z-60 animate-slide-up">
                    <div className="p-1">
                      {langs.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            language === lang.code
                              ? 'bg-cyan-500/15 text-cyan-300'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                          }`}
                        >
                          <span className="text-base">{lang.flag}</span>
                          <span>{lang.label}</span>
                          {language === lang.code && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                id="navbar-theme-toggle"
                onClick={toggleTheme}
                className="relative p-2 rounded-xl border border-transparent hover:border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all group"
                title={theme === 'dark' ? 'Kun rejimiga o\'tish' : 'Tun rejimiga o\'tish'}
              >
                <div className="relative w-4 h-4 overflow-hidden">
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  ) : (
                    <Moon className="w-4 h-4 group-hover:-rotate-12 transition-transform" />
                  )}
                </div>
              </button>

              {/* Theory Button */}
              <button
                id="navbar-theory-btn"
                onClick={onOpenTheory}
                className="hidden sm:flex btn-primary items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600/80 to-purple-600/80 hover:from-indigo-500 hover:to-purple-500 text-white border border-indigo-500/30 transition-all shadow-sm shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-105"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t('nav.book')}</span>
              </button>

              {/* Mobile menu toggle */}
              <button
                id="navbar-mobile-toggle"
                aria-label="Menyu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Desktop/tablet section bar */}
          <nav aria-label="Asosiy bo'limlar" className="hidden lg:flex items-center gap-1 py-2 overflow-x-auto no-scrollbar border-t border-slate-800/50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const colors = colorMap[item.color];
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                    isActive
                      ? `${colors.active} border`
                      : 'text-slate-400 hover:bg-slate-800 border-transparent'
                  }`}
                >
                  <Icon className={`w-3 h-3 flex-shrink-0 ${isActive ? colors.icon : ''}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-72 z-50 bg-slate-950 border-l border-slate-800 shadow-2xl lg:hidden flex flex-col overflow-y-auto">
            {/* Drawer header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span className="font-bold text-white text-sm">KriptoLab</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex flex-col gap-1 p-3 flex-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const colors = colorMap[item.color];
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left border ${
                      isActive
                        ? `${colors.active} border`
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? colors.icon : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                    {isActive && <span className={`ml-auto w-2 h-2 rounded-full ${colors.dot}`} />}
                  </button>
                );
              })}
            </nav>

            {/* Drawer footer */}
            <div className="p-3 border-t border-slate-800 space-y-2">
              <button
                onClick={onOpenTheory}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>{t('nav.book')}</span>
              </button>
              
              <div className="flex gap-2">
                {langs.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                      language === lang.code
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    {lang.flag} {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
