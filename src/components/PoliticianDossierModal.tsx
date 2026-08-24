import React from 'react';
import { Politician } from '../types';
import { X, Gavel, FileCheck, Shield, ExternalLink, Scale, CheckCircle2, BookOpenCheck } from 'lucide-react';

interface PoliticianDossierModalProps {
  politician: Politician | null;
  onClose: () => void;
}

export const PoliticianDossierModal: React.FC<PoliticianDossierModalProps> = ({
  politician,
  onClose,
}) => {
  if (!politician) return null;

  const isBolsonaro = politician.affiliation === 'Bolsonarismo';

  const getInitials = (name: string) => {
    const parts = name.split(' ').filter((p) => p.length > 2 && p !== 'dos' && p !== 'das' && p !== 'de' && p !== 'da');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar with Emblem Avatar */}
        <div className={`p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r ${
          isBolsonaro ? 'from-blue-950/70 to-slate-900' : 'from-red-950/70 to-slate-900'
        }`}>
          <div className="flex items-center space-x-4">
            {/* Initials Badge Avatar */}
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center font-black text-lg sm:text-xl shadow-inner border-2 shrink-0 ${
                isBolsonaro
                  ? 'bg-blue-950 text-blue-200 border-blue-700'
                  : 'bg-red-950 text-red-200 border-red-700'
              }`}
            >
              <span>{getInitials(politician.name)}</span>
              <span className="text-[9px] sm:text-[10px] font-bold opacity-80 uppercase tracking-widest">{politician.party}</span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span
                  className={`text-xs font-black uppercase px-3 py-0.5 rounded-full border ${
                    isBolsonaro
                      ? 'bg-blue-950 text-blue-300 border-blue-800'
                      : 'bg-red-950 text-red-300 border-red-800'
                  }`}
                >
                  {politician.affiliation} • {politician.party}
                </span>
                <span className="text-xs sm:text-sm text-slate-300 font-bold">{politician.powerStatus}</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white font-serif">{politician.fullName}</h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">{politician.currentRole}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-2.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all active:scale-95 shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-100 leading-relaxed font-sans">
          {/* Status summary banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 flex items-center space-x-3">
              <Gavel className="w-7 h-7 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs text-slate-400 uppercase font-black tracking-wider">Situação Judicial Oficial</div>
                <div className="font-extrabold text-white text-base sm:text-lg">{politician.legalStatus}</div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 flex items-center space-x-3">
              <Scale className="w-7 h-7 text-indigo-400 shrink-0" />
              <div>
                <div className="text-xs text-slate-400 uppercase font-black tracking-wider">Exercício de Poder Atual</div>
                <div className="font-extrabold text-white text-base sm:text-lg">{politician.powerStatus}</div>
              </div>
            </div>
          </div>

          {/* Plain Language Explanation Box (For Laypeople & Elderly) */}
          <div className="bg-slate-950 border-2 border-amber-500/40 p-5 sm:p-6 rounded-2xl space-y-2.5 shadow-md">
            <div className="flex items-center space-x-2 text-amber-400 font-black text-sm sm:text-base uppercase tracking-wide">
              <BookOpenCheck className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 shrink-0" />
              <span>Explicação em Linguagem Simples (Para Idosos e Leigos):</span>
            </div>
            <p className="text-base sm:text-lg text-slate-100 font-sans leading-relaxed">
              {politician.plainLanguageExplanation}
            </p>
          </div>

          {/* Detailed Summary */}
          <div>
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              Resumo Oficial do Histórico
            </h3>
            <p className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-slate-200 leading-relaxed text-sm sm:text-base font-sans">
              {politician.summary}
            </p>
          </div>

          {/* Judicial History Cases */}
          <div>
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
              <Gavel className="w-4 h-4" />
              Processos e Decisões Judiciais
            </h3>

            <div className="space-y-4">
              {politician.judicialHistory.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <span className="font-bold text-white text-base sm:text-lg">{caseItem.title}</span>
                    <span className="text-xs sm:text-sm font-black text-amber-300 bg-amber-950/80 border border-amber-800 px-3 py-1 rounded-xl self-start sm:self-auto">
                      {caseItem.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                    <div>
                      <strong className="text-amber-400 font-bold">Tribunal responsável:</strong> {caseItem.court}
                    </div>
                    {caseItem.processNumber && (
                      <div>
                        <strong className="text-amber-400 font-bold">Processo Nº:</strong> {caseItem.processNumber}
                      </div>
                    )}
                  </div>

                  <p className="text-slate-200 text-sm sm:text-base pt-1 leading-relaxed">{caseItem.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Defense Position */}
          <div>
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Argumentos da Defesa Jurídica
            </h3>
            <div className="bg-emerald-950/30 border border-emerald-900/50 p-5 rounded-2xl text-slate-200 leading-relaxed text-sm sm:text-base">
              {politician.defenseArgument}
            </div>
          </div>

          {/* Official Sources */}
          <div>
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Fontes de Dados Públicos Oficiais
            </h3>
            <ul className="space-y-2">
              {politician.publicDataSources.map((source, idx) => (
                <li key={idx} className="flex items-center text-slate-300 text-xs sm:text-sm space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{source}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="min-h-[44px] px-7 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-xl transition-all active:scale-95"
          >
            Fechar Dossiê
          </button>
        </div>
      </div>
    </div>
  );
};
