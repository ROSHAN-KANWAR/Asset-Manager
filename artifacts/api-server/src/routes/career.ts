import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const careerRouter = Router();

function buildPrompt(
  educationLevel: string,
  academicData: Record<string, unknown>,
  interests: string[],
  language: "en" | "hi"
): string {
  const interestsList = interests.length > 0 ? interests.join(", ") : "Not specified";

  let academicContext = "";
  if (educationLevel === "10th") {
    const subjects = (academicData["favoriteSubjects"] as string[] | undefined) ?? [];
    academicContext = `10th Board Marks/Percentage: ${academicData["marks10"] ?? "Not provided"}. Favorite Subjects: ${subjects.length > 0 ? subjects.join(", ") : "Not specified"}.`;
  } else if (educationLevel === "12th") {
    const subjects = (academicData["favoriteSubjects"] as string[] | undefined) ?? [];
    academicContext = `10th Marks: ${academicData["marks10"] ?? "Not provided"}. 12th Marks: ${academicData["marks12"] ?? "Not provided"}. 12th Stream: ${academicData["stream12"] ?? "Not provided"}. Favorite Subjects: ${subjects.length > 0 ? subjects.join(", ") : "Not specified"}.`;
  } else {
    academicContext = `10th Marks: ${academicData["marks10"] ?? "Not provided"}. 12th Stream: ${academicData["stream12"] ?? "Not provided"}. 12th Marks: ${academicData["marks12"] ?? "Not provided"}. Graduation Degree: ${academicData["degreeName"] ?? "Not provided"}. Specialization: ${academicData["specialization"] ?? "Not provided"}. CGPA/Percentage: ${academicData["cgpa"] ?? "Not provided"}.`;
  }

  const levelLabel =
    educationLevel === "10th"
      ? "10th Standard"
      : educationLevel === "12th"
        ? "12th Standard"
        : "Graduate";

  const isHindi = language === "hi";

  const sectionTitles =
    educationLevel === "10th"
      ? isHindi
        ? ["10वीं के बाद अनुशंसित स्ट्रीम", "डिप्लोमा और अल्पकालिक कोर्स", "अभी सीखने योग्य कौशल", "खोजने योग्य प्रतियोगी परीक्षाएं"]
        : ["Recommended Streams After 10th", "Diploma & Short-Term Courses", "Skills to Start Building Now", "Competitive Exams to Explore"]
      : educationLevel === "12th"
        ? isHindi
          ? ["सर्वश्रेष्ठ स्नातक डिग्री विकल्प", "लक्षित प्रमुख प्रवेश परीक्षाएं", "आपकी प्रोफाइल के अनुसार करियर पथ", "प्रवेश स्तर के नौकरी के अवसर"]
          : ["Best Bachelor Degree Options", "Key Entrance Exams to Target", "Career Paths Based on Your Profile", "Entry-Level Job Opportunities"]
        : isHindi
          ? ["करियर रोडमैप", "उच्च शिक्षा विकल्प", "आपके लिए शीर्ष कॉर्पोरेट नौकरियां", "सरकारी परीक्षा के अवसर"]
          : ["Career Roadmap", "Higher Education Options", "Top Corporate Job Roles for You", "Government Exam Opportunities"];

  const sectionInstruction = `Include exactly 4 sections with these exact titles: "${sectionTitles.join('", "')}"`;

  const languageInstruction = isHindi
    ? `\n\nCRITICAL LANGUAGE RULE: Write the ENTIRE JSON response in simple, easy-to-understand Hindi (Devanagari script). This means the "summary" field and every string in "items" arrays must be in Hindi. Keep exam names (JEE, NEET, UPSC, SSC CGL, IBPS, CAT, GATE, CLAT, CUET, NDA), degree abbreviations (B.Tech, MBA, M.Sc, B.Com, LLB, MBBS), and technical product names (Python, Java, Photoshop) in their original English form within the Hindi sentences. Use language that a Class 10 student can easily read and understand.`
    : "";

  return `You are an expert career counselor for Indian students. Provide personalized career guidance based on this profile.

Student Profile:
- Education Level: ${levelLabel}
- Academic Details: ${academicContext}
- Interests: ${interestsList}

${sectionInstruction}

Return ONLY a valid JSON object — no markdown, no code fences, just the JSON. Structure:
{
  "summary": "A warm, personalized 2-3 sentence overview specific to their profile",
  "sections": [
    {
      "title": "Section Title (use the exact titles specified above)",
      "items": ["Specific actionable recommendation 1", "...up to 6 items"]
    }
  ]
}

Make every item concrete and specific. Mention real exam names, real job titles, real degrees. Each item should be 1-2 sentences max.${languageInstruction}`;
}

careerRouter.post("/career/guidance", async (req, res) => {
  const { educationLevel, academicData, interests, language } = req.body as {
    educationLevel?: string;
    academicData?: Record<string, unknown>;
    interests?: string[];
    language?: "en" | "hi";
  };

  if (!educationLevel || !academicData || !interests) {
    res.status(400).json({ error: "Missing required fields: educationLevel, academicData, interests" });
    return;
  }

  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) {
    res.status(500).json({ error: "AI service not configured." });
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

    const prompt = buildPrompt(
      educationLevel,
      academicData,
      interests,
      language ?? "en"
    );

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
