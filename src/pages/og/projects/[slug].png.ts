import type { APIRoute, GetStaticPaths } from "astro";
import { projects } from "@/data/projects";
import { generateOgImage } from "@/utils/og-image";

export const getStaticPaths: GetStaticPaths = async () => {
  return projects.map((project) => ({
    params: { slug: project.slug },
    props: { title: project.title, tags: project.techStack ?? [] },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const png = await generateOgImage(props.title, props.tags, "projects");
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
