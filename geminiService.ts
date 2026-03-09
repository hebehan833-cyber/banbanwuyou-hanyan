
import { GoogleGenAI } from "@google/genai";

// The API key is obtained directly from the environment variable as per guidelines.

export const getGeminiResponse = async (prompt: string, history: {role: string, content: string}[]) => {
  try {
    // Initialize GoogleGenAI with named parameter using process.env.API_KEY.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.content }] })),
        { role: 'user', parts: [{ text: prompt }]}
      ],
      config: {
        // Correctly using systemInstruction field in config for model behavior guidance.
        systemInstruction: "你是一位专业的医疗陪诊助手，名叫'伴伴'。你可以回答用户关于陪诊服务、就医流程、各大医院特色以及如何挂号等问题。请保持温和、专业、有耐心的语气。",
        temperature: 0.7,
        topP: 0.9,
      }
    });

    // Directly access the text property of the response object.
    return response.text || "抱歉，我暂时无法回答。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "连接智能助手失败，请稍后再试。";
  }
};
