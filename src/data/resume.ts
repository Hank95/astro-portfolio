export const resume = {
  name: "Henry Pendleton",
  location: "Charleston, SC 29401",
  phone: "540-761-1806",
  email: "hhpendleton@gmail.com",
  github: "hank95",
  title: "MarTech Software Engineer",
  summary:
    "MarTech Software Engineer building web and marketing technology solutions that drive digital performance. I design and develop websites, integrate data feeds, and optimize digital tools that enable scalable marketing initiatives. Background in frontend development, native iOS apps, and Python analytics, combined with sales and finance experience, brings strong analytical and communication skills to translating marketing goals into technical execution.",
  technicalSkills: {
    languages: ["JavaScript", "TypeScript", "Python", "Swift", "Ruby", "SQL"],
    webDevelopment: [
      "React",
      "Next.js",
      "Vue.js",
      "React Native",
      "Flask",
      "Ruby on Rails",
      "Node.js",
    ],
    databases: ["PostgreSQL", "SQLite"],
    cloudServices: ["AWS (S3, Lambda)", "Firebase", "CloudKit"],
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
      name: "Strava Local",
      github: "https://github.com/Hank95/strava-local",
      description: [
        "Local-first analytics platform for Strava data with privacy-focused architecture—all data stays on your machine.",
        "Ingests Strava export (CSV + FIT files) into SQLite database for custom analysis and visualization.",
        "Features interactive dashboard with activity breakdown charts, heatmaps, and route explorer.",
        "Computes advanced training metrics: TSS, CTL/ATL/TSB (fitness/fatigue/form), HR zones, and TRIMP.",
        "Built with Python, Flask, SQLite, and Leaflet.js for maps—designed for athletes who want data ownership.",
      ],
    },
    {
      name: "CribScore",
      demo: "https://apps.apple.com/us/app/cribscore/id6747778251",
      website: "https://cribscoreapp.henrypendleton.com/",
      description: [
        "Modern iOS app for keeping score in cribbage games, built with SwiftUI and Core Data.",
        "Features custom score dial interface with intuitive circular dial for selecting points (1-29 range).",
        "Dual player support with customizable names and colors, plus game history with persistent storage.",
        "Implements player statistics tracking wins, losses, and average scores with Core Data architecture.",
        "Includes multiple background themes, haptic feedback, and immersive game mode with circular progress bars.",
      ],
    },
    {
      name: "ListLive",
      demo: "https://apps.apple.com/app/listlive/id6747406731",
      website: "https://listliveapp.com/",
      description: [
        "Modern iOS grocery shopping app built with SwiftUI that makes shopping smarter, faster, and more collaborative.",
        "Features smart shopping mode with progress tracking, celebration effects, and intelligent auto-categorization of items.",
        "Implements CloudKit sharing for real-time collaboration, allowing family and friends to share and sync lists across devices.",
        "Built with SwiftUI, Core Data, and CloudKit using MVVM architecture for clean separation of concerns.",
        "Includes comprehensive undo system, haptic feedback, item suggestions, and engaging onboarding experience.",
      ],
    },
    {
      name: "Wedding Website",
      github: "https://github.com/Hank95/wedding-site",
      demo: "https://nobskaandhenry.com",
      description: [
        "Modern, elegant wedding website with custom sage and ivory color palette and complete RSVP management system.",
        "Built with React 18, TypeScript, and Vite for optimal performance and developer experience.",
        "Integrated Supabase for backend services including RSVP storage and automated email notifications via Edge Functions.",
        "Features interactive Charleston activities map using Leaflet, photo gallery with lazy loading, and calendar integration.",
        "Implemented responsive design with Tailwind CSS v4, accessibility compliance, and SEO optimization achieving 95+ Lighthouse score.",
      ],
    },
    {
      name: "Ahoy",
      github: "https://github.com/your-profile/ahoy",
      demo: "https://ahoy-demo.com",
      description: [
        "Peer-to-peer boat rental service. Airbnb but for boats.",
        "Utilized Rails and React to create a full-stack web application with a Postgres database.",
        "Leverage CRUD actions to give users complete control over the boats they add to the app, browse listings, and schedule and change bookings.",
        "Integrated Google Maps API, geocoding, and autocomplete to aid in search functionality.",
        "Created a custom React hook to encapsulate authorization and provide user state throughout the application.",
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
