import React, { Suspense, lazy, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseRoadmap from './components/Course/CourseRoadmap';
import ErrorBoundary from './components/ErrorBoundary';
import { useLanguage } from './context/LanguageContext';
import useHashRoute from './hooks/useHashRoute';
import {
  Lock, Binary, KeyRound, Fingerprint, SlidersHorizontal,
  ShieldCheck, Heart, Zap, Shield,
} from 'lucide-react';

// Bo'limlar faqat kerak bo'lganda yuklanadi (code-splitting) — birinchi ochilish tezlashadi.
const CoursePage = lazy(() => import('./components/Course/CoursePage'));
const CaesarCipher = lazy(() => import('./components/Classical/CaesarCipher'));
const VigenereCipher = lazy(() => import('./components/Classical/VigenereCipher'));
const AffineCipher = lazy(() => import('./components/Classical/AffineCipher'));
const PlayfairCipher = lazy(() => import('./components/Classical/PlayfairCipher'));
const RailFence = lazy(() => import('./components/Classical/RailFence'));
const EnigmaMini = lazy(() => import('./components/Classical/EnigmaMini'));
const AesVisualizer = lazy(() => import('./components/Modern/AesVisualizer'));
const CipherModes = lazy(() => import('./components/Modern/CipherModes'));
const RsaVisualizer = lazy(() => import('./components/Asymmetric/RsaVisualizer'));
const DiffieHellman = lazy(() => import('./components/Asymmetric/DiffieHellman'));
const EccConcept = lazy(() => import('./components/Asymmetric/EccConcept'));
const AvalancheVisualizer = lazy(() => import('./components/Hashing/AvalancheVisualizer'));
const DigitalSignature = lazy(() => import('./components/Hashing/DigitalSignature'));
const FrequencyTool = lazy(() => import('./components/Tools/FrequencyTool'));
const ConverterTool = lazy(() => import('./components/Tools/ConverterTool'));
const QuizArena = lazy(() => import('./components/Quiz/QuizArena'));
const CtfArena = lazy(() => import('./components/CTF/CtfArena'));
const TheoryModal = lazy(() => import('./components/Theory/TheoryModal'));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-24" role="status" aria-live="polite">
      <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-cyan-400 animate-spin" />
      <span className="sr-only">Yuklanmoqda…</span>
    </div>
  );
}

// Sub-tab pill component
function SubTabs({ tabs, active, onChange, color = 'cyan' }) {
  const colorMap = {
    amber: 'bg-amber-500 text-slate-950',
    cyan: 'bg-cyan-500 text-slate-950',
    purple: 'bg-purple-600 text-white',
    emerald: 'bg-emerald-500 text-slate-950',
    sky: 'bg-sky-500 text-slate-950',
  };
  
  return (
    <div className="flex flex-wrap gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800/80 backdrop-blur-sm">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-3.5 py-1.5 text-xs rounded-lg font-semibold transition-all duration-200 ${
            active === tab.id
              ? `${colorMap[color]} shadow-sm scale-[1.02]`
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// Section header component
function SectionHeader({ title, desc, icon: Icon, iconColor, accentColor, children }) {
  return (
    <div className="relative flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800/60">
      {/* Left accent line */}
      <div className={`absolute left-0 bottom-0 h-px w-24 ${accentColor}`} />
      
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${iconColor} flex items-center justify-center shadow-lg flex-shrink-0`}>
          <Icon className="w-4.5 h-4.5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-white leading-tight">{title}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
        </div>
      </div>

      {children}
    </div>
  );
}

export default function App() {
  const { t } = useLanguage();
  const [route, navigate] = useHashRoute();
  const [isTheoryOpen, setIsTheoryOpen] = useState(false);

  const activeTab = route.tab;
  const setActiveTab = (tab) => navigate(tab);
  const subOf = (tabs) => (tabs.some((x) => x.id === route.sub) ? route.sub : tabs[0].id);

  const classicalTabs = [
    { id: 'caesar', label: 'Sezar' },
    { id: 'vigenere', label: 'Vigenère' },
    { id: 'affine', label: 'Affin' },
    { id: 'playfair', label: 'Playfair' },
    { id: 'railfence', label: 'Rail Fence' },
    { id: 'enigma', label: 'Enigma' },
  ];

  const modernTabs = [
    { id: 'aes', label: 'AES Raundlari' },
    { id: 'modes', label: 'ECB vs CBC (Tux)' },
  ];

  const asymmetricTabs = [
    { id: 'rsa', label: 'RSA Kalkulyatori' },
    { id: 'dh', label: 'Diffie-Hellman' },
    { id: 'ecc', label: 'Elliptik (ECC)' },
  ];

  const hashingTabs = [
    { id: 'avalanche', label: "SHA-256 Ko'chki" },
    { id: 'signature', label: 'Raqamli Imzo' },
  ];

  const toolsTabs = [
    { id: 'frequency', label: 'Chastotaviy Tahlil' },
    { id: 'converter', label: 'Bin/Hex/Base64' },
  ];

  const classicalSubTab = subOf(classicalTabs);
  const modernSubTab = subOf(modernTabs);
  const asymmetricSubTab = subOf(asymmetricTabs);
  const hashingSubTab = subOf(hashingTabs);
  const toolsSubTab = subOf(toolsTabs);
  const knownTabs = ['home', 'course', 'classical', 'modern', 'asymmetric', 'hashing', 'tools', 'quiz', 'ctf'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenTheory={() => setIsTheoryOpen(true)} 
      />

      {/* Main Content */}
      <main id="main" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <ErrorBoundary resetKey={`${route.tab}/${route.sub}`}>
       <Suspense fallback={<SectionLoader />}>

        {/* Home */}
        {(activeTab === 'home' || !knownTabs.includes(activeTab)) && (
          <div className="space-y-16">
            <Hero
              setActiveTab={setActiveTab}
              onOpenTheory={() => setIsTheoryOpen(true)}
            />
            <CourseRoadmap navigate={navigate} />
          </div>
        )}

        {/* Course — 0 dan o'quv kursi */}
        {activeTab === 'course' && (
          <CoursePage lessonId={route.sub} navigate={navigate} />
        )}

        {/* Classical Ciphers */}
        {activeTab === 'classical' && (
          <div className="space-y-6 section-enter">
            <SectionHeader
              title={t('app.classical.title')}
              desc={t('app.classical.desc')}
              icon={Lock}
              iconColor="from-amber-500 to-orange-600"
              accentColor="bg-gradient-to-r from-amber-500 to-transparent"
            >
              <SubTabs
                tabs={classicalTabs}
                active={classicalSubTab}
                onChange={(sub) => navigate('classical', sub)}
                color="amber"
              />
            </SectionHeader>

            <Suspense fallback={<SectionLoader />}>
            {classicalSubTab === 'caesar' && <CaesarCipher />}
            {classicalSubTab === 'vigenere' && <VigenereCipher />}
            {classicalSubTab === 'affine' && <AffineCipher />}
            {classicalSubTab === 'playfair' && <PlayfairCipher />}
            {classicalSubTab === 'railfence' && <RailFence />}
            {classicalSubTab === 'enigma' && <EnigmaMini />}
            </Suspense>
          </div>
        )}

        {/* Modern AES */}
        {activeTab === 'modern' && (
          <div className="space-y-6 section-enter">
            <SectionHeader
              title={t('app.modern.title')}
              desc={t('app.modern.desc')}
              icon={Binary}
              iconColor="from-cyan-500 to-blue-600"
              accentColor="bg-gradient-to-r from-cyan-500 to-transparent"
            >
              <SubTabs
                tabs={modernTabs}
                active={modernSubTab}
                onChange={(sub) => navigate('modern', sub)}
                color="cyan"
              />
            </SectionHeader>

            <Suspense fallback={<SectionLoader />}>
            {modernSubTab === 'aes' && <AesVisualizer />}
            {modernSubTab === 'modes' && <CipherModes />}
            </Suspense>
          </div>
        )}

        {/* Asymmetric */}
        {activeTab === 'asymmetric' && (
          <div className="space-y-6 section-enter">
            <SectionHeader
              title={t('app.asymmetric.title')}
              desc={t('app.asymmetric.desc')}
              icon={KeyRound}
              iconColor="from-purple-500 to-pink-600"
              accentColor="bg-gradient-to-r from-purple-500 to-transparent"
            >
              <SubTabs
                tabs={asymmetricTabs}
                active={asymmetricSubTab}
                onChange={(sub) => navigate('asymmetric', sub)}
                color="purple"
              />
            </SectionHeader>

            <Suspense fallback={<SectionLoader />}>
            {asymmetricSubTab === 'rsa' && <RsaVisualizer />}
            {asymmetricSubTab === 'dh' && <DiffieHellman />}
            {asymmetricSubTab === 'ecc' && <EccConcept />}
            </Suspense>
          </div>
        )}

        {/* Hashing */}
        {activeTab === 'hashing' && (
          <div className="space-y-6 section-enter">
            <SectionHeader
              title={t('app.hashing.title')}
              desc={t('app.hashing.desc')}
              icon={Fingerprint}
              iconColor="from-emerald-500 to-teal-600"
              accentColor="bg-gradient-to-r from-emerald-500 to-transparent"
            >
              <SubTabs
                tabs={hashingTabs}
                active={hashingSubTab}
                onChange={(sub) => navigate('hashing', sub)}
                color="emerald"
              />
            </SectionHeader>

            <Suspense fallback={<SectionLoader />}>
            {hashingSubTab === 'avalanche' && <AvalancheVisualizer />}
            {hashingSubTab === 'signature' && <DigitalSignature />}
            </Suspense>
          </div>
        )}

        {/* Tools */}
        {activeTab === 'tools' && (
          <div className="space-y-6 section-enter">
            <SectionHeader
              title={t('app.tools.title')}
              desc={t('app.tools.desc')}
              icon={SlidersHorizontal}
              iconColor="from-sky-500 to-indigo-600"
              accentColor="bg-gradient-to-r from-sky-500 to-transparent"
            >
              <SubTabs
                tabs={toolsTabs}
                active={toolsSubTab}
                onChange={(sub) => navigate('tools', sub)}
                color="sky"
              />
            </SectionHeader>

            <Suspense fallback={<SectionLoader />}>
            {toolsSubTab === 'frequency' && <FrequencyTool />}
            {toolsSubTab === 'converter' && <ConverterTool />}
            </Suspense>
          </div>
        )}

        {/* Quiz */}
        {activeTab === 'quiz' && (
          <div className="section-enter">
            <QuizArena />
          </div>
        )}

        {/* CTF Challenge Zone */}
        {activeTab === 'ctf' && (
          <div className="section-enter">
            <CtfArena />
          </div>
        )}

       </Suspense>
       </ErrorBoundary>
      </main>

      {/* Theory Modal */}
      {isTheoryOpen && (
        <Suspense fallback={null}>
          <TheoryModal isOpen onClose={() => setIsTheoryOpen(false)} />
        </Suspense>
      )}

      {/* Premium Footer */}
      <footer className="relative mt-16 border-t border-slate-800/60 bg-slate-950 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-cyan-500/30 to-transparent pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                <span className="font-black text-lg bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  KriptoLab
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                {t('footer.title')}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Zap className="w-3 h-3 text-cyan-500" />
                <span>Oflayn ishlaydi · Ochiq manba</span>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Bo'limlar</h3>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { label: "O'quv kursi (0 dan)", tab: 'course' },
                  { label: 'Klassik Shifrlar', tab: 'classical' },
                  { label: 'Zamonaviy AES', tab: 'modern' },
                  { label: 'Asimmetrik (RSA)', tab: 'asymmetric' },
                  { label: 'Xesh & Imzo', tab: 'hashing' },
                  { label: 'Kripto Qurollar', tab: 'tools' },
                  { label: 'Viktorina', tab: 'quiz' },
                  { label: 'CTF Arena', tab: 'ctf' },
                ].map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => setActiveTab(item.tab)}
                    className="text-left text-xs text-slate-500 hover:text-cyan-400 transition-colors py-0.5"
                  >
                    → {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Haqida</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t('footer.desc')}
              </p>
              <div className="flex flex-wrap gap-2">
                {['AES-128', 'RSA', 'SHA-256', 'ECC', 'CTF'].map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="section-divider mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-cyan-600" />
              <span className="font-semibold text-slate-500">KriptoLab</span>
              <span>—</span>
              <span>Ta'lim maqsadlari uchun © {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
              <span>for education</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
