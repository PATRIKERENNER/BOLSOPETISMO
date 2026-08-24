import React, { useState } from 'react';
import {
  AlertTriangle,
  Flame,
  Scale,
  DollarSign,
  Gavel,
  ShieldAlert,
  Building2,
  FileCheck,
  CheckCircle2,
  ChevronRight,
  TrendingDown,
  Lock,
  Vote,
  ExternalLink,
} from 'lucide-react';

export const WhyNotVoteSection: React.FC = () => {
  const [activeSide, setActiveSide] = useState<'all' | 'pt' | 'bolsonarismo' | 'pacto'>('all');

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl mb-12">
      {/* Top Section Header */}
      <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs sm:text-sm font-black uppercase tracking-wider mb-4">
          <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
          Análise Factual e Documentada
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-serif mb-4 leading-tight">
          O Real Motivo Para NÃO Votar em Candidatos do <span className="text-rose-400 underline decoration-rose-500/50">PT</span> e do <span className="text-blue-400 underline decoration-blue-500/50">Bolsonarismo</span>
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-sans">
          Entenda com dados oficiais, números de processos e registros de votações por que ambas as cúpulas representam a perpetuação de privilégios, impunidade e desperdício de dinheiro do pagador de impostos.
        </p>

        {/* View Selection Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-6 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setActiveSide('all')}
            className={`min-h-[46px] px-4 sm:px-6 py-2.5 rounded-xl text-sm sm:text-base font-extrabold transition-all border ${
              activeSide === 'all'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            Visão Geral Completa
          </button>
          <button
            onClick={() => setActiveSide('pt')}
            className={`min-h-[46px] px-4 sm:px-6 py-2.5 rounded-xl text-sm sm:text-base font-extrabold transition-all border ${
              activeSide === 'pt'
                ? 'bg-rose-600 text-white border-rose-400 shadow-lg shadow-rose-600/30'
                : 'bg-slate-950 text-rose-300 border-rose-900/40 hover:bg-rose-950/30'
            }`}
          >
            Motivos Contra o PT
          </button>
          <button
            onClick={() => setActiveSide('bolsonarismo')}
            className={`min-h-[46px] px-4 sm:px-6 py-2.5 rounded-xl text-sm sm:text-base font-extrabold transition-all border ${
              activeSide === 'bolsonarismo'
                ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30'
                : 'bg-slate-950 text-blue-300 border-blue-900/40 hover:bg-blue-950/30'
            }`}
          >
            Motivos Contra o Bolsonarismo / PL
          </button>
          <button
            onClick={() => setActiveSide('pacto')}
            className={`min-h-[46px] px-4 sm:px-6 py-2.5 rounded-xl text-sm sm:text-base font-extrabold transition-all border ${
              activeSide === 'pacto'
                ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/30'
                : 'bg-slate-950 text-purple-300 border-purple-900/40 hover:bg-purple-950/30'
            }`}
          >
            O Pacto de Sobrevivência (Bolsopetismo)
          </button>
        </div>
      </div>

      {/* Main Grid: Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* BLOCK 1: WHY NOT VOTE FOR PT */}
        {(activeSide === 'all' || activeSide === 'pt') && (
          <div className="bg-slate-950/80 border-2 border-rose-900/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-5 border-b border-rose-900/40 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-rose-950 border border-rose-800 text-rose-400 rounded-2xl">
                    <AlertTriangle className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-rose-400 block">
                      Esquerda / Petismo
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-serif">
                      Por Que NÃO Votar no PT
                    </h3>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-extrabold bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full border border-rose-500/30">
                  5 Fatos Comprovados
                </span>
              </div>

              {/* Reasons List with Large Fonts and Real Proofs */}
              <div className="space-y-6 text-slate-200">
                {/* Reason 1 */}
                <div className="p-4 sm:p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-rose-400 font-bold text-base sm:text-lg">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-950 border border-rose-700 text-rose-200 text-sm font-black shrink-0">
                      1
                    </span>
                    <h4>Corrupção Sistêmica e Confissões de Cúpula</h4>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed pl-9">
                    Esquemas de compra sistemática de apoio parlamentar no <strong>Mensalão (Ação Penal 470)</strong> e desvios bilionários na Petrobras (Lava Jato). Ministros e dirigentes confessaram crimes e firmaram delações que devolveram mais de <strong>R$ 25 bilhões</strong> aos cofres públicos.
                  </p>
                  <div className="pl-9 text-xs sm:text-sm font-mono text-slate-400 flex items-center gap-1.5 pt-1">
                    <FileCheck className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Fontes: STF AP 470 | Acordos de Leniência MPF/Petrobras</span>
                  </div>
                </div>

                {/* Reason 2 */}
                <div className="p-4 sm:p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-rose-400 font-bold text-base sm:text-lg">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-950 border border-rose-700 text-rose-200 text-sm font-black shrink-0">
                      2
                    </span>
                    <h4>Descalabro Fiscal e Aumento Contínuo de Impostos</h4>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed pl-9">
                    Histórico de déficits fiscais sucessivos, inchaço da máquina com ministérios e criação de novos tributos sobre consumo, compras internacionais e combustíveis que punem diretamente a classe média e os mais pobres.
                  </p>
                  <div className="pl-9 text-xs sm:text-sm font-mono text-slate-400 flex items-center gap-1.5 pt-1">
                    <TrendingDown className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Fontes: Tesouro Nacional | Relatórios Oficiais de Receita Federal</span>
                  </div>
                </div>

                {/* Reason 3 */}
                <div className="p-4 sm:p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-rose-400 font-bold text-base sm:text-lg">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-950 border border-rose-700 text-rose-200 text-sm font-black shrink-0">
                      3
                    </span>
                    <h4>Voto Favorável ao Fundão Eleitoral de R$ 4,9 Bilhões</h4>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed pl-9">
                    A bancada do PT na Câmara e no Senado votou maciçamente a favor de retirar quase <strong>5 bilhões de reais</strong> dos cofres públicos para irrigar campanhas eleitorais e sustentar estruturas partidárias.
                  </p>
                  <div className="pl-9 text-xs sm:text-sm font-mono text-slate-400 flex items-center gap-1.5 pt-1">
                    <DollarSign className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Fontes: Votação Nominal PLN 3/2021 | Diário do Congresso Nacional</span>
                  </div>
                </div>

                {/* Reason 4 */}
                <div className="p-4 sm:p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-rose-400 font-bold text-base sm:text-lg">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-950 border border-rose-700 text-rose-200 text-sm font-black shrink-0">
                      4
                    </span>
                    <h4>PEC da Anistia e Afrouxamento da Improbidade</h4>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed pl-9">
                    Apoio e voto conjunto para perdoar multas eleitorais milionárias aplicadas aos próprios partidos (PEC 9/2023) e voto para desidratar a Lei de Improbidade Administrativa (Lei 14.230/21), dificultando punir agentes que causem prejuízo ao erário.
                  </p>
                  <div className="pl-9 text-xs sm:text-sm font-mono text-slate-400 flex items-center gap-1.5 pt-1">
                    <Gavel className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Fontes: Painel Eletrônico da Câmara dos Deputados (PEC 9/23 e PL 10887/18)</span>
                  </div>
                </div>

                {/* Reason 5 */}
                <div className="p-4 sm:p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-rose-400 font-bold text-base sm:text-lg">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-950 border border-rose-700 text-rose-200 text-sm font-black shrink-0">
                      5
                    </span>
                    <h4>Aparelhamento dos Tribunais e Apoio a Aras na PGR</h4>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed pl-9">
                    Indicação do advogado pessoal do presidente para o STF (Cristiano Zanin) e votos decisivos no Senado para a recondução de Augusto Aras na PGR, que engavetou dezenas de pedidos de investigação.
                  </p>
                  <div className="pl-9 text-xs sm:text-sm font-mono text-slate-400 flex items-center gap-1.5 pt-1">
                    <Scale className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Fontes: Atas de Sabatinas da CCJ do Senado Federal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BLOCK 2: WHY NOT VOTE FOR BOLSONARISMO / PL */}
        {(activeSide === 'all' || activeSide === 'bolsonarismo') && (
          <div className="bg-slate-950/80 border-2 border-blue-900/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-5 border-b border-blue-900/40 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-950 border border-blue-800 text-blue-400 rounded-2xl">
                    <ShieldAlert className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-blue-400 block">
                      Direita Radical / PL
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-serif">
                      Por Que NÃO Votar no Bolsonarismo
                    </h3>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-extrabold bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">
                  5 Fatos Comprovados
                </span>
              </div>

              {/* Reasons List with Large Fonts and Real Proofs */}
              <div className="space-y-6 text-slate-200">
                {/* Reason 1 */}
                <div className="p-4 sm:p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-blue-400 font-bold text-base sm:text-lg">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-950 border border-blue-700 text-blue-200 text-sm font-black shrink-0">
                      1
                    </span>
                    <h4>Desvios Pessoais, Joias Presidenciais e Rachadinhas</h4>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed pl-9">
                    Investigação da Polícia Federal comprovou apropriação e venda ilegal de joias de milhões de reais pertencentes ao acervo público brasileiro nos EUA. Esquema de devolução de salários (rachadinhas) em gabinetes de filhos de Bolsonaro e uso abusivo de cartões corporativos.
                  </p>
                  <div className="pl-9 text-xs sm:text-sm font-mono text-slate-400 flex items-center gap-1.5 pt-1">
                    <FileCheck className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Fontes: PF - Operação Lucas 12:2 | Acórdão do TCU sobre Presentes de Estado</span>
                  </div>
                </div>

                {/* Reason 2 */}
                <div className="p-4 sm:p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-blue-400 font-bold text-base sm:text-lg">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-950 border border-blue-700 text-blue-200 text-sm font-black shrink-0">
                      2
                    </span>
                    <h4>Aparelhamento Institucional e Trama de Golpe de Estado</h4>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed pl-9">
                    Uso da <strong>Abin Paralela</strong> para espionar ilegalmente jornalistas, juízes e rivais políticos; instrumentalização da Polícia Rodoviária Federal para interferir no transporte de eleitores; e articulação de minutas golpistas culminando nos ataques de 8 de Janeiro e na inelegibilidade de Bolsonaro pelo TSE até 2030.
                  </p>
                  <div className="pl-9 text-xs sm:text-sm font-mono text-slate-400 flex items-center gap-1.5 pt-1">
                    <Lock className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Fontes: STF Inq 4874 / Inq 4923 | TSE AIJE 0600814-85</span>
                  </div>
                </div>

                {/* Reason 3 */}
                <div className="p-4 sm:p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-blue-400 font-bold text-base sm:text-lg">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-950 border border-blue-700 text-blue-200 text-sm font-black shrink-0">
                      3
                    </span>
                    <h4>Voto a Favor do Fundão de R$ 4,9 Bi e Emendas Secretas</h4>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed pl-9">
                    Lideranças bolsonaristas (como Eduardo Bolsonaro, Carla Zambelli, Bia Kicis, Nikolas Ferreira e Flávio Bolsonaro) votaram SIM para aprovar o Fundo Eleitoral bilionário de R$ 4,9 bilhões e operaram mais de R$ 30 bilhões em <strong>Emendas de Relator (Orçamento Secreto)</strong> sem transparência.
                  </p>
                  <div className="pl-9 text-xs sm:text-sm font-mono text-slate-400 flex items-center gap-1.5 pt-1">
                    <DollarSign className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Fontes: Diário do Congresso Nacional | Painel de Emendas Orçamentárias</span>
                  </div>
                </div>

                {/* Reason 4 */}
                <div className="p-4 sm:p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-blue-400 font-bold text-base sm:text-lg">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-950 border border-blue-700 text-blue-200 text-sm font-black shrink-0">
                      4
                    </span>
                    <h4>Desmonte do Combate à Corrupção por Dentro</h4>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed pl-9">
                    Nomeação de Augusto Aras na PGR (fora da lista tríplice), indicação de Kassio Nunes Marques para o STF (que votou a favor de anulações de processos contra réus de diversos partidos) e sanção de indultos que anularam penas judiciais de aliados.
                  </p>
                  <div className="pl-9 text-xs sm:text-sm font-mono text-slate-400 flex items-center gap-1.5 pt-1">
                    <Scale className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Fontes: Decretos Presidenciais de Indulto | Votações Plenárias STF</span>
                  </div>
                </div>

                {/* Reason 5 */}
                <div className="p-4 sm:p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-blue-400 font-bold text-base sm:text-lg">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-950 border border-blue-700 text-blue-200 text-sm font-black shrink-0">
                      5
                    </span>
                    <h4>Aliança e Submissão Total ao Centrão de Valdemar</h4>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed pl-9">
                    Prometeu "acabar com a velha política", mas filiou todo o clã ao PL presidido por <strong>Valdemar Costa Neto</strong> (condenado e preso no Mensalão) e entregou ministérios e diretorias estratégicas aos mesmos líderes do Centrão investigados.
                  </p>
                  <div className="pl-9 text-xs sm:text-sm font-mono text-slate-400 flex items-center gap-1.5 pt-1">
                    <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Fontes: Registro Partidário TSE | Atos de Nomeação do Diário Oficial da União</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* THE SYMBIOSIS: O PACTO DE SOBREVIVÊNCIA (BOLSOPETISMO) */}
      {(activeSide === 'all' || activeSide === 'pacto') && (
        <div className="bg-gradient-to-br from-purple-950/60 via-slate-900 to-slate-950 border-2 border-purple-800/60 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-purple-800/40">
            <div className="p-3 bg-purple-900/80 border border-purple-700 text-purple-300 rounded-2xl shrink-0">
              <Vote className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-purple-300 block">
                A Grande Farsa da Polarização
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-serif">
                O Pacto de Sobrevivência: Por Que Eles Precisam Um do Outro
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-200">
            {/* Box 1 */}
            <div className="bg-slate-950/70 border border-purple-900/40 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-purple-300 font-bold text-base sm:text-lg">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                <h4>Inimigos na TV, Parceiros no Plenário</h4>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Nas redes sociais, alimentam torcidas com discursos de ódio e pautas de costumes para desviar a atenção. Quando as portas do Congresso se fecham, votam <strong>90% juntos</strong> em pautas de fundos bilionários, salários e privilégios.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-slate-950/70 border border-purple-900/40 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-purple-300 font-bold text-base sm:text-lg">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                <h4>O Voto do Medo e do Resgate</h4>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                O PT depende de Bolsonaro como bicho-papão para dizer: <em>"Vote em nós para o fascismo não voltar"</em>. O Bolsonarismo depende de Lula para dizer: <em>"Vote em nós para o comunismo não voltar"</em>. Nenhum dos dois tem projeto de país, apenas projeto de poder.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-slate-950/70 border border-purple-900/40 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-purple-300 font-bold text-base sm:text-lg">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                <h4>Blindagem Mútua de Impunidade</h4>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Ambos aprovaram juntos a PEC da Anistia de multas partidárias, o afrouxamento da Lei de Improbidade e mantiveram o Foro Privilegiado intacto para que parlamentares de ambos os lados fiquem imunes a investigações da Justiça comum.
              </p>
            </div>
          </div>

          {/* Final Call to Action Box */}
          <div className="mt-8 bg-slate-950 border border-amber-500/40 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-bold text-white">
                Consulte cada voto nominal e o nome dos parlamentares
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Veja a lista de todos os deputados do PT e do PL que votaram SIM em cada projeto de privilégio.
              </p>
            </div>
            <a
              href="#votacoes-conjuntas"
              onClick={() => {
                const el = document.getElementById('votacoes-conjuntas');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="min-h-[46px] px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm sm:text-base rounded-xl transition-all shadow-lg flex items-center space-x-2 shrink-0 active:scale-95"
            >
              <span>Ver Lista Nominal de Votações</span>
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
