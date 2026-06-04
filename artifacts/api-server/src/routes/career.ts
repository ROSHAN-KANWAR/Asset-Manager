import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const careerRouter = Router();

function buildPrompt(
  educationLevel: string,
  academicData: Record<string, unknown>,
  interests: string[]
): string {
  const interestsList = interests.length > 0 ? interests.join(", ") : "Not specified";

  let academicContext = "";
  if (educationLevel === "10th") {
    const subjects = (academicData.favoriteSubjects as string[] | undefined) ?? [];
    academicContext = `10th Board Marks/Percentage: ${academicData.marks10 ?? "Not provided"}. Favorite Subjects: ${subjects.length > 0 ? subjects.join(", ") : "Not specified"}.`;
  } else if (educationLevel === "12th") {
    const subjects = (academicData.favoriteSubjects as string[] | undefined) ?? [];
    academicContext = `10th Marks: ${academicData.marks10 ?? "Not provided"}. 12th Marks: ${academicData.marks12 ?? "Not provided"}. 12th Stream: ${academicData.stream12 ?? "Not provided"}. Favorite Subjects: ${subjects.length > 0 ? subjects.join(", ") : "Not specified"}.`;
  } else {
    academicContext = `10th Marks: ${academicData.marks10 ?? "Not provided"}. 12th Stream: ${academicData.stream12 ?? "Not provided"}. 12th Marks: ${academicData.marks12 ?? "Not provided"}. Graduation Degree: ${academicData.degreeName ?? "Not provided"}. Specialization: ${academicData.specialization ?? "Not provided"}. CGPA/Percentage: ${academicData.cgpa ?? "Not provided"}.`;
  }

  const levelLabel =
    educationLevel === "10th"
      ? "10th Standard"
      : educationLevel === "12th"
        ? "12th Standard"
        : "Graduate";

  const sectionInstructions =
    educationLevel === "10th"
      ? `Include exactly 4 sections with these titles: "Recommended Streams After 10th", "Diploma & Short-Term Courses", "Skills to Start Building Now", "Competitive Exams to Explore"`
      : educationLevel === "12th"
        ? `Include exactly 4 sections with these titles: "Best Bachelor Degree Options", "Key Entrance Exams to Target", "Career Paths Based on Your Profile", "Entry-Level Job Opportunities"`
        : `Include exactly 4 sections with these titles: "Career Roadmap", "Higher Education Options", "Top Corporate Job Roles for You", "Government Exam Opportunities"`;

  return `You are an expert career counselor specializing in Indian education and career paths. Provide personalized career guidance for the following student profile.

Student Profile:
- Education Level: ${levelLabel}
- Academic Details: ${academicContext}
- Interests: ${interestsList}

${sectionInstructions}

Return ONLY a valid JSON object — no markdown, no explanation, no code fences. Use this exact structure:
{
  "summary": "A warm, personalized 2-3 sentence overview acknowledging their profile and strengths. Be encouraging and specific to their background.",
  "sections": [
    {
      "title": "Section Title",
      "items": ["Specific actionable recommendation 1", "Specific recommendation 2", "up to 6 items"]
    }
  ]
}

Make every item concrete, specific to their interests and background. Mention real exam names, real degree names, real job titles. Each item should be 1-2 sentences max.`;
}

careerRouter.post("/career/guidance", async (req, res) => {
  const { educationLevel, academicData, interests } = req.body as {
    educationLevel?: string;
    academicData?: Record<string, unknown>;
    interests?: string[];
  };

  if (!educationLevel || !academicData || !interests) {
    res.status(400).json({ error: "Missing required fields: educationLevel, academicData, interests" });
    return;
  }

  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) {
    res.status(500).json({ error: "AI service not configured. Please set GEMINI_API_KEY." });
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        maxOutputTokens: 8192,
      } as object,
    });

    const prompt = buildPrompt(educationLevel, academicData, interests);
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let parsed: { summary: string; sections: { title: string; items: string[] }[] };
    try {
      parsed = JSON.parse(text) as typeof parsed;
    } catch {
      req.log.error({ text }, "Failed to parse AI response as JSON");
      res.status(500).json({ error: "AI returned an unexpected response format. Please retry." });
      return;
    }

    res.json(parsed);
  } catch (err) {
    req.log.error({ err }, "Career guidance AI error");
    res.status(500).json({ error: "Failed to generate career guidance. Please try again." });
  }
});

export default careerRouter;
