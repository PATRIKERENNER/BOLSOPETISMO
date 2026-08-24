import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API route for AI Public Record Query Assistant
app.post("/api/ai-consult", async (req, res) => {
  try {
    const { question, context } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Pergunta inválida ou em branco." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Chave da API do Gemini não configurada no servidor. Configure GEMINI_API_KEY no painel de Secrets.",
      });
    }

    const systemInstruction = `Você é um analista jurídico e historiador político independente do Brasil, especializado em dados públicos, jurisprudência do Supremo Tribunal Federal (STF), Tribunal Superior Eleitoral (TSE), Tribunal de Contas da União (TCU) e Ministério Público Federal (MPF).
Sua missão é fornecer respostas estritamente neutras, objetivas, fundamentadas em dados públicos oficiais e jurisprudência confirmada sobre os movimentos políticos conhecidos como Bolsonarismo e Petismo.

Mantenha sempre um tom neutro, jornalístico e educativo:
1. Cite números de processos judiciais (Inquéritos, Ações Penais, Ações de Investigação Judicial Eleitoral - AIJE), acórdãos ou órgãos oficiais quando relevante.
2. Explique os dois lados quando houver controvérsia jurídica (ex: condenação x anulação/prescrição por foro/suspeição).
3. Não emita opiniões pessoais ou ofensas partidárias.
4. Responda em Português do Brasil com excelente formatação em Markdown (títulos curtos, tópicos legíveis).`;

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
    return res.json({ answer: text });
  } catch (error: any) {
    console.error("Erro na API de consulta Gemini:", error);
    return res.status(500).json({
      error: error?.message || "Ocorreu um erro ao processar sua consulta jurídica.",
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
  });
}

startServer();
