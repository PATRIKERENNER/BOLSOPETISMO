import React from 'react';
import { X, BookOpen, CheckCircle, HelpCircle } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const terms = [
    {
      term: 'Processo Anulado / Prescrito',
      definition: 'Significa que o julgamento foi cancelado por erros nas regras do tribunal ou porque o tempo limite que a lei dá para julgar acabou (prescreveu). Com isso, o político recupera o direito de disputar eleições.',
    },
    {
      term: 'Inelegível pelo TSE',
      definition: 'Decisão da Justiça Eleitoral que proíbe o político de se candidatar a qualquer cargo público ou receber votos por um período (geralmente 8 anos).',
    },
    {
      term: 'Condenado em 2ª Instância',
      definition: 'Ocorreu quando um grupo de juízes (desembargadores ou ministros) analisou o caso e confirmou que a pessoa cometeu o crime.',
    },
    {
      term: 'Delação Premiada',
      definition: 'Acordo legal onde o acusado admite seus crimes e ajuda a Polícia a descobrir os cúmplices e recuperar o dinheiro roubado, em troca de diminuir o tempo de prisão.',
    },
    {
      term: 'Rachadinha (Devolução de Salário)',
      definition: 'Esquema ilegal onde assessores de gabinete são obrigados a devolver parte do salário que recebem do governo para o político ou chefe do gabinete.',
    },
    {
      term: 'Parcialidade do Juiz',
      definition: 'Situação em que a Justiça entende que o juiz não foi neutro para julgar a pessoa e agiu com viés de interesse próprio ou político, cancelando os atos do processo.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] sm:max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-3">
            <div className="p-2 sm:p-2.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl shrink-0">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-serif">
                Guia de Linguagem Simples e Termos Jurídicos
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-300">
                Especialmente elaborado para a terceira idade e leitores leigos entenderem a Justiça.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-2 sm:p-2.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all shrink-0"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {terms.map((item, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{item.term}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {item.definition}
              </p>
            </div>
          ))}

          <div className="bg-amber-950/30 border border-amber-900/50 p-4 rounded-xl text-amber-200 text-xs sm:text-sm flex items-start space-x-2.5 mt-4">
            <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white font-bold mb-1">Por que a linguagem simples é importante?</strong>
              <span>
                As leis e decisões dos tribunais usam palavras muito difíceis. Este site traduz os fatos oficiais sem opinião política, permitindo que todo cidadão compreenda exatamente o histórico dos candidatos antes de votar.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl transition-all"
          >
            Entendi, Voltar para a Consulta
          </button>
        </div>
      </div>
    </div>
  );
};
