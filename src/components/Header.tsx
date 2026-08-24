import React from 'react';
import {
  Scale,
  Users,
  GitCompare,
  History,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Handshake,
  Flame,
  Rocket,
} from 'lucide-react';

export type ActiveTab = 'whyNotVote' | 'bolsopetismo' | 'dossiers' | 'comparator' | 'timeline' | 'impact' | 'ai';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  totalPoliticiansCount: number;
  onOpenGlossary?: () => void;
  onOpenVercelGuide?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  totalPoliticiansCount,
  onOpenGlossary,
  onOpenVercelGuide,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-40 shadow-2xl">
      {/* Top Banner / Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-3 sm:gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-xl shadow-amber-900/40 text-slate-950 flex items-center justify-center shrink-0">
              <Scale className="w-7 h-7 sm:w-8 sm:h-8 text-slate-950 font-black" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-serif">
                  Observatório Político Judicial
                </h1>
                <span className="px-2.5 py-1 text-xs font-black bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Dados Oficiais Transparentes
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-snug font-sans">
                Base factual com letras grandes e linguagem simples para idosos, adultos e leigos.
              </p>
            </div>
          </div>

          {/* Action Buttons Top Right */}
          <div className="flex flex-wrap items-center gap-2.5 justify-between sm:justify-start w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/80">
            {onOpenVercelGuide && (
              <button
                onClick={onOpenVercelGuide}
                className="flex items-center space-x-1.5 min-h-[42px] text-xs sm:text-sm font-extrabold text-indigo-300 bg-indigo-950/70 hover:bg-indigo-900/90 px-3.5 py-2 rounded-xl border border-indigo-700/60 transition-all shadow-sm active:scale-95"
              >
                <Rocket className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Deploy Vercel</span>
              </button>
            )}

            {onOpenGlossary && (
              <button
                onClick={onOpenGlossary}
                className="flex items-center space-x-1.5 min-h-[42px] text-xs sm:text-sm font-extrabold text-amber-300 bg-amber-950/70 hover:bg-amber-900/90 px-3.5 py-2 rounded-xl border border-amber-800 transition-all shadow-sm active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Guia para Idosos</span>
              </button>
            )}

            <div className="flex items-center space-x-2 min-h-[42px] text-xs sm:text-sm bg-slate-800/90 px-3.5 py-2 rounded-xl border border-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span className="text-slate-200 font-bold">
                <strong className="text-white">{totalPoliticiansCount}</strong> Políticos
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs with Large Touch Friendly Buttons */}
        <nav className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-3.5 pt-1.5 border-t border-slate-800 scrollbar-none touch-pan-x snap-x scroll-smooth">
          {/* TAB: WHY NOT VOTE (PRIMARY HIGHLIGHT) */}
          <button
            onClick={() => setActiveTab('whyNotVote')}
            className={`snap-start flex items-center space-x-2 min-h-[46px] px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all border shrink-0 ${
              activeTab === 'whyNotVote'
                ? 'bg-rose-600 text-white border-rose-400 shadow-xl shadow-rose-950/60 font-black'
                : 'text-rose-300 hover:text-white hover:bg-rose-950/50 border-rose-900/40'
            }`}
          >
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 shrink-0 animate-pulse" />
            <span>Por Que NÃO Votar (PT & Bolsonarismo)</span>
          </button>

          {/* TAB: BOLSOPETISMO JOINT VOTES */}
          <button
            onClick={() => setActiveTab('bolsopetismo')}
            className={`snap-start flex items-center space-x-2 min-h-[46px] px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all border shrink-0 ${
              activeTab === 'bolsopetismo'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 font-black'
                : 'text-amber-300 hover:text-white hover:bg-amber-950/40 border-amber-900/40'
            }`}
          >
            <Handshake className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
            <span>Votações Conjuntas (PT + PL)</span>
          </button>

          {/* TAB: DOSSIERS */}
          <button
            onClick={() => setActiveTab('dossiers')}
            className={`snap-start flex items-center space-x-2 min-h-[46px] px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all border shrink-0 ${
              activeTab === 'dossiers'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
            }`}
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span>Dossiês e Condenações</span>
          </button>

          {/* TAB: COMPARATOR */}
          <button
            onClick={() => setActiveTab('comparator')}
            className={`snap-start flex items-center space-x-2 min-h-[46px] px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all border shrink-0 ${
              activeTab === 'comparator'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
            }`}
          >
            <GitCompare className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span>Comparador Lado a Lado</span>
          </button>

          {/* TAB: TIMELINE */}
          <button
            onClick={() => setActiveTab('timeline')}
            className={`snap-start flex items-center space-x-2 min-h-[46px] px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all border shrink-0 ${
              activeTab === 'timeline'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
            }`}
          >
            <History className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span>Linha do Tempo (2005-2026)</span>
          </button>

          {/* TAB: SYSTEMIC IMPACT */}
          <button
            onClick={() => setActiveTab('impact')}
            className={`snap-start flex items-center space-x-2 min-h-[46px] px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all border shrink-0 ${
              activeTab === 'impact'
                ? 'bg-rose-500 text-white border-rose-400 shadow-md font-black'
                : 'text-rose-300 hover:text-white hover:bg-rose-950/40 border-rose-900/30'
            }`}
          >
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400 shrink-0" />
            <span>O Custo Eleitoral</span>
          </button>

          {/* TAB: AI QUERY */}
          <button
            onClick={() => setActiveTab('ai')}
            className={`snap-start flex items-center space-x-2 min-h-[46px] px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all border shrink-0 ${
              activeTab === 'ai'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md font-black'
                : 'text-indigo-300 hover:text-white hover:bg-indigo-950/40 border-indigo-900/30'
            }`}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 shrink-0" />
            <span>Consulta IA aos Dados</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
