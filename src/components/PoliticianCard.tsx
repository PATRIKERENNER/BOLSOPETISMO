import React from 'react';
import { Politician } from '../types';
import { Gavel, FileText, ArrowRightLeft, Crown, ShieldAlert, BookOpenCheck, DollarSign } from 'lucide-react';

interface PoliticianCardProps {
  politician: Politician;
  onViewDossier: (p: Politician) => void;
  onSelectForCompare: (p: Politician) => void;
}

export const PoliticianCard: React.FC<PoliticianCardProps> = ({
  politician,
  onViewDossier,
  onSelectForCompare,
}) => {
  const isBolsonaro = politician.affiliation === 'Bolsonarismo';

  // Extract Initials (e.g., "Luiz Inácio Lula da Silva" -> "LS")
  const getInitials = (name: string) => {
    const parts = name.split(' ').filter((p) => p.length > 2 && p !== 'dos' && p !== 'das' && p !== 'de' && p !== 'da');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Badge styles based on legal status
  const getLegalStatusBadge = (status: string) => {
    switch (status) {
      case 'Condenado (Definitivo / 2ª Instância)':
      case 'Inelegível pelo TSE':
        return 'bg-rose-950 text-rose-200 border-rose-800';
      case 'Processo Anulado / Prescrito':
        return 'bg-amber-950 text-amber-200 border-amber-800';
      case 'Sob Investigação / Réu':
        return 'bg-sky-950 text-sky-200 border-sky-800';
      case 'Absolvido / Arquivado':
        return 'bg-emerald-950 text-emerald-200 border-emerald-800';
      default:
        return 'bg-slate-800 text-slate-200 border-slate-700';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between group relative overflow-hidden">
      {/* Top Banner Highlight */}
      <div
        className={`absolute top-0 left-0 right-0 h-2 ${
          isBolsonaro ? 'bg-blue-600' : 'bg-red-600'
        }`}
      />

      <div>
        {/* Header with Emblem Avatar instead of photo */}
        <div className="flex items-start justify-between gap-3 mb-4 pt-1">
          <div className="flex items-center space-x-3.5">
            {/* Symbol / Initials Emblem Badge */}
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center font-black text-lg sm:text-xl shadow-inner border-2 shrink-0 ${
                isBolsonaro
                  ? 'bg-blue-950 text-blue-200 border-blue-700'
                  : 'bg-red-950 text-red-200 border-red-700'
              }`}
            >
              <span>{getInitials(politician.name)}</span>
              <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest">{politician.party}</span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <span
                  className={`text-xs font-black uppercase px-3 py-0.5 rounded-full border ${
                    isBolsonaro
                      ? 'bg-blue-950 text-blue-300 border-blue-800'
                      : 'bg-red-950 text-red-300 border-red-800'
                  }`}
                >
                  {politician.affiliation} ({politician.party})
                </span>
                {politician.isInPowerNow && (
                  <span className="flex items-center gap-1 text-xs font-black bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded-full">
                    <Crown className="w-3.5 h-3.5" />
                    No Poder
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-amber-400 transition-colors font-serif">
                {politician.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">{politician.currentRole}</p>
            </div>
          </div>
        </div>

        {/* Legal Status Tag */}
        <div className="mb-4">
          <span
            className={`inline-flex items-center gap-2 text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-xl border ${getLegalStatusBadge(
              politician.legalStatus
            )}`}
          >
            <Gavel className="w-4 h-4 shrink-0" />
            <span>Situação: {politician.legalStatus}</span>
          </span>
        </div>

        {/* Key Scandals */}
        <div className="mb-4">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            Processos e Casos Citados:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {politician.keyScandals.map((scandal, idx) => (
              <span
                key={idx}
                className="text-xs sm:text-sm font-semibold px-3 py-1 bg-slate-950 text-slate-200 border border-slate-800 rounded-xl"
              >
                {scandal}
              </span>
            ))}
          </div>
        </div>

        {/* Plain Language Box for Laypeople & Elderly */}
        <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-amber-500/30 mb-4 space-y-2">
          <div className="flex items-center space-x-2 text-xs sm:text-sm font-black text-amber-400 uppercase tracking-wide">
            <BookOpenCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
            <span>Em Linguagem Simples:</span>
          </div>
          <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans">
            {politician.plainLanguageExplanation}
          </p>
        </div>

        {/* Values involved if present */}
        {politician.estimatedValuesInvolved && (
          <div className="text-xs sm:text-sm text-amber-300 bg-amber-950/40 border border-amber-900/50 px-4 py-2.5 rounded-xl mb-4 flex items-center justify-between">
            <span className="font-semibold text-slate-400">Valores Citados:</span>
            <span className="font-bold">{politician.estimatedValuesInvolved}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-800 flex items-center space-x-2.5">
        <button
          onClick={() => onViewDossier(politician)}
          className="flex-1 min-h-[46px] bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-black py-2.5 px-4 rounded-xl border border-slate-700 flex items-center justify-center space-x-2 transition-all shadow-sm active:scale-95"
        >
          <FileText className="w-4 h-4 text-amber-400" />
          <span>Ver Dossiê Completo</span>
        </button>

        <button
          onClick={() => onSelectForCompare(politician)}
          title="Comparar lado a lado com outro político"
          className="min-h-[46px] bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 active:scale-95"
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Comparar</span>
        </button>
      </div>
    </div>
  );
};
