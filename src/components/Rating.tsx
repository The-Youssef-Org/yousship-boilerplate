"use client";

import { useState } from "react";

// Interactive star rating. Pass `value` for controlled mode, or omit for
// uncontrolled. Calls `onChange` whenever the user picks a new rating.
const Rating = ({
  value,
  defaultValue = 0,
  max = 5,
  onChange,
  readOnly = false,
  size = 24,
}: {
  value?: number;
  defaultValue?: number;
  max?: number;
  onChange?: (n: number) => void;
  readOnly?: boolean;
  size?: number;
}) => {
  const [internal, setInternal] = useState(defaultValue);
  const [hover, setHover] = useState<number | null>(null);
  const current = value ?? internal;
  const display = hover ?? current;

  const set = (n: number) => {
    if (readOnly) return;
    if (value === undefined) setInternal(n);
    onChange?.(n);
  };

  return (
    <div
      className="inline-flex items-center gap-0.5"
      role="radiogroup"
      aria-label="Rating"
    >
      {Array.from({ length: max }).map((_, i) => {
        const n = i + 1;
        const filled = n <= display;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={current === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            disabled={readOnly}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(n)}
            onBlur={() => setHover(null)}
            onClick={() => set(n)}
            className={`transition ${
              readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"
            }`}
          >
            <svg
              viewBox="0 0 20 20"
              width={size}
              height={size}
              fill={filled ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={1.5}
              className={filled ? "text-amber-400" : "text-neutral-300"}
            >
              <path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.951.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.366 2.446c-.783.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.06 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
