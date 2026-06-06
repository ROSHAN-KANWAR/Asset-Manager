import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const careerRouter = Router();

// Ordered by reliability / quota availability — lite models first
const MODEL_CHAIN = [
  "gemini-2.0-flash-lite",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash",
  "gemini-2.5-flash",
];

function getStatus(err: unknown): number | null {
  if (typeof err === "object" && err !== null && "status" in err) {
    return (err as { status: number }).status;
  }
  return null;
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function buildPrompt(
  name: string,
  age: string,
  educationLevel: string,
  academicData: Record<string, unknown>,
  interests: string[],
  language: "en" | "hi"
): string {
  const ageNum = parseInt(age, 10);
  const firstName = name.split(" ")[0] ?? name;
  const isHindi = language === "hi";

  const levelLabel =
    educationLevel === "10th" ? "10th Standard" :
    educationLevel === "12th" ? "12th Standard" : "Graduate";

  let academic = "";
  if (educationLevel === "10th") {
    const subs = (academicData["favoriteSubjects"] as string[] | undefined) ?? [];
    academic = `10th: ${academicData["marks10"] ?? "?"}%. Subjects: ${subs.join(", ") || "Not specified"}.`;
  } else if (educationLevel === "12th") {
    const subs = (academicData["favoriteSubjects"] as string[] | undefined) ?? [];
    academic = `10th: ${academicData["marks10"] ?? "?"}%, 12th: ${academicData["marks12"] ?? "?"}%, Stream: ${academicData["stream12"] ?? "?"}, Subjects: ${subs.join(", ") || "Not specified"}.`;
  } else {
    academic = `Degree: ${academicData["degreeName"] ?? "?"}, Spec: ${academicData["specialization"] ?? "?"}, CGPA: ${academicData["cgpa"] ?? "?"}, 12th Stream: ${academicData["stream12"] ?? "?"}.`;
  }

  const ageNote = !isNaN(ageNum)
    ? `Student age: ${ageNum}. Apply Indian age limits: SSC CGL 18-32, SSC CHSL/Steno 18-27, UPSC 21-32, IBPS PO 20-30, RRB 18-36, NDA 16.5-19.5. Mark ✅ eligible, 🎯 future goal (under-age), ⚠️ over-age limit. JEE/NEET/CAT/GATE/IT jobs have no age limit.`
    : "";

  const sections =
    educationLevel === "10th"
      ? isHindi
        ? ["10वीं के बाद स्ट्रीम विकल्प", "डिप्लोमा और कोर्स", "जरूरी कौशल", "प्रतियोगी परीक्षाएं"]
        : ["Streams After 10th", "Diploma & Courses", "Skills to Build", "Exams to Explore"]
      : educationLevel === "12th"
        ? isHindi
          ? ["स्नातक डिग्री विकल्प", "प्रवेश परीक्षाएं", "करियर पथ", "सरकारी परीक्षाएं और आयु पात्रता"]
          : ["Degree Options", "Entrance Exams", "Career Paths", "Govt Exams & Age Eligibility"]
        : isHindi
          ? ["करियर रोडमैप", "उच्च शिक्षा", "कॉर्पोरेट नौकरियां", "सरकारी परीक्षाएं और आयु पात्रता"]
          : ["Career Roadmap", "Higher Education", "Corporate Jobs", "Govt Exams & Age Eligibility"];

  const langRule = isHindi
    ? `Write entire JSON in Hindi (Devanagari). Keep exam/degree names in English. Address as "${firstName} जी".`
    : `Address student as "${firstName}" in summary.`;

  return `Indian student career counselor. Return ONLY valid JSON, no markdown.

Student: ${name}, ${ageNum || "?"} yrs, ${levelLabel}
Academics: ${academic}
Interests: ${interests.join(", ") || "Not specified"}
${ageNote}

Sections (use EXACTLY these titles): ${sections.map((s, i) => `${i + 1}."${s}"`).join(", ")}

JSON format:
{"summary":"2-sentence personal greeting+overview","sections":[{"title":"exact title","items":["item (4-5 items each)"]}]}

Rules: Real exam names, concrete advice, age eligibility on every govt exam. ${langRule}`;
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

  const prompt = buildPrompt(
    name ?? "Student",
    age ?? "",
    educationLevel,
    academicData,
    interests,
    language ?? "en"
  );

  const genAI = new GoogleGenerativeAI(apiKey);
  let lastErr: unknown;
  let lastStatus: number | null = null;

  for (const modelName of MODEL_CHAIN) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: { responseMimeType: "application/json", maxOutputTokens: 2048 } as object,
      });

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      let parsed: { summary: string; sections: { title: string; items: string[] }[] };
      try {
        parsed = JSON.parse(text) as typeof parsed;
      } catch {
        req.log.error({ text, modelName }, "JSON parse failed");
        res.status(500).json({ error: "AI returned an unexpected format. Please retry." });
        return;
      }

      req.log.info({ modelName }, "Career guidance OK");
      res.json(parsed);
      return;
    } catch (err) {
      lastErr = err;
      lastStatus = getStatus(err);
      req.log.warn({ modelName, status: lastStatus }, "Model failed, trying next");

      if (lastStatus === 503) {
        await sleep(1500); // brief pause for overload, then try next model
      } else if (lastStatus === 429 || lastStatus === 404) {
        // 429 = quota exhausted for this model → next model has own quota
        // 404 = model name not available → try next
      } else {
        // auth error, bad request, etc. — don't try other models
        break;
      }
    }
  }

  req.log.error({ err: lastErr, lastStatus }, "All models failed");
  const msg =
    lastStatus === 429
      ? "Daily AI quota reached. Please try again in a few minutes."
      : "AI service is temporarily busy. Please tap 'Try Again'.";
  res.status(500).json({ error: msg });
});

export default careerRouter;
