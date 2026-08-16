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

const spineMap: Record<string, { y: number; parts: [string, string, string] }> = {
  "c2-c3": { y: 6.1, parts: ["path52", "rect48", "path54"] },
  "c3-c4": { y: 8.7, parts: ["path54", "rect46", "path56"] },
  "c4-c5": { y: 11.4, parts: ["path56", "rect44", "path58"] },
  "c5-c6": { y: 13.8, parts: ["path58", "path42", "path60"] },
  "c6-c7": { y: 16.6, parts: ["path60", "path40", "path62"] },
  "c7-t1": { y: 18.8, parts: ["path62", "path38", "path64"] },
  "t1-t2": { y: 21.6, parts: ["path64", "path26", "path66"] },
  "t2-t3": { y: 24.4, parts: ["path66", "path36", "path68"] },
  "t3-t4": { y: 27.4, parts: ["path68", "path34", "path70"] },
  "t4-t5": { y: 30.6, parts: ["path70", "path32", "path72"] },
  "t5-t6": { y: 34.0, parts: ["path72", "path30", "path74"] },
  "t6-t7": { y: 38.1, parts: ["path74", "path28", "path76"] },
  "t7-t8": { y: 42.0, parts: ["path76", "rect24", "path78"] },
  "t8-t9": { y: 45.9, parts: ["path78", "rect22", "path80"] },
  "t9-t10": { y: 50.0, parts: ["path80", "rect20", "path82"] },
  "t10-t11": { y: 53.6, parts: ["path82", "rect18", "path84"] },
  "t11-t12": { y: 57.2, parts: ["path84", "rect16", "path86"] },
  "t12-l1": { y: 61.1, parts: ["path86", "rect14", "path88"] },
  "l1-l2": { y: 65.2, parts: ["path88", "rect12", "path90"] },
  "l2-l3": { y: 69.6, parts: ["path90", "rect10", "path92"] },
  "l3-l4": { y: 74.5, parts: ["path92", "rect8", "path94"] },
  "l4-l5": { y: 79.4, parts: ["path94", "rect6", "path96"] },
  "l5-s1": { y: 83.7, parts: ["path96", "rect4", "path98"] },
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

    spineMap[active]?.parts.forEach((id, index) => {
      const part = graphic.querySelector(`#${id}`) as SVGElement | null;
      if (!part) return;
      part.setAttribute("data-spine-active", "true");
      part.style.fill = index === 1 ? "#ff6542" : "#d93624";
      part.style.filter = index === 1
        ? "drop-shadow(0 0 8px rgba(255,72,42,.62))"
        : "drop-shadow(0 0 5px rgba(217,54,36,.38))";
      part.style.transition = "fill .2s ease, filter .2s ease";
    });
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
