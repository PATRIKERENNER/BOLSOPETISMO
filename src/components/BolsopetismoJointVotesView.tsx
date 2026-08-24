import React, { useState } from 'react';
import { BOLSOPETISMO_JOINT_VOTES, JointVote, PoliticianVoter } from '../data/bolsopetismoVotesData';
import {
  Handshake,
  DollarSign,
  ShieldAlert,
  Gavel,
  BookOpenCheck,
  Building2,
  Calendar,
  CheckCircle2,
  Search,
  Filter,
  Users2,
  AlertOctagon,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Flame,
} from 'lucide-react';

export const BolsopetismoJointVotesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [politicianSearchTerm, setPoliticianSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [selectedHouse, setSelectedHouse] = useState<string>('TODAS');
  const [expandedVoteId, setExpandedVoteId] = useState<string | null>(null);

  const categories = [
    'TODAS',
    'Dinheiro Público & Fundo Eleitoral',
    'Impunidade & Leis Anti-Corrupção',
    'Nomeações no Judiciário & PGR',
    'Privilégios & Emendas Secretas',
  ];

  const houses = [
    'TODAS',
    'Câmara dos Deputados',
    'Senado Federal',
    'Congresso Nacional (Sessão Conjunta)',
  ];

  const toggleExpand = (id: string) => {
    setExpandedVoteId(expandedVoteId === id ? null : id);
  };

  const filteredVotes = BOLSOPETISMO_JOINT_VOTES.filter((vote) => {
    // Category match
    if (selectedCategory !== 'TODAS' && vote.category !== selectedCategory) {
      return false;
    }
    // House match
    if (selectedHouse !== 'TODAS' && vote.house !== selectedHouse) {
      return false;
    }
    // Search term match
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      const matchTitle = vote.title.toLowerCase().includes(q);
      const matchBill = vote.billNumber.toLowerCase().includes(q);
      const matchSummary = vote.summary.toLowerCase().includes(q);
      const matchExplanation = vote.plainLanguageExplanation.toLowerCase().includes(q);
      if (!matchTitle && !matchBill && !matchSummary && !matchExplanation) {
        return false;
      }
    }
    // Politician search match
    if (politicianSearchTerm.trim() !== '') {
      const pq = politicianSearchTerm.toLowerCase();
      const hasPtVoter = vote.ptVoters.some((v) => v.name.toLowerCase().includes(pq) || v.state.toLowerCase().includes(pq));
      const hasPlVoter = vote.plVoters.some((v) => v.name.toLowerCase().includes(pq) || v.state.toLowerCase().includes(pq));
      if (!hasPtVoter && !hasPlVoter) {
        return false;
      }
    }
    return true;
  });

  return (
    <div id="votacoes-conjuntas" className="space-y-8 animate-fadeIn mb-12">
      {/* Main Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-900 border-2 border-rose-800/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-rose-500/20 text-rose-300 border border-rose-500/40 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider">
              <Handshake className="w-4 h-4 text-rose-400" />
              <span>A Verdade dos Painéis do Congresso Nacional</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white font-serif tracking-tight leading-tight">
              Votações Conjuntas: O <span className="text-rose-400 underline decoration-rose-500/50">Bolsopetismo</span> em Ação
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              Enquanto PT e PL fingem ser inimigos mortais na internet e na TV para polarizar a população, no plenário da Câmara dos Deputados e do Senado Federal eles <strong>votam juntos</strong> para aumentar o Fundo Eleitoral, anistiar multas dos próprios partidos, afrouxar leis de combate à corrupção e garantir privilégios.
            </p>

            <div className="pt-2 flex flex-wrap gap-3 text-xs sm:text-sm font-bold text-amber-300">
              <div className="bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Dados extraídos dos painéis oficiais do Congresso</span>
              </div>
              <div className="bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
                <BookOpenCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Letras grandes e linguagem simples para idosos e leigos</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border border-rose-900/60 p-6 rounded-3xl flex flex-col items-center text-center space-y-2 shrink-0 md:w-72 shadow-2xl">
            <AlertOctagon className="w-12 h-12 text-rose-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-black text-slate-400 uppercase tracking-wider">O Custo do Acordo</span>
            <span className="text-3xl sm:text-4xl font-black text-white">R$ 35+ Bilhões</span>
            <span className="text-xs sm:text-sm text-slate-400 leading-snug">
              Em fundos partidários, emendas e anistias votados de mãos dadas
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-slate-900 border border-slate-800 p-5 sm:p-7 rounded-3xl space-y-5 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* General Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por votação, lei ou pauta..."
              className="w-full min-h-[48px] bg-slate-950 border border-slate-800 text-white text-sm sm:text-base rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:border-amber-500 font-sans"
            />
          </div>

          {/* Politician Name Search Box */}
          <div className="relative">
            <UserCheck className="w-5 h-5 absolute left-4 top-3.5 text-amber-400" />
            <input
              type="text"
              value={politicianSearchTerm}
              onChange={(e) => setPoliticianSearchTerm(e.target.value)}
              placeholder="Nome do Político (ex: Eduardo Bolsonaro, Gleisi, Nikolas)..."
              className="w-full min-h-[48px] bg-slate-950 border border-amber-500/50 text-white text-sm sm:text-base rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:border-amber-400 font-sans"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-300 pt-1">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-amber-400" />
            <span>Exibindo <strong>{filteredVotes.length}</strong> votações com registro nominal</span>
          </div>

          {(searchTerm || politicianSearchTerm || selectedCategory !== 'TODAS' || selectedHouse !== 'TODAS') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setPoliticianSearchTerm('');
                setSelectedCategory('TODAS');
                setSelectedHouse('TODAS');
              }}
              className="text-amber-400 hover:underline text-xs sm:text-sm font-bold"
            >
              Limpar Filtros
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-slate-800 touch-pan-x snap-x scroll-smooth">
          <span className="text-xs sm:text-sm font-bold text-slate-400 shrink-0 mr-1">Categoria:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`snap-start shrink-0 min-h-[42px] px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* House Selection Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none touch-pan-x snap-x scroll-smooth">
          <span className="text-xs sm:text-sm font-bold text-slate-400 shrink-0 mr-1">Plenário:</span>
          {houses.map((house) => (
            <button
              key={house}
              onClick={() => setSelectedHouse(house)}
              className={`snap-start shrink-0 min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedHouse === house
                  ? 'bg-slate-800 text-amber-300 border border-amber-500/50'
                  : 'text-slate-400 hover:text-white bg-slate-950/60 border border-slate-800/60'
              }`}
            >
              {house}
            </button>
          ))}
        </div>
      </div>

      {/* Joint Votes Grid */}
      <div className="space-y-8">
        {filteredVotes.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-3">
            <Handshake className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">Nenhuma votação ou político encontrado</h3>
            <p className="text-sm">Tente buscar por outro nome de político ou clique em limpar filtros.</p>
          </div>
        ) : (
          filteredVotes.map((vote) => {
            const isExpanded = expandedVoteId === vote.id;

            return (
              <div
                key={vote.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl hover:border-rose-900/60 transition-all space-y-6 relative overflow-hidden group"
              >
                {/* Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-amber-500 to-blue-600" />

                {/* Vote Title & Badge Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pt-2">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-rose-950 text-rose-300 border border-rose-800 text-xs sm:text-sm font-black px-3 py-1 rounded-full uppercase tracking-wider">
                        {vote.category}
                      </span>
                      <span className="bg-slate-950 text-slate-300 border border-slate-800 text-xs sm:text-sm font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-amber-400" />
                        {vote.house}
                      </span>
                      <span className="bg-slate-950 text-slate-400 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {vote.dateString}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-serif group-hover:text-amber-400 transition-colors pt-1">
                      {vote.title}
                    </h2>
                    <div className="text-xs sm:text-sm text-amber-400 font-mono font-bold">
                      Identificação do Projeto: {vote.billNumber}
                    </div>
                  </div>

                  {vote.financialImpact && (
                    <div className="bg-amber-950/70 border border-amber-700/80 px-4 py-2.5 rounded-2xl text-amber-200 text-xs sm:text-sm font-black flex items-center gap-2 shrink-0 self-start shadow-md">
                      <DollarSign className="w-5 h-5 text-amber-400 shrink-0" />
                      <span>{vote.financialImpact}</span>
                    </div>
                  )}
                </div>

                {/* Voting Comparison Table (PT vs PL) */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* PT Vote Box */}
                  <div className="bg-red-950/40 border border-red-900/60 p-4 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-black text-red-300 uppercase tracking-wider flex items-center gap-2">
                        <Users2 className="w-4 h-4" /> Voto da Bancada do PT (Petismo)
                      </span>
                      <span className="bg-red-900 text-white font-black px-2.5 py-0.5 rounded text-xs uppercase">
                        Votou SIM / Apoiou
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-200 font-medium">{vote.ptVote}</p>
                  </div>

                  {/* PL / Bolsonarismo Vote Box */}
                  <div className="bg-blue-950/40 border border-blue-900/60 p-4 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-black text-blue-300 uppercase tracking-wider flex items-center gap-2">
                        <Users2 className="w-4 h-4" /> Voto da Bancada do PL (Bolsonarismo)
                      </span>
                      <span className="bg-blue-900 text-white font-black px-2.5 py-0.5 rounded text-xs uppercase">
                        Votou SIM / Apoiou
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-200 font-medium">{vote.plVote}</p>
                  </div>
                </div>

                {/* POLITICIAN NOMINAL LIST SECTION */}
                <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div className="flex items-center space-x-2 text-amber-400 font-black text-sm sm:text-base uppercase tracking-wider">
                      <UserCheck className="w-5 h-5 text-amber-400 shrink-0" />
                      <span>Nome dos Políticos que Votaram "SIM" nesta Pauta</span>
                    </div>

                    <button
                      onClick={() => toggleExpand(vote.id)}
                      className="min-h-[38px] text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 bg-amber-950/60 px-4 py-2 rounded-xl border border-amber-800 flex items-center space-x-2 transition-all active:scale-95 shrink-0"
                    >
                      <span>{isExpanded ? 'Recolher Nomes' : 'Ver Todos os Nomes Mapeados'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Split columns for PT Voters & PL Voters */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* PT Voters List */}
                    <div className="space-y-2.5">
                      <div className="text-xs sm:text-sm font-bold text-red-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Políticos do PT (Petismo)</span>
                        <span className="text-xs text-slate-400">({vote.ptVoters.length} parlamentares)</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(isExpanded ? vote.ptVoters : vote.ptVoters.slice(0, 6)).map((voter, idx) => {
                          const isMatch =
                            politicianSearchTerm.trim() !== '' &&
                            voter.name.toLowerCase().includes(politicianSearchTerm.toLowerCase());

                          return (
                            <span
                              key={idx}
                              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold border flex items-center gap-1.5 transition-all ${
                                isMatch
                                  ? 'bg-amber-400 text-slate-950 font-black border-amber-300 shadow-md ring-2 ring-amber-400'
                                  : 'bg-red-950/50 text-red-200 border-red-900/60'
                              }`}
                            >
                              <span className="font-bold">{voter.name}</span>
                              <span className="text-xs opacity-75">({voter.party}-{voter.state})</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* PL Voters List */}
                    <div className="space-y-2.5">
                      <div className="text-xs sm:text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Políticos do PL / Bolsonaristas</span>
                        <span className="text-xs text-slate-400">({vote.plVoters.length} parlamentares)</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(isExpanded ? vote.plVoters : vote.plVoters.slice(0, 6)).map((voter, idx) => {
                          const isMatch =
                            politicianSearchTerm.trim() !== '' &&
                            voter.name.toLowerCase().includes(politicianSearchTerm.toLowerCase());

                          return (
                            <span
                              key={idx}
                              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold border flex items-center gap-1.5 transition-all ${
                                isMatch
                                  ? 'bg-amber-400 text-slate-950 font-black border-amber-300 shadow-md ring-2 ring-amber-400'
                                  : 'bg-blue-950/50 text-blue-200 border-blue-900/60'
                              }`}
                            >
                              <span className="font-bold">{voter.name}</span>
                              <span className="text-xs opacity-75">({voter.party}-{voter.state})</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plain Language Explanation Box (For Elderly & Laypeople) */}
                <div className="bg-slate-950 border-2 border-amber-500/40 p-5 sm:p-6 rounded-2xl space-y-3 shadow-md">
                  <div className="flex items-center space-x-2 text-amber-400 font-black text-sm sm:text-base uppercase tracking-wide">
                    <BookOpenCheck className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 shrink-0" />
                    <span>Entenda em Linguagem Simples (Para Idosos e Leigos):</span>
                  </div>
                  <p className="text-base sm:text-lg text-slate-100 font-sans leading-relaxed">
                    {vote.plainLanguageExplanation}
                  </p>
                </div>

                {/* Official Technical Summary */}
                <div className="text-xs sm:text-sm text-slate-300 space-y-1.5">
                  <strong className="text-slate-400 uppercase text-xs tracking-wider block font-bold">Resumo Técnico Oficial:</strong>
                  <p className="leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-sans">{vote.summary}</p>
                </div>

                {/* Official Source Link */}
                <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm text-slate-400">
                  <div className="flex items-center space-x-2">
                    <Gavel className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      <strong className="text-slate-300">Fonte Oficial:</strong> {vote.officialSource}
                    </span>
                  </div>

                  <span className="text-xs text-slate-300 bg-slate-800 px-3.5 py-1.5 rounded-lg border border-slate-700 font-mono">
                    {vote.processLinkDescription}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Summary Conclusion Box for Citizens */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-white font-serif flex items-center gap-2.5">
          <ShieldAlert className="w-7 h-7 text-amber-400 shrink-0" />
          Conclusão com Base em Dados Abertos e Oficiais
        </h3>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          Os registros de votações no Congresso Nacional demonstram que a rivalidade entre PT e PL ocorre majoritariamente na disputa por cargos e no discurso de redes sociais. Quando estão em pauta leis que tratam de <strong>aumento de verbas públicas para campanhas, perdão de multas eleitorais, facilitação de regras de corrupção ou manutenção de privilégios de mandato</strong>, as bancadas do Petismo e do Bolsonarismo votam de forma unânime e combinada.
        </p>
      </div>
    </div>
  );
};
