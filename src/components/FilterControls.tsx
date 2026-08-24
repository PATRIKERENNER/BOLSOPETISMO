import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { PoliticalAffiliation } from '../types';

interface FilterControlsProps {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  selectedAffiliation: 'Todos' | PoliticalAffiliation;
  setSelectedAffiliation: (a: 'Todos' | PoliticalAffiliation) => void;
  selectedLegalStatus: string;
  setSelectedLegalStatus: (st: string) => void;
  onlyInPower: boolean;
  setOnlyInPower: (val: boolean) => void;
  resetFilters: () => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm,
  setSearchTerm,
  selectedAffiliation,
  setSelectedAffiliation,
  selectedLegalStatus,
  setSelectedLegalStatus,
  onlyInPower,
  setOnlyInPower,
  resetFilters,
}) => {
  const hasActiveFilters =
    searchTerm !== '' ||
    selectedAffiliation !== 'Todos' ||
    selectedLegalStatus !== 'Todos' ||
    onlyInPower;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 mb-8 shadow-xl">
      <div className="flex items-center justify-between mb-4 text-xs sm:text-sm font-black text-slate-300 uppercase tracking-wider">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-amber-400" />
          <span>Filtros e Pesquisa Rápida de Políticos</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center space-x-1 text-amber-400 hover:text-amber-300 text-xs sm:text-sm font-bold transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Limpar Filtros</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou processo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full min-h-[48px] bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-400 text-sm sm:text-base rounded-2xl pl-11 pr-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-sans"
          />
        </div>

        {/* Affiliation Filter */}
        <div>
          <select
            value={selectedAffiliation}
            onChange={(e) => setSelectedAffiliation(e.target.value as any)}
            className="w-full min-h-[48px] bg-slate-950 border border-slate-700 text-slate-100 text-sm sm:text-base font-medium rounded-2xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-sans"
          >
            <option value="Todos">Todas as Vertentes Políticas</option>
            <option value="Bolsonarismo">Bolsonarismo / PL</option>
            <option value="Petismo">Petismo / PT</option>
          </select>
        </div>

        {/* Legal Status Filter */}
        <div>
          <select
            value={selectedLegalStatus}
            onChange={(e) => setSelectedLegalStatus(e.target.value)}
            className="w-full min-h-[48px] bg-slate-950 border border-slate-700 text-slate-100 text-sm sm:text-base font-medium rounded-2xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-sans"
          >
            <option value="Todos">Todos os Status Judiciais</option>
            <option value="Condenado (Definitivo / 2ª Instância)">Condenado em 2ª Instância / STF</option>
            <option value="Inelegível pelo TSE">Inelegível pelo TSE</option>
            <option value="Processo Anulado / Prescrito">Processo Anulado / Prescrito</option>
            <option value="Sob Investigação / Réu">Sob Investigação / Réu</option>
            <option value="Absolvido / Arquivado">Absolvido / Arquivado</option>
          </select>
        </div>

        {/* Only In Power Checkbox */}
        <div
          onClick={() => setOnlyInPower(!onlyInPower)}
          className="flex items-center space-x-3 bg-slate-950 border border-slate-700 px-4 py-3 rounded-2xl cursor-pointer hover:bg-slate-800 transition-colors min-h-[48px]"
        >
          <input
            type="checkbox"
            id="onlyInPower"
            checked={onlyInPower}
            onChange={(e) => setOnlyInPower(e.target.checked)}
            className="w-5 h-5 rounded border-slate-600 text-amber-500 focus:ring-amber-500 bg-slate-900 shrink-0"
          />
          <label htmlFor="onlyInPower" className="text-xs sm:text-sm text-slate-200 font-bold cursor-pointer select-none">
            Apenas Políticos <strong>No Poder</strong>
          </label>
        </div>
      </div>
    </div>
  );
};
