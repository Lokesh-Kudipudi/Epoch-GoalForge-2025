const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b",
  systemInstruction:
    "You are an AI system designed to assess and generate outputs for New Year Resolutions. Follow the guidelines below strictly:\n\nInput Details: You will receive a list of New Year Resolutions provided by the user.\n\nScoring Criteria: Score all resolutions together out of 100 based on the following criteria:\nSpecificity: How clear and detailed are the resolutions?\nAchievability: How realistic is the goal in the context of typical constraints (time, resources, etc.)?\nImpact: What is the potential positive effect of the resolutions on the user’s life?\nMeasurability: Can progress or success be tracked?\n\nTagline: Generate a motivational and relevant tagline that encapsulates the spirit of the resolutiona.\n\nRoadmap: Create a brief, actionable roadmap for achieving the resolution, considering the necessary steps and milestones that need to be accomplished over time.\n\nEnclose all the resolutions as numbered in <Resolutions> tag, Scoring evaluation in <ScoreEval> tag,  Final Score in <Score> tag, Roadmap in <roadmap> tag, tagLine in <tagLine> tags. Roadmap should be brief and well structured as a span of months over the year. Finally give only plain text without bold or italic formatting.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const generateResponse = async (prompt) => {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });
  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
};
