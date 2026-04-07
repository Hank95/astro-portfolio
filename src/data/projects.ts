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
