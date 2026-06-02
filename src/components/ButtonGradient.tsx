"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import ButtonPrimary from "./ButtonPrimary";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  title?: string;
  children?: ReactNode;
};

// Eye-catching primary CTA button. Use for the most important action on a page.
const ButtonGradient = ({
  title = "Get started",
  children,
  className = "",
  ...rest
}: Props) => {
  return (
    <ButtonPrimary
      {...rest}
      variant="gradient"
      className={`relative px-6 py-3 hover:-translate-y-0.5 disabled:cursor-default ${className}`}
    >
      {children ?? title}
    </ButtonPrimary>
  );
};

export default ButtonGradient;
