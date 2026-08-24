export type PoliticalAffiliation = 'Bolsonarismo' | 'Petismo';

export type LegalStatus = 
  | 'Condenado (Definitivo / 2ª Instância)'
  | 'Processo Anulado / Prescrito'
  | 'Sob Investigação / Réu'
  | 'Inelegível pelo TSE'
  | 'Absolvido / Arquivado';

export type PowerStatus = 
  | 'No Poder (Executivo)'
  | 'No Poder (Legislativo)'
  | 'Cúpula Partidária / Influência'
  | 'Fora do Poder / Sem Mandato'
  | 'Tendência de Retorno (2026)';

export interface LegalCase {
  id: string;
  title: string;
  court: string; // e.g., STF, TSE, 13ª Vara Federal de Curitiba, MPF, TCU
  processNumber?: string; // e.g., AP 470, Inq 4874, HC 193.726, AIJE 0600814-85
  status: string; // e.g., "Anulado por incompetência", "Condenado a 8 anos", "Inelegível até 2030"
  description: string;
  yearStarted: number;
  lastUpdateYear: number;
}

export interface Politician {
  id: string;
  name: string;
  fullName: string;
  affiliation: PoliticalAffiliation;
  party: string; // e.g., PL, PT, PP, PTB
  currentRole: string; // e.g., Presidente da República, Senador da República, Ex-Presidente, etc.
  photoUrl?: string; // Optional / deprecated as photos are removed
  legalStatus: LegalStatus;
  powerStatus: PowerStatus;
  isInPowerNow: boolean;
  isTrendingFor2026: boolean;
  keyScandals: string[]; // e.g., ["Lava Jato", "Triplex e Sítio"] or ["Ação das Joias", "TSE Reunião Embaixadores"]
  summary: string;
  plainLanguageExplanation: string; // Resumo simples e direto para leigos e terceira idade
  judicialHistory: LegalCase[];
  defenseArgument: string; // Official defense position / Legal defense summary
  publicDataSources: string[]; // Official links/references (e.g. Portal do STF, TSE, TCU)
  estimatedValuesInvolved?: string; // e.g., "R$ 14.1 bilhões (Lava Jato global)" or "R$ 6,8 milhões (Rachadinhas)"
}

export interface HistoricalEvent {
  id: string;
  year: number;
  title: string;
  affiliationFocus: 'Bolsonarismo' | 'Petismo' | 'Ambos';
  category: 'Escândalo / Operação' | 'Julgamento / Condenação' | 'Anulação / Revés Legal' | 'Impacto Eleitoral';
  description: string;
  officialSource: string;
  valueImpact?: string;
}

export interface SystemicMetric {
  title: string;
  metric: string;
  subtitle: string;
  description: string;
  iconName: string;
}
