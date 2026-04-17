import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage } from "@/utils/og-image";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id.replace(/\.md$/, "") },
    props: { title: post.data.title, tags: post.data.tags ?? [] },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const png = await generateOgImage(props.title, props.tags);
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
