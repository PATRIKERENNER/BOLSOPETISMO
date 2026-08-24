import React, { useState } from 'react';
import { HISTORICAL_TIMELINE } from '../data/timelineData';
import { History, Calendar, FileText, Filter, CheckCircle } from 'lucide-react';

export const TimelineView: React.FC = () => {
  const [filterAffiliation, setFilterAffiliation] = useState<'Todos' | 'Bolsonarismo' | 'Petismo'>('Todos');

  const filteredTimeline = HISTORICAL_TIMELINE.filter((ev) => {
    if (filterAffiliation === 'Todos') return true;
    return ev.affiliationFocus === filterAffiliation || ev.affiliationFocus === 'Ambos';
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl mb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-xl shrink-0">
            <History className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white font-serif">
              Linha do Tempo dos Escândalos e Decisões Judiciais (2005 - 2026)
            </h2>
            <p className="text-xs text-slate-400">
              Cronologia fundamentada em dados públicos do Mensalão, Lava Jato, Rachadinhas, TSE e STF.
            </p>
          </div>
        </div>

        {/* Timeline Filter */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto overflow-x-auto scrollbar-none max-w-full">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5 shrink-0" />
          <button
            onClick={() => setFilterAffiliation('Todos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filterAffiliation === 'Todos'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilterAffiliation('Bolsonarismo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filterAffiliation === 'Bolsonarismo'
                ? 'bg-blue-600 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bolsonarismo
          </button>
          <button
            onClick={() => setFilterAffiliation('Petismo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filterAffiliation === 'Petismo'
                ? 'bg-red-600 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Petismo
          </button>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l-2 border-slate-800 ml-2 sm:ml-4 md:ml-32 space-y-6 sm:space-y-8 pr-1 sm:pr-2">
        {filteredTimeline.map((ev) => {
          const isBolsonaro = ev.affiliationFocus === 'Bolsonarismo';
          const isPetismo = ev.affiliationFocus === 'Petismo';

          return (
            <div key={ev.id} className="relative pl-5 sm:pl-6 md:pl-8 group">
              {/* Year Badge on Left for wider screens */}
              <div className="hidden md:flex absolute -left-32 top-0.5 items-center justify-end w-24 pr-4">
                <span className="text-sm font-extrabold text-amber-400 bg-amber-950/40 border border-amber-900/50 px-2.5 py-1 rounded-lg">
                  {ev.year}
                </span>
              </div>

              {/* Dot on Timeline */}
              <div
                className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-slate-900 shadow-sm transition-transform group-hover:scale-125 ${
                  isBolsonaro
                    ? 'bg-blue-500'
                    : isPetismo
                    ? 'bg-red-500'
                    : 'bg-amber-400'
                }`}
              />

              {/* Event Content Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 sm:p-4 shadow-md hover:border-slate-700 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="md:hidden text-xs font-bold text-amber-400 bg-amber-950/40 border border-amber-900/50 px-2 py-0.5 rounded">
                      {ev.year}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                        isBolsonaro
                          ? 'bg-blue-950 text-blue-300 border-blue-800'
                          : isPetismo
                          ? 'bg-red-950 text-red-300 border-red-800'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {ev.affiliationFocus}
                    </span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded font-medium">
                      {ev.category}
                    </span>
                  </div>

                  <span className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                    <FileText className="w-3 h-3 text-slate-500 shrink-0" />
                    {ev.officialSource}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5 sm:mb-2 font-serif">{ev.title}</h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">{ev.description}</p>

                {ev.valueImpact && (
                  <div className="inline-flex items-center space-x-1.5 text-[10px] sm:text-[11px] font-bold text-amber-300 bg-amber-950/30 border border-amber-900/40 px-2.5 py-1 rounded-md">
                    <CheckCircle className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>Valor Envolvido / Apurado: {ev.valueImpact}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
