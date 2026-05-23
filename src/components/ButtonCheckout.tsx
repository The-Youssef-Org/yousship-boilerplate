"use client";

import { useState } from "react";
import ButtonPrimary from "./ButtonPrimary";

// Stripe checkout trigger.
// Expects a server route at /api/stripe/create-checkout that returns { url }.
const ButtonCheckout = ({
  priceId,
  mode = "payment",
  label = "Buy now",
  fullWidth = true,
  className = "",
}: {
  priceId: string;
  mode?: "payment" | "subscription";
  label?: string;
  fullWidth?: boolean;
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
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("[checkout] No URL returned:", data.error);
        alert(data.error ?? "Something went wrong. Please try again.");
      }
    } catch (e) {
      console.error(e);
      alert("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ButtonPrimary
      onClick={handleClick}
      disabled={loading}
      className={`group relative ${fullWidth ? "w-full" : "w-auto"} cursor-pointer px-5 py-3 shadow-sm shadow-amber-900/10 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? "Redirecting to Stripe…" : label}
    </ButtonPrimary>
  );
};

export default ButtonCheckout;
