// One-off: renders the HP monogram to the PNG icons referenced by the layout and
// web manifest. Run with `node scripts/generate-icons.mjs` after changing the mark.
import sharp from 'sharp';

const svg = (size, pad) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#0a0a0b"/>
  <g transform="translate(50 50) scale(${pad}) translate(-50 -50)" fill="#fafafa"
     font-family="'Times New Roman', Times, serif" font-size="48" text-anchor="middle" dominant-baseline="central">
    <text x="30" y="52">H</text>
    <text x="70" y="52">P</text>
  </g>
</svg>`;

const icons = [
  ['public/apple-touch-icon.png', 180, 0.9],
  ['public/icon-192.png', 192, 0.9],
  ['public/icon-512.png', 512, 0.9],
  // Maskable icons get cropped to a circle/squircle, so keep the mark in the safe zone.
  ['public/icon-maskable-512.png', 512, 0.7],
];

for (const [file, size, pad] of icons) {
  await sharp(Buffer.from(svg(size, pad))).png().toFile(file);
  console.log(`wrote ${file}`);
}
