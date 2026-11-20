export const siteConfig = {
  name: "Henry Pendleton",
  title: "MarTech Software Engineer",
  email: "me@henrypendleton.com",
  location: "Charleston, SC",
  github: "https://github.com/Hank95",
  linkedin: "https://www.linkedin.com/in/henry-pendleton",
};

export const intro = {
  headline: "Henry Pendleton",
  subtitle: "MarTech Software Engineer",
  description:
    "At Maymont Homes I build the web and marketing systems: analytics and tracking, CRM and CMS integrations, and fast, search-friendly pages. On the side I make Klew, a free daily crossword for iPhone, iPad, Mac and the web.",
  location: "Based in Charleston, SC.",
};

// The "Now" strip under the hero. The latest blog post is appended automatically
// in Now.astro, so this list only holds what is not already said in the intro.
export const now: { building: { text: string; href?: string }[] } = {
  building: [
    {
      text: "Building Rhumbly, a location-based treasure hunt for iOS",
      href: "/projects/treasuremap",
    },
  ],
};

export const about = {
  paragraphs: [
    "I\u2019m a software engineer in Charleston, SC, working on marketing technology at Maymont Homes. I ship production code across the stack: React and Astro on the web, SwiftUI on iOS, Python for data, and Rust when the problem calls for it.",
    "Before this role, I built React dashboards, native iOS apps, and Python-based analytics tools. Earlier still, I worked in yacht sales and studied economics. Different work, but the same skills: understanding real needs, communicating clearly, and solving problems systematically.",
    "Outside of work, I\u2019m usually on a long run or building something.",
  ],
};

export const contact = {
  email: "me@henrypendleton.com",
  availability:
    "Always interested in connecting and discussing MarTech, web development, or side projects.",
  locationNote: "Based in Charleston, SC.",
};

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume" },
  { label: "Uses", href: "/uses" },
];

// Question-shaped content for answer engines. Published in /llms.txt and
// /llms-full.txt only; it is written in the third person, so it is not shown
// on the homepage.
export const faqs = [
  {
    question: "Who is Henry Pendleton?",
    answer:
      "Henry Pendleton is a MarTech Software Engineer based in Charleston, SC. He builds web platforms, native iOS apps, and marketing technology, and currently works at Maymont Homes designing web and marketing technology solutions that drive digital performance. On the side he builds and runs Klew, a free daily crossword for iPhone, iPad, Mac and the web.",
  },
  {
    question: "What technologies does Henry work with?",
    answer:
      "Henry works across the stack: TypeScript and JavaScript with React, Next.js, and Astro on the web; Swift and SwiftUI for iOS; and Python for data and backends. He also uses Rust, SQL, Supabase, PostgreSQL, SQLite, AWS, and Cloudflare, plus MarTech tools like Google Analytics and CMS and API integrations.",
  },
  {
    question: "What kind of projects has Henry built?",
    answer:
      "Henry has shipped Klew (a free daily crossword at klew.app and on the App Store for iPhone, iPad and Mac, with a Rust fill engine and Apple Pencil handwriting on iPad), several App Store iOS apps including ListLive and CribScore, data-visualization dashboards for Formula 1 and professional racing teams, and developer tools like MDPM, a markdown-native project tracker for Claude Code.",
  },
  {
    question: "Is Henry available for work or collaboration?",
    answer:
      "Yes. Henry is always interested in connecting and discussing MarTech, web development, or side projects. The best way to reach him is by email at me@henrypendleton.com.",
  },
  {
    question: "Where is Henry Pendleton located?",
    answer:
      "Henry is based in Charleston, South Carolina, and works at Maymont Homes.",
  },
];

