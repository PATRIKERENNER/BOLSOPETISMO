import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, Loader2, AlertCircle, HelpCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AiAssistantDrawer: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Olá! Sou o **Assistente IA de Dados Públicos e Processos Judiciais**.\n\nPosso esclarecer dúvidas sobre processos do STF, decisões do TSE, Operações da Polícia Federal (Lava Jato, Mensalão, Tempus Veritatis, Rachadinhas) e dados do Portal da Transparência de forma estritamente neutra e jurídica.\n\nComo posso ajudar sua pesquisa hoje?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const suggestedQuestions = [
    'Qual a situação jurídica atual das condenações de Lula na Lava Jato?',
    'Por que Jair Bolsonaro foi declarado inelegível pelo TSE?',
    'Como funciona o Foro Privilegiado no STF para congressistas?',
    'Qual a diferença jurídica entre anulação por suspeição e absolvição?',
    'O que foram as Emendas de Relator (RP9) e por que o STF as vetou?',
  ];

  const handleSend = async (questionToSend?: string) => {
    const q = questionToSend || inputQuestion;
    if (!q.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/ai-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao comunicar com o servidor.');
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error('Erro na consulta ao assistente:', err);
      setErrorMessage(err?.message || 'Falha ao obter resposta do assistente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-4 sm:p-6 mb-10 flex flex-col h-[540px] sm:h-[620px] md:h-[700px]">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-slate-800 shrink-0">
        <div className="p-2 sm:p-2.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-xl shrink-0">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white font-serif">
            Assistente IA de Dados Públicos (Gemini 3.6 Flash)
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400">
            Consulte jurisprudências, números de inquéritos, acórdãos e normas eleitorais em tempo real.
          </p>
        </div>
      </div>

      {/* Suggested Chips */}
      <div className="mb-3 sm:mb-4 shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5 flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-indigo-400 shrink-0" />
          Perguntas Frequentes de Pesquisa:
        </span>
        <div className="flex flex-wrap gap-1.5 overflow-x-auto max-h-24 scrollbar-none">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={loading}
              className="text-left text-[10px] sm:text-[11px] font-medium bg-slate-800 hover:bg-indigo-950/60 text-slate-300 hover:text-indigo-200 border border-slate-700 hover:border-indigo-700/60 px-2.5 py-1.5 rounded-lg transition-all shrink-0 active:scale-95"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 p-3 sm:p-4 bg-slate-950/60 border border-slate-800 rounded-xl mb-3 sm:mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2 sm:space-x-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'ai' && (
              <div className="p-1.5 sm:p-2 bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 rounded-xl shrink-0 mt-1">
                <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-2xl rounded-2xl p-3 sm:p-4 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-amber-500 text-slate-950 font-medium font-sans'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 font-sans'
              }`}
            >
              {msg.sender === 'ai' ? (
                <div className="markdown-body space-y-2">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                <p>{msg.text}</p>
              )}
              <div
                className={`text-[10px] mt-2 text-right ${
                  msg.sender === 'user' ? 'text-slate-900/70 font-semibold' : 'text-slate-500'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="p-1.5 sm:p-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl shrink-0 mt-1">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-xs text-indigo-400 bg-indigo-950/40 p-3 rounded-xl border border-indigo-900/40 w-fit">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Consultando dados públicos e acórdãos com Gemini AI...</span>
          </div>
        )}

        {errorMessage && (
          <div className="flex items-center space-x-2 text-xs text-rose-300 bg-rose-950/40 p-3 rounded-xl border border-rose-900/40">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="flex items-center space-x-2 shrink-0">
        <input
          type="text"
          placeholder="Digite sua dúvida sobre processos, leis ou decisões judiciais..."
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 text-xs rounded-xl px-3.5 py-2.5 sm:py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !inputQuestion.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl flex items-center space-x-1.5 transition-all shadow-md shrink-0 active:scale-95"
        >
          <span className="hidden sm:inline">Enviar</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
