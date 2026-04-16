export const resume = {
  name: "Henry Pendleton",
  location: "Charleston, SC 29401",
  phone: "540-761-1806",
  email: "hhpendleton@gmail.com",
  github: "hank95",
  title: "MarTech Software Engineer",
  summary:
    "Software engineer building web platforms, native iOS apps, and marketing technology. I ship production code across the stack — React and Astro on the web, SwiftUI on iOS, Python for data — and bring sales and finance experience to translating business goals into technical execution.",
  technicalSkills: {
    languages: ["TypeScript", "JavaScript", "Python", "Swift", "SQL", "Rust"],
    "web & frameworks": [
      "React",
      "Next.js",
      "Astro",
      "Node.js",
      "Flask",
      "Tailwind CSS",
      "D3",
    ],
    "iOS & mobile": [
      "SwiftUI",
      "Core Data",
      "CloudKit",
      "StoreKit 2",
      "CoreLocation",
    ],
    "data & infrastructure": [
      "Supabase",
      "PostgreSQL",
      "SQLite",
      "AWS (S3, Lambda)",
      "Cloudflare",
    ],
    martech: ["Google Analytics", "SEO", "CMS Platforms", "API Integrations"],
  },
  professionalExperience: [
    {
      company: "Maymont Homes",
      location: "Charleston, SC",
      title: "MarTech Software Engineer",
      date: "01/2026 - Present",
      projects: [
        {
          name: "Marketing Technology & Web Development",
          description: [
            "Design, develop, and maintain marketing and web technology systems supporting digital campaigns, automation, and lead generation initiatives.",
            "Implement and maintain tracking tags, data layers, and analytics scripts to ensure accurate measurement of user behavior and campaign performance.",
            "Build and maintain API integrations connecting marketing platforms including CRM, CMS, and analytics tools.",
            "Enhance website functionality, speed, and SEO readiness through clean code, structured data, and performance tuning.",
          ],
        },
      ],
    },
    {
      company: "Apex146",
      location: "Remote",
      title: "Frontend Developer",
      date: "03/2022 - 12/2024",
      projects: [
        {
          name: "White Label Virtual Sports Platform",
          description: [
            "Spearheaded the development of a customized livestream ecosystem, tailored to effortlessly integrate into a white-label virtual sports betting service.",
            "Directed and executed the front-end development process, ensuring a seamless and intuitive user interface.",
            "Utilized real-world racer data to craft captivating and entertaining virtual races, enhancing user immersion and interaction.",
          ],
        },
        {
          name: "SprintGP.com",
          description: [
            "Collaborated with the backend team to create an action sports betting and gaming web platform.",
            "Leveraged backend data through API to create an attractive and intuitive user interface using React.JS.",
            "The project is a Web3 application hosted with the Ethereum blockchain and leveraging Metamask integration.",
          ],
        },
      ],
    },
  ],
  technicalProjects: [
    {
      name: "Klew",
      demo: "https://klew.app",
      description: [
        "Two-sided crossword puzzle marketplace — constructors publish through a web editor, solvers play on iOS with Apple Pencil support via native Scribble.",
        "Built a Rust/WebAssembly constraint-satisfaction autofill engine backed by a 400k+ word dictionary for the web-based grid editor.",
        "Implemented cross-platform progress sync using Supabase with local-first architecture and last-write-wins conflict resolution.",
        "Shipped credits-based marketplace with StoreKit 2 in-app purchases and server-side receipt validation via Supabase Edge Functions.",
      ],
    },
    {
      name: "F1 Data Dashboard",
      github: "https://github.com/hank95/f1-data-visualization",
      demo: "https://f1.henrypendleton.com",
      description: [
        "Multi-season Formula 1 data visualization platform with live Jolpica API integration and graceful fallback to demo data.",
        "Built with React 19, TypeScript, TanStack Router, and Recharts covering the 2020–2025 seasons.",
        "Features driver/constructor standings, race calendar with lap-by-lap data, and advanced analytics with telemetry simulation.",
        "Optimized bundle with route-based code splitting and chunked builds (~234KB gzipped).",
      ],
    },
    {
      name: "Strava Local",
      github: "https://github.com/Hank95/strava-local",
      description: [
        "Local-first analytics platform for Strava data — ingests CSV + FIT file exports into SQLite for custom analysis. All data stays on-machine.",
        "Computes advanced training metrics: TSS, CTL/ATL/TSB (fitness/fatigue/form), heart rate zones, and TRIMP.",
        "Features interactive dashboard with activity charts, GPS heatmaps, and route explorer built with Leaflet.js.",
        "Built with Python, Flask, and SQLite — designed for athletes who want full data ownership.",
      ],
    },
    {
      name: "ListLive",
      demo: "https://apps.apple.com/app/listlive/id6747406731",
      website: "https://listliveapp.com/",
      description: [
        "Collaborative iOS grocery app with intelligent auto-categorization and real-time family sync via CloudKit sharing.",
        "Built with SwiftUI, Core Data, and CloudKit using MVVM architecture — shipped to the App Store.",
        "Implements smart shopping mode with progress tracking, comprehensive undo system, and haptic feedback.",
      ],
    },
  ],
  priorExperience: [
    {
      company: "Cape Yachts",
      location: "S. Dartmouth, MA",
      title: "Yacht Sales",
      date: "02/2020 - 05/2021",
      description: [
        "Outperformed sales goal, by 35% in the first year, through constant contact, enthusiasm, and determination.",
        "Developed and maintained relationships with clients throughout the buying process.",
        "Collaborated with the marketing department to organize a successful sales event targeting qualified buyers.",
      ],
    },
  ],
  education: [
    {
      school: "Flatiron School",
      location: "New York, NY",
      degree:
        "Full Stack Web Development, Ruby on Rails and JavaScript/React program",
      date: "06/2021 - 09/2021",
    },
    {
      school: "St. Lawrence University",
      location: "Canton, NY",
      degree: "Bachelor of Arts in Business and Economics",
      date: "06/2018",
    },
  ],
};
