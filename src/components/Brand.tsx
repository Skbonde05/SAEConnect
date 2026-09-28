/* =====================================================
   BRAND LOCKUP

   The platform name is always rendered as two lines:

       SAEConnect
       SAE Placement Hub

   Centralised here so every screen stays consistent.
   ===================================================== */

import saelogoPng from "../assets/saelogo.png";
import saelogoWebp from "../assets/saelogo.webp";

export const BRAND_NAME = "SAEConnect";
export const BRAND_SUBTITLE = "SAE Placement Hub";

type Size = "sm" | "md" | "lg";

const SIZES: Record<
  Size,
  { name: string; sub: string; gradient: string; block: string }
> = {
  sm: {
    // Navbar lockup (h-16 / 64px bar). Bumped from text-sm + w-9 for legibility;
    // 40px logo + ~40px of two-line text still clears the bar.
    name: "text-base",
    sub: "text-[11px]",
    gradient: "from-gold to-gold-light",
    block: "w-10 h-10",
  },
  md: {
    name: "text-lg",
    sub: "text-xs",
    gradient: "from-gold to-gold-light",
    block: "w-12 h-12",
  },
  lg: {
    name: "text-2xl sm:text-3xl",
    sub: "text-xs sm:text-sm",
    gradient: "from-gold via-gold-light to-gold",
    block: "w-16 h-16 sm:w-20 sm:h-20",
  },
};

interface BrandProps {
  size?: Size;
  /** `gradient` for dark hero panels, `plain` for light backgrounds. */
  tone?: "gradient" | "plain";
  /** Logo to render beside the wordmark. Omit for wordmark only. */
  showIcon?: boolean;
  className?: string;
}

export default function Brand({
  size = "sm",
  tone = "plain",
  showIcon = true,
  className = "",
}: BrandProps) {
  const s = SIZES[size];

  const nameClass =
    tone === "gradient"
      ? `font-extrabold tracking-tight bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent`
      : "font-extrabold tracking-tight text-navy";

  const subClass =
    tone === "gradient"
      ? "font-semibold uppercase tracking-[0.18em] text-blue-on-dark/80"
      : "font-semibold uppercase tracking-[0.14em] text-ink-muted";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showIcon && (
        <BrandMark className={`${s.block} shrink-0`} alt={`${BRAND_NAME} logo`} />
      )}

      <div className="leading-tight text-left">
        <p className={`${s.name} ${nameClass}`}>{BRAND_NAME}</p>
        <p className={`${s.sub} ${subClass}`}>{BRAND_SUBTITLE}</p>
      </div>
    </div>
  );
}

/**
 * The SAE emblem (navy roundel with gold ring, mortarboard and open book).
 *
 * The artwork carries its own circular navy background, so it is displayed
 * bare: no tile, no ring, no gradient behind it. That also means it reads
 * correctly on both the light and the dark surfaces without variants.
 *
 * WebP is offered first (20 KB vs 77 KB for the PNG) with a PNG fallback.
 */
export function BrandMark({
  className = "",
  alt = `${BRAND_NAME} logo`,
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <picture>
      <source srcSet={saelogoWebp} type="image/webp" />
      <img
        src={saelogoPng}
        alt={alt}
        width={256}
        height={256}
        // Rounded + shrink-0 keeps the roundel flush in flex layouts.
        className={`rounded-full object-contain ${className}`}
        loading="eager"
        decoding="async"
      />
    </picture>
  );
}
