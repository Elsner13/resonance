import { cn } from "@/lib/utils";

/**
 * Sam Elsner brand mark — inline SVG.
 * The dark portions use `currentColor` so the logo automatically picks up
 * the current text color from its parent. In light mode → ink, in dark mode → bone.
 * The signal-red portions stay red across both themes.
 */
export function LogoMark({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("inline-block transition-colors duration-300", className)}
    >
      {/* Red lightning bolt — invariant across themes */}
      <path
        d="M402.11 108.93L207.14 403.06H109.88L304.85 108.94V108.93H402.11ZM318.43 134.22L156.98 377.78H193.57L355.02 134.22H318.43Z"
        fill="#FD363B"
      />
      <path
        d="M321.332 126.5L146.5 386H191.287L364.5 126.5H321.332Z"
        fill="#FD363B"
      />
      {/* Dark mass — uses currentColor so theme picks it up */}
      <path
        d="M274.53 108.94L158.38 284.16C129.45 268.33 109.88 237.64 109.88 202.34C109.88 176.55 120.35 153.19 137.24 136.3C154.13 119.41 177.49 108.94 203.28 108.94H274.53Z"
        fill="currentColor"
      />
      <path
        d="M237.47 403.06L353.63 227.84C382.56 243.67 402.12 274.36 402.12 309.66C402.12 335.45 391.65 358.81 374.76 375.7C357.87 392.59 334.51 403.06 308.72 403.06H237.47Z"
        fill="currentColor"
      />
    </svg>
  );
}
