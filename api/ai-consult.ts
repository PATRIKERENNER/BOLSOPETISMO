import { GoogleGenAI } from "@google/genai";

// Vercel Serverless Function handler for /api/ai-consult
export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido. Use POST." });
  }

  try {
    const { question, context } = req.body || {};

    if (!question || typeof question !== "string" || question.trim() === "") {
      return res.status(400).json({ error: "Pergunta inválida ou em branco." });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "";

    if (!apiKey) {
      return res.status(200).json({
        answer: `**Nota do Observatório:** A chave da API do Gemini (GEMINI_API_KEY) não está configurada nas Variáveis de Ambiente da Vercel.\n\nPara ativar a consulta em tempo real com IA:\n1. Acesse seu painel da Vercel > **Settings** > **Environment Variables**.\n2. Adicione a variável \`GEMINI_API_KEY\` com sua chave obtida gratuitamente no Google AI Studio.\n3. Faça um novo deploy.\n\n*Resposta base dos dados públicos:* A consulta sobre "${question}" envolve dados registrados no STF, TSE, TCU e Portal da Transparência disponíveis nas abas de Dossiês, Votações Conjuntas e Linha do Tempo da plataforma.`,
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const systemInstruction = `Você é um analista jurídico e historiador político independente do Brasil, especializado em dados públicos, jurisprudência do Supremo Tribunal Federal (STF), Tribunal Superior Eleitoral (TSE), Tribunal de Contas da União (TCU) e Ministério Público Federal (MPF).
Sua missão é fornecer respostas estritamente neutras, objetivas, fundamentadas em dados públicos oficiais e jurisprudência confirmada sobre os movimentos políticos conhecidos como Bolsonarismo e Petismo.

Mantenha sempre um tom neutro, jornalístico e educativo:
1. Cite números de processos judiciais (Inquéritos, Ações Penais, Ações de Investigação Judicial Eleitoral - AIJE), acórdãos ou órgãos oficiais quando relevante.
2. Explique os dois lados quando houver controvérsia jurídica (ex: condenação x anulação/prescrição por foro/suspeição).
3. Não emita opiniões pessoais ou ofensas partidárias.
4. Responda em Português do Brasil com formatação clara em Markdown (títulos curtos, tópicos legíveis e letras legíveis).`;

    const prompt = context
      ? `Contexto dos dados consultados pelo usuário: ${JSON.stringify(context)}\n\nPergunta do usuário: ${question}`
      : `Pergunta do usuário sobre política e dados públicos judiciais do Brasil: ${question}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    const text = response.text || "Não foi possível obter uma resposta do modelo no momento.";
    return res.status(200).json({ answer: text });
  } catch (error: any) {
    console.error("Erro na API serverless Vercel /api/ai-consult:", error);
    return res.status(500).json({
      error: error?.message || "Ocorreu um erro ao processar sua consulta jurídica.",
    });
  }
}
