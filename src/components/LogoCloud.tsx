"use client";

import { useEffect, useState } from "react";
import config from "@/config";

type LogoCloudItemProps = {
  src: string;
  scale?: number;
  useMonochrome: boolean;
  isLightTheme: boolean;
};

const LogoCloudSlot = ({ src, scale, useMonochrome, isLightTheme }: LogoCloudItemProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!src.trim() || !isVisible) {
    return null;
  }

  return (
    <div className="flex h-12 w-14 shrink-0 items-center justify-center text-center sm:w-24 md:w-40">
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      onError={() => setIsVisible(false)}
      style={scale ? { transform: `scale(${scale})` } : undefined}
      className={`max-h-6 max-w-full object-contain transition-opacity duration-300 hover:opacity-100 sm:max-h-7 md:max-h-8 ${
        useMonochrome
          ? isLightTheme
            ? "opacity-65 [filter:grayscale(1)_brightness(0)_invert(0.18)]"
            : "opacity-60 [filter:grayscale(1)_brightness(0)_invert(1)]"
          : "opacity-90"
      }`}
    />
    </div>
  );
};

const LogoCloud = () => {
  if (!config.socialProof.showLogoCloud) {
    return null;
  }

  const items = config.socialProof.logoCloudItems;
  const useMonochrome = config.socialProof.logoCloudUseMonochrome;
  const shouldRoll = config.socialProof.logoCloudShouldRoll;

  // Watch data-theme on <html> so the filter updates when the toggle fires
  const [isLightTheme, setIsLightTheme] = useState(
    () => config.theme !== config.darkTheme
  );

  useEffect(() => {
    const read = () =>
      setIsLightTheme(
        document.documentElement.getAttribute("data-theme") !== config.darkTheme
      );
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);
  if (!items.length) {
    return null;
  }

  const visibleItems = shouldRoll ? [...items, ...items] : items.slice(0, 5);

  return (
    <section className="relative overflow-hidden bg-base-200 px-8 py-16 md:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-base-content/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-base-content/10" />

      <div className="relative mx-auto max-w-6xl">
        {shouldRoll && (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-base-200 to-transparent md:w-14" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-base-200 to-transparent md:w-14" />
          </>
        )}

        <div className={shouldRoll ? "logo-cloud-marquee overflow-hidden" : ""}>
          <div
            className={
              shouldRoll
                ? "logo-cloud-track flex w-max items-center gap-x-16 md:gap-x-24"
                : "mx-auto flex w-full flex-nowrap items-center justify-center gap-x-7 sm:gap-x-10 md:gap-x-24"
            }
          >
            {visibleItems.map((item, index) => (
              <LogoCloudSlot
                key={`${item.src}-${index}`}
                src={item.src}
                scale={item.scale}
                useMonochrome={useMonochrome}
                isLightTheme={isLightTheme}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;
