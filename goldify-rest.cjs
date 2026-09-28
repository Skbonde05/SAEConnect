/**
 * Extend the gold/cream normalisation to the remaining components so every
 * page shares one palette with HomeDashboard.
 *
 * Rules (same as the first pass, minus the prefix bug):
 *   dark ambers (500-950) -> brand gold #c9a227   (legible on light)
 *   light ambers (100-400) -> warm cream #fef3c7 (legible on dark)
 *   solid accent backgrounds -> #c9a227, hover -> #dcb443
 *   soft tints -> #c9a227 at low alpha
 */
const fs = require("fs");

const FILES = [
  "PostCard.tsx",
  "Navbar.tsx",
  "Footer.tsx",
  "ResetPassword.tsx",
  "SplashScreen.tsx",
  "Companies.tsx",
  "Experiences.tsx",
];

const DARK_BG =
  /bg-\[#[0-9a-f]{6}\]|bg-navy|bg-slate-(?:700|800|900|950)|bg-black|bg-brand-blue|from-\[#[0-9a-f]{6}\]/i;
const LIGHT_BG =
  /bg-canvas|bg-white|bg-slate-(?:50|100|200)|bg-\[#f8fafc\]|bg-transparent/i;

function surfaceAt(L, i) {
  for (let k = i; k >= Math.max(0, i - 50); k--) {
    if (DARK_BG.test(L[k])) return "dark";
    if (LIGHT_BG.test(L[k])) return "light";
  }
  return "light";
}

const GOLD = "text-[#c9a227]";
const CREAM = "text-[#fef3c7]";

/** non-text utilities: keyed by the full class token, variants included */
const TABLE = {
  "bg-amber-50": "bg-[#c9a227]/10",
  "bg-amber-100": "bg-[#c9a227]/10",
  "bg-amber-200": "bg-[#c9a227]/20",
  "bg-amber-300": "bg-[#c9a227]/20",
  "bg-amber-400": "bg-[#c9a227]",
  "bg-amber-500": "bg-[#c9a227]",
  "bg-amber-600": "bg-[#c9a227]",
  "hover:bg-amber-50": "hover:bg-[#c9a227]/10",
  "hover:bg-amber-100": "hover:bg-[#c9a227]/15",
  "hover:bg-amber-200": "hover:bg-[#c9a227]/20",
  "hover:bg-amber-300": "hover:bg-[#c9a227]/25",
  "hover:bg-amber-400": "hover:bg-[#dcb443]",
  "hover:bg-amber-500": "hover:bg-[#dcb443]",
  "hover:bg-amber-600": "hover:bg-[#dcb443]",
  "group-hover:bg-amber-50": "group-hover:bg-[#c9a227]/10",
  "group-hover:bg-amber-100": "group-hover:bg-[#c9a227]/15",
  "from-amber-400": "from-[#dcb443]",
  "from-amber-500": "from-[#c9a227]",
  "from-amber-600": "from-[#c9a227]",
  "to-amber-400": "to-[#dcb443]",
  "to-amber-500": "to-[#c9a227]",
  "to-amber-600": "to-[#c9a227]",
  "via-amber-500": "via-[#c9a227]",
  "border-amber-100": "border-[#c9a227]/30",
  "border-amber-200": "border-[#c9a227]/30",
  "border-amber-300": "border-[#c9a227]/40",
  "border-amber-400": "border-[#c9a227]/40",
  "border-amber-500": "border-[#c9a227]",
  "border-amber-600": "border-[#c9a227]",
  "border-amber-200/80": "border-[#c9a227]/30",
  "border-amber-400/60": "border-[#c9a227]/40",
  "hover:border-amber-200": "hover:border-[#c9a227]/40",
  "hover:border-amber-300": "hover:border-[#c9a227]/50",
  "hover:border-amber-400": "hover:border-[#c9a227]/60",
  "hover:border-amber-500": "hover:border-[#c9a227]",
  "focus:border-amber-500": "focus:border-[#c9a227]",
  "ring-amber-200/70": "ring-[#c9a227]/30",
  "ring-amber-200": "ring-[#c9a227]/30",
  "ring-amber-300": "ring-[#c9a227]/40",
  "fill-amber-400": "fill-[#c9a227]",
  "fill-amber-500": "fill-[#c9a227]",
  "stroke-amber-400": "stroke-[#c9a227]",
  "shadow-amber-100": "shadow-[#c9a227]/20",
  "shadow-amber-200": "shadow-[#c9a227]/20",
  "shadow-amber-300": "shadow-[#c9a227]/20",
  "shadow-amber-400": "shadow-[#c9a227]/20",
  "shadow-amber-500": "shadow-[#c9a227]/20",
  "divide-amber-200": "divide-[#c9a227]/30",
  "placeholder:text-amber-100/40": "placeholder:text-[#fef3c7]/40",
  "placeholder:text-amber-100/30": "placeholder:text-[#fef3c7]/30",
  "placeholder:text-amber-500": "placeholder:text-[#c9a227]",
};

const keys = Object.keys(TABLE).sort((a, b) => b.length - a.length);
const DARK_AMBER = new Set([500, 600, 700, 800, 900, 950]);

let grand = 0;
for (const f of FILES) {
  const p = "D:/SPH/src/components/" + f;
  const L = fs.readFileSync(p, "utf8").split("\n");
  const applied = new Map();
  const note = (k) => applied.set(k, (applied.get(k) || 0) + 1);

  for (let i = 0; i < L.length; i++) {
    let line = L[i];

    for (const k of keys) {
      const re = new RegExp(
        "(?<![\\w\\-:])" + k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![\\w\\-])",
        "g"
      );
      if (re.test(line)) {
        line = line.replace(re, TABLE[k]);
        note(k);
      }
    }

    // text-* with an optional alpha suffix, including placeholder: variants
    line = line.replace(
      /(?<![\w-])((?:placeholder:|(?:[a-z]+-)*)text-)(amber|orange|yellow)-(\d{2,3})(\/\d{1,3})?(?![\w-])/g,
      (full, prefix, hue, shade, alpha) => {
        const n = parseInt(shade, 10);
        const a = alpha || "";
        if (hue === "amber" && n <= 400) {
          // light amber -> cream; on a light surface use gold instead
          const surface = surfaceAt(L, i);
          note(full);
          if (surface === "dark") return prefix + CREAM + a;
          return prefix + GOLD + a;
        }
        if (hue === "amber" && DARK_AMBER.has(n)) {
          note(full);
          return prefix + GOLD + a;
        }
        if (hue === "orange" && n >= 500) {
          note(full);
          return prefix + GOLD + a;
        }
        return full;
      }
    );

    L[i] = line;
  }

  const out = L.join("\n");
  fs.writeFileSync(p, out, "utf8");
  const total = [...applied.values()].reduce((a, b) => a + b, 0);
  grand += total;
  console.log("\n=== " + f + " — " + total + " ===");
  [...applied].sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log("  " + String(v).padStart(3) + "x  " + k));
}
console.log("\ntotal: " + grand);
