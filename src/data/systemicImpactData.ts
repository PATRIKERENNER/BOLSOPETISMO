export interface ImpactPillar {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
  metricLabel: string;
  source: string;
  description: string;
  consequences: string[];
}

export const SYSTEMIC_IMPACT_DATA: ImpactPillar[] = [
  {
    id: 'pillar-1',
    title: 'Desperdício de Recursos Públicos e Obras Paradas',
    subtitle: 'Impacto no Orçamento e na Infraestrutura Nacional',
    metric: 'R$ 100+ Bi',
    metricLabel: 'Capital Paralisado em Obras Auditadas pelo TCU',
    source: 'Tribunal de Contas da União (TCU) - Painel de Obras Paradas',
    description: 'Quando políticos envolvidos em esquemas de corrupção ou superfaturamento são mantidos no poder, a continuidade de projetos públicos é severamente comprometida por fraudes licitatórias, aditivos contratuais indevidos e embargo de obras.',
    consequences: [
      'Mais de 14.000 obras públicas paralisadas em todo o país (escolas, creches, hospitais e saneamento).',
      'Desperdício de impostos pagos pela população sem retorno de serviços essenciais.',
      'Aumento do custo médio de execução de obras em até 40% devido a aditivos contratuais.',
    ],
  },
  {
    id: 'pillar-2',
    title: 'Legislação em Causa Própria e Desmonte Anti-Corrupção',
    subtitle: 'Priorização de Imunidades sobre Reformas Estruturais',
    metric: 'R$ 4.9 Bi',
    metricLabel: 'Fundo Eleitoral (Fundão) Aprovado com Recursos Públicos',
    source: 'Congresso Nacional / Portal da Transparência',
    description: 'Deputados e senadores com pendências judiciais graves tendem a formar bancadas focadas na aprovação de leis que enfraquecem mecanismos de controle, encurtam prazos de prescrição penal e aumentam o financiamento público de suas próprias campanhas.',
    consequences: [
      'Alterações na Lei de Improbidade Administrativa (Lei 14.230/2021) que dificultam a punição de gestores.',
      'Tentativas recorrentes de afrouxar a Lei da Ficha Limpa (LC 135/2010).',
      'Uso sistemático do Foro Privilegiado para atrasar julgamentos até a prescrição dos crimes.',
      'Aumento recorde do Fundo Eleitoral com recursos retirados de áreas de saúde e educação.',
    ],
  },
  {
    id: 'pillar-3',
    title: 'Queda no Índice de Percepção da Corrupção e Atração de Investimentos',
    subtitle: 'Dano à Credibilidade Internacional e Custo Brasil',
    metric: '104º Lugar',
    metricLabel: 'Posição do Brasil no Índice Global de Transparência (180 países)',
    source: 'Transparência Internacional - Corruption Perceptions Index (CPI)',
    description: 'A percepção internacional de que réus por corrupção ou abuso de poder mantêm seus mandatos sem responsabilização gera insegurança jurídica, afugenta investidores estrangeiros de longo prazo e eleva o risco-país.',
    consequences: [
      'Encarecimento do crédito internacional para empresas e para o Estado brasileiro.',
      'Perda de investimentos em tecnologia, transição energética e infraestrutura sustentável.',
      'Degradação da governança pública e desconfiança nas instituições democráticas.',
    ],
  },
  {
    id: 'pillar-4',
    title: 'Captura do Orçamento Público (Emendas de Relator e PIX)',
    subtitle: 'Opacidade na Alocação de Recursos Sem Controle Social',
    metric: 'R$ 30+ Bi',
    metricLabel: 'Verbas de Emendas RP9 / PIX Executadas Sem Transparência',
    source: 'STF (ADPF 854) e Controladoria-Geral da União (CGU)',
    description: 'A perpetuação de caciques partidários no poder fortaleceu mecanismos de barganha política onde verbas bilionárias são distribuídas sem critérios técnicos ou prestação de contas no Portal da Transparência, gerando superfaturamento em fraudes locais.',
    consequences: [
      'Compra de apoio político local em detrimento de prioridades nacionais de saúde e saneamento.',
      'Casos documentados pela Polícia Federal de fraudes na compra de kits de robótica e exames falsos de saúde.',
      'Falta de rastreabilidade do destino final do dinheiro do contribuinte.',
    ],
  },
];

export interface FichaLimpaInfo {
  title: string;
  description: string;
  points: string[];
}

export const FICHA_LIMPA_EXPLANATION: FichaLimpaInfo = {
  title: 'Como Funciona a Lei da Ficha Limpa (LC 135/2010) e Suas Brechas',
  description: 'A Lei da Ficha Limpa foi concebida para barrar candidatos condenados por órgãos colegiados. Contudo, manobras processuais e morosidade do sistema judicial criam brechas onde réus continuam disputando eleições:',
  points: [
    'Condenação por Órgão Colegiado: Um político só se torna inelegível após decisão de 2ª instância (TRF, TJ) ou STF/TSE, e não ao virar réu ou ser investigado.',
    'Liminares de Efeito Suspensivo: Políticos recorrem a instâncias superiores para obter liminares temporárias que suspendem a inelegibilidade a tempo de registrar candidatura.',
    'Anulação de Provas por Vício de Competência: Quando condenações são anuladas por erros formais ou falta de jurisdição, o candidato recupera a Ficha Limpa mesmo sem ter sido absolvido do mérito.',
    'Decurso de Prazo (Prescrição): A morosidade dos tribunais faz com que os crimes prescrevam antes do julgamento final, extinguindo a punibilidade.',
  ],
};
