import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");

  return rss({
    title: "Henry Pendleton",
    description:
      "Software engineering, marketing technology, side projects, and occasionally what it's like to run very long distances.",
    site: context.site!,
    items: posts
      .sort(
        (a, b) =>
          new Date(b.data.publishedAt).getTime() -
          new Date(a.data.publishedAt).getTime()
      )
      .map((post) => ({
        title: post.data.title,
        pubDate: new Date(post.data.publishedAt),
        description: post.data.description,
        link: `/blog/${post.id.replace(/\.md$/, "")}/`,
      })),
  });
}
