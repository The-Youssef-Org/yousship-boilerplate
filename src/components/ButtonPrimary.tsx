import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: "solid" | "gradient";
};

const baseClasses =
  "inline-flex items-center justify-center rounded-xl text-sm font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-60";

const variantClasses: Record<NonNullable<Props["variant"]>, string> = {
  solid: "bg-blue-700 hover:bg-blue-800",
  gradient:
    "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg shadow-blue-800/30 hover:shadow-blue-800/45",
};

const ButtonPrimary = ({
  children,
  href,
  className = "",
  variant = "solid",
  ...buttonProps
}: Props) => {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
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
