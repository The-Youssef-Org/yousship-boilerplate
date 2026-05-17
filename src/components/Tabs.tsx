"use client";

import { useState, type ReactNode } from "react";

export type Tab = { id: string; label: string; content: ReactNode };

// Generic tabs primitive — fully controlled inside, accessible roles.
const Tabs = ({
  tabs,
  defaultTab,
}: {
  tabs: Tab[];
  defaultTab?: string;
}) => {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);

  return (
    <div>
      <div role="tablist" className="flex gap-1 rounded-xl bg-base-200 p-1">
        {tabs.map((t) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={selected}
              aria-controls={`tabpanel-${t.id}`}
              id={`tab-${t.id}`}
              onClick={() => setActive(t.id)}
              className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
                selected
                  ? "bg-base-100 text-base-content shadow"
                  : "text-base-content/70 hover:text-base-content"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`tabpanel-${t.id}`}
          aria-labelledby={`tab-${t.id}`}
          hidden={t.id !== active}
          className="mt-6"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
