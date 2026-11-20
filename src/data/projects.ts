export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  status: "live" | "building" | "professional" | "archived";
  techStack: string[];
  featured: boolean;
  /** Operating systems for SoftwareApplication JSON-LD. Defaults to iOS for App Store apps. */
  platforms?: string[];
  image?: string;
  images?: {
    src: string;
    alt: string;
    caption?: string;
    /** Intrinsic size, so the browser can reserve space before the image loads. */
    width: number;
    height: number;
  }[];
  links: {
    live?: string;
    github?: string;
    appStore?: string;
    website?: string;
  };
  caseStudy?: {
    overview: string;
    problem?: string;
    whatIBuilt: string[];
    keyDecisions?: string;
    results?: string;
  };
}

export const projects: Project[] = [
  {
    slug: "klew",
    title: "Klew",
    subtitle: "A free daily crossword for iPhone, iPad, Mac and the web: hand-edited puzzles in four sizes, every day",
    status: "live",
    featured: true,
    techStack: ["SwiftUI", "Next.js", "Rust", "Supabase", "Core ML", "Claude API"],
    platforms: ["iOS", "iPadOS", "macOS", "Web"],
    links: {
      live: "https://klew.app",
      appStore: "https://apps.apple.com/us/app/klew/id6760475511",
    },
    images: [
      {
        src: "/klew/iphone.webp",
        alt: "Three Klew iPhone screens: the home screen with the day's puzzles, the solver partway through a 5x5, and the completion screen",
        caption: "Klew on iPhone: today's puzzles, the solver, and the finish",
        width: 1980,
        height: 1434,
      },
      {
        src: "/klew/ipad-pencil.webp",
        alt: "Klew on iPad with answers handwritten into the grid using Apple Pencil",
        caption: "Apple Pencil handwriting on iPad",
        width: 960,
        height: 1280,
      },
      {
        src: "/klew/ipad-solver.webp",
        alt: "Klew's iPad solver showing the clue lists above a partly filled grid",
        caption: "The iPad solver with across and down clue lists",
        width: 960,
        height: 1280,
      },
    ],
    caseStudy: {
      overview: `A free daily crossword at klew.app and on the App Store for iPhone, iPad and Mac. Every day brings a 5x5 mini, a 9x9 midi and an 11x11 daily, plus a 13x13 weekly on Sundays, and nothing is paywalled. Solvers keep streaks, earn achievements, climb a skill-rated leaderboard and race friends head to head. Independent constructors can also build and publish their own puzzles on the web. I build and run all of it solo: the native apps, the website and backend, and the pipeline that makes each day's puzzles.`,
      problem: `Most good daily crosswords sit behind a subscription or inside one big publisher's app. I wanted a fresh, well-edited crossword every day that is free everywhere, feels native on every Apple device, including writing answers with Apple Pencil the way you would on a newspaper, and gives solvers a reason to come back tomorrow.`,
      whatIBuilt: [
        "Native SwiftUI apps for iPhone, iPad and Mac, plus home screen widgets, all built on one shared Swift package for models, solving state, sync and networking",
        "Apple Pencil handwriting on iPad: every cell has its own Scribble target so letters can be written back to back, with a small on-device Core ML letter model as a fallback when Scribble returns nothing",
        "Next.js web app at klew.app with a full solver and a grid editor for constructors",
        "Rust constraint-solver fill engine, compiled to WebAssembly for the web editor and to a native CLI that fills each week's daily grids",
        "Daily puzzle pipeline: AI-drafted clues that are reviewed, edited by hand and scheduled on an editorial desk",
        "Supabase backend with Sign in with Apple and magic link, cross-device progress sync, and server-side checks that verify a solve before it counts toward streaks and leaderboards",
        "Competitive and social layer: a par-relative Elo skill rating, leaderboards, achievements, friends and head-to-head race links",
        "Share loop with dynamic OG images for every puzzle link",
      ],
      keyDecisions: `One shared Swift package holds the logic for every Apple platform, so the Mac app reached feature parity with thin Mac-only views on top. Apple Pencil input moved from a single text field that followed the selection to one Scribble target per cell, which removed about a second of waiting per letter when writing quickly. The fill engine is written once in Rust and reused in the browser and on the command line. Skill is measured with a par-relative Elo rating rather than raw solve counts, so the leaderboard rewards how well you solve, not how much.`,
      results: `Live at klew.app and on the App Store for iPhone, iPad and Mac, with fresh puzzles every day.`,
    },
  },
  {
    slug: "apex146",
    title: "Apex146 Racing Platform",
    subtitle: "Data visualization for professional racing teams",
    status: "professional",
    featured: true,
    techStack: ["React", "TypeScript", "D3", "AWS"],
    links: {},
    caseStudy: {
      overview: `A white-label analytics platform used by MotoGP and F1 teams to track racer performance. I led frontend development, building interactive charts, custom track visualizations, and real-time dashboards.`,
      problem: `Racing teams needed a way to analyze performance data, lap times, sector splits, race positioning, without drowning in spreadsheets. Media partners needed broadcast-ready graphics.`,
      whatIBuilt: [
        "Interactive heat maps and scatterplots for comparing racer statistics",
        "Custom SVG track graphics with sector-by-sector performance overlays",
        "Bump charts showing position changes throughout races",
        "Responsive dashboard consumed by teams, analysts, and broadcasters",
      ],
      keyDecisions: `The biggest challenge was rendering complex visualizations without killing performance on lower-end devices. I chose D3 for the heavy charting but kept the component layer in React for maintainability. Custom SVG tracks were hand-drawn to match exact course layouts.`,
      results: `Platform improved data accessibility for partner teams. UI bug reports dropped 40% after implementing a component library with consistent patterns.`,
    },
  },
  {
    slug: "strava-local",
    title: "Strava Local",
    subtitle: "Local-first fitness analytics, your data stays on your machine",
    status: "live",
    featured: true,
    techStack: ["Python", "Flask", "SQLite", "Leaflet", "Jinja2"],
    images: [
      {
        src: "/strava-local/dashboard.png",
        alt: "Strava Local dashboard showing activity overview and statistics",
        caption:
          "Dashboard with summary stats, activity breakdown charts, and recent activities",
        width: 1258,
        height: 886,
      },
      {
        src: "/strava-local/heatmap.png",
        alt: "Heatmap visualization of all running and cycling routes",
        caption: "Interactive heatmap of every GPS-tracked activity",
        width: 1258,
        height: 886,
      },
      {
        src: "/strava-local/metrics.png",
        alt: "Training metrics showing fitness and fatigue curves",
        caption: "CTL/ATL/TSB fitness and fatigue tracking over time",
        width: 1258,
        height: 886,
      },
    ],
    links: {
      github: "https://github.com/Hank95/strava-local",
    },
    caseStudy: {
      overview: `A local ingestion and analysis tool for Strava activity data. Import your Strava export, CSV metadata and FIT files, into a local SQLite database for analysis and visualization. All data stays local. Your activity data, GPS tracks, and training metrics are never uploaded anywhere.`,
      problem: `I wanted to understand how training metrics actually work, not just see numbers, but compute them myself. Strava shows you TSS and fitness curves, but I wanted to dig into the formulas, experiment with different calculations, and query my data in ways the app doesn't support. Building this gave me a deeper understanding of training science and a local archive of years of activity data I can explore however I want.`,
      whatIBuilt: [
        "FIT file parser that extracts GPS streams, heart rate, altitude, and cadence from years of activity data",
        "SQLite database with normalized schema for activities, streams, and computed metrics",
        "Dashboard with summary statistics, activity breakdown charts, and recent activity feed",
        "Interactive heatmap and route explorer with activity type and date filters",
        "Training metrics engine: TSS, TRIMP, intensity factor, and time-in-zone calculations",
        "Fitness modeling with daily CTL/ATL/TSB (chronic training load, acute training load, training stress balance)",
        "Athlete settings for personalized calculations: max HR, LTHR, resting HR, FTP, weight",
        "CLI tools for data ingestion, metric computation, and map generation",
      ],
      keyDecisions: `SQLite was the obvious choice, the entire point is local-first simplicity, and it handles years of activity data without breaking a sweat. Flask + Jinja2 keeps the stack minimal and dependency-light. Leaflet with OpenStreetMap tiles over Mapbox because there's no API key to manage and no usage billing to worry about. GPS routes are downsampled to 500 points max to keep storage reasonable without losing visual fidelity.`,
    },
  },
  {
    slug: "f1-dashboard",
    title: "F1 Data Dashboard",
    subtitle:
      "Multi-season Formula 1 data visualization with live API integration",
    status: "live",
    featured: true,
    techStack: [
      "React 19",
      "TypeScript",
      "TanStack Router",
      "Tailwind v4",
      "Recharts",
      "Vite",
    ],
    links: {
      live: "https://f1.henrypendleton.com",
      github: "https://github.com/Hank95/f1-data-viz",
    },
    caseStudy: {
      overview: `A comprehensive F1 data visualization dashboard built to explore React 19 and modern routing patterns. Features real-time data integration with the Jolpica API (the community-backed successor to the deprecated Ergast API) and complete coverage of the 2020–2025 seasons.`,
      problem: `The original Ergast F1 API was deprecated after the 2024 season and shut down in early 2025. I wanted a playground for React 19 features and modern data fetching patterns, and F1 data provided a rich, real-world dataset to work with. The challenge was building something that stayed functional even when external APIs were unavailable.`,
      whatIBuilt: [
        "Multi-season data platform with year selector for browsing 2020–2025 F1 data",
        "Real-time integration with Jolpica F1 API, with graceful fallback to demo data when unavailable",
        "Main dashboard with key stats, recent race results, and championship leaders",
        "Driver and constructor championship pages with sortable standings and detailed profiles",
        "Race calendar with detailed results and lap-by-lap data",
        "Advanced analytics page with lap time analysis and telemetry simulation",
        "React Context API for global state management across season switching",
        "Dark racing-inspired UI with glassmorphism effects and team colors",
      ],
      keyDecisions: `TanStack Router over React Router for type-safe routing and a more modern API. React Context for global state since the data sharing patterns were simple enough not to need Redux or Zustand. Jolpica API as the primary data source with a complete fallback system, the portfolio always works, even if the API is down. Bundle optimized with route-based code splitting and chunked builds (~234KB gzipped).`,
    },
  },
  {
    slug: "listlive",
    title: "ListLive",
    subtitle: "Collaborative grocery lists with real-time sync",
    status: "live",
    featured: true,
    techStack: ["SwiftUI", "CloudKit", "Core Data"],
    links: {
      appStore: "https://apps.apple.com/app/listlive/id6747406731",
      website: "https://listliveapp.com/",
    },
    caseStudy: {
      overview: `A grocery app that actually predicts what you need. Smart categorization, real-time sync with family, and a shopping mode that makes the store trip faster.`,
      problem: `Shared grocery apps are either too simple (just a checklist) or too complicated (meal planning features nobody uses). I wanted something in between, smart enough to help, simple enough to not get in the way.`,
      whatIBuilt: [
        "Smart shopping mode with progress tracking",
        "Auto-categorization that learns your items",
        "CloudKit sharing for real-time family sync",
        "Haptic feedback and celebration effects",
        "Full undo system because mistakes happen",
      ],
      keyDecisions: `MVVM architecture kept the codebase manageable as features grew. CloudKit over Firebase because native sync just works better on iOS, and there's no monthly bill.`,
      results: `Shipped to the App Store. Used weekly by my household.`,
    },
  },
  {
    slug: "cribscore",
    title: "CribScore",
    subtitle: "iOS scoring app for cribbage games",
    status: "live",
    featured: false,
    techStack: ["SwiftUI", "Core Data"],
    links: {
      appStore: "https://apps.apple.com/us/app/cribscore/id6747778251",
      website: "https://cribscoreapp.henrypendleton.com/",
    },
    caseStudy: {
      overview: `A focused iOS app for keeping score in cribbage games. Features a custom dial interface for quick point entry and tracks game history with statistics.`,
      whatIBuilt: [
        "Custom circular dial for intuitive score selection (1-29 range)",
        "Dual player support with customizable names and colors",
        "Game history with persistent storage",
        "Player statistics tracking wins, losses, and averages",
        "Multiple background themes and haptic feedback",
      ],
    },
  },
  {
    slug: "wedding-website",
    title: "Wedding Website",
    subtitle: "RSVP system with interactive Charleston map",
    status: "archived",
    featured: false,
    techStack: ["React", "Supabase", "Tailwind", "Leaflet"],
    links: {
      github: "https://github.com/Hank95/wedding-site",
    },
    caseStudy: {
      overview: `A personal wedding website with full RSVP management, interactive maps, and automated email notifications.`,
      whatIBuilt: [
        "Complete RSVP system with Supabase backend",
        "Interactive Charleston activities map using Leaflet",
        "Automated email notifications via Supabase Edge Functions",
        "Photo gallery with lazy loading",
        "Responsive design achieving 95+ Lighthouse score",
      ],
    },
  },
  {
    slug: "mdpm",
    title: "MDPM",
    subtitle:
      "Markdown-native project tracker plugin for Claude Code",
    status: "live",
    featured: false,
    techStack: ["Python", "Claude Code Plugin", "YAML", "Markdown"],
    links: {
      github: "https://github.com/Hank95/mdpm",
    },
    caseStudy: {
      overview: `A markdown-native project tracker built as a Claude Code plugin. Tasks are plain .md files with YAML frontmatter, and status is just a directory: backlog/, active/, done/. Zero dependencies, fully file-based, and built so AI coding agents can handle project management alongside actual engineering work.`,
      problem: `I kept context-switching between Claude Code and Jira just to track what I was working on. The AI agent is right there in the repo, but it can't manage tasks without an external tool. I wanted something that lives in the repo, works for both humans and AI agents, and optionally syncs to Jira or Wrike when stakeholders need visibility.`,
      whatIBuilt: [
        "Claude Code plugin with 15+ slash commands for task management, planning, and triage",
        "Stdlib-only Python CLI that mirrors every slash command for scripting and inline use",
        "Directory-as-status convention so ls tells you the state of the project",
        "Automatic work log appended to each task file as an append-only audit trail",
        "Planning command that breaks a feature into 3-8 tasks with dependency mapping",
        "Optional Jira and Wrike sync via MCP servers",
        "Local kanban board server with zero external dependencies",
      ],
      keyDecisions: `Stdlib-only Python so there's no pip install, no venv, just clone and go. The file system is the database, which means standard Unix tools work out of the box. Slash commands and the CLI share a core library so behavior is always identical. Task files are never deleted, only moved between directories, so you never lose history.`,
    },
  },
  {
    slug: "treasuremap",
    title: "Rhumbly",
    subtitle: "Location-based treasure hunt iOS app",
    status: "building",
    featured: false,
    techStack: ["SwiftUI", "Swift", "CoreLocation", "ActivityKit", "Supabase"],
    links: {},
    caseStudy: {
      overview: `A native iOS app for location-based exploration where users follow compass waypoints to complete treasure hunts, earn points, and unlock badges.`,
      whatIBuilt: [
        "Compass-based navigation with real-time distance and heading updates",
        "Live Activities integration for lock screen and Dynamic Island progress tracking",
        "Achievement system with 38 badges across multiple categories",
        "Challenge modes with difficulty-based scoring and arrival radius",
        "GPS trail recording and hunt history with cloud sync via Supabase",
      ],
    },
  },
];

// Helper functions
export const selectedProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);
export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
