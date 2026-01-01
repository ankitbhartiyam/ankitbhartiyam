
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

export const generateMarketingInsight = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please configure your environment.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = `
    You are the "Studio Muse" for Ankit Bhartiyam, a Fine Artist and Art Educator. 
    Ankit specializes in Acrylic and Oil portraiture. 
    
    Your role:
    - Provide artistic inspiration and portrait concepts.
    - Explain painting techniques (layering, glazing, color mixing).
    - Suggest workshop themes for students.
    - Discuss the emotional depth behind portraiture.
    
    Tone:
    - Purely artistic, soulful, and insightful.
    - Encouraging for fellow artists.
    - Never mention business, MBA, or corporate strategy.
    
    Start from a place of color and light. Keep responses concise and evocative.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.9,
        topP: 1,
      },
    });

    return response.text || "I'm sorry, the creative palette is currently being mixed.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The muse is silent for a moment. Please check back when the light changes.";
  }
};
