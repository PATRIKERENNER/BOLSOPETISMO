import React from 'react';
import { SYSTEMIC_IMPACT_DATA, FICHA_LIMPA_EXPLANATION } from '../data/systemicImpactData';
import { AlertTriangle, TrendingDown, DollarSign, ShieldAlert, BookOpen, Scale, CheckCircle2 } from 'lucide-react';

export const SystemicImpactSection: React.FC = () => {
  return (
    <div className="space-y-8 mb-12">
      {/* Hero Banner for Section */}
      <div className="bg-gradient-to-br from-rose-950/80 via-slate-900 to-slate-950 border border-rose-900/50 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-2xl shrink-0">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-rose-950 text-rose-300 border border-rose-800 rounded-full">
              Análise Concreta com Dados Públicos
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-2 font-serif">
              O Custo Sistêmico da Reeleição de Políticos Envolvidos em Corrupção
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Com base em dados do Tribunal de Contas da União (TCU), Controladoria-Geral da União (CGU), Transparência Internacional e Supremo Tribunal Federal (STF), entenda por que perpetuar réus ou condenados no poder gera prejuízos econômicos e institucionais diretos ao cidadão.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SYSTEMIC_IMPACT_DATA.map((pillar) => (
          <div
            key={pillar.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Metric Card */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase text-slate-400">{pillar.subtitle}</span>
                <span className="text-xl font-extrabold text-rose-400 bg-rose-950/60 border border-rose-900/50 px-3 py-1 rounded-xl">
                  {pillar.metric}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1 font-serif">{pillar.title}</h3>
              <p className="text-[11px] font-semibold text-amber-400 mb-3">{pillar.metricLabel}</p>

              <p className="text-xs text-slate-300 leading-relaxed mb-4 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                {pillar.description}
              </p>

              {/* Consequences list */}
              <div className="space-y-2 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Consequências Práticas Registradas:
                </span>
                <ul className="space-y-1.5">
                  {pillar.consequences.map((c, idx) => (
                    <li key={idx} className="flex items-start text-xs text-slate-300 space-x-2">
                      <TrendingDown className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center space-x-1">
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>
                <strong>Fonte Oficial:</strong> {pillar.source}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Ficha Limpa Context Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-xl">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-serif">{FICHA_LIMPA_EXPLANATION.title}</h3>
            <p className="text-xs text-slate-400">{FICHA_LIMPA_EXPLANATION.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {FICHA_LIMPA_EXPLANATION.points.map((point, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
