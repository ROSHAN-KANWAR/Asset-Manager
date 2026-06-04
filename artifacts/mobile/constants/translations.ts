export type Language = "en" | "hi";

const translations = {
  en: {
    lang: { en: "English", hi: "हिंदी" } as Record<Language, string>,

    welcome: {
      title: "AI Career Coach",
      subtitle: "Your AI-powered guide to the perfect career path",
      selectLevel: "SELECT YOUR CURRENT LEVEL",
      continue: "Continue",
      levels: {
        "10th": {
          label: "10th Student",
          sublabel: "Class X",
          description: "Explore streams, diplomas & early career skills",
        },
        "12th": {
          label: "12th Student",
          sublabel: "Class XII",
          description: "Discover degrees, entrance exams & career paths",
        },
        graduate: {
          label: "Graduate",
          sublabel: "Degree Holder",
          description: "Find jobs, higher education & govt exam roadmaps",
        },
      },
    },

    academic: {
      title: "Academic Profile",
      step: "Step 1 of 3",
      next: "Next: Interests",
      marks10Label: "10th Board Marks / Percentage (%)",
      marks10Placeholder: "e.g. 85.5",
      marks12Label: "12th Marks / Percentage (%)",
      marks12Placeholder: "e.g. 78",
      stream12Label: "12th Stream",
      streams: [
        { value: "Science (PCM)", label: "Science (PCM)" },
        { value: "Science (PCB)", label: "Science (PCB)" },
        { value: "Commerce", label: "Commerce" },
        { value: "Arts/Humanities", label: "Arts/Humanities" },
      ],
      degreeLabel: "Graduation Degree",
      degreePlaceholder: "e.g. B.Tech, B.Com, B.Sc, B.A",
      specializationLabel: "Specialization / Major",
      specializationPlaceholder: "e.g. Computer Science, Finance, Biology",
      cgpaLabel: "CGPA / Percentage (%)",
      cgpaPlaceholder: "e.g. 7.8 or 72%",
      subjectsLabel: "Favorite Subjects (pick any)",
      errors: {
        marks10Required: "10th marks are required",
        marks10Invalid: "Enter a valid percentage between 1 and 100",
        marks12Required: "12th marks are required",
        marks12Invalid: "Enter a valid percentage between 1 and 100",
        stream12Required: "Please select your 12th stream",
        degreeRequired: "Degree name is required",
        cgpaRequired: "CGPA or percentage is required",
      },
    },

    interests: {
      title: "Your Interests",
      step: "Step 2 of 3",
      subtitle: "Select areas that excite you — choose as many as you like",
      hint: "Select at least one interest to continue",
      analyze: "Get AI Career Guidance",
      items: {
        "Tech & Coding": { label: "Tech & Coding", description: "Software, AI, data & web" },
        "Government Exams": { label: "Government Exams", description: "UPSC, SSC, banking & more" },
        "Management & Business": { label: "Management & Business", description: "MBA, startups & corporate" },
        "Creative Arts & Design": { label: "Creative Arts & Design", description: "Art, design, media & fashion" },
        "Banking & Finance": { label: "Banking & Finance", description: "Finance, investment & banking" },
        "Law & Judiciary": { label: "Law & Judiciary", description: "Law, courts & legal services" },
      },
    },

    results: {
      title: "Career Guidance",
      step: "Step 3 of 3",
      analysisLabel: "AI ANALYSIS",
      analyzing: "Analyzing Your Profile",
      analyzingSubtitle: "Our AI is crafting personalized guidance just for you",
      errorTitle: "Couldn't Fetch Guidance",
      retry: "Try Again",
      startOver: "Start New Assessment",
      levelLabels: {
        "10th": "10th Student",
        "12th": "12th Student",
        graduate: "Graduate",
      } as Record<string, string>,
    },

    common: { back: "Back" },
  },

  hi: {
    lang: { en: "English", hi: "हिंदी" } as Record<Language, string>,

    welcome: {
      title: "AI करियर कोच",
      subtitle: "आपके सही करियर के लिए AI-संचालित मार्गदर्शक",
      selectLevel: "अपना वर्तमान स्तर चुनें",
      continue: "आगे बढ़ें",
      levels: {
        "10th": {
          label: "10वीं का छात्र",
          sublabel: "कक्षा X",
          description: "स्ट्रीम, डिप्लोमा और करियर कौशल खोजें",
        },
        "12th": {
          label: "12वीं का छात्र",
          sublabel: "कक्षा XII",
          description: "डिग्री, प्रवेश परीक्षा और करियर पथ जानें",
        },
        graduate: {
          label: "स्नातक",
          sublabel: "डिग्री धारक",
          description: "नौकरी, उच्च शिक्षा और सरकारी परीक्षा रोडमैप",
        },
      },
    },

    academic: {
      title: "शैक्षणिक प्रोफाइल",
      step: "चरण 1 / 3",
      next: "रुचियां: आगे",
      marks10Label: "10वीं के अंक / प्रतिशत (%)",
      marks10Placeholder: "जैसे 85.5",
      marks12Label: "12वीं के अंक / प्रतिशत (%)",
      marks12Placeholder: "जैसे 78",
      stream12Label: "12वीं स्ट्रीम",
      streams: [
        { value: "Science (PCM)", label: "विज्ञान (PCM)" },
        { value: "Science (PCB)", label: "विज्ञान (PCB)" },
        { value: "Commerce", label: "वाणिज्य" },
        { value: "Arts/Humanities", label: "कला / मानविकी" },
      ],
      degreeLabel: "स्नातक की डिग्री",
      degreePlaceholder: "जैसे B.Tech, B.Com, B.Sc, B.A",
      specializationLabel: "विशेषज्ञता / मुख्य विषय",
      specializationPlaceholder: "जैसे Computer Science, Finance, Biology",
      cgpaLabel: "CGPA / प्रतिशत (%)",
      cgpaPlaceholder: "जैसे 7.8 या 72%",
      subjectsLabel: "पसंदीदा विषय (कोई भी चुनें)",
      errors: {
        marks10Required: "10वीं के अंक आवश्यक हैं",
        marks10Invalid: "1 से 100 के बीच वैध प्रतिशत दर्ज करें",
        marks12Required: "12वीं के अंक आवश्यक हैं",
        marks12Invalid: "1 से 100 के बीच वैध प्रतिशत दर्ज करें",
        stream12Required: "कृपया अपनी 12वीं स्ट्रीम चुनें",
        degreeRequired: "डिग्री का नाम आवश्यक है",
        cgpaRequired: "CGPA या प्रतिशत आवश्यक है",
      },
    },

    interests: {
      title: "आपकी रुचियां",
      step: "चरण 2 / 3",
      subtitle: "जो क्षेत्र आपको पसंद हैं उन्हें चुनें — जितने चाहें उतने",
      hint: "जारी रखने के लिए कम से कम एक रुचि चुनें",
      analyze: "AI करियर मार्गदर्शन पाएं",
      items: {
        "Tech & Coding": { label: "तकनीक और कोडिंग", description: "सॉफ्टवेयर, AI, डेटा और वेब" },
        "Government Exams": { label: "सरकारी परीक्षाएं", description: "UPSC, SSC, बैंकिंग और अधिक" },
        "Management & Business": { label: "प्रबंधन और व्यवसाय", description: "MBA, स्टार्टअप और कॉर्पोरेट" },
        "Creative Arts & Design": { label: "कला और डिज़ाइन", description: "कला, डिज़ाइन, मीडिया और फैशन" },
        "Banking & Finance": { label: "बैंकिंग और वित्त", description: "वित्त, निवेश और बैंकिंग" },
        "Law & Judiciary": { label: "कानून और न्यायपालिका", description: "कानून, अदालतें और कानूनी सेवाएं" },
      },
    },

    results: {
      title: "करियर मार्गदर्शन",
      step: "चरण 3 / 3",
      analysisLabel: "AI विश्लेषण",
      analyzing: "आपकी प्रोफाइल का विश्लेषण हो रहा है",
      analyzingSubtitle: "हमारा AI आपके लिए व्यक्तिगत मार्गदर्शन तैयार कर रहा है",
      errorTitle: "मार्गदर्शन नहीं मिला",
      retry: "पुनः प्रयास करें",
      startOver: "नया मूल्यांकन शुरू करें",
      levelLabels: {
        "10th": "10वीं का छात्र",
        "12th": "12वीं का छात्र",
        graduate: "स्नातक",
      } as Record<string, string>,
    },

    common: { back: "वापस" },
  },
} as const;

export type Translations = (typeof translations)["en"];

export default translations;
