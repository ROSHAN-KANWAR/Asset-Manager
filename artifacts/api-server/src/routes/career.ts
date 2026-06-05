import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const careerRouter = Router();

const AGE_LIMITS = `
Common Indian exam/career age limits (General Category):
- SSC CGL: 18–32 years
- SSC CHSL: 18–27 years
- SSC Steno Grade C/D: 18–27 years
- High Court Clerk / Steno: 18–27 years (varies by state)
- UPSC IAS/IPS/IFS: 21–32 years (6 attempts)
- IBPS PO (Banking): 20–30 years
- IBPS Clerk: 20–28 years
- RRB NTPC / Railways: 18–36 years
- State PSC (PCS): 21–40 years
- NDA: 16.5–19.5 years
- CDS: 19–25 years
- NEET (Medical): No upper age limit
- JEE (Engineering): No upper age limit
- CAT / MBA entrance: No age limit
- GATE / M.Tech: No age limit
- Software / IT / Corporate private sector: No hard age limit
`;

function buildPrompt(
  name: string,
  age: string,
  educationLevel: string,
  academicData: Record<string, unknown>,
  interests: string[],
  language: "en" | "hi"
): string {
  const interestsList = interests.length > 0 ? interests.join(", ") : "Not specified";
  const ageNum = parseInt(age, 10);
  const ageLabel = !isNaN(ageNum) ? `${ageNum} years old` : "age not specified";
  const firstName = name.split(" ")[0] ?? name;

  let academicContext = "";
  if (educationLevel === "10th") {
    const subjects = (academicData["favoriteSubjects"] as string[] | undefined) ?? [];
    academicContext = `10th Marks: ${academicData["marks10"] ?? "Not provided"}%. Favorite Subjects: ${subjects.length > 0 ? subjects.join(", ") : "Not specified"}.`;
  } else if (educationLevel === "12th") {
    const subjects = (academicData["favoriteSubjects"] as string[] | undefined) ?? [];
    academicContext = `10th Marks: ${academicData["marks10"] ?? "Not provided"}%. 12th Marks: ${academicData["marks12"] ?? "Not provided"}%. 12th Stream: ${academicData["stream12"] ?? "Not provided"}. Favorite Subjects: ${subjects.length > 0 ? subjects.join(", ") : "Not specified"}.`;
  } else {
    academicContext = `10th Marks: ${academicData["marks10"] ?? "Not provided"}%. 12th Stream: ${academicData["stream12"] ?? "Not provided"}. 12th Marks: ${academicData["marks12"] ?? "Not provided"}%. Degree: ${academicData["degreeName"] ?? "Not provided"}. Specialization: ${academicData["specialization"] ?? "Not provided"}. CGPA/Percentage: ${academicData["cgpa"] ?? "Not provided"}.`;
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
          ? ["सर्वश्रेष्ठ स्नातक डिग्री विकल्प", "लक्षित प्रमुख प्रवेश परीक्षाएं", "आपकी प्रोफाइल के अनुसार करियर पथ", "आयु-पात्रता सहित सरकारी परीक्षाएं"]
          : ["Best Bachelor Degree Options", "Key Entrance Exams to Target", "Career Paths Based on Your Profile", "Government Exam Opportunities & Age Eligibility"]
        : isHindi
          ? ["करियर रोडमैप", "उच्च शिक्षा विकल्प", "आपके लिए शीर्ष कॉर्पोरेट नौकरियां", "सरकारी परीक्षाएं — आयु पात्रता विश्लेषण सहित"]
          : ["Career Roadmap", "Higher Education Options", "Top Corporate & Private Job Roles", "Government Exams — With Age Eligibility Analysis"];

  const sectionInstruction = `Include exactly 4 sections with these exact titles: "${sectionTitles.join('", "')}"`;

  const ageEligibilityInstruction = !isNaN(ageNum)
    ? `
AGE ELIGIBILITY ANALYSIS (CRITICAL — apply to every exam/job you recommend):
The student "${firstName}" is ${ageNum} years old.

Reference age limits:
${AGE_LIMITS}

Rules you MUST follow for each recommendation:
1. If the student's age is WITHIN the eligible range → Present as an active, current opportunity.
2. If the student is BELOW the minimum age → Include it but label it as a "Future Goal" and mention exactly how many years until they are eligible (e.g., "Eligible in 2 years").
3. If the student is ABOVE the maximum age → Add a clear warning like "⚠️ Age limit exceeded" and explain they are no longer eligible for this specific exam.
4. For exams/careers with NO age limit (JEE, NEET, GATE, CAT, private sector IT jobs) → Recommend freely without age caveats.
`
    : "";

  const languageInstruction = isHindi
    ? `\n\nCRITICAL LANGUAGE RULE: Write the COMPLETE JSON response in simple, professional Hindi (Devanagari script). The "summary" and every string in "items" arrays must be in Hindi. Keep exam names (JEE, NEET, UPSC, SSC CGL, IBPS, CAT, GATE, CLAT, NDA, CDS), degree names (B.Tech, MBA, M.Sc, B.Com, LLB), and technical product names in English within the Hindi text. Address the student as "${firstName} जी" in the summary. Use ⚠️ warning emoji for over-age items, ✅ for eligible items, and 🎯 for future goals.`
    : `\n\nIn the summary, address the student personally as "${firstName}". Use ⚠️ emoji for over-age warnings, ✅ for currently eligible opportunities, and 🎯 for future goals.`;

  return `You are an expert career counselor for Indian students. Provide highly personalized, age-aware career guidance.

Student Profile:
- Name: ${name}
- Age: ${ageLabel}
- Education Level: ${levelLabel}
- Academic Details: ${academicContext}
- Interests: ${interestsList}
${ageEligibilityInstruction}
${sectionInstruction}

Return ONLY a valid JSON object — no markdown, no code fences. Structure:
{
  "summary": "Personal greeting using ${firstName}'s name + 2-3 sentences about their profile and top opportunities based on their age and background",
  "sections": [
    {
      "title": "Exact section title from above",
      "items": ["Specific recommendation with age-eligibility context where relevant", "...up to 6 items"]
    }
  ]
}

Be concrete: use real exam names, real job titles, real degrees. Each item 1-2 sentences max. Apply age eligibility analysis rigorously to every government exam or age-restricted career.${languageInstruction}`;
}

careerRouter.post("/career/guidance", async (req, res) => {
  const { name, age, educationLevel, academicData, interests, language } = req.body as {
    name?: string;
    age?: string;
    educationLevel?: string;
    academicData?: Record<string, unknown>;
    interests?: string[];
    language?: "en" | "hi";
  };

  if (!educationLevel || !academicData || !interests) {
    res.status(400).json({ error: "Missing required fields" });
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
      name ?? "Student",
      age ?? "",
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
