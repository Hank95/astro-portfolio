import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { projects } from "@/data/projects";
import { siteConfig, about } from "@/data/content";
import { SITE_URL } from "@/utils/schema";

/**
 * /llms.txt — curated, machine-readable index of the site for LLMs and
 * answer engines, following the llmstxt.org convention: an H1, a blockquote
 * summary, then sectioned lists of `[title](url): description` links.
 * Full prose lives at /llms-full.txt.
 */
export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog")).sort(
    (a, b) =>
      new Date(b.data.publishedAt).getTime() -
      new Date(a.data.publishedAt).getTime()
  );

  const lines: string[] = [];

  lines.push(`# ${siteConfig.name}`);
  lines.push("");
  lines.push(
    `> ${siteConfig.title} based in ${siteConfig.location}. I build web platforms, native iOS apps, and marketing technology. This site is my portfolio: project case studies, a technical blog, and my resume.`
  );
  lines.push("");
  lines.push(about.paragraphs[0]);
  lines.push("");

  lines.push("## Key pages");
  lines.push(`- [Home](${SITE_URL}/): Overview, selected work, and contact.`);
  lines.push(
    `- [Resume](${SITE_URL}/resume): Experience, technical skills, and education.`
  );
  lines.push(
    `- [Blog](${SITE_URL}/blog): Writing on software engineering, MarTech, and side projects.`
  );
  lines.push(
    `- [Uses](${SITE_URL}/uses): Tools, hardware, and software I use day to day.`
  );
  lines.push("");

  lines.push("## Projects");
  for (const project of projects) {
    lines.push(
      `- [${project.title}](${SITE_URL}/projects/${project.slug}): ${project.subtitle}`
    );
  }
  lines.push("");

  lines.push("## Writing");
  for (const post of posts) {
    const slug = post.id.replace(/\.md$/, "");
    lines.push(
      `- [${post.data.title}](${SITE_URL}/blog/${slug}): ${post.data.description}`
    );
  }
  lines.push("");

  lines.push("## Contact");
  lines.push(`- Email: ${siteConfig.email}`);
  lines.push(`- GitHub: ${siteConfig.github}`);
  lines.push(`- LinkedIn: ${siteConfig.linkedin}`);
  lines.push("");

  lines.push("## Optional");
  lines.push(
    `- [Full text](${SITE_URL}/llms-full.txt): Complete bio, project case studies, and blog posts in one document.`
  );
  lines.push(`- [RSS feed](${SITE_URL}/rss.xml): Blog posts.`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
