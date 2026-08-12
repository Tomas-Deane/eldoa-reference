"use client";

import { useEffect, useMemo, useState } from "react";

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

const cervicalVideo = "https://www.youtube.com/watch?v=nmULdffJCqs";
const thoracicVideo = "https://www.youtube.com/watch?v=6WU4pFxIch8";
const lumbarVideo = "https://www.youtube.com/watch?v=7WHaHBDDi-g";

const poses: Pose[] = [
  { id: "c2-c3", upper: "C2", lower: "C3", region: "cervical", image: "/poses/c2-c3.avif", video: cervicalVideo },
  { id: "c3-c4", upper: "C3", lower: "C4", region: "cervical", image: "/poses/c3-c4.avif", video: cervicalVideo },
  { id: "c4-c5", upper: "C4", lower: "C5", region: "cervical", image: "/poses/c4-c5.avif", video: cervicalVideo, common: true },
  { id: "c5-c6", upper: "C5", lower: "C6", region: "cervical", video: cervicalVideo },
  { id: "c6-c7", upper: "C6", lower: "C7", region: "cervical", image: "/poses/c6-c7.avif", video: cervicalVideo },
  { id: "c7-t1", upper: "C7", lower: "T1", region: "cervical", image: "/poses/c7-t1.avif", video: cervicalVideo, common: true },
  { id: "t1-t2", upper: "T1", lower: "T2", region: "thoracic", image: "/poses/t1-t2.avif", video: thoracicVideo, common: true },
  { id: "t2-t3", upper: "T2", lower: "T3", region: "thoracic", image: "/poses/t2-t3.avif", video: thoracicVideo },
  { id: "t3-t4", upper: "T3", lower: "T4", region: "thoracic", image: "/poses/t3-t4.avif", video: thoracicVideo },
  { id: "t4-t5", upper: "T4", lower: "T5", region: "thoracic", image: "/poses/t4-t5.avif", video: thoracicVideo, common: true },
  { id: "t5-t6", upper: "T5", lower: "T6", region: "thoracic", image: "/poses/t5-t6.avif", video: thoracicVideo },
  { id: "t6-t7", upper: "T6", lower: "T7", region: "thoracic", image: "/poses/t6-t7.avif", video: "https://www.youtube.com/shorts/Te1jCDxOU48", common: true },
  { id: "t7-t8", upper: "T7", lower: "T8", region: "thoracic", image: "/poses/t7-t8.avif", video: thoracicVideo },
  { id: "t8-t9", upper: "T8", lower: "T9", region: "thoracic", image: "/poses/t8-t9.avif", video: "https://www.youtube.com/shorts/GJBTL9XExlw", common: true },
  { id: "t9-t10", upper: "T9", lower: "T10", region: "thoracic", image: "/poses/t9-t10.avif", video: thoracicVideo },
  { id: "t10-t11", upper: "T10", lower: "T11", region: "thoracic", image: "/poses/t10-t11.avif", video: thoracicVideo },
  { id: "t11-t12", upper: "T11", lower: "T12", region: "thoracic", image: "/poses/t11-t12.avif", video: thoracicVideo },
  { id: "t12-l1", upper: "T12", lower: "L1", region: "thoracic", image: "/poses/t12-l1.avif", video: thoracicVideo, common: true },
  { id: "l1-l2", upper: "L1", lower: "L2", region: "lumbar", image: "/poses/l1-l2.avif", video: lumbarVideo },
  { id: "l2-l3", upper: "L2", lower: "L3", region: "lumbar", image: "/poses/l2-l3.avif", video: lumbarVideo },
  { id: "l3-l4", upper: "L3", lower: "L4", region: "lumbar", image: "/poses/l3-l4.avif", video: lumbarVideo, common: true },
  { id: "l4-l5", upper: "L4", lower: "L5", region: "lumbar", image: "/poses/l4-l5.avif", video: "https://www.youtube.com/shorts/8RVdXDPibEM", common: true },
  { id: "l5-s1", upper: "L5", lower: "S1", region: "lumbar", image: "/poses/l5-s1.avif", video: "https://www.youtube.com/shorts/_llRn7zImh8", common: true },
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

  const visible = useMemo(() => poses.filter((pose) => {
    if (filter === "Common 10") return pose.common;
    if (filter === "Cervical") return pose.region === "cervical";
    if (filter === "Thoracic") return pose.region === "thoracic";
    if (filter === "Lumbar") return pose.region === "lumbar";
    return true;
  }), [filter]);

  useEffect(() => {
    setActive(visible[0]?.id ?? "");
  }, [visible]);

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
          <button key={name} className={filter === name ? "selected" : ""} onClick={() => setFilter(name)}>{name}</button>
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
                <a href={pose.video} target="_blank" rel="noreferrer">YouTube technique ↗</a>
              </div>
            </article>
          ))}
        </section>

        <aside className="spine-nav">
          <div className="current">
            <span>NOW</span>
            <strong>{poses.find((pose) => pose.id === active)?.upper}—{poses.find((pose) => pose.id === active)?.lower}</strong>
          </div>
          <div className="column-labels"><span>VERTEBRA</span><span>DISC</span></div>
          <div className="vertebrae">
            {visible.map((pose) => (
              <button key={pose.id} onClick={() => jump(pose.id)} className={active === pose.id ? "active" : ""} aria-label={`Jump to ${pose.upper}–${pose.lower}`}>
                <span className="bone">{pose.upper}</span>
                <span className="disc" />
                <span className="pair">{pose.upper}—{pose.lower}</span>
              </button>
            ))}
            {visible.length > 0 && <div className="last-bone">{visible[visible.length - 1].lower}</div>}
          </div>
          <p className="level-note">LEVEL 2<br /><span>Spine · L5/S1 to C2/C3</span></p>
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
