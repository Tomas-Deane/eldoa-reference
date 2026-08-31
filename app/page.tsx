"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import spineSvg from "../public/spine-red.svg?raw";

type Region = "cervical" | "thoracic" | "lumbar";

type Pose = {
  id: string;
  upper: string;
  lower: string;
  region: Region;
  image?: string;
  video: string;
  common?: boolean;
};

const nwfVideo = (id: string) => `https://nwfeldoaonlinemembers.vhx.tv/nwf-eldoa-exercises/videos/${id}`;

const vertebraParts: Record<string, string[]> = {
  // Posterior elements are separate SVG paths. path120 is a composite shared by T3 and T4.
  C2: ["path52", "path104"], C3: ["path54", "path106"], C4: ["path56", "path108"],
  C5: ["path58", "path110"], C6: ["path60", "path112"], C7: ["path62", "path114"],
  T1: ["path64", "path116"], T2: ["path66", "path118"], T3: ["path68", "path120"],
  T4: ["path70", "path120"], T5: ["path72", "path122"], T6: ["path74", "path124"],
  T7: ["path76", "path126"], T8: ["path78", "path128"], T9: ["path80", "path130"],
  T10: ["path82", "path132"], T11: ["path84", "path134"], T12: ["path86", "path136"],
  L1: ["path88", "path138"], L2: ["path90", "path140"], L3: ["path92", "path142"],
  L4: ["path94", "path144"], L5: ["path96", "path146"], S1: ["path98", "path148"],
};

const spineMap: Record<string, { y: number; upper: string; disc: string; lower: string }> = {
  "c2-c3": { y: 11.06, upper: "C2", disc: "rect48", lower: "C3" },
  "c3-c4": { y: 13.41, upper: "C3", disc: "rect46", lower: "C4" },
  "c4-c5": { y: 15.74, upper: "C4", disc: "rect44", lower: "C5" },
  "c5-c6": { y: 17.89, upper: "C5", disc: "path42", lower: "C6" },
  "c6-c7": { y: 20.38, upper: "C6", disc: "path40", lower: "C7" },
  "c7-t1": { y: 22.34, upper: "C7", disc: "path38", lower: "T1" },
  "t1-t2": { y: 24.76, upper: "T1", disc: "path26", lower: "T2" },
  "t2-t3": { y: 27.25, upper: "T2", disc: "path36", lower: "T3" },
  "t3-t4": { y: 29.97, upper: "T3", disc: "path34", lower: "T4" },
  "t4-t5": { y: 32.77, upper: "T4", disc: "path32", lower: "T5" },
  "t5-t6": { y: 35.84, upper: "T5", disc: "path30", lower: "T6" },
  "t6-t7": { y: 39.46, upper: "T6", disc: "path28", lower: "T7" },
  "t7-t8": { y: 42.95, upper: "T7", disc: "rect24", lower: "T8" },
  "t8-t9": { y: 46.35, upper: "T8", disc: "rect22", lower: "T9" },
  "t9-t10": { y: 49.97, upper: "T9", disc: "rect20", lower: "T10" },
  "t10-t11": { y: 53.21, upper: "T10", disc: "rect18", lower: "T11" },
  "t11-t12": { y: 56.39, upper: "T11", disc: "rect16", lower: "T12" },
  "t12-l1": { y: 59.83, upper: "T12", disc: "rect14", lower: "L1" },
  "l1-l2": { y: 63.43, upper: "L1", disc: "rect12", lower: "L2" },
  "l2-l3": { y: 67.46, upper: "L2", disc: "rect10", lower: "L3" },
  "l3-l4": { y: 71.67, upper: "L3", disc: "rect8", lower: "L4" },
  "l4-l5": { y: 76.08, upper: "L4", disc: "rect6", lower: "L5" },
  "l5-s1": { y: 79.87, upper: "L5", disc: "rect4", lower: "S1" },
};

const poses: Pose[] = [
  { id: "c2-c3", upper: "C2", lower: "C3", region: "cervical", image: "/poses/c2-c3.avif", video: nwfVideo("c2-c3") },
  { id: "c3-c4", upper: "C3", lower: "C4", region: "cervical", image: "/poses/c3-c4.avif", video: nwfVideo("c3-c4") },
  { id: "c4-c5", upper: "C4", lower: "C5", region: "cervical", image: "/poses/c4-c5.avif", video: nwfVideo("c4-c5"), common: true },
  { id: "c5-c6", upper: "C5", lower: "C6", region: "cervical", video: nwfVideo("c5-c6") },
  { id: "c6-c7", upper: "C6", lower: "C7", region: "cervical", image: "/poses/c6-c7.avif", video: nwfVideo("c6-c7") },
  { id: "c7-t1", upper: "C7", lower: "T1", region: "cervical", image: "/poses/c7-t1.avif", video: nwfVideo("c7-t1"), common: true },
  { id: "t1-t2", upper: "T1", lower: "T2", region: "thoracic", image: "/poses/t1-t2.avif", video: nwfVideo("t1-t2"), common: true },
  { id: "t2-t3", upper: "T2", lower: "T3", region: "thoracic", image: "/poses/t2-t3.avif", video: nwfVideo("t2-t3") },
  { id: "t3-t4", upper: "T3", lower: "T4", region: "thoracic", image: "/poses/t3-t4.avif", video: nwfVideo("t3-t4") },
  { id: "t4-t5", upper: "T4", lower: "T5", region: "thoracic", image: "/poses/t4-t5.avif", video: nwfVideo("t4-t5"), common: true },
  { id: "t5-t6", upper: "T5", lower: "T6", region: "thoracic", image: "/poses/t5-t6.avif", video: nwfVideo("t5-t6") },
  { id: "t6-t7", upper: "T6", lower: "T7", region: "thoracic", image: "/poses/t6-t7.avif", video: nwfVideo("t6-t7"), common: true },
  { id: "t7-t8", upper: "T7", lower: "T8", region: "thoracic", image: "/poses/t7-t8.avif", video: nwfVideo("t7-t8") },
  { id: "t8-t9", upper: "T8", lower: "T9", region: "thoracic", image: "/poses/t8-t9.avif", video: nwfVideo("t8-t9"), common: true },
  { id: "t9-t10", upper: "T9", lower: "T10", region: "thoracic", image: "/poses/t9-t10.avif", video: nwfVideo("t9-t10") },
  { id: "t10-t11", upper: "T10", lower: "T11", region: "thoracic", image: "/poses/t10-t11.avif", video: nwfVideo("t10-t11") },
  { id: "t11-t12", upper: "T11", lower: "T12", region: "thoracic", image: "/poses/t11-t12.avif", video: nwfVideo("t11-t12") },
  { id: "t12-l1", upper: "T12", lower: "L1", region: "thoracic", image: "/poses/t12-l1.avif", video: nwfVideo("t12-l1"), common: true },
  { id: "l1-l2", upper: "L1", lower: "L2", region: "lumbar", image: "/poses/l1-l2.avif", video: nwfVideo("l1-l2") },
  { id: "l2-l3", upper: "L2", lower: "L3", region: "lumbar", image: "/poses/l2-l3.avif", video: nwfVideo("l2-l3") },
  { id: "l3-l4", upper: "L3", lower: "L4", region: "lumbar", image: "/poses/l3-l4.avif", video: nwfVideo("l3-l4"), common: true },
  { id: "l4-l5", upper: "L4", lower: "L5", region: "lumbar", image: "/poses/l4-l5.avif", video: nwfVideo("l4-l5"), common: true },
  { id: "l5-s1", upper: "L5", lower: "S1", region: "lumbar", image: "/poses/l5-s1.avif", video: nwfVideo("l5-s1"), common: true },
];

const extendedReferences = [
  { level: 3, group: "Hip", name: "Hip joint · internal rotation", video: "https://www.youtube.com/watch?v=Oi2EEDXa0Dg", source: "Visual explanation" },
  { level: 3, group: "Hip", name: "Hip joint · external rotation", video: "https://www.youtube.com/watch?v=nW2qieeS2aI", source: "Position demonstration" },
  { level: 3, group: "Hip", name: "Hip joint · general", video: "https://www.youtube.com/watch?v=qAnc5YfvYKc", source: "Position demonstration" },
  { level: 3, group: "Shoulder", name: "Shoulder girdle · multi-joint", video: "https://www.youtube.com/watch?v=QzkBCacMqv0", source: "Full class" },
  { level: 3, group: "Shoulder", name: "Scapular ELDOA", video: "https://www.youtube.com/shorts/KmUzBqkMUpU", source: "Short demonstration" },
  { level: 3, group: "Rib", name: "Rib 6", video: "https://www.youtube.com/watch?v=TY1ib5tCkww", source: "Position demonstration" },
  { level: 3, group: "Rib", name: "Rib 8", video: "https://www.youtube.com/watch?v=2XywEIqyEJc", source: "Position demonstration" },
  { level: 3, group: "Rib", name: "Rib 10", video: "https://www.youtube.com/watch?v=9T-EDHVzFdM", source: "Position demonstration" },
  { level: 4, group: "Pelvis", name: "General SI joint", video: "https://www.youtube.com/watch?v=GJXN4voK8oQ", source: "Position demonstration" },
  { level: 4, group: "Pelvis", name: "SI joint normalization", video: "https://www.youtube.com/watch?v=mK4j4K0b8kM", source: "Full class" },
  { level: 4, group: "Pelvis", name: "Sacroiliac sequence", video: "https://www.youtube.com/watch?v=OMS-d1ZOdSQ", source: "Sequence demonstration" },
  { level: 5, group: "Upper cervical", name: "C0—C1—C2", video: "https://www.youtube.com/watch?v=3fBe9Q8Y3Ek", source: "Visual explanation" },
  { level: 5, group: "Upper cervical", name: "C1—C2", video: "https://www.youtube.com/watch?v=mpPJDI4hddA", source: "Position demonstration" },
  { level: 5, group: "TMJ", name: "Temporomandibular joint", video: "https://www.youtube.com/watch?v=OAJ5Xc7LdH8", source: "Assessment + ELDOA" },
] as const;

const filters = ["All 23", "Common 10", "Cervical", "Thoracic", "Lumbar"] as const;
type Filter = (typeof filters)[number];

export default function Home() {
  const [filter, setFilter] = useState<Filter>("All 23");
  const [active, setActive] = useState("c2-c3");
  const spineGraphic = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => poses.filter((pose) => {
    if (filter === "Common 10") return pose.common;
    if (filter === "Cervical") return pose.region === "cervical";
    if (filter === "Thoracic") return pose.region === "thoracic";
    if (filter === "Lumbar") return pose.region === "lumbar";
    return true;
  }), [filter]);

  useEffect(() => {
    const graphic = spineGraphic.current;
    if (!graphic) return;

    graphic.querySelectorAll("[data-spine-active]").forEach((element) => {
      const part = element as SVGElement;
      part.style.fill = "#8f817d";
      part.style.filter = "";
      part.removeAttribute("data-spine-active");
    });

    const articulation = spineMap[active];
    if (!articulation) return;

    new Set([...vertebraParts[articulation.upper], ...vertebraParts[articulation.lower]]).forEach((id) => {
      const part = graphic.querySelector(`#${id}`) as SVGElement | null;
      if (!part) return;
      part.setAttribute("data-spine-active", "true");
      part.style.fill = "#d93624";
      part.style.filter = "drop-shadow(0 0 5px rgba(217,54,36,.38))";
      part.style.transition = "fill .2s ease, filter .2s ease";
    });

    const disc = graphic.querySelector(`#${articulation.disc}`) as SVGElement | null;
    if (disc) {
      disc.setAttribute("data-spine-active", "true");
      disc.style.fill = "#ff6542";
      disc.style.filter = "drop-shadow(0 0 8px rgba(255,72,42,.62))";
      disc.style.transition = "fill .2s ease, filter .2s ease";
    }
  }, [active]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const seen = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (seen) setActive(seen.target.id);
    }, { rootMargin: "-25% 0px -55% 0px", threshold: [0.05, 0.35, 0.7] });
    visible.forEach((pose) => {
      const el = document.getElementById(pose.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [visible]);

  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  const selectFilter = (name: Filter) => {
    setFilter(name);
    const first = poses.find((pose) => {
      if (name === "Common 10") return pose.common;
      if (name === "Cervical") return pose.region === "cervical";
      if (name === "Thoracic") return pose.region === "thoracic";
      if (name === "Lumbar") return pose.region === "lumbar";
      return true;
    });
    setActive(first?.id ?? "");
  };
  return (
    <main>
      <header className="masthead">
        <div>
          <p className="eyebrow">ELDOA / SPINAL INDEX</p>
          <h1>One minute.<br />One articulation.</h1>
        </div>
        <div className="header-meta">
          <p><b>23</b> spinal levels</p>
          <p><b>22</b> position references</p>
          <p><b>01:00</b> each</p>
        </div>
      </header>

      <nav className="filters" aria-label="Exercise filters">
        {filters.map((name) => (
          <button key={name} className={filter === name ? "selected" : ""} onClick={() => selectFilter(name)}>{name}</button>
        ))}
      </nav>

      <div className="layout">
        <section className="sequence" aria-live="polite">
          {visible.map((pose, index) => (
            <article className="pose" id={pose.id} key={pose.id}>
              <div className="pose-heading">
                <span className="count">{String(index + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}</span>
                <div>
                  <p className="region">{pose.region}</p>
                  <h2>{pose.upper}<span>—</span>{pose.lower}</h2>
                </div>
                <span className="minute">1:00</span>
              </div>

              <div className={`position-frame ${!pose.image ? "missing" : ""}`}>
                {pose.image ? (
                  <img src={pose.image} alt={`Final position reference for ${pose.upper}–${pose.lower} ELDOA`} />
                ) : (
                  <div className="missing-copy">
                    <span>REFERENCE NEEDED</span>
                    <strong>C5—C6</strong>
                    <p>No still was present in the otherwise complete source set.</p>
                  </div>
                )}
                <div className="target-tag"><i /> TARGET&nbsp; {pose.upper}—{pose.lower}</div>
              </div>

              <div className="pose-footer">
                <p>Final position reference</p>
                <a href={pose.video} target="_blank" rel="noreferrer">NWF exercise video ↗</a>
              </div>
            </article>
          ))}
        </section>

        <aside className="spine-nav">
          <div className="current">
            <span>NOW</span>
            <strong>{poses.find((pose) => pose.id === active)?.upper}—{poses.find((pose) => pose.id === active)?.lower}</strong>
          </div>
          <div className="spine-figure" aria-label="Interactive lateral view of the human spine">
            <div
              ref={spineGraphic}
              className="spine-anatomy"
              role="img"
              aria-label="Human vertebral column, lateral view"
              dangerouslySetInnerHTML={{ __html: spineSvg }}
            />
            {visible.map((pose) => (
              <button
                key={pose.id}
                onClick={() => jump(pose.id)}
                className={`spine-level ${active === pose.id ? "active" : ""}`}
                style={{ top: `${spineMap[pose.id].y}%` }}
                aria-label={`Jump to ${pose.upper}–${pose.lower}`}
              >
                <span className="spine-tick" />
                <span className="pair">{pose.upper}—{pose.lower}</span>
              </button>
            ))}
          </div>
          <p className="level-note">LEVEL 2 · LATERAL VIEW<br /><span>Tap any articulation to jump</span></p>
        </aside>
      </div>

      <section className="extended" id="levels-3-5">
        <div className="extended-heading">
          <div>
            <p className="eyebrow">LEVELS 3—5 / VIDEO INDEX</p>
            <h3>Beyond<br />the spine.</h3>
          </div>
          <p className="extended-intro">Confirmed ELDOA demonstrations. Each blank is ready for a final-position screenshot from the linked video.</p>
        </div>
        <div className="reference-grid">
          {extendedReferences.map((item, index) => (
            <article className={`reference-card ${item.group === "TMJ" ? "featured" : ""}`} key={item.name}>
              <div className="reference-blank">
                <span>SCREENSHOT NEEDED</span>
                <b>{String(index + 1).padStart(2, "0")}</b>
              </div>
              <div className="reference-meta">
                <p>LEVEL {item.level} · {item.group}</p>
                <h4>{item.name}</h4>
                <div><span>{item.source}</span><a href={item.video} target="_blank" rel="noreferrer">Open video ↗</a></div>
              </div>
            </article>
          ))}
        </div>
        <div className="unconfirmed">
          <span>NOT YET CONFIRMED</span>
          <p>Level 4 · Pubic symphysis</p>
          <p>Level 6 · Cranial-bone ELDOA positions</p>
        </div>
      </section>
    </main>
  );
}
