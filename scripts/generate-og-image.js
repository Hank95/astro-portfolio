import sharp from 'sharp';
import { writeFileSync } from 'fs';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0a0a0b"/>
  <text x="80" y="260" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="600" fill="#fafafa" letter-spacing="-1.5">Henry Pendleton</text>
  <text x="80" y="330" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="400" fill="#a1a1aa">MarTech Software Engineer</text>
  <text x="80" y="400" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="400" fill="#71717a">React · TypeScript · SwiftUI · Python</text>
  <text x="80" y="560" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="400" fill="#52525b">henrypendleton.com</text>
  <line x1="80" y1="450" x2="400" y2="450" stroke="#3b82f6" stroke-width="3" opacity="0.6"/>
</svg>`;

await sharp(Buffer.from(svg))
  .png()
  .toFile('public/og-image.png');

console.log('Generated public/og-image.png (1200x630)');
