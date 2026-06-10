import { siteConfig, faqs } from "@/data/content";
import { resume } from "@/data/resume";

/**
 * Centralized Schema.org / JSON-LD helpers.
 *
 * The whole site refers to a single canonical Person entity by `@id` so that
 * search engines and LLM crawlers resolve every page to the same identity
 * (home, resume, blog author, project creator) instead of inferring several
 * unrelated "Henry Pendleton" entities.
 */

export const SITE_URL = "https://henrypendleton.com";
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const SITE_DESCRIPTION =
  "MarTech Software Engineer building web and marketing technology solutions. Currently at Maymont Homes in Charleston, SC.";

/** Absolute URL from a site-relative or already-absolute path. */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Canonical Person entity — single source of truth, referenced elsewhere by `@id`. */
export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: siteConfig.name,
  url: `${SITE_URL}/`,
  jobTitle: siteConfig.title,
  email: `mailto:${siteConfig.email}`,
  image: absoluteUrl("/og-image.png"),
  description: resume.summary,
  sameAs: [siteConfig.github, siteConfig.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Charleston",
    addressRegion: "SC",
    addressCountry: "US",
  },
  worksFor: {
    "@type": "Organization",
    name: resume.professionalExperience[0]?.company,
  },
  alumniOf: resume.education.map((edu) => ({
    "@type": "EducationalOrganization",
    name: edu.school,
  })),
  knowsAbout: Object.values(resume.technicalSkills).flat(),
};

/** Canonical WebSite entity. */
export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: siteConfig.name,
  description: SITE_DESCRIPTION,
  inLanguage: "en-US",
  publisher: { "@id": PERSON_ID },
  author: { "@id": PERSON_ID },
};

/** FAQPage entity built from the shared FAQ list. */
export const faqPageSchema = {
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

/** Build a BreadcrumbList from a list of { name, url } crumbs. */
export function breadcrumbs(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

/** Wrap a set of nodes in a single JSON-LD `@graph` document. */
export function graph(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
