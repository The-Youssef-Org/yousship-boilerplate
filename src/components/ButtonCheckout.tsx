"use client";

import { useState } from "react";
import ButtonPrimary from "./ButtonPrimary";

// Stripe checkout trigger.
// Expects a server route at /api/stripe/create-checkout that returns { url }.
const ButtonCheckout = ({
  priceId,
  mode = "payment",
  label = "Buy now",
  className = "",
}: {
  priceId: string;
  mode?: "payment" | "subscription";
  label?: string;
  className?: string;
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          mode,
          successUrl: `${window.location.origin}/dashboard`,
          cancelUrl: window.location.href,
        }),
      });
      const { url } = (await res.json()) as { url?: string };
      if (url) window.location.href = url;
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ButtonPrimary
      onClick={handleClick}
      disabled={loading}
      className={`group relative w-full cursor-pointer px-5 py-3 shadow-lg shadow-blue-800/25 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? "Redirecting to Stripe…" : label}
    </ButtonPrimary>
  );
};

export default ButtonCheckout;
