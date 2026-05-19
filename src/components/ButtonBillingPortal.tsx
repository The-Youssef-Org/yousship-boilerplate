"use client";

import { useState } from "react";

type Props = {
  className?: string;
};

const ButtonBillingPortal = ({ className = "" }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const returnPath = `${window.location.pathname}${window.location.search}`;
      const response = await fetch("/api/stripe/create-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ returnPath }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to create billing portal session");
      }

      if (payload.url) {
        window.location.href = payload.url;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`inline-flex items-center justify-center rounded-xl border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content hover:bg-base-200 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {loading ? "Opening..." : "Manage Billing"}
    </button>
  );
};

export default ButtonBillingPortal;
