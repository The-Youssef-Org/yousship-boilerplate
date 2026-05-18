import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  prefetch?: boolean;
  className?: string;
  variant?: "solid" | "gradient";
};

const baseClasses =
  "inline-flex items-center justify-center rounded-xl text-sm font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 disabled:opacity-60";

const variantClasses: Record<NonNullable<Props["variant"]>, string> = {
  solid: "bg-amber-600 hover:bg-amber-700",
  gradient:
    "bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 shadow-sm shadow-amber-900/10 hover:shadow-md hover:shadow-amber-900/15",
};

const ButtonPrimary = ({
  children,
  href,
  prefetch,
  className = "",
  variant = "solid",
  ...buttonProps
}: Props) => {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    // Hash-only links are same-page anchors — use a plain <a> to avoid
    // Next.js attempting an RSC payload fetch that will always fail.
    if (href.startsWith("#")) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} prefetch={prefetch} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
};

export default ButtonPrimary;
