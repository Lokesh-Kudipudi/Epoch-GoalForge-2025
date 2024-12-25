import { generateResponse } from "./gemini";
import { generatePDF } from "./generatePdf";
import { supabase } from "./supabase";

export const getRoadMap = async (prompt) => {
  const res = await generateResponse(prompt);
  const resolutionsRegex = /<Resolutions>(.*?)<\/Resolutions>/s;
  const scoreEvalRegex = /<ScoreEval>(.*?)<\/ScoreEval>/s;
  const scoreRegex = /<Score>(.*?)<\/Score>/s;
  const tagLineRegex = /<tagLine>(.*?)<\/tagLine>/s;
  const roadmapRegex = /<roadmap>(.*?)<\/roadmap>/s;

  let resolutions = res.match(resolutionsRegex)[1];
  let scoreEval = res.match(scoreEvalRegex)[1];
  let score = res.match(scoreRegex)[1];
  let tagLine = res.match(tagLineRegex)[1];
  let roadmap = res.match(roadmapRegex)[1];

  return { resolutions, tagLine, scoreEval, score, roadmap };
};

export const LoginIn = async () => {
  try {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getPDF = async (data) => {
  await generatePDF(data);
};

export const insertData = async (user, responseObject) => {
  try {
    const { data, error } = await supabase
      .from("Query")
      .insert([{ ...user, ...responseObject }])
      .select();
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
