import React, { useState } from 'react';
import { X, Copy, Check, Terminal, ExternalLink, ShieldCheck, Rocket, Code, Server, Cpu } from 'lucide-react';

interface VercelDeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelDeployGuideModal: React.FC<VercelDeployGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const vercelJsonContent = `{
  "version": 2,
  "framework": "vite",
  "buildCommand": "npm run build:client",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/api/ai-consult",
      "destination": "/api/ai-consult"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 sm:p-3 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-2xl shrink-0">
              <Rocket className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-extrabold text-white font-serif">
                Guia de Deploy na Vercel (Pronto para Produção)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Instruções passo a passo e arquivos de configuração já incluídos no projeto.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-2.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all active:scale-95 shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-slate-200">
          {/* Status badge */}
          <div className="p-4 bg-emerald-950/50 border border-emerald-800/60 rounded-2xl flex items-start space-x-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">Projeto 100% Compatível com a Vercel</h3>
              <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed mt-1">
                O arquivo <code className="bg-emerald-900/60 px-1.5 py-0.5 rounded text-white font-mono">vercel.json</code>, os scripts do <code className="bg-emerald-900/60 px-1.5 py-0.5 rounded text-white font-mono">package.json</code> e a rota serverless <code className="bg-emerald-900/60 px-1.5 py-0.5 rounded text-white font-mono">/api/ai-consult.ts</code> já estão criados e testados.
              </p>
            </div>
          </div>

          {/* Option 1: Git push to GitHub + Vercel import */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-base sm:text-lg">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-900 text-indigo-200 text-xs font-black">
                1
              </span>
              <h3>Método 1: Importar via GitHub (Recomendado)</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-8">
              1. Envie o código para o seu repositório no <strong>GitHub</strong>.<br />
              2. Acesse <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-indigo-400 underline font-semibold">vercel.com/new</a>.<br />
              3. Selecione o repositório e clique em <strong>Deploy</strong>.<br />
              4. A Vercel detectará automaticamente o framework Vite e o diretório de saída <code className="bg-slate-800 px-1.5 py-0.5 rounded font-mono text-xs">dist</code>.
            </p>
          </div>

          {/* Option 2: Vercel CLI */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-base sm:text-lg">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-900 text-indigo-200 text-xs font-black">
                2
              </span>
              <h3>Método 2: Deploy via Terminal (Vercel CLI)</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-8">
              Execute os seguintes comandos no terminal do projeto:
            </p>

            <div className="pl-8 space-y-2">
              <div className="relative bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 flex items-center justify-between">
                <code>npm i -g vercel && vercel deploy --prod</code>
                <button
                  onClick={() => copyToClipboard('npm i -g vercel && vercel deploy --prod', 1)}
                  className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg"
                  title="Copiar comando"
                >
                  {copiedIndex === 1 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Environment Variables on Vercel */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-base sm:text-lg">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-900 text-indigo-200 text-xs font-black">
                3
              </span>
              <h3>Variáveis de Ambiente (Opcional para IA Gemini)</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-8">
              No painel do projeto na Vercel, acesse <strong>Settings &gt; Environment Variables</strong> e adicione:
            </p>
            <div className="pl-8">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 flex items-center justify-between">
                <code>GEMINI_API_KEY=sua_chave_aqui</code>
                <button
                  onClick={() => copyToClipboard('GEMINI_API_KEY=', 2)}
                  className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg"
                >
                  {copiedIndex === 2 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* File vercel.json preview */}
          <div className="space-y-2">
            <h4 className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Code className="w-4 h-4 text-amber-400" />
              Configuração vercel.json integrada:
            </h4>
            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto">
              {vercelJsonContent}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="min-h-[44px] px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition-all"
          >
            Entendido, Fechar Guia
          </button>
        </div>
      </div>
    </div>
  );
};
