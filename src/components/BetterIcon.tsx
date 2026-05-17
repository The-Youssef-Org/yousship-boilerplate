import type { ReactNode } from "react";

// Decorative wrapper around an icon — gradient bg + soft shadow.
// Drop any SVG / emoji / image inside.
const BetterIcon = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-inset ring-primary/20 ${className}`}
    >
      {children}
    </span>
  );
};

export default BetterIcon;
