import React, { useState, useMemo } from 'react';
import { POLITICIANS_DATA } from './data/politiciansData';
import { Politician } from './types';
import { Header, ActiveTab } from './components/Header';
import { OverviewStats } from './components/OverviewStats';
import { FilterControls } from './components/FilterControls';
import { PoliticianCard } from './components/PoliticianCard';
import { PoliticianDossierModal } from './components/PoliticianDossierModal';
import { PoliticianComparator } from './components/PoliticianComparator';
import { TimelineView } from './components/TimelineView';
import { SystemicImpactSection } from './components/SystemicImpactSection';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { GlossaryModal } from './components/GlossaryModal';
import { BolsopetismoJointVotesView } from './components/BolsopetismoJointVotesView';
import { WhyNotVoteSection } from './components/WhyNotVoteSection';
import { VercelDeployGuideModal } from './components/VercelDeployGuideModal';
import { Footer } from './components/Footer';
import { Users, Info, GitCompare, BookOpenCheck, Flame, Handshake, Rocket } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('whyNotVote');

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAffiliation, setSelectedAffiliation] = useState<'Todos' | 'Bolsonarismo' | 'Petismo'>('Todos');
  const [selectedLegalStatus, setSelectedLegalStatus] = useState('Todos');
  const [onlyInPower, setOnlyInPower] = useState(false);

  // Selected Politician for Dossier Modal
  const [activeDossierPolitician, setActiveDossierPolitician] = useState<Politician | null>(null);

  // Glossary Modal State
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  // Vercel Deploy Guide Modal State
  const [isVercelGuideOpen, setIsVercelGuideOpen] = useState(false);

  // Comparator selection
  const [compareA, setCompareA] = useState<Politician | undefined>(POLITICIANS_DATA[0]);
  const [compareB, setCompareB] = useState<Politician | undefined>(POLITICIANS_DATA[1]);

  // Filtered Politicians List
  const filteredPoliticians = useMemo(() => {
    return POLITICIANS_DATA.filter((p) => {
      // Search term
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query) || p.fullName.toLowerCase().includes(query);
        const matchesParty = p.party.toLowerCase().includes(query);
        const matchesRole = p.currentRole.toLowerCase().includes(query);
        const matchesScandal = p.keyScandals.some((s) => s.toLowerCase().includes(query));
        const matchesSummary = p.summary.toLowerCase().includes(query);
        const matchesExplanation = p.plainLanguageExplanation.toLowerCase().includes(query);

        if (!matchesName && !matchesParty && !matchesRole && !matchesScandal && !matchesSummary && !matchesExplanation) {
          return false;
        }
      }

      // Affiliation
      if (selectedAffiliation !== 'Todos' && p.affiliation !== selectedAffiliation) {
        return false;
      }

      // Legal status
      if (selectedLegalStatus !== 'Todos' && p.legalStatus !== selectedLegalStatus) {
        return false;
      }

      // Only in power
      if (onlyInPower && !p.isInPowerNow) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedAffiliation, selectedLegalStatus, onlyInPower]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedAffiliation('Todos');
    setSelectedLegalStatus('Todos');
    setOnlyInPower(false);
  };

  const handleSelectForCompare = (p: Politician) => {
    setCompareA(p);
    // Find an opposing side politician if possible
    const opposite = POLITICIANS_DATA.find((item) => item.affiliation !== p.affiliation && item.id !== p.id);
    if (opposite) {
      setCompareB(opposite);
    }
    setActiveTab('comparator');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between">
      <div>
        {/* Navigation Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          totalPoliticiansCount={POLITICIANS_DATA.length}
          onOpenGlossary={() => setIsGlossaryOpen(true)}
          onOpenVercelGuide={() => setIsVercelGuideOpen(true)}
        />

        {/* Main Content Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16">
          {/* Banner accessibility & easy reading hint */}
          <div className="bg-amber-950/40 border border-amber-800/60 p-4 sm:p-5 rounded-3xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-amber-200">
            <div className="flex items-center space-x-3.5">
              <BookOpenCheck className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 shrink-0" />
              <div>
                <strong className="font-extrabold text-white text-sm sm:text-base block font-serif">
                  Informações Fatuais e Acessíveis para Terceira Idade e Leigos:
                </strong>
                <span className="text-xs sm:text-sm text-slate-300">
                  Todas as fotos foram removidas. Cada político e votação possui um resumo direto, dados oficiais e explicação em letras grandes.
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => setIsGlossaryOpen(true)}
                className="min-h-[42px] px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition-all text-xs sm:text-sm shrink-0 active:scale-95"
              >
                Dicionário de Termos
              </button>
              <button
                onClick={() => setIsVercelGuideOpen(true)}
                className="min-h-[42px] px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all text-xs sm:text-sm shrink-0 active:scale-95 flex items-center gap-1.5"
              >
                <Rocket className="w-4 h-4" />
                <span>Deploy Vercel</span>
              </button>
            </div>
          </div>

          {/* Overview Metrics Cards - Always visible at top */}
          <OverviewStats politicians={POLITICIANS_DATA} />

          {/* TAB: WHY NOT VOTE (PRIMARY HIGHLIGHT) */}
          {activeTab === 'whyNotVote' && (
            <div className="space-y-8 animate-fadeIn">
              <WhyNotVoteSection />
              <BolsopetismoJointVotesView />
            </div>
          )}

          {/* TAB: BOLSOPETISMO JOINT VOTES */}
          {activeTab === 'bolsopetismo' && <BolsopetismoJointVotesView />}

          {/* TAB: DOSSIERS & SEARCH */}
          {activeTab === 'dossiers' && (
            <div className="animate-fadeIn">
              <FilterControls
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedAffiliation={selectedAffiliation}
                setSelectedAffiliation={setSelectedAffiliation}
                selectedLegalStatus={selectedLegalStatus}
                setSelectedLegalStatus={setSelectedLegalStatus}
                onlyInPower={onlyInPower}
                setOnlyInPower={setOnlyInPower}
                resetFilters={resetFilters}
              />

              {/* Grid Header Counter */}
              <div className="flex items-center justify-between mb-5 px-1">
                <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-300">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>
                    Exibindo <strong className="text-white font-black">{filteredPoliticians.length}</strong> de {POLITICIANS_DATA.length} figuras políticas mapeadas
                  </span>
                </div>

                <button
                  onClick={() => setActiveTab('comparator')}
                  className="hidden sm:flex items-center space-x-1.5 text-xs sm:text-sm text-amber-400 hover:text-amber-300 font-bold transition-colors"
                >
                  <GitCompare className="w-4 h-4" />
                  <span>Abrir Comparador Lado a Lado</span>
                </button>
              </div>

              {/* Cards Grid */}
              {filteredPoliticians.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredPoliticians.map((p) => (
                    <PoliticianCard
                      key={p.id}
                      politician={p}
                      onViewDossier={(pol) => setActiveDossierPolitician(pol)}
                      onSelectForCompare={handleSelectForCompare}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center my-8 shadow-xl">
                  <Info className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-1 font-serif">
                    Nenhum político encontrado para estes filtros.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mb-4 max-w-md mx-auto">
                    Tente modificar os termos da pesquisa ou clique em limpar filtros para visualizar todos os registros.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="min-h-[44px] px-6 py-2.5 bg-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl hover:bg-amber-400 transition-all active:scale-95"
                  >
                    Limpar Filtros de Pesquisa
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB: COMPARATOR */}
          {activeTab === 'comparator' && (
            <div className="animate-fadeIn">
              <PoliticianComparator
                politicians={POLITICIANS_DATA}
                initialSelectA={compareA}
                initialSelectB={compareB}
              />
            </div>
          )}

          {/* TAB: HISTORICAL TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="animate-fadeIn">
              <TimelineView />
            </div>
          )}

          {/* TAB: SYSTEMIC IMPACT & ELECTORAL RE-ELECTION */}
          {activeTab === 'impact' && (
            <div className="animate-fadeIn">
              <SystemicImpactSection />
            </div>
          )}

          {/* TAB: AI PUBLIC RECORD ASSISTANT */}
          {activeTab === 'ai' && (
            <div className="animate-fadeIn">
              <AiAssistantDrawer />
            </div>
          )}
        </main>
      </div>

      {/* Dossier Modal */}
      <PoliticianDossierModal
        politician={activeDossierPolitician}
        onClose={() => setActiveDossierPolitician(null)}
      />

      {/* Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Vercel Deploy Guide Modal */}
      <VercelDeployGuideModal
        isOpen={isVercelGuideOpen}
        onClose={() => setIsVercelGuideOpen(false)}
      />

      {/* Footer */}
      <Footer onOpenVercelGuide={() => setIsVercelGuideOpen(true)} />
    </div>
  );
}
