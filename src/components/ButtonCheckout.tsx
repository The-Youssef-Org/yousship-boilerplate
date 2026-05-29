"use client";

import { useState } from "react";
import ButtonPrimary from "./ButtonPrimary";
import config from "@/config";

// Payment checkout trigger — works with both Stripe and Lemon Squeezy.
// Pass the priceId (Stripe) or variantId (LS) as `planId`.
// The active provider is determined by config.paymentProvider.
const ButtonCheckout = ({
  planId,
  mode = "payment",
  label = "Buy now",
  fullWidth = true,
  className = "",
}: {
  planId: string;
  mode?: "payment" | "subscription";
  label?: string;
  fullWidth?: boolean;
  className?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const provider = config.paymentProvider;
  const providerLabel = provider === "lemonsqueezy" ? "Lemon Squeezy" : "Stripe";

  const handleClick = async () => {
    setLoading(true);
    try {
      let res: Response;

      if (provider === "lemonsqueezy") {
        res = await fetch("/api/lemonsqueezy/create-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            variantId: planId,
            redirectUrl: `${window.location.origin}/purchase-successful`,
          }),
        });
      } else {
        res = await fetch("/api/stripe/create-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priceId: planId, mode }),
        });
      }

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
      {loading ? `Redirecting to ${providerLabel}…` : label}
    </ButtonPrimary>
  );
};

export default ButtonCheckout;
