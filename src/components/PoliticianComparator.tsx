import React, { useState } from 'react';
import { Politician } from '../types';
import { GitCompare, Scale, Gavel, Crown, ShieldAlert, FileText, CheckCircle2, BookOpenCheck } from 'lucide-react';

interface PoliticianComparatorProps {
  politicians: Politician[];
  initialSelectA?: Politician;
  initialSelectB?: Politician;
}

export const PoliticianComparator: React.FC<PoliticianComparatorProps> = ({
  politicians,
  initialSelectA,
  initialSelectB,
}) => {
  const [selectedAId, setSelectedAId] = useState<string>(
    initialSelectA?.id || politicians[0]?.id || ''
  );
  const [selectedBId, setSelectedBId] = useState<string>(
    initialSelectB?.id || politicians[1]?.id || ''
  );

  const polA = politicians.find((p) => p.id === selectedAId) || politicians[0];
  const polB = politicians.find((p) => p.id === selectedBId) || politicians[1];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl mb-10">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-800">
        <div className="p-2.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-xl shrink-0">
          <GitCompare className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white font-serif">
            Comparador Judicial e de Poder Lado a Lado
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Selecione dois políticos para comparar os dados de condenações, mandatos, anulações e explicações em linguagem simples.
          </p>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Selector A */}
        <div className="bg-slate-950/60 p-3.5 sm:p-4 rounded-xl border border-slate-800">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Político A:
          </label>
          <select
            value={selectedAId}
            onChange={(e) => setSelectedAId(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm font-bold rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500"
          >
            {politicians.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.party} - {p.affiliation})
              </option>
            ))}
          </select>
        </div>

        {/* Selector B */}
        <div className="bg-slate-950/60 p-3.5 sm:p-4 rounded-xl border border-slate-800">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Político B:
          </label>
          <select
            value={selectedBId}
            onChange={(e) => setSelectedBId(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm font-bold rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500"
          >
            {politicians.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.party} - {p.affiliation})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-side Matrix */}
      {polA && polB && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Column A */}
          <ComparisonCard politician={polA} isLeft={true} />

          {/* Column B */}
          <ComparisonCard politician={polB} isLeft={false} />
        </div>
      )}
    </div>
  );
};

interface ComparisonCardProps {
  politician: Politician;
  isLeft: boolean;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ politician }) => {
  const isBolsonaro = politician.affiliation === 'Bolsonarismo';

  const getInitials = (name: string) => {
    const parts = name.split(' ').filter((p) => p.length > 2 && p !== 'dos' && p !== 'das' && p !== 'de' && p !== 'da');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-5 relative overflow-hidden">
      <div
        className={`absolute top-0 left-0 right-0 h-2 ${
          isBolsonaro ? 'bg-blue-600' : 'bg-red-600'
        }`}
      />

      <div className="space-y-4 pt-1">
        {/* Profile Header with Initials Emblem instead of photo */}
        <div className="flex items-center space-x-3.5">
          <div
            className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-extrabold text-lg shadow-inner border-2 shrink-0 ${
              isBolsonaro
                ? 'bg-blue-950 text-blue-200 border-blue-700'
                : 'bg-red-950 text-red-200 border-red-700'
            }`}
          >
            <span>{getInitials(politician.name)}</span>
            <span className="text-[9px] font-bold opacity-80 uppercase tracking-widest">{politician.party}</span>
          </div>

          <div>
            <span
              className={`text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                isBolsonaro
                  ? 'bg-blue-950 text-blue-300 border-blue-800'
                  : 'bg-red-950 text-red-300 border-red-800'
              }`}
            >
              {politician.affiliation} ({politician.party})
            </span>
            <h3 className="text-lg font-bold text-white mt-1 font-serif">{politician.name}</h3>
            <p className="text-xs text-slate-300">{politician.currentRole}</p>
          </div>
        </div>

        {/* Legal Status */}
        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1">
            <Gavel className="w-4 h-4 text-amber-400" /> Situação Judicial Oficial
          </span>
          <div className="text-sm font-bold text-amber-300">{politician.legalStatus}</div>
        </div>

        {/* Plain Language Explanation */}
        <div className="bg-slate-900 p-4 rounded-xl border border-amber-500/20 space-y-1.5">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-400 uppercase tracking-wide">
            <BookOpenCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Resumo em Linguagem Simples:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            {politician.plainLanguageExplanation}
          </p>
        </div>

        {/* Power Status */}
        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1">
            <Crown className="w-4 h-4 text-emerald-400" /> Exercício do Poder
          </span>
          <div className="text-xs sm:text-sm font-bold text-slate-200">
            {politician.isInPowerNow ? 'Sim - Em Exercício de Mandato/Governo' : 'Não - Fora do Poder Direto'}
          </div>
          <div className="text-xs text-slate-400">{politician.powerStatus}</div>
        </div>

        {/* Key Scandals */}
        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
          <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1">
            <ShieldAlert className="w-4 h-4 text-rose-400" /> Operações / Escândalos Citados
          </span>
          <div className="flex flex-wrap gap-1.5">
            {politician.keyScandals.map((s, idx) => (
              <span key={idx} className="text-xs bg-slate-950 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800 font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Defense Position */}
        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1">
            <Scale className="w-4 h-4 text-indigo-400" /> Tese Principal de Defesa
          </span>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{politician.defenseArgument}</p>
        </div>

        {/* Process Count */}
        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2">
          <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1">
            <FileText className="w-4 h-4 text-amber-400" /> Processos Registrados ({politician.judicialHistory.length})
          </span>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200">
            {politician.judicialHistory.map((c) => (
              <li key={c.id} className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">{c.title}:</strong> {c.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

