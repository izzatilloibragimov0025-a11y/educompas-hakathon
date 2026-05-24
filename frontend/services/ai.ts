import { GoogleGenAI, Type } from '@google/genai';
import { GameTask } from '../types';

// Initialize the SDK. Assumes process.env.API_KEY is available in the environment.
// For this browser-based demo without a bundler injecting env vars, we handle the missing key gracefully.
let ai: GoogleGenAI | null = null;
try {
  // In a real app, this would be securely injected.
  const apiKey = (window as any).process?.env?.API_KEY || 'dummy_key_for_types'; 
  ai = new GoogleGenAI({ apiKey: apiKey, vertexai: true });
} catch (e) {
  console.warn("Failed to initialize GoogleGenAI. Using mock data fallback.");
}

export const generateMissionTask = async (interests: string[], age: number, gender: 'boy' | 'girl'): Promise<GameTask> => {
  const primaryInterest = interests[0] || 'space';
  
  // Fallback mock data if API is not configured or fails
  const mockFallback: GameTask = {
    dialogue: `Ajoyib! Koinot kemamizni uchirish uchun bizga 3 ta yulduz kerak. Ularni topa olasanmi?`,
    taskType: 'count',
    targetItem: 'star',
    targetCount: 3,
    options: ['star', 'star', 'moon', 'star', 'planet'],
    concept: 'Math'
  };

  if (!ai || (window as any).process?.env?.API_KEY === undefined) {
    console.log("Using mock AI response due to missing API key.");
    return new Promise(resolve => setTimeout(() => resolve(mockFallback), 1500));
  }

  try {
    const prompt = `
      Generate a simple educational mini-game task for a ${age}-year-old ${gender === 'girl' ? 'girl' : 'boy'}.
      Their main interest is: ${primaryInterest}.
      
      The task should be simple, like counting objects or finding a specific object.
      Keep the dialogue in Uzbek language, friendly, encouraging, and spoken by a robot car named "Astro-Car".
      
      Return ONLY a JSON object matching this schema.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            dialogue: { 
              type: Type.STRING, 
              description: "Astro-Car's spoken instruction in Uzbek." 
            },
            taskType: { 
              type: Type.STRING, 
              description: "Either 'count' or 'find'" 
            },
            targetItem: { 
              type: Type.STRING, 
              description: "A simple noun in English that has a common emoji (e.g., 'star', 'car', 'dino', 'apple', 'crown', 'doll', 'cat')" 
            },
            targetCount: { 
              type: Type.INTEGER, 
              description: "Number of items to find/count (between 1 and 5)" 
            },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Array of 5 item names (English) to display on screen. Must include the targetItem the correct number of times."
            },
            concept: {
              type: Type.STRING,
              description: "The educational concept (e.g., 'Math', 'Logic')"
            }
          },
          required: ["dialogue", "taskType", "targetItem", "targetCount", "options", "concept"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GameTask;
    }
    return mockFallback;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return mockFallback;
  }
};

export const generatePhygitalTask = async (interests: string[]): Promise<string> => {
  const primaryInterest = interests[0] || 'space';
  const mockFallback = "Uydagi 3 ta dumaloq narsani topib, ota-onangga ko'rsat!";

  if (!ai || (window as any).process?.env?.API_KEY === undefined) {
    return mockFallback;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a short, fun physical (offline) task for a preschooler interested in ${primaryInterest}. 
                 It should take them away from the screen. 
                 Language: Uzbek. Max 2 sentences.`,
    });
    return response.text || mockFallback;
  } catch (e) {
    return mockFallback;
  }
};
