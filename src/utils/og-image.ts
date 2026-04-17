import satori from "satori";
import { html } from "satori-html";
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const interRegular = readFileSync(
  resolve("src/assets/fonts/Inter-Regular.ttf")
);
const interSemiBold = readFileSync(
  resolve("src/assets/fonts/Inter-SemiBold.ttf")
);

export async function generateOgImage(title: string, tags: string[] = []) {
  const fontSize = title.length > 50 ? 48 : 56;
  const tagSpans = tags
    .slice(0, 4)
    .map(
      (tag) =>
        `<span style="font-size: 16px; color: #a1a1aa; background: #1a1a1f; padding: 6px 14px; border-radius: 6px;">${tag}</span>`
    )
    .join("");

  const markup = html(
    `<div style="height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: space-between; background: #0a0a0b; padding: 60px;">
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: flex; align-items: center; gap: 12px; color: #a1a1aa; font-size: 20px;">
          <span style="color: #3b82f6;">henrypendleton.com</span>
          <span>/</span>
          <span>blog</span>
        </div>
        <div style="font-size: ${fontSize}px; font-weight: 600; color: #fafafa; line-height: 1.2; max-width: 900px;">
          ${title}
        </div>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; gap: 12px;">
          ${tagSpans}
        </div>
        <div style="font-size: 18px; color: #71717a;">Henry Pendleton</div>
      </div>
    </div>`
  );

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Inter", data: interRegular, weight: 400, style: "normal" },
      { name: "Inter", data: interSemiBold, weight: 600, style: "normal" },
    ],
  });

  return sharp(Buffer.from(svg)).png().toBuffer();
}
