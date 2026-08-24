import React from 'react';
import { Politician } from '../types';
import { Scale, Gavel, RefreshCw, Crown, AlertOctagon } from 'lucide-react';

interface OverviewStatsProps {
  politicians: Politician[];
}

export const OverviewStats: React.FC<OverviewStatsProps> = ({ politicians }) => {
  const total = politicians.length;

  const inPower = politicians.filter((p) => p.isInPowerNow).length;
  const convictedOrIneligible = politicians.filter(
    (p) => p.legalStatus === 'Condenado (Definitivo / 2ª Instância)' || p.legalStatus === 'Inelegível pelo TSE'
  ).length;
  const annulledOrPrescribed = politicians.filter(
    (p) => p.legalStatus === 'Processo Anulado / Prescrito'
  ).length;
  const trending2026 = politicians.filter((p) => p.isTrendingFor2026).length;

  // Breakdown by side
  const bolsonaroCount = politicians.filter((p) => p.affiliation === 'Bolsonarismo').length;
  const petismoCount = politicians.filter((p) => p.affiliation === 'Petismo').length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-8">
      {/* Total Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-md hover:border-slate-700 transition-all col-span-2 sm:col-span-1">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-black uppercase tracking-wider">Políticos Mapeados</span>
          <div className="p-2 bg-slate-800 rounded-xl text-amber-400">
            <Scale className="w-5 h-5" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-black text-white mb-1">{total}</div>
        <div className="flex flex-wrap items-center text-xs font-bold text-slate-400 gap-2">
          <span className="text-blue-400">PL: {bolsonaroCount}</span>
          <span>•</span>
          <span className="text-red-400">PT: {petismoCount}</span>
        </div>
      </div>

      {/* In Power Now */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-md hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-black uppercase tracking-wider">No Poder Atual</span>
          <div className="p-2 bg-emerald-950/70 text-emerald-400 rounded-xl border border-emerald-800/40">
            <Crown className="w-5 h-5" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-1">{inPower}</div>
        <p className="text-xs text-slate-300 font-medium leading-tight">
          Mandato ativo em 2026
        </p>
      </div>

      {/* Convicted or Ineligible */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-md hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-black uppercase tracking-wider">Condenados / TSE</span>
          <div className="p-2 bg-rose-950/70 text-rose-400 rounded-xl border border-rose-800/40">
            <Gavel className="w-5 h-5" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-black text-rose-400 mb-1">{convictedOrIneligible}</div>
        <p className="text-xs text-slate-300 font-medium leading-tight">
          Decisões 2ª Instância/TSE
        </p>
      </div>

      {/* Annulled or Prescribed */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-md hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-black uppercase tracking-wider">Anulados / Prescritos</span>
          <div className="p-2 bg-amber-950/70 text-amber-400 rounded-xl border border-amber-800/40">
            <RefreshCw className="w-5 h-5" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">{annulledOrPrescribed}</div>
        <p className="text-xs text-slate-300 font-medium leading-tight">
          Por vício processual
        </p>
      </div>

      {/* Trending for 2026 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-md hover:border-slate-700 transition-all col-span-2 sm:col-span-1">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-black uppercase tracking-wider">Articuladores 2026</span>
          <div className="p-2 bg-indigo-950/70 text-indigo-400 rounded-xl border border-indigo-800/40">
            <AlertOctagon className="w-5 h-5" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-black text-indigo-300 mb-1">{trending2026}</div>
        <p className="text-xs text-slate-300 font-medium leading-tight">
          Atuando em campanhas
        </p>
      </div>
    </div>
  );
};
