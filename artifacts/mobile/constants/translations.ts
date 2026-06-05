export type Language = "en" | "hi";

const translations = {
  en: {
    lang: { en: "English", hi: "हिंदी" } as Record<Language, string>,

    registration: {
      title: "AI Career Coach",
      subtitle: "Personalized career guidance powered by AI",
      nameLabel: "Your Full Name",
      namePlaceholder: "e.g. Ravi Kumar",
      ageLabel: "Your Age",
      agePlaceholder: "e.g. 17",
      privacy:
        "Your data is safe. This information is processed in real-time to personalize your roadmap and is not saved anywhere on any database or local storage.",
      getStarted: "Get Started",
      errors: {
        nameRequired: "Please enter your name",
        ageRequired: "Please enter your age",
        ageInvalid: "Age must be a number between 10 and 60",
      },
    },

    welcome: {
      title: "AI Career Coach",
      subtitle: "Your AI-powered guide to the perfect career path",
      greeting: "Hi {name}! Choose your level",
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
      step: "Step 2 of 4",
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
      step: "Step 3 of 4",
      subtitle: "Select areas that excite you — choose as many as you like",
      hint: "Select at least one interest to continue",
      analyze: "Get AI Career Guidance",
      items: {
        "Tech & Coding": { label: "Tech & Coding", description: "Software, AI, data & web" },
        "Government Exams": {
          label: "Government Exams",
          description: "SSC, Steno, High Court, UPSC",
        },
        "Management & Business": {
          label: "Management & Business",
          description: "MBA, startups & corporate",
        },
        "Creative Arts & Design": {
          label: "Creative Arts & Design",
          description: "Art, design, media & fashion",
        },
        "Banking & Finance": {
          label: "Banking & Finance",
          description: "Finance, investment & banking",
        },
        "Law & Judiciary": {
          label: "Law & Judiciary",
          description: "Law, courts & legal services",
        },
      },
    },

    results: {
      title: "Career Guidance",
      step: "Step 4 of 4",
      analysisLabel: "AI ANALYSIS",
      analyzing: "Analyzing Your Profile",
      analyzingSubtitle: "Our AI is crafting personalized guidance just for you",
      errorTitle: "Couldn't Fetch Guidance",
      retry: "Try Again",
      startOver: "Start New Assessment",
      exploreMore: "EXPLORE MORE TOOLS",
      levelLabels: {
        "10th": "10th Student",
        "12th": "12th Student",
        graduate: "Graduate",
      } as Record<string, string>,
      tools: [
        {
          icon: "compass-outline",
          title: "Explore Your Options",
          desc: "Streams, degrees & career paths",
          route: "/explore",
          color: "#0A2463",
        },
        {
          icon: "git-compare-outline",
          title: "Govt vs Private Jobs",
          desc: "Compare both career tracks",
          route: "/compare",
          color: "#1B3B9C",
        },
        {
          icon: "checkmark-circle-outline",
          title: "Skills Checklist",
          desc: "Essential skills you must build",
          route: "/skills",
          color: "#10B981",
        },
      ],
    },

    explore: {
      title: "Explore Your Options",
      subtitle10: "Choose the right stream for 11th grade",
      subtitle12: "Popular degree options for your stream",
      subtitleGrad: "What's next after graduation?",
      streams: {
        Science: {
          label: "Science (PCM / PCB)",
          description:
            "Best for students who enjoy Maths, Physics, Chemistry or Biology. Opens doors to engineering, medicine, research and technology.",
          careers: [
            "🔧 Engineering (B.Tech / B.E.) — JEE Main & Advanced",
            "🏥 Medical (MBBS / BDS / BAMS) — NEET",
            "✈️ Defence (NDA, Air Force, Navy)",
            "💻 Computer Science & IT",
            "🔬 Pure Sciences (B.Sc Physics / Chemistry / Biology)",
            "🏗️ Architecture — JEE Paper 2 / NATA",
          ],
          pros: ["Widest career options", "Prestigious entrance exams", "High earning potential"],
        },
        Commerce: {
          label: "Commerce",
          description:
            "Best for students interested in business, finance, accounting and economics. Strong foundation for corporate and banking careers.",
          careers: [
            "💼 B.Com (Bachelor of Commerce)",
            "🏦 BBA — Management & Business",
            "📊 CA (Chartered Accountant) — ICAI",
            "⚖️ CS (Company Secretary)",
            "📈 Economics — BA/B.Sc Economics",
            "🏢 Banking & Finance careers",
          ],
          pros: ["Strong for banking & finance", "Great for entrepreneurship", "Good for government exams"],
        },
        Arts: {
          label: "Arts / Humanities",
          description:
            "Best for students passionate about history, literature, social sciences, psychology or creative fields. Great for government and civil service careers.",
          careers: [
            "⚖️ LLB / Law — CLAT, AILET",
            "📰 Journalism & Mass Communication",
            "🎨 Fine Arts & Design",
            "🧠 Psychology — BA / B.Sc Psych",
            "🏛️ History & Political Science — BA",
            "🌍 Social Work & NGO careers",
          ],
          pros: ["Best for UPSC/Civil Services", "Creative & social careers", "Flexible & diverse paths"],
        },
      },
      degreesByStream: {
        "Science (PCM)": {
          label: "Science (PCM) Degrees",
          degrees: [
            { name: "B.Tech / B.E.", note: "Top choice — JEE Main required" },
            { name: "B.Sc (Physics / Maths / CS)", note: "Pure sciences + research" },
            { name: "BCA", note: "Computer applications — no entrance required" },
            { name: "B.Arch", note: "Architecture — JEE Paper 2 / NATA" },
            { name: "NDA / Defence", note: "Join armed forces after 12th" },
            { name: "Diploma in Engineering", note: "Polytechnic — 3 year lateral entry" },
          ],
        },
        "Science (PCB)": {
          label: "Science (PCB) Degrees",
          degrees: [
            { name: "MBBS", note: "NEET required — 5.5 year course" },
            { name: "BDS (Dental)", note: "NEET required — 4 year course" },
            { name: "BAMS / BHMS", note: "Ayurvedic / Homeopathic medicine" },
            { name: "B.Pharma", note: "Pharmaceutical sciences" },
            { name: "B.Sc Nursing", note: "In-demand healthcare career" },
            { name: "B.Sc (Biology / Biotech / Microbiology)", note: "Research & lab careers" },
          ],
        },
        Commerce: {
          label: "Commerce Degrees",
          degrees: [
            { name: "B.Com (General / Hons)", note: "Core commerce degree — 3 years" },
            { name: "BBA", note: "Business management — leads to MBA" },
            { name: "CA Foundation", note: "Chartered Accountancy — ICAI exam" },
            { name: "CS Foundation", note: "Company Secretary — ICSI exam" },
            { name: "B.Sc (Economics)", note: "Economics for banking & analytics" },
            { name: "BAF / BFM", note: "Accounting & Finance specialization" },
          ],
        },
        "Arts/Humanities": {
          label: "Arts / Humanities Degrees",
          degrees: [
            { name: "BA (History / Political Sci / Sociology)", note: "Best foundation for UPSC" },
            { name: "LLB / BA LLB (Integrated)", note: "Law — CLAT / AILET required" },
            { name: "BMM / Journalism", note: "Mass media & communication" },
            { name: "BA Psychology", note: "Counselling & HR careers" },
            { name: "BFA (Fine Arts)", note: "Creative arts & design" },
            { name: "B.Ed", note: "Teaching & education career" },
          ],
        },
      },
      gradPaths: {
        higher: {
          label: "Higher Studies",
          icon: "school-outline",
          color: "#0A2463",
          options: [
            { name: "MBA / PGDM", note: "Management — CAT / XAT / MAT" },
            { name: "M.Tech / M.E.", note: "Technical masters — GATE exam" },
            { name: "M.Sc / MA", note: "Pure sciences & arts masters" },
            { name: "LLM / Law Masters", note: "Advanced legal studies" },
            { name: "PhD / Research", note: "UGC NET for funded research" },
            { name: "Professional Courses", note: "CFA, CPA, CA Final, CS Final" },
          ],
        },
        direct: {
          label: "Direct Job Paths",
          icon: "briefcase-outline",
          color: "#10B981",
          options: [
            { name: "Government Exams", note: "SSC, UPSC, State PSC, Banking" },
            { name: "IT / Software Jobs", note: "Fresher roles — AMCAT, Infosys, TCS" },
            { name: "Banking Sector", note: "IBPS PO, Clerk, RRB" },
            { name: "Teaching (School / College)", note: "CTET / State TET / UGC NET" },
            { name: "Startup & Corporate", note: "Marketing, HR, Sales, Operations" },
            { name: "Freelancing", note: "Design, coding, content writing" },
          ],
        },
      },
    },

    compare: {
      title: "Govt vs Private Jobs",
      toggleGovt: "Government",
      togglePrivate: "Private Sector",
      for10th: "For 10th Students",
      for12th: "For 12th Students",
      forGrad: "For Graduates",
      govt: {
        "10th": {
          heading: "Government Options After 10th",
          tracks: [
            {
              name: "Railways (RRB Group D)",
              desc: "Min. 10th pass. Entry-level track & signal jobs. High job security.",
              ageLimit: "18–33 years",
            },
            {
              name: "SSC MTS (Multi Tasking Staff)",
              desc: "10th pass required. Clerical support roles across govt departments.",
              ageLimit: "18–27 years",
            },
            {
              name: "India Post (Postman / MTS)",
              desc: "Postal department entry-level roles. Stable income and pension.",
              ageLimit: "18–27 years",
            },
            {
              name: "Sainik School / NDA (After 12th)",
              desc: "Start preparing now for defence after 12th grade.",
              ageLimit: "16.5–19.5 years",
            },
          ],
        },
        "12th": {
          heading: "Government Options After 12th",
          tracks: [
            {
              name: "SSC CHSL",
              desc: "LDC / Data Entry / Postal Assistant. Very popular for 12th pass candidates.",
              ageLimit: "18–27 years",
            },
            {
              name: "SSC Steno (Grade C & D)",
              desc: "Stenographer roles in Central Govt. Requires speed typing skills.",
              ageLimit: "18–27 years",
            },
            {
              name: "High Court Clerk / Steno",
              desc: "State High Court recruitment. Good salary with pension.",
              ageLimit: "18–27 years",
            },
            {
              name: "NDA / Air Force / Navy",
              desc: "Join armed forces directly after 12th with Science stream.",
              ageLimit: "16.5–19.5 years",
            },
            {
              name: "Railways (RRB NTPC — 12th level)",
              desc: "Ticket clerk, goods guard, junior clerk roles.",
              ageLimit: "18–33 years",
            },
          ],
        },
        graduate: {
          heading: "Government Options for Graduates",
          tracks: [
            {
              name: "SSC CGL",
              desc: "Inspector, Auditor, Tax Assistant and more. Most sought-after exam for graduates.",
              ageLimit: "18–32 years",
            },
            {
              name: "UPSC IAS / IPS / IFS",
              desc: "Prestigious civil services. Long preparation but top career.",
              ageLimit: "21–32 years",
            },
            {
              name: "IBPS PO & Clerk (Banking)",
              desc: "Join nationalised banks as Probationary Officer or Clerk.",
              ageLimit: "PO: 20–30 / Clerk: 20–28",
            },
            {
              name: "State PCS (Provincial Civil Services)",
              desc: "State-level civil service exams. SDM, BDO, DSP level posts.",
              ageLimit: "21–40 years",
            },
            {
              name: "Teaching (UGC NET / CTET)",
              desc: "College lecturers need NET. School teachers need CTET/State TET.",
              ageLimit: "UGC NET: No age limit",
            },
          ],
        },
      },
      private: {
        "10th": {
          heading: "Private Options After 10th",
          tracks: [
            {
              name: "ITI (Electrician, Fitter, Mechanic)",
              desc: "Vocational trade certificate. Good workshop & factory jobs.",
              salary: "₹10,000–25,000/month",
            },
            {
              name: "Polytechnic Diploma",
              desc: "3-year engineering diploma. Direct jobs or lateral B.Tech entry.",
              salary: "₹12,000–30,000/month",
            },
            {
              name: "Data Entry Operator",
              desc: "Typing + computer skills required. Office and BPO roles.",
              salary: "₹8,000–18,000/month",
            },
            {
              name: "Retail / Sales Executive",
              desc: "Entry-level retail, customer service and sales roles.",
              salary: "₹8,000–15,000/month",
            },
          ],
        },
        "12th": {
          heading: "Private Options After 12th",
          tracks: [
            {
              name: "BPO / Call Centre",
              desc: "Customer support, chat agents. Good for communication skills.",
              salary: "₹12,000–22,000/month",
            },
            {
              name: "Data Entry / Back Office",
              desc: "Typing speed and basic Excel skills. Entry-level corporate jobs.",
              salary: "₹10,000–20,000/month",
            },
            {
              name: "Retail / E-Commerce Jobs",
              desc: "Amazon, Flipkart warehouses, store assistants, delivery.",
              salary: "₹12,000–20,000/month",
            },
            {
              name: "Graphic Design / Content Creation",
              desc: "After learning Canva / Photoshop. Freelance or agency work.",
              salary: "₹15,000–40,000/month",
            },
            {
              name: "Banking Private Sector",
              desc: "Private banks (HDFC, ICICI, Axis) hire 12th pass for teller roles.",
              salary: "₹15,000–25,000/month",
            },
          ],
        },
        graduate: {
          heading: "Private Sector for Graduates",
          tracks: [
            {
              name: "IT / Software Developer",
              desc: "TCS, Infosys, Wipro, startups. Learn coding (Python, Java).",
              salary: "₹3–12 LPA",
            },
            {
              name: "Data Analyst",
              desc: "Excel, SQL, Power BI skills. High demand in fintech, e-commerce.",
              salary: "₹4–15 LPA",
            },
            {
              name: "Marketing / Digital Marketing",
              desc: "SEO, social media, Google Ads. Agency or corporate roles.",
              salary: "₹3–10 LPA",
            },
            {
              name: "HR / Admin Executive",
              desc: "Recruitment, payroll, compliance roles in corporate offices.",
              salary: "₹3–8 LPA",
            },
            {
              name: "Sales / Business Development",
              desc: "B2B & B2C sales. High incentives. Insurance, FMCG, SaaS.",
              salary: "₹3–12 LPA + incentives",
            },
          ],
        },
      },
    },

    skills: {
      title: "Skills Checklist",
      subtitleSchool: "Essential skills for school students",
      subtitleCollege: "Essential skills for college students & graduates",
      progressLabel: "{done} of {total} skills marked",
      resetBtn: "Reset All",
      categories: {
        school: [
          {
            category: "Digital Basics",
            icon: "laptop-outline",
            color: "#0A2463",
            items: [
              "Basic Computer Skills — MS Word, Excel, PowerPoint",
              "Fast Typing — aim for 30+ words per minute",
              "Internet Research — Google effectively, verify sources",
              "Email Writing — professional email format and etiquette",
              "Mobile & App Literacy — UPI, DigiLocker, Aarogya Setu",
            ],
          },
          {
            category: "Communication",
            icon: "chatbubble-outline",
            color: "#1B3B9C",
            items: [
              "English Speaking — basic conversational fluency",
              "Reading Habit — 1 newspaper or article per day (Hindu, Navbharat)",
              "Public Speaking — school debates, morning assembly speeches",
              "Hindi Writing — correct grammar and formal letter format",
            ],
          },
          {
            category: "Academic Preparation",
            icon: "book-outline",
            color: "#10B981",
            items: [
              "Current Affairs — daily GK reading for competitive exams",
              "Maths Basics — fast mental arithmetic and shortcuts",
              "Reasoning Practice — puzzles, series, direction-sense",
              "Study Time Table — fixed study hours without phone distraction",
            ],
          },
        ],
        college: [
          {
            category: "Job-Ready Skills",
            icon: "briefcase-outline",
            color: "#0A2463",
            items: [
              "Resume / CV Making — professional 1-page resume on Canva or Zety",
              "LinkedIn Profile — complete profile with skills, education, photo",
              "Interview Confidence — mock interviews, STAR method answers",
              "Excel & Data Entry — VLOOKUP, pivot tables, data formatting",
              "Email & Business Communication — formal writing, cold email",
            ],
          },
          {
            category: "Technical Skills",
            icon: "code-outline",
            color: "#1B3B9C",
            items: [
              "MS Office Advanced — Excel formulas, PowerPoint presentations",
              "Basic Python / SQL — for data roles (free on Coursera / YouTube)",
              "Digital Marketing Basics — Google Analytics, Meta Ads, SEO",
              "Canva / Figma — design for social media or presentations",
              "Cloud Literacy — Google Workspace, Notion, Trello",
            ],
          },
          {
            category: "Career Preparation",
            icon: "rocket-outline",
            color: "#10B981",
            items: [
              "Competitive Exam Strategy — choose 1-2 exams and study daily",
              "Aptitude & Reasoning — practice daily for placement tests",
              "Soft Skills — teamwork, time management, problem-solving",
              "Networking — attend career fairs, college placement drives",
              "Financial Literacy — understand salary slips, PF, income tax",
            ],
          },
        ],
      },
    },

    common: { back: "Back" },
  },

  hi: {
    lang: { en: "English", hi: "हिंदी" } as Record<Language, string>,

    registration: {
      title: "AI करियर कोच",
      subtitle: "AI द्वारा संचालित व्यक्तिगत करियर मार्गदर्शन",
      nameLabel: "आपका पूरा नाम",
      namePlaceholder: "जैसे रवि कुमार",
      ageLabel: "आपकी आयु",
      agePlaceholder: "जैसे 17",
      privacy:
        "आपका डेटा सुरक्षित है। यह जानकारी केवल आपके रोडमैप को वैयक्तिकृत करने के लिए रियल-टाइम में प्रोसेस की जाती है और किसी भी डेटाबेस या लोकल स्टोरेज में सेव नहीं होती।",
      getStarted: "शुरू करें",
      errors: {
        nameRequired: "कृपया अपना नाम दर्ज करें",
        ageRequired: "कृपया अपनी आयु दर्ज करें",
        ageInvalid: "आयु 10 से 60 के बीच होनी चाहिए",
      },
    },

    welcome: {
      title: "AI करियर कोच",
      subtitle: "आपके सही करियर के लिए AI-संचालित मार्गदर्शक",
      greeting: "{name} जी! अपना स्तर चुनें",
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
      step: "चरण 2 / 4",
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
      step: "चरण 3 / 4",
      subtitle: "जो क्षेत्र आपको पसंद हैं उन्हें चुनें — जितने चाहें उतने",
      hint: "जारी रखने के लिए कम से कम एक रुचि चुनें",
      analyze: "AI करियर मार्गदर्शन पाएं",
      items: {
        "Tech & Coding": { label: "तकनीक और कोडिंग", description: "सॉफ्टवेयर, AI, डेटा और वेब" },
        "Government Exams": {
          label: "सरकारी परीक्षाएं",
          description: "SSC, Steno, हाई कोर्ट, UPSC",
        },
        "Management & Business": {
          label: "प्रबंधन और व्यवसाय",
          description: "MBA, स्टार्टअप और कॉर्पोरेट",
        },
        "Creative Arts & Design": {
          label: "कला और डिज़ाइन",
          description: "कला, डिज़ाइन, मीडिया और फैशन",
        },
        "Banking & Finance": {
          label: "बैंकिंग और वित्त",
          description: "वित्त, निवेश और बैंकिंग",
        },
        "Law & Judiciary": {
          label: "कानून और न्यायपालिका",
          description: "कानून, अदालतें और कानूनी सेवाएं",
        },
      },
    },

    results: {
      title: "करियर मार्गदर्शन",
      step: "चरण 4 / 4",
      analysisLabel: "AI विश्लेषण",
      analyzing: "आपकी प्रोफाइल का विश्लेषण हो रहा है",
      analyzingSubtitle: "हमारा AI आपके लिए व्यक्तिगत मार्गदर्शन तैयार कर रहा है",
      errorTitle: "मार्गदर्शन नहीं मिला",
      retry: "पुनः प्रयास करें",
      startOver: "नया मूल्यांकन शुरू करें",
      exploreMore: "और टूल्स एक्सप्लोर करें",
      levelLabels: {
        "10th": "10वीं का छात्र",
        "12th": "12वीं का छात्र",
        graduate: "स्नातक",
      } as Record<string, string>,
      tools: [
        {
          icon: "compass-outline",
          title: "अपने विकल्प खोजें",
          desc: "स्ट्रीम, डिग्री और करियर पथ",
          route: "/explore",
          color: "#0A2463",
        },
        {
          icon: "git-compare-outline",
          title: "सरकारी vs निजी नौकरी",
          desc: "दोनों करियर ट्रैक की तुलना करें",
          route: "/compare",
          color: "#1B3B9C",
        },
        {
          icon: "checkmark-circle-outline",
          title: "कौशल चेकलिस्ट",
          desc: "जरूरी कौशल जो आपको सीखने हैं",
          route: "/skills",
          color: "#10B981",
        },
      ],
    },

    explore: {
      title: "अपने विकल्प खोजें",
      subtitle10: "11वीं के लिए सही स्ट्रीम चुनें",
      subtitle12: "आपकी स्ट्रीम के अनुसार लोकप्रिय डिग्री",
      subtitleGrad: "स्नातक के बाद क्या करें?",
      streams: {
        Science: {
          label: "विज्ञान (PCM / PCB)",
          description:
            "गणित, भौतिकी, रसायन या जीव विज्ञान पसंद करने वाले छात्रों के लिए सर्वोत्तम। इंजीनियरिंग, चिकित्सा, अनुसंधान के द्वार खोलता है।",
          careers: [
            "🔧 इंजीनियरिंग (B.Tech / B.E.) — JEE Main & Advanced",
            "🏥 चिकित्सा (MBBS / BDS / BAMS) — NEET",
            "✈️ रक्षा (NDA, Air Force, Navy)",
            "💻 कंप्यूटर साइंस और IT",
            "🔬 शुद्ध विज्ञान (B.Sc Physics / Chemistry / Biology)",
            "🏗️ आर्किटेक्चर — JEE Paper 2 / NATA",
          ],
          pros: ["सबसे अधिक करियर विकल्प", "प्रतिष्ठित प्रवेश परीक्षाएं", "उच्च आय की संभावना"],
        },
        Commerce: {
          label: "वाणिज्य",
          description:
            "व्यापार, वित्त, लेखांकन और अर्थशास्त्र में रुचि रखने वाले छात्रों के लिए। कॉर्पोरेट और बैंकिंग करियर की मजबूत नींव।",
          careers: [
            "💼 B.Com (बैचलर ऑफ कॉमर्स)",
            "🏦 BBA — प्रबंधन और व्यवसाय",
            "📊 CA (चार्टर्ड अकाउंटेंट) — ICAI",
            "⚖️ CS (कंपनी सेक्रेटरी)",
            "📈 अर्थशास्त्र — BA/B.Sc Economics",
            "🏢 बैंकिंग और वित्त करियर",
          ],
          pros: ["बैंकिंग और वित्त के लिए उत्कृष्ट", "उद्यमिता के लिए आदर्श", "सरकारी परीक्षाओं के लिए अच्छा"],
        },
        Arts: {
          label: "कला / मानविकी",
          description:
            "इतिहास, साहित्य, सामाजिक विज्ञान, मनोविज्ञान या रचनात्मक क्षेत्रों के इच्छुक छात्रों के लिए। सरकारी और सिविल सेवा के लिए उत्कृष्ट।",
          careers: [
            "⚖️ LLB / कानून — CLAT, AILET",
            "📰 पत्रकारिता और जनसंचार",
            "🎨 ललित कला और डिज़ाइन",
            "🧠 मनोविज्ञान — BA / B.Sc Psych",
            "🏛️ इतिहास और राजनीति विज्ञान — BA",
            "🌍 समाज कार्य और NGO करियर",
          ],
          pros: ["UPSC/सिविल सेवा के लिए सर्वश्रेष्ठ", "रचनात्मक और सामाजिक करियर", "लचीले और विविध रास्ते"],
        },
      },
      degreesByStream: {
        "Science (PCM)": {
          label: "विज्ञान (PCM) डिग्री",
          degrees: [
            { name: "B.Tech / B.E.", note: "टॉप च्वाइस — JEE Main आवश्यक" },
            { name: "B.Sc (Physics / Maths / CS)", note: "शुद्ध विज्ञान + अनुसंधान" },
            { name: "BCA", note: "कंप्यूटर एप्लिकेशन — बिना प्रवेश परीक्षा" },
            { name: "B.Arch", note: "आर्किटेक्चर — JEE Paper 2 / NATA" },
            { name: "NDA / रक्षा", note: "12वीं के बाद सशस्त्र बल" },
            { name: "पॉलिटेक्निक डिप्लोमा", note: "3 साल — लेटरल B.Tech प्रवेश" },
          ],
        },
        "Science (PCB)": {
          label: "विज्ञान (PCB) डिग्री",
          degrees: [
            { name: "MBBS", note: "NEET आवश्यक — 5.5 साल का कोर्स" },
            { name: "BDS (डेंटल)", note: "NEET आवश्यक — 4 साल का कोर्स" },
            { name: "BAMS / BHMS", note: "आयुर्वेदिक / होम्योपैथिक चिकित्सा" },
            { name: "B.Pharma", note: "फार्मास्युटिकल साइंस" },
            { name: "B.Sc Nursing", note: "स्वास्थ्य सेवा में उच्च मांग" },
            { name: "B.Sc (Biology / Biotech / Microbiology)", note: "अनुसंधान और प्रयोगशाला करियर" },
          ],
        },
        Commerce: {
          label: "वाणिज्य डिग्री",
          degrees: [
            { name: "B.Com (General / Hons)", note: "मुख्य वाणिज्य डिग्री — 3 साल" },
            { name: "BBA", note: "व्यवसाय प्रबंधन — MBA की ओर ले जाता है" },
            { name: "CA Foundation", note: "चार्टर्ड अकाउंटेंसी — ICAI परीक्षा" },
            { name: "CS Foundation", note: "कंपनी सेक्रेटरी — ICSI परीक्षा" },
            { name: "B.Sc (Economics)", note: "बैंकिंग और एनालिटिक्स के लिए" },
            { name: "BAF / BFM", note: "अकाउंटिंग और वित्त विशेषज्ञता" },
          ],
        },
        "Arts/Humanities": {
          label: "कला / मानविकी डिग्री",
          degrees: [
            { name: "BA (इतिहास / राजनीति / समाजशास्त्र)", note: "UPSC की सर्वश्रेष्ठ नींव" },
            { name: "LLB / BA LLB (इंटीग्रेटेड)", note: "कानून — CLAT / AILET" },
            { name: "BMM / पत्रकारिता", note: "जनसंचार और मीडिया" },
            { name: "BA मनोविज्ञान", note: "काउंसलिंग और HR करियर" },
            { name: "BFA (ललित कला)", note: "रचनात्मक कला और डिज़ाइन" },
            { name: "B.Ed", note: "शिक्षण और शिक्षा करियर" },
          ],
        },
      },
      gradPaths: {
        higher: {
          label: "उच्च शिक्षा",
          icon: "school-outline",
          color: "#0A2463",
          options: [
            { name: "MBA / PGDM", note: "प्रबंधन — CAT / XAT / MAT" },
            { name: "M.Tech / M.E.", note: "तकनीकी मास्टर्स — GATE परीक्षा" },
            { name: "M.Sc / MA", note: "शुद्ध विज्ञान और कला मास्टर्स" },
            { name: "LLM / कानून मास्टर्स", note: "उन्नत कानूनी अध्ययन" },
            { name: "PhD / अनुसंधान", note: "वित्त पोषित अनुसंधान के लिए UGC NET" },
            { name: "व्यावसायिक कोर्स", note: "CFA, CPA, CA Final, CS Final" },
          ],
        },
        direct: {
          label: "सीधी नौकरी",
          icon: "briefcase-outline",
          color: "#10B981",
          options: [
            { name: "सरकारी परीक्षाएं", note: "SSC, UPSC, State PSC, बैंकिंग" },
            { name: "IT / सॉफ्टवेयर नौकरियां", note: "फ्रेशर रोल — AMCAT, Infosys, TCS" },
            { name: "बैंकिंग क्षेत्र", note: "IBPS PO, Clerk, RRB" },
            { name: "शिक्षण (स्कूल / कॉलेज)", note: "CTET / State TET / UGC NET" },
            { name: "स्टार्टअप और कॉर्पोरेट", note: "मार्केटिंग, HR, सेल्स, ऑपरेशन" },
            { name: "फ्रीलांसिंग", note: "डिज़ाइन, कोडिंग, कंटेंट राइटिंग" },
          ],
        },
      },
    },

    compare: {
      title: "सरकारी vs निजी नौकरी",
      toggleGovt: "सरकारी",
      togglePrivate: "निजी क्षेत्र",
      for10th: "10वीं छात्रों के लिए",
      for12th: "12वीं छात्रों के लिए",
      forGrad: "स्नातकों के लिए",
      govt: {
        "10th": {
          heading: "10वीं के बाद सरकारी विकल्प",
          tracks: [
            {
              name: "रेलवे (RRB Group D)",
              desc: "न्यूनतम 10वीं पास। ट्रैक और सिग्नल नौकरियां। उच्च नौकरी सुरक्षा।",
              ageLimit: "18–33 वर्ष",
            },
            {
              name: "SSC MTS (मल्टी टास्किंग स्टाफ)",
              desc: "10वीं पास आवश्यक। सरकारी विभागों में क्लेरिकल सहायक भूमिकाएं।",
              ageLimit: "18–27 वर्ष",
            },
            {
              name: "India Post (डाकिया / MTS)",
              desc: "डाक विभाग की प्रारंभिक भूमिकाएं। स्थिर आय और पेंशन।",
              ageLimit: "18–27 वर्ष",
            },
            {
              name: "सैनिक स्कूल / NDA (12वीं के बाद)",
              desc: "12वीं के बाद रक्षा के लिए अभी से तैयारी शुरू करें।",
              ageLimit: "16.5–19.5 वर्ष",
            },
          ],
        },
        "12th": {
          heading: "12वीं के बाद सरकारी विकल्प",
          tracks: [
            {
              name: "SSC CHSL",
              desc: "LDC / डेटा एंट्री / पोस्टल असिस्टेंट। 12वीं पास के लिए बहुत लोकप्रिय।",
              ageLimit: "18–27 वर्ष",
            },
            {
              name: "SSC Steno (Grade C & D)",
              desc: "केंद्र सरकार में स्टेनोग्राफर भूमिकाएं। टाइपिंग स्पीड आवश्यक।",
              ageLimit: "18–27 वर्ष",
            },
            {
              name: "हाई कोर्ट क्लर्क / Steno",
              desc: "राज्य हाई कोर्ट भर्ती। पेंशन के साथ अच्छा वेतन।",
              ageLimit: "18–27 वर्ष",
            },
            {
              name: "NDA / Air Force / Navy",
              desc: "12वीं विज्ञान के बाद सीधे सशस्त्र बल में शामिल हों।",
              ageLimit: "16.5–19.5 वर्ष",
            },
            {
              name: "रेलवे (RRB NTPC — 12वीं स्तर)",
              desc: "टिकट क्लर्क, गुड्स गार्ड, जूनियर क्लर्क भूमिकाएं।",
              ageLimit: "18–33 वर्ष",
            },
          ],
        },
        graduate: {
          heading: "स्नातकों के लिए सरकारी विकल्प",
          tracks: [
            {
              name: "SSC CGL",
              desc: "इंस्पेक्टर, ऑडिटर, टैक्स असिस्टेंट और अधिक। स्नातकों के लिए सबसे अधिक मांग वाली परीक्षा।",
              ageLimit: "18–32 वर्ष",
            },
            {
              name: "UPSC IAS / IPS / IFS",
              desc: "प्रतिष्ठित सिविल सेवाएं। लंबी तैयारी लेकिन शीर्ष करियर।",
              ageLimit: "21–32 वर्ष",
            },
            {
              name: "IBPS PO और Clerk (बैंकिंग)",
              desc: "राष्ट्रीयकृत बैंकों में PO या Clerk के रूप में शामिल हों।",
              ageLimit: "PO: 20–30 / Clerk: 20–28",
            },
            {
              name: "State PCS (प्रांतीय सिविल सेवाएं)",
              desc: "राज्य स्तरीय सिविल सेवा परीक्षाएं। SDM, BDO, DSP स्तर के पद।",
              ageLimit: "21–40 वर्ष",
            },
            {
              name: "शिक्षण (UGC NET / CTET)",
              desc: "कॉलेज लेक्चरर के लिए NET। स्कूल शिक्षक के लिए CTET।",
              ageLimit: "UGC NET: कोई आयु सीमा नहीं",
            },
          ],
        },
      },
      private: {
        "10th": {
          heading: "10वीं के बाद निजी विकल्प",
          tracks: [
            {
              name: "ITI (इलेक्ट्रीशियन, फिटर, मैकेनिक)",
              desc: "व्यावसायिक व्यापार प्रमाणपत्र। कारखाने और कार्यशाला में अच्छी नौकरियां।",
              salary: "₹10,000–25,000/माह",
            },
            {
              name: "पॉलिटेक्निक डिप्लोमा",
              desc: "3 साल का इंजीनियरिंग डिप्लोमा। सीधी नौकरी या लेटरल B.Tech प्रवेश।",
              salary: "₹12,000–30,000/माह",
            },
            {
              name: "डेटा एंट्री ऑपरेटर",
              desc: "टाइपिंग + कंप्यूटर कौशल आवश्यक। ऑफिस और BPO भूमिकाएं।",
              salary: "₹8,000–18,000/माह",
            },
            {
              name: "रिटेल / सेल्स एग्जीक्यूटिव",
              desc: "प्रारंभिक रिटेल, ग्राहक सेवा और सेल्स भूमिकाएं।",
              salary: "₹8,000–15,000/माह",
            },
          ],
        },
        "12th": {
          heading: "12वीं के बाद निजी विकल्प",
          tracks: [
            {
              name: "BPO / कॉल सेंटर",
              desc: "ग्राहक सहायता, चैट एजेंट। संचार कौशल के लिए अच्छा।",
              salary: "₹12,000–22,000/माह",
            },
            {
              name: "डेटा एंट्री / बैक ऑफिस",
              desc: "टाइपिंग स्पीड और बेसिक Excel कौशल। कॉर्पोरेट प्रारंभिक नौकरियां।",
              salary: "₹10,000–20,000/माह",
            },
            {
              name: "रिटेल / ई-कॉमर्स",
              desc: "Amazon, Flipkart गोदाम, स्टोर असिस्टेंट, डिलीवरी।",
              salary: "₹12,000–20,000/माह",
            },
            {
              name: "ग्राफिक डिज़ाइन / कंटेंट क्रिएशन",
              desc: "Canva / Photoshop सीखने के बाद। फ्रीलांस या एजेंसी।",
              salary: "₹15,000–40,000/माह",
            },
            {
              name: "निजी बैंकिंग",
              desc: "HDFC, ICICI, Axis बैंक 12वीं पास के लिए टेलर रोल देते हैं।",
              salary: "₹15,000–25,000/माह",
            },
          ],
        },
        graduate: {
          heading: "स्नातकों के लिए निजी क्षेत्र",
          tracks: [
            {
              name: "IT / सॉफ्टवेयर डेवलपर",
              desc: "TCS, Infosys, Wipro, स्टार्टअप। Python, Java सीखें।",
              salary: "₹3–12 LPA",
            },
            {
              name: "डेटा एनालिस्ट",
              desc: "Excel, SQL, Power BI कौशल। फिनटेक, ई-कॉमर्स में उच्च मांग।",
              salary: "₹4–15 LPA",
            },
            {
              name: "मार्केटिंग / डिजिटल मार्केटिंग",
              desc: "SEO, सोशल मीडिया, Google Ads। एजेंसी या कॉर्पोरेट भूमिकाएं।",
              salary: "₹3–10 LPA",
            },
            {
              name: "HR / एडमिन एग्जीक्यूटिव",
              desc: "भर्ती, पेरोल, अनुपालन भूमिकाएं।",
              salary: "₹3–8 LPA",
            },
            {
              name: "सेल्स / बिजनेस डेवलपमेंट",
              desc: "B2B और B2C सेल्स। उच्च प्रोत्साहन। बीमा, FMCG, SaaS।",
              salary: "₹3–12 LPA + प्रोत्साहन",
            },
          ],
        },
      },
    },

    skills: {
      title: "कौशल चेकलिस्ट",
      subtitleSchool: "स्कूली छात्रों के लिए जरूरी कौशल",
      subtitleCollege: "कॉलेज छात्रों और स्नातकों के लिए जरूरी कौशल",
      progressLabel: "{total} में से {done} कौशल पूरे हुए",
      resetBtn: "सभी रीसेट करें",
      categories: {
        school: [
          {
            category: "डिजिटल बेसिक्स",
            icon: "laptop-outline",
            color: "#0A2463",
            items: [
              "बेसिक कंप्यूटर कौशल — MS Word, Excel, PowerPoint",
              "फास्ट टाइपिंग — 30+ शब्द प्रति मिनट का लक्ष्य",
              "इंटरनेट रिसर्च — Google का सही उपयोग, स्रोत सत्यापन",
              "Email लेखन — पेशेवर ईमेल फॉर्मेट और शिष्टाचार",
              "मोबाइल और ऐप साक्षरता — UPI, DigiLocker, Aarogya Setu",
            ],
          },
          {
            category: "संचार कौशल",
            icon: "chatbubble-outline",
            color: "#1B3B9C",
            items: [
              "अंग्रेजी बोलना — बुनियादी बातचीत में प्रवाह",
              "पढ़ने की आदत — प्रतिदिन 1 समाचार पत्र (हिंदू, नवभारत)",
              "सार्वजनिक भाषण — स्कूल बहस, प्रातः सभा भाषण",
              "हिंदी लेखन — सही व्याकरण और औपचारिक पत्र प्रारूप",
            ],
          },
          {
            category: "शैक्षणिक तैयारी",
            icon: "book-outline",
            color: "#10B981",
            items: [
              "समसामयिक घटनाएं — प्रतियोगी परीक्षाओं के लिए दैनिक GK",
              "गणित बेसिक्स — तीव्र मानसिक अंकगणित और शॉर्टकट",
              "रीजनिंग अभ्यास — पहेलियां, श्रृंखला, दिशा-ज्ञान",
              "अध्ययन समय सारणी — फोन विकर्षण के बिना नियत अध्ययन घंटे",
            ],
          },
        ],
        college: [
          {
            category: "नौकरी के लिए तैयार कौशल",
            icon: "briefcase-outline",
            color: "#0A2463",
            items: [
              "Resume / CV बनाना — Canva या Zety पर पेशेवर 1-पृष्ठ रेज़्यूमे",
              "LinkedIn प्रोफाइल — कौशल, शिक्षा, फोटो के साथ पूर्ण प्रोफाइल",
              "Interview आत्मविश्वास — मॉक इंटरव्यू, STAR पद्धति के उत्तर",
              "Excel और डेटा एंट्री — VLOOKUP, पिवोट टेबल, डेटा फॉर्मेटिंग",
              "Email और बिजनेस संचार — औपचारिक लेखन, कोल्ड ईमेल",
            ],
          },
          {
            category: "तकनीकी कौशल",
            icon: "code-outline",
            color: "#1B3B9C",
            items: [
              "MS Office एडवांस्ड — Excel फॉर्मूले, PowerPoint प्रेजेंटेशन",
              "बेसिक Python / SQL — डेटा भूमिकाओं के लिए (Coursera / YouTube पर मुफ्त)",
              "डिजिटल मार्केटिंग बेसिक्स — Google Analytics, Meta Ads, SEO",
              "Canva / Figma — सोशल मीडिया या प्रेजेंटेशन के लिए डिज़ाइन",
              "क्लाउड साक्षरता — Google Workspace, Notion, Trello",
            ],
          },
          {
            category: "करियर तैयारी",
            icon: "rocket-outline",
            color: "#10B981",
            items: [
              "प्रतियोगी परीक्षा रणनीति — 1-2 परीक्षाएं चुनें और दैनिक अध्ययन करें",
              "एप्टीट्यूड और रीजनिंग — प्लेसमेंट टेस्ट के लिए दैनिक अभ्यास",
              "सॉफ्ट स्किल्स — टीमवर्क, समय प्रबंधन, समस्या-समाधान",
              "नेटवर्किंग — करियर मेले, कॉलेज प्लेसमेंट ड्राइव में भाग लें",
              "वित्तीय साक्षरता — वेतन पर्ची, PF, आयकर को समझें",
            ],
          },
        ],
      },
    },

    common: { back: "वापस" },
  },
} as const;

export type Translations = (typeof translations)["en"];

export default translations;
