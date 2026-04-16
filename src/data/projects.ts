export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  status: "live" | "building" | "professional";
  techStack: string[];
  featured: boolean;
  image?: string;
  images?: {
    src: string;
    alt: string;
    caption?: string;
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
    subtitle: "Crossword puzzle marketplace with Apple Pencil support via iOS Scribble",
    status: "live",
    featured: true,
    techStack: ["SwiftUI", "Next.js", "Rust/WASM", "Supabase", "StoreKit 2"],
    links: {
      live: "https://klew.app",
    },
    caseStudy: {
      overview: `A two-sided crossword puzzle marketplace. Constructors build and publish puzzles through a web editor with an autofill engine. Solvers play them on iOS with Apple Pencil support (via native Scribble) or on the web. Cross-platform progress sync, in-app purchases, and a credits-based marketplace economy.`,
      problem: `Crossword puzzle creation tools are either expensive professional software or bare-bones web apps. Solvers are stuck with a few major publishers. There's no open marketplace where independent constructors can publish puzzles and earn revenue, and no solver that lets you write answers with Apple Pencil the way you would on a newspaper.`,
      whatIBuilt: [
        "iOS solver with Apple Pencil input via native Scribble — a single persistent ScribbleTextField overlays the selected cell, capturing strokes alongside the OS's built-in recognition while storing PKDrawing data for visual playback",
        "Web-based grid editor with a Rust/WebAssembly CSP (constraint satisfaction) autofill engine backed by a 400k+ word dictionary",
        "Cross-platform solver with smart cursor navigation, pencil mode for uncertain answers, and check/reveal functionality",
        "Credits-based marketplace with StoreKit 2 in-app purchases, server-side receipt validation via Supabase Edge Functions, and idempotent transaction processing",
        "Real-time progress sync across devices using Supabase with local-first architecture and last-write-wins conflict resolution",
        "Full authentication with Sign in with Apple and magic link email, constructor profiles, ratings, reviews, and follow system",
      ],
      keyDecisions: `The Scribble integration uses one persistent UITextField positioned over the active cell rather than per-cell text fields — this avoids destroying and recreating the responder chain on every cell advance. Strokes are captured at the window level via a custom gesture recognizer on UITextEffectsWindow and buffered without triggering re-renders until Scribble commits a letter. The autofill engine is written in Rust compiled to WebAssembly for near-native performance in the browser. Monetization is purely through Apple IAP — no external payment processor — keeping the stack simple and compliant.`,
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
      },
      {
        src: "/strava-local/heatmap.png",
        alt: "Heatmap visualization of all running and cycling routes",
        caption: "Interactive heatmap of every GPS-tracked activity",
      },
      {
        src: "/strava-local/metrics.png",
        alt: "Training metrics showing fitness and fatigue curves",
        caption: "CTL/ATL/TSB fitness and fatigue tracking over time",
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
      github: "https://github.com/hank95/f1-data-visualization",
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
    status: "live",
    featured: false,
    techStack: ["React", "Supabase", "Tailwind", "Leaflet"],
    links: {
      live: "https://nobskaandhenry.com",
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
      overview: `A lightweight, markdown-native project management system built as a Claude Code plugin. Tasks are plain .md files with YAML frontmatter, and status is represented by directory — backlog/, active/, done/. Zero dependencies, fully file-based, and designed so AI coding agents can do project management alongside engineering work in the same session.`,
      problem: `AI coding agents like Claude Code are great at writing code, but managing the work around it — tracking tasks, priorities, blockers, and dependencies — still requires switching to external tools like Jira or Wrike. I wanted a system that lives in the repo, works equally well for humans and AI agents, and optionally syncs to stakeholder-facing tools when needed.`,
      whatIBuilt: [
        "Claude Code plugin with 15+ slash commands for daily task management, planning, and triage",
        "Deterministic Python CLI (stdlib-only, zero dependencies) that mirrors every slash command for scripting and inline use",
        "Directory-as-status convention — ls tells you the state of the project without any tooling",
        "Automatic work log appended to each task file, creating an append-only audit trail",
        "Feature planning command that breaks a feature into 3–8 tasks with dependency mapping",
        "Optional Jira and Wrike sync bridges via MCP servers for stakeholder visibility",
        "Local kanban board server with zero external dependencies",
      ],
      keyDecisions: `Stdlib-only Python keeps the plugin portable with zero install friction — no pip, no venv, just clone and go. The directory-as-status pattern means the file system itself is the database, making it trivially inspectable with standard Unix tools. Every operation goes through a shared core library so slash commands and the CLI behave identically. Task files are never deleted, only moved, preserving full history.`,
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
