import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* =====================================================
   COMPANY LOGO
   Renders a self-contained inline SVG so no external logo
   service is needed. (logo.clearbit.com shut down and
   via.placeholder.com is offline, which left every card
   in Experiences.tsx showing a broken image.)
   ===================================================== */

const COMPANY_BRAND: Record<string, { initials: string; bg: string; fg: string }> = {
  tcs: { initials: "TCS", bg: "#e21836", fg: "#ffffff" },
  infosys: { initials: "INFY", bg: "#007cc3", fg: "#ffffff" },
  accenture: { initials: "A", bg: "#a100ff", fg: "#ffffff" },
  persistent: { initials: "PS", bg: "#f37021", fg: "#ffffff" },
  capgemini: { initials: "CG", bg: "#0070ad", fg: "#ffffff" },
  wipro: { initials: "W", bg: "#ec1c24", fg: "#ffffff" },
  cognizant: { initials: "COG", bg: "#0066cc", fg: "#ffffff" },
  hcl: { initials: "HCL", bg: "#006699", fg: "#ffffff" },
};

const DEFAULT_BRAND = { initials: "", bg: "#0f2747", fg: "#c9a227" };

/**
 * Build an inline SVG data URI for a company badge.
 * Safe to use directly as an <img src> — no network request, no
 * onError fallback required.
 */
export function companyLogoDataUri(company: string): string {
  const name = company.trim().toLowerCase();
  const key = Object.keys(COMPANY_BRAND).find((k) => name.includes(k));

  const brand = key
    ? COMPANY_BRAND[key]
    : {
        ...DEFAULT_BRAND,
        initials: company
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((w) => w[0])
          .join("")
          .toUpperCase(),
      };

  const { initials, bg, fg } = brand;

  // Escape the characters that would break the XML payload.
  const safe = initials.replace(/[<>&"']/g, "").slice(0, 3);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">` +
    `<rect width="80" height="80" rx="16" fill="${bg}"/>` +
    `<text x="40" y="40" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" ` +
    `font-size="${safe.length > 2 ? 22 : 30}" font-weight="700" fill="${fg}" ` +
    `text-anchor="middle" dominant-baseline="central">${safe}</text>` +
    `</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
