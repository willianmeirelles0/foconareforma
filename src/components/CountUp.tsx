"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
};

/** Anima um número subindo de 0 até o valor final quando entra na viewport. */
export default function CountUp({
  to,
  prefix = "",
  suffix = "",
  durationMs = 1200,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();

          const prefersReducedMotion = window.matchMedia?.(
            "(prefers-reduced-motion: reduce)"
          ).matches;

          if (prefersReducedMotion) {
            setValue(to);
            continue;
          }

          const start = performance.now();
          function tick(now: number) {
            const progress = Math.min((now - start) / durationMs, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * to));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [to, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
