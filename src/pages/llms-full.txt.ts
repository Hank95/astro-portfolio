import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { projects } from "@/data/projects";
import { siteConfig, about, faqs } from "@/data/content";
import { resume } from "@/data/resume";
import { SITE_URL } from "@/utils/schema";

/**
 * /llms-full.txt — the full site content as a single plain-text/markdown
 * document so an LLM can ingest everything (bio, resume, project case
 * studies, and complete blog posts) in one request.
 */
export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog")).sort(
    (a, b) =>
      new Date(b.data.publishedAt).getTime() -
      new Date(a.data.publishedAt).getTime()
  );

  const out: string[] = [];

  // --- Header / bio ---
  out.push(`# ${siteConfig.name} — ${siteConfig.title}`);
  out.push("");
  out.push(`Based in ${siteConfig.location}.`);
  out.push("");
  out.push(...about.paragraphs);
  out.push("");
  out.push(
    `Contact: ${siteConfig.email} · GitHub: ${siteConfig.github} · LinkedIn: ${siteConfig.linkedin}`
  );
  out.push("");

  // --- Resume ---
  out.push("## Resume");
  out.push("");
  out.push(resume.summary);
  out.push("");

  out.push("### Technical skills");
  for (const [category, skills] of Object.entries(resume.technicalSkills)) {
    out.push(`- ${category}: ${skills.join(", ")}`);
  }
  out.push("");

  out.push("### Professional experience");
  for (const exp of resume.professionalExperience) {
    out.push(`#### ${exp.title} — ${exp.company} (${exp.date})`);
    for (const project of exp.projects) {
      out.push(`${project.name}:`);
      for (const desc of project.description) out.push(`- ${desc}`);
    }
    out.push("");
  }

  out.push("### Education");
  for (const edu of resume.education) {
    out.push(`- ${edu.degree}, ${edu.school} (${edu.date})`);
  }
  out.push("");

  // --- FAQ ---
  out.push("## FAQ");
  out.push("");
  for (const faq of faqs) {
    out.push(`### ${faq.question}`);
    out.push(faq.answer);
    out.push("");
  }

  // --- Projects ---
  out.push("## Projects");
  out.push("");
  for (const project of projects) {
    out.push(`### ${project.title}`);
    out.push(`${project.subtitle}`);
    out.push("");
    out.push(`Status: ${project.status}. Tech: ${project.techStack.join(", ")}.`);
    const links = Object.entries(project.links)
      .filter(([, url]) => url)
      .map(([label, url]) => `${label}: ${url}`);
    if (links.length) out.push(`Links — ${links.join(" · ")}.`);
    out.push("");
    if (project.caseStudy) {
      const cs = project.caseStudy;
      out.push(`Overview: ${cs.overview}`);
      if (cs.problem) out.push(`\nProblem: ${cs.problem}`);
      if (cs.whatIBuilt?.length) {
        out.push("\nWhat I built:");
        for (const item of cs.whatIBuilt) out.push(`- ${item}`);
      }
      if (cs.keyDecisions) out.push(`\nKey decisions: ${cs.keyDecisions}`);
      if (cs.results) out.push(`\nResults: ${cs.results}`);
    }
    out.push("");
    out.push(`Read more: ${SITE_URL}/projects/${project.slug}`);
    out.push("");
  }

  // --- Blog posts ---
  out.push("## Blog posts");
  out.push("");
  for (const post of posts) {
    const slug = post.id.replace(/\.md$/, "");
    const date = new Date(post.data.publishedAt).toISOString().split("T")[0];
    out.push(`### ${post.data.title}`);
    out.push(`Published ${date}. ${post.data.description}`);
    if (post.data.tags?.length) out.push(`Tags: ${post.data.tags.join(", ")}.`);
    out.push(`URL: ${SITE_URL}/blog/${slug}`);
    out.push("");
    out.push((post.body ?? "").trim());
    out.push("");
    out.push("---");
    out.push("");
  }

  return new Response(out.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
