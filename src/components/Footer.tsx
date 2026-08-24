import React from 'react';
import { Scale, ShieldCheck, ExternalLink, Rocket } from 'lucide-react';

interface FooterProps {
  onOpenVercelGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenVercelGuide }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-2xl">
              <Scale className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold text-white font-serif block">
                Observatório Político Judicial
              </span>
              <p className="text-xs sm:text-sm text-slate-400">
                Iniciativa independente de transparência pública, cidadania ativa e rigor documental.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onOpenVercelGuide && (
              <button
                onClick={onOpenVercelGuide}
                className="flex items-center space-x-2 text-xs sm:text-sm font-bold bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/60 px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
              >
                <Rocket className="w-4 h-4 text-indigo-400" />
                <span>Como Fazer Deploy na Vercel</span>
              </button>
            )}

            <div className="flex items-center space-x-2 text-xs sm:text-sm bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Dados Oficiais: STF, TSE, TCU, MPF e CGU</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-2 text-sm sm:text-base">
              Metodologia e Rigor Documental
            </h4>
            <p className="text-slate-400">
              Todos os registros expostos são extraídos exclusivamente de autos públicos de inquéritos, ações penais, decisões do Plenário do STF, acordos de colaboração premiada e votações nominais do Congresso.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-2 text-sm sm:text-base">
              Portais Oficiais para Consulta
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a href="https://portal.stf.jus.br" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5" /> STF - Supremo Tribunal Federal
                </a>
              </li>
              <li>
                <a href="https://www.tse.jus.br" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5" /> TSE - Tribunal Superior Eleitoral
                </a>
              </li>
              <li>
                <a href="https://transparencia.gov.br" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5" /> Portal da Transparência do Governo
                </a>
              </li>
              <li>
                <a href="https://portal.tcu.gov.br" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5" /> TCU - Tribunal de Contas da União
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-2 text-sm sm:text-base">
              Lei da Ficha Limpa (LC 135/2010)
            </h4>
            <p className="text-slate-400">
              Conforme a legislação brasileira, a inelegibilidade aplica-se aos condenados em decisão colegiada. Este observatório documenta o estado atual dos processos com precisão e transparência.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Observatório Político Judicial • Dados Oficiais e Transparentes para o Cidadão Brasileiro
        </div>
      </div>
    </footer>
  );
};
