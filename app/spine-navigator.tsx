"use client";

import { useEffect, useRef } from "react";
import spineSvg from "../public/spine-red.svg?raw";
import { vertebraParts } from "./atlas";
import type { Exercise } from "./atlas";

type Props = {
  active: Exercise;
  exercises: Exercise[];
  onSelect: (id: string) => void;
};

export function SpineNavigator({ active, exercises, onSelect }: Props) {
  const graphic = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const animate = (now: number) => {
      const root = graphic.current;
      const gradient = root?.querySelector("#atlasGold");
      const light = root?.querySelector("#atlasLight");
      const reflection = (Math.sin((now / 8000) * Math.PI * 2) + 1) / 2;
      const sparkle = (Math.sin((now / 9000) * Math.PI * 2) + 1) / 2;
      gradient?.setAttribute("gradientTransform", `translate(${-52 + reflection * 104} 0)`);
      light?.setAttribute("azimuth", String(195 + sparkle * 150));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const root = graphic.current;
    if (!root) return;

    root.querySelectorAll("[data-spine-active]").forEach((part) => part.removeAttribute("data-spine-active"));
    const bones = new Set([...vertebraParts[active.upper], ...vertebraParts[active.lower]]);
    bones.forEach((id) => root.querySelector(`#${id}`)?.setAttribute("data-spine-active", "bone"));
    root.querySelector(`#${active.disc}`)?.setAttribute("data-spine-active", "disc");
  }, [active]);

  return (
    <aside className="spine-nav">
      <div className="current"><span>NOW</span><strong>{active.upper}—{active.lower}</strong></div>
      <div className="spine-figure" aria-label="Interactive lateral view of the human spine">
        <div
          ref={graphic}
          className="spine-anatomy"
          role="img"
          aria-label="Human vertebral column, lateral view"
          dangerouslySetInnerHTML={{ __html: spineSvg }}
        />
        {exercises.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`spine-level ${active.id === item.id ? "active" : ""}`}
            style={{ top: `${item.y}%` }}
            aria-label={`Jump to ${item.upper}–${item.lower}`}
          >
            <span className="spine-tick" />
            <span className="pair">{item.upper}—{item.lower}</span>
          </button>
        ))}
      </div>
      <p className="level-note">LEVEL 2 · LATERAL VIEW<br /><span>Tap any articulation to jump</span></p>
    </aside>
  );
}
