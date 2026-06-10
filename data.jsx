/* Jessica Laureta — resume content */

// Resource resolver: in the standalone bundle, window.__resources[id] holds an
// inlined blob URL; in the dev project it's undefined, so we fall back to the path.
const R = (id, path) => (window.__resources && window.__resources[id]) || path;

const DATA = {
  name: { first: "Jessica", last: "Laureta" },
  role: "Software Engineer",
  tagline: "I'm a software engineer who builds secure, global-scale mobile systems —",
  taglineAccent: "from digital identity to payments.",
  location: "Manila, Philippines",
  email: "jeclaureta@gmail.com",
  linkedin: "linkedin.com/in/jessica-laureta",
  linkedinUrl: "https://www.linkedin.com/in/jessica-laureta/",
  resume: R("resumePdf", "uploads/resume_file-1780943133631.pdf"),

  roleChips: ["Native Android", "Kotlin · Jetpack Compose", "Samsung Wallet"],

  metrics: [
    { num: "3", unit: "+", label: "Years engineering production mobile systems" },
    { num: "$200", unit: "K+", label: "Annual licensing savings from a custom SDK-free build" },
    { num: "4", unit: "", label: "Countries of cross-functional collaboration" },
    { num: "M+", unit: "", label: "Active global users served by shipped features" },
  ],

  summaryLead: "Engineering global-scale mobile systems, payment rails, and secure digital identity for production platforms like Samsung Wallet.",
  summary: [
    "Highly accomplished Software Engineer with 3+ years building global-scale mobile systems, payment infrastructure, and secure digital identity frameworks for production platforms like Samsung Wallet.",
    "Proven track record of eliminating vendor dependencies by architecting custom, SDK-free solutions that drive $200,000+ in annual corporate savings — while steering cross-functional collaboration across the US, South Korea, India, and the Philippines.",
  ],
  summaryTags: ["OOP", "MVVM", "Scalable System Design", "Clean Architecture", "Agile Delivery"],

  featured: [
    {
      kicker: "Samsung Wallet · Digital ID",
      icon: "id",
      title: "Samsung ID with CLEAR — secure digital identity",
      desc: "Developed Samsung ID in partnership with CLEAR — a secure digital identity feature in Samsung Wallet leveraging OCR, BLE, and NFC, compliant with international ISO/IEC identity standards and interoperable device-to-device verification.",
      chips: ["OCR", "BLE", "NFC", "ISO/IEC"],
      metric: { big: "ISO/IEC", small: "identity standards compliant" },
      links: [
        { label: "Product page", url: "https://www.samsung.com/us/apps/samsung-wallet/digital-id/" },
        { label: "Samsung Newsroom", url: "https://news.samsung.com/us/samsung-partners-clear-samsung-id-clear-samsung-wallet/" },
        { label: "CLEAR press release", url: "https://ir.clearme.com/news-events/press-releases/detail/188/clear-partners-with-samsung-bringing-clear-id-to-samsung" },
      ],
      accent: true,
      span: false,
    },
    {
      kicker: "Cost Engineering",
      icon: "savings",
      title: "Custom SDK-free architecture",
      desc: "Architected a high-performance solution that eliminated reliance on a costly third-party vendor SDK — delivering verified annual licensing savings.",
      chips: ["System Design", "Kotlin"],
      metric: { big: "$200K+", small: "saved annually" },
      accent: false,
      span: false,
    },
    {
      kicker: "Samsung Wallet · Payments",
      icon: "wallet",
      title: "Installment payments for millions of users",
      desc: "Designed and shipped an installment payment feature for Samsung Wallet with Splitit, diversifying transactional workflows and lifting user-conversion metrics for millions of active global users.",
      chips: ["Payments", "RESTful APIs", "MVVM"],
      metric: { big: "Millions", small: "of active global users" },
      links: [
        { label: "Product page", url: "https://www.samsung.com/us/apps/samsung-wallet/installment-payments/" },
        { label: "Samsung Newsroom", url: "https://news.samsung.com/us/new-samsung-wallet-feature-offers-more-flexible-payment-options/" },
        { label: "Splitit press release", url: "https://news.splitit.com/2025-07-24-Samsung-Splitit-USA,-Inc" },
      ],
      accent: false,
      span: false,
    },
  ],

  skills: [
    { group: "Languages", icon: "code", items: ["Kotlin", "Java", "PHP", "JavaScript", "Python", "HTML", "CSS"] },
    { group: "Mobile & Web", icon: "phone", items: ["Android SDK", "Android Studio", "Jetpack Compose", "Laravel", "Tailwind", "Bootstrap"] },
    { group: "Systems & Data", icon: "db", items: ["MySQL", "MSSQL", "Oracle", "Firebase", "SQLite", "RESTful APIs", "System Design", "Dagger"] },
    { group: "Advanced Tech", icon: "spark", items: ["BLE", "NFC", "OCR", "Google ML Kit", "Machine Learning", "AI", "Automation"] },
    { group: "Tools & Methods", icon: "tools", items: ["Agile / Scrum", "DevOps", "CI/CD", "Code Reviews", "Git", "Kanban", "Deployment"] },
  ],

  experience: [
    {
      mark: "S",
      logo: R("samsungLogo", "assets/samsung-logo.png"),
      role: "Software Engineer",
      org: "Samsung R&D Institute Philippines",
      start: "Jul 2023", end: "Present",
      loc: "Manila, Philippines",
      bullets: [
        "Architected a custom, high-performance solution that <b>eliminated a costly third-party vendor SDK</b>, delivering $200,000+ in verified annual licensing savings.",
        "Developed a secure <b>Digital ID feature for Samsung Wallet</b> using OCR, BLE, and NFC — ensuring strict ISO/IEC compliance and interoperable device-to-device verification across production systems.",
        "Shipped an <b>installment payment feature</b> for Samsung Wallet, diversifying transactional workflows and improving conversion for millions of active global users.",
        "Owned and refactored high-traffic modules in the core <b>Samsung Wallet USA</b> repository — payments, digital ID, and promotions — scaling for runtime stability and fault tolerance.",
        "Led cross-functional collaboration with engineers, PMs, and architects across <b>India, South Korea, and the United States</b>, shipping optimizations on-site during international business trips.",
      ],
      tags: ["Kotlin", "Jetpack Compose", "BLE", "NFC", "MVVM"],
    },
    {
      mark: "A",
      logo: R("amdocsLogo", "assets/amdocs-logo.png"),
      role: "Software Engineer Intern",
      org: "Amdocs",
      start: "Dec 2022", end: "Jun 2023",
      loc: "Manila, Philippines",
      bullets: [
        "Built an internal CRM & inventory management system scaling <b>500+ integrated enterprise applications</b>, reducing operational overhead.",
        "Developed an analytical admin dashboard aggregating core organizational KPIs — increasing internal team efficiency and data visibility.",
        "Collaborated across onshore and offshore sprint teams using Agile and DevOps to deliver stable backend services.",
        "Owned end-to-end usability and functionality testing, writing comprehensive test cases to eliminate regressions.",
      ],
      tags: ["Laravel", "MySQL", "Agile", "DevOps"],
    },
  ],

  collabStops: [
    { flag: "🇵🇭", city: "Manila", ctry: "Philippines", note: "Home base — Samsung R&D Institute", home: true },
    { flag: "🇰🇷", city: "Gumi", ctry: "South Korea", note: "On-site at Samsung SMART City — feature alignment & integration" },
    { flag: "🇺🇸", city: "Plano, TX", ctry: "USA", note: "Samsung Electronics America — on-site debugging & rapid iteration" },
    { flag: "🇮🇳", city: "India", ctry: "India", note: "Cross-team API integration & delivery" },
  ],

  offices: [
    {
      flag: "🇰🇷",
      org: "Samsung Electronics",
      site: "SMART City Campus 2",
      kind: "Samsung HQ · South Korea",
      addr: "302 3gongdan 3-ro, Gumi-si, Gyeongsangbuk-do, South Korea",
      url: "https://www.samsung.com/sec/",
      urlLabel: "samsung.com/sec",
    },
    {
      flag: "🇺🇸",
      org: "Samsung Electronics America",
      site: "Samsung Wallet USA",
      kind: "Samsung HQ · United States",
      addr: "6625 Excellence Way, Plano, TX 75023, United States",
      url: "https://www.samsung.com/us/",
      urlLabel: "samsung.com/us",
    },
    {
      flag: "🇺🇸",
      org: "CLEAR",
      site: "Samsung ID partner",
      kind: "Partner · United States",
      addr: "85 10th Ave, New York, NY 10011, United States",
      url: "https://www.clearme.com/",
      urlLabel: "clearme.com",
    },
  ],

  collabTimeline: [
    { date: "2023", txt: "Joined Samsung R&D; onboarded to Samsung Wallet core modules." },
    { date: "2024", txt: "Cross-zone delivery with Korea & India teams on Digital ID." },
    { date: "2025", txt: "Owned Samsung Wallet USA modules; on-site US business trip." },
    { date: "2026", txt: "Recognized for $200K+ savings & global partner alignment." },
  ],

  education: {
    school: "Asia Pacific College",
    logo: R("apcLogo", "assets/asia-pacific-college.png"),
    degree: "B.S. in Computer Engineering",
    honor: "Magna Cum Laude",
    date: "Graduated Aug 2023",
    place: "Manila, Philippines",
  },

  // Auto-scroll gallery of on-site / business-trip photos. Placeholder images
  // live in assets/gallery — swap the `img` paths for real photos later.
  // Duplicated in the marquee so the loop is seamless.
  trips: [
    { id: "trip-gumi", img: R("tripGumi", "assets/gallery/gumi-korea.jpg"), place: "Gumi · South Korea", note: "Samsung Electronics SMART City Campus 2 — feature alignment & integration" },
    { id: "trip-plano-bldg", img: R("tripPlanoBldg", "assets/gallery/plano-building.jpg"), place: "Plano, TX · USA", note: "Samsung Electronics America — on-site debugging & rapid iteration" },
    { id: "trip-clear", img: R("tripClear", "assets/gallery/clear-nyc.jpg"), place: "New York · USA", note: "On-site with the CLEAR team — Samsung ID partner integration" },
    { id: "trip-wallstreet", img: R("tripWallStreet", "assets/gallery/wallstreet-nyc.jpg"), place: "Wall Street · New York", note: "Exploring Lower Manhattan between partner sessions" },
    { id: "trip-plano-selfie", img: R("tripPlanoSelfie", "assets/gallery/plano-selfie.jpg"), place: "Plano, TX · USA", note: "Early mornings at Samsung Research America" },
  ],

  publications: [
    {
      type: "IEEE Publication",
      title: "A Convolutional Neural Network-based Approach for Lettuce Leaf Disease Classification",
      meta: "2023 IEEE 12th Global Conference on Consumer Electronics (GCCE)",
      link: "https://www.researchgate.net/publication/375702841_A_Convolutional_Neural_Network-based_Approach_for_Lettuce_Leaf_Disease_Classification",
      linkLabel: "Read on ResearchGate",
    },
    {
      type: "Enterprise Project",
      title: "Web & mobile utility applications for the Department of Agriculture and East West IESI",
      meta: "High-impact enterprise architecture",
    },
    {
      type: "IoT System Design",
      title: "Automated Aquaponics monitoring & control ecosystem",
      meta: "Architected, prototyped & programmed with IoT hardware and sensor arrays",
    },
  ],

  awards: [
    {
      title: "Team Member of the Month",
      org: "Samsung R&D Institute Philippines · April 2026",
      desc: "Recognized for driving significant financial efficiency by architecting a custom solution that completely eliminated external vendor dependencies — saving $200,000+ annually in licensing fees — and for cultivating technical relationships with global partners during a high-priority U.S. business trip, executing on-site debugging and rapid feature iteration.",
      highlights: [
        "Developed an in-house, SDK-free solution saving $200,000+ annually in licensing fees",
        "Provided on-site updates & bug fixes during the U.S. business trip",
        "Built strong working relationships with CLEAR partners",
        "Ramped up testing efforts with the MQL team",
        "Delivered the Samsung ID & mDL priority-logic integration",
      ],
    },
    {
      title: "Magna Cum Laude",
      org: "Asia Pacific College · 2023",
      desc: "Graduated with Latin honors in Computer Engineering for sustained academic excellence.",
    },
  ],
};

window.DATA = DATA;
