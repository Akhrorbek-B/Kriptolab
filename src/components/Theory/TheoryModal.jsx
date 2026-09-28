import React, { useState } from 'react';
import { THEORY_TOPICS } from '../../data/theoryData';
import { BookOpen, X, Search, ChevronRight, FileText, Download, Check } from 'lucide-react';

export default function TheoryModal({ isOpen, onClose }) {
  const [selectedTopicId, setSelectedTopicId] = useState(THEORY_TOPICS[0].id);
  const [search, setSearch] = useState('');
  const [copiedLab, setCopiedLab] = useState(false);

  if (!isOpen) return null;

  const filteredTopics = THEORY_TOPICS.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) || 
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  const activeTopic = THEORY_TOPICS.find(t => t.id === selectedTopicId) || THEORY_TOPICS[0];

  const copyLabTemplate = () => {
    const labTopic = THEORY_TOPICS.find(t => t.id === 'labguide');
    if (labTopic) {
      navigator.clipboard.writeText(labTopic.content);
      setCopiedLab(true);
      setTimeout(() => setCopiedLab(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-5xl h-[88vh] rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden glow-cyan">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Kriptografiya O'quv Darsligi va Laboratoriya Yo'riqnomasi
              </h3>
              <p className="text-[11px] text-slate-400">
                Oliy ta'lim dasturi asosida tuzilgan akademik qo'llanma
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyLabTemplate}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800 hover:bg-indigo-900 transition-colors"
            >
              {copiedLab ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5 text-indigo-400" />}
              <span>{copiedLab ? "Nusxalandi!" : "Lab Hisobot Namunasi"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Topics List Sidebar */}
          <div className="w-full md:w-80 border-r border-slate-800 bg-slate-950/40 p-4 flex flex-col space-y-3 overflow-y-auto">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Mavzularni qidirish..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5 flex-1 overflow-y-auto">
              {filteredTopics.map((topic) => {
                const isSelected = selectedTopicId === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`w-full p-3 rounded-xl text-left transition-all flex flex-col space-y-1 ${
                      isSelected
                        ? 'bg-indigo-600/20 border border-indigo-500/40 text-white shadow-sm'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold truncate pr-1">
                        {topic.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-900 text-indigo-400 font-mono shrink-0">
                        {topic.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {topic.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topic Detail Content */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-900/40 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">
                  {activeTopic.badge}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeTopic.title}
                </h2>
              </div>
            </div>

            {/* Markdown Rendered Content */}
            <div className="text-slate-300 text-xs sm:text-sm leading-relaxed space-y-4 font-sans whitespace-pre-line">
              {activeTopic.content}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
