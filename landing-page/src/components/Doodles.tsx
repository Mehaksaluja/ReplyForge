export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 20" fill="none" className={className} preserveAspectRatio="none">
      <path
        d="M2 14 Q 20 2, 38 12 T 74 12 T 110 12 T 146 12 T 182 12 T 218 12"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 90" fill="none" className={className}>
      <path
        d="M8 6c6 30 8 55 30 68 16 9 42 8 60-6"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M76 50c8 2 16 4 22 12M98 62c-2-8-2-16 2-24"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="currentColor" className={className}>
      <path d="M20 0c1 8 3 15 6 18 4 3 9 4 14 2-5 3-10 6-14 10-3 4-5 10-6 10-1 0-3-6-6-10-4-4-9-7-14-10 5 2 10 1 14-2 3-3 5-10 6-18z" />
    </svg>
  );
}

export function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l4 4M14 14l4 4M18 6l-4 4M10 14l-4 4" />
    </svg>
  );
}
