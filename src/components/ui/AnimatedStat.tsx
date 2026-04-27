"use client";

import { useEffect, useRef, useState } from "react";

function parse(value: string): { num: number; suffix: string } {
  const match = value.match(/^([\d,]+)(K\+|\+|K)?$/);
  if (!match) return { num: 0, suffix: value };
  return {
    num: parseInt(match[1].replace(/,/g, ""), 10),
    suffix: match[2] ?? "",
  };
}

export function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const animatedRef = useRef(false);

  const { num, suffix } = parse(value);
  const hasComma = value.includes(",");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animatedRef.current) return;
        animatedRef.current = true;
        observer.disconnect();

        const DURATION = 1400;
        const STEPS = 50;
        const INTERVAL = DURATION / STEPS;
        let step = 0;

        setDisplay(hasComma ? `0,000${suffix}` : `0${suffix}`);

        const timer = setInterval(() => {
          step++;
          const progress = step / STEPS;
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * num);
          const formatted = hasComma
            ? current.toLocaleString("en-US")
            : current.toString();
          setDisplay(formatted + suffix);
          if (step >= STEPS) {
            clearInterval(timer);
            setDisplay(value);
          }
        }, INTERVAL);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [num, suffix, hasComma, value]);

  return <span ref={ref}>{display}</span>;
}
