const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b",
  systemInstruction:
    "You are an AI system designed to assess and generate outputs for New Year Resolutions. Follow the guidelines below strictly:\n\nInput Details: You will receive a list of New Year Resolutions provided by the user.\n\nScoring Criteria: Score all resolutions together out of 100 based on the following criteria:\nSpecificity: How clear and detailed are the resolutions?\nAchievability: How realistic is the goal in the context of typical constraints (time, resources, etc.)?\nImpact: What is the potential positive effect of the resolutions on the user’s life?\nMeasurability: Can progress or success be tracked?\n\nTagline: Generate a motivational and relevant tagline that encapsulates the spirit of the resolutiona.\n\nRoadmap: Create a brief, actionable roadmap for achieving the resolution, considering the necessary steps and milestones that need to be accomplished over time.\n\nOutput : \n1) Enclose all the resolutions as numbered in <Resolutions> tag, Scoring evaluation in <ScoreEval> tag,  Final Score in <Score> tag, Roadmap in <roadmap> tag, tagLine in <tagLine> tags\n2) Roadmap should be brief and well structured as a span of months over the year, Give a line space for each paragraph\n3) Finally don't use bold or italic texts, use hyphen if listing is required",
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
    history: [
      {
        role: "user",
        parts: [{ text: "Gym Every Day" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "<Resolutions>\n1. Gym Every Day\n</Resolutions>\n\n<ScoreEval>\nResolution 1:\nSpecificity - Poor, \"Gym Every Day\" is very vague.  It doesn't specify the type of exercise, frequency, or time commitment.\nAchievability - Very Poor to Poor,  maintaining a gym routine daily can be extremely difficult, and potentially damaging without proper planning, rest, and injury prevention.  The resolution lacks context for individual needs and limitations.\nImpact - High potential, if done correctly and sustainably, for improved physical and mental health.\nMeasurability - Poor, no concrete metrics for success are mentioned.\n\n\n</ScoreEval>\n\n<Score>\n40/100\n</Score>\n\n<tagLine>\nConsistently build a healthier lifestyle.\n</tagLine>\n\n<roadmap>\nJanuary-February:\n- Assess current fitness level and identify any limitations or injuries.  Schedule appointments with a doctor or physical therapist if needed.\n- Plan a realistic, gradual exercise routine. Don't aim for gym every day at the outset. Start with 3-4 days a week to avoid burn out or injury.\n\nMarch-April:\n- Focus on consistency, incorporating different forms of exercise.\n- Incorporate rest days and active recovery into the schedule. This includes yoga, stretching, or walking to facilitate proper muscle repair and prevent overtraining.\n\nMay-June:\n- Increase frequency and duration of workouts if comfortable.\n- Begin to experiment with different types of workouts to maintain interest.\n\nJuly-August\n- Continue to monitor progress and make adjustments to the schedule based on any new goals or injuries.\n\n\nSeptember-October:\n- Explore different group activities or gym classes to continue motivation.\n- Evaluate results, are there any areas where progress can be improved further?\n- Aim for 5 or more days at the gym if comfortable and sustainable.\n\n\nNovember-December:\n- Review progress and adjust routines to support continued motivation.\n- Evaluate rest days, ensuring they are properly incorporated to prevent fatigue and ensure consistent results.\n</roadmap>\n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "1) Learn a New Skill bsaed on full stack MERN web dev for 3 Hours per Week\n2) Cardiac exercise for 30 Minutes, 5 Days a Week\n3) Read 12 self help Books by the End of the Year (1 Book per Month)",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "<Resolutions>\n1. Learn a New Skill based on full stack MERN web dev for 3 Hours per Week\n2. Cardiac exercise for 30 Minutes, 5 Days a Week\n3. Read 12 self help Books by the End of the Year (1 Book per Month)\n</Resolutions>\n\n<ScoreEval>\nResolution 1:\nSpecificity - Good, specifies a skill (full-stack MERN development), time commitment (3 hours/week).\nAchievability - Good, 3 hours per week is a manageable commitment for many.\nImpact - High, learning a valuable skill like web development opens up career opportunities and personal projects.\nMeasurability - Good, progress can be measured by completing projects, gaining certifications, and demonstrating understanding.\n\n\nResolution 2:\nSpecificity - Good, specifies the type of exercise (cardiac), duration (30 minutes), and frequency (5 days/week).\nAchievability - Good to Excellent, 30 minutes of exercise 5 days a week is a realistic goal for most.\nImpact - High, cardiac exercise has numerous health benefits, including improved cardiovascular health and stress management.\nMeasurability - Good, progress can be tracked through monitoring heart rate, time spent exercising, and feeling of improvement.\n\n\nResolution 3:\nSpecificity - Good, specifies the type of books (self-help), target quantity (12 books), and timeframe (one per month).\nAchievability - Good, 1 book per month is a reasonable reading goal for most.\nImpact - High, self-help books can lead to personal growth, improved mindset, and better decision-making.\nMeasurability - Good, progress can be tracked by checking off books read, reflecting on insights gained, and noticing changes in behavior.\n\n\n</ScoreEval>\n\n<Score>\n90/100\n</Score>\n\n<tagLine>\nMastering skills, a healthier heart, and enriching insights for a well-rounded year.\n</tagLine>\n\n<roadmap>\nJanuary-March:\n- Set up a dedicated learning schedule for the MERN stack. Find resources like tutorials, courses, and communities.\n- Start a log of your daily exercise, noting how you feel, your heart rate, and any challenges.\n- Select a self-help book focused on goal-setting and time management for optimal habit formation.\n\n\nApril-June:\n- Focus on building practical projects to apply your MERN stack knowledge.\n- Gradually increase the intensity of your cardiac workouts, if you feel capable and fit.\n- Complete a self-help book focused on motivation and overcoming procrastination to improve your learning process.\n\n\nJuly-September:\n- Explore more advanced aspects of the MERN stack, perhaps focusing on specific areas of web development.\n- Continuously monitor and adjust your exercise routine to maintain motivation and prevent plateau.\n- Choose a self-help book focused on personal finance and budgeting to learn and apply financial knowledge.\n\n\nOctober-December:\n- Complete a portfolio of MERN stack projects.\n- Evaluate your exercise routine for the year, making adjustments for sustainability and improvement.\n- Focus on a self-help book that aligns with your personal growth objectives and areas of development.  Complete the 12 books by the end of the year.\n- Reflect on the progress made and adjust strategies for the upcoming year.\n\n\n</roadmap>\n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "1. Improve programming skills by completing one project each month.\n2. Learn a new technology every quarter.\n3. Solve 100 coding problems by the end of the year.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "<Resolutions>\n1. Improve programming skills by completing one project each month.\n2. Learn a new technology every quarter.\n3. Solve 100 coding problems by the end of the year.\n</Resolutions>\n\n<ScoreEval>\nResolution 1:\nSpecificity - Good, specifies a quantifiable goal (one project/month).\nAchievability - Good, completing one project per month is achievable with dedicated effort and choosing suitable project complexity.\nImpact - High, completing projects strengthens programming skills and builds a portfolio.\nMeasurability - Good, the projects can serve as tangible evidence of progress.\n\n\nResolution 2:\nSpecificity - Good, specifies a quantifiable goal (one technology/quarter).\nAchievability - Good to Excellent, depends heavily on how much time is available and the complexity of the technology.\nImpact - High, learning new technologies broadens skill set and keeps pace with industry changes.\nMeasurability - Good, new technologies learned can be noted and assessed through practical application.\n\n\nResolution 3:\nSpecificity - Good, specifies a quantifiable goal (100 problems).\nAchievability - Good to Excellent, depends heavily on the difficulty of the coding problems and user's learning pace.\nImpact - High, solving coding problems improves problem-solving abilities, logical thinking, and programming skills.\nMeasurability - Good, progress is directly tracked by the number of problems solved.\n\n\n</ScoreEval>\n\n<Score>\n80/100\n</Score>\n\n<tagLine>\nLevel up your programming skills, one project and technology at a time.\n</tagLine>\n\n<roadmap>\nJanuary-March:\n- Identify a programming project for January, suitable for your skills and available time. This could be building a simple web application or a command-line tool.\n- Begin research and selecting the new technology for Q1 (e.g., a specific framework, library, or programming language).\n\n\nApril-June:\n- Focus on the programming project for April. Ensure there is a clear definition of goals and the steps involved.\n- Dive into the new technology for Q1, creating a learning plan and identifying relevant tutorials or courses.\n\n\nJuly-September:\n- Complete the programming project for May. Reflect on the process and any lessons learned.\n- Start the learning process for Q2's new technology.\n- Begin with easy coding problems to build momentum. Aim for 25-30 problems per quarter.\n\n\nOctober-December:\n- Complete the programming project for June. Continuously monitor your progress and track your coding problem solving.\n- Begin learning the Q3 technology.\n- Aim for 30+ coding problems in the final quarter.\n- Evaluate progress, identify areas needing improvement and plan for the new year.\n</roadmap>\n",
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
};
