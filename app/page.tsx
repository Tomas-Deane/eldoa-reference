"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { filterExercises, filters, references, referenceLevels } from "./atlas";
import type { Exercise, Filter } from "./atlas";
import { SpineNavigator } from "./spine-navigator";

const pad = (value: number) => String(value).padStart(2, "0");
const jumpTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });

function ExerciseCard({ item, index, total }: { item: Exercise; index: number; total: number }) {
  const pair = `${item.upper}—${item.lower}`;
  return (
    <article className="pose" id={item.id}>
      <div className="pose-heading">
        <span className="count">{pad(index + 1)} / {pad(total)}</span>
        <div><p className="region">{item.region}</p><h2>{item.upper}<span>—</span>{item.lower}</h2></div>
        <span className="minute">1:00</span>
      </div>
      <div className={item.image ? `position-frame${item.setup ? " source-frame" : ""}` : "position-frame missing"}>
        {item.image
          ? <Image className={item.setup ? "original" : undefined} src={item.image} alt={`Final position reference for ${pair} ELDOA`} fill sizes="(max-width: 900px) 100vw, calc(100vw - 400px)" />
          : <div className="missing-copy"><span>REFERENCE NEEDED</span><strong>{pair}</strong><p>No still was present in the otherwise complete source set.</p></div>}
        <div className="target-tag"><i /> TARGET&nbsp; {pair}</div>
      </div>
      {item.setup && item.hold && <div className="cue-sheet">
        <section><h3>Setup</h3><ol>{item.setup.map((cue) => <li key={cue}>{cue}</li>)}</ol></section>
        <section><h3>Hold</h3><ul>{item.hold.map((cue) => <li key={cue}>{cue}</li>)}</ul></section>
      </div>}
      <div className="pose-footer"><p>Final position reference</p><a href={item.video} target="_blank" rel="noreferrer">NWF exercise video ↗</a></div>
    </article>
  );
}

function ReferenceIndex() {
  return (
    <section className="extended" id="levels-3-6">
      <div className="extended-heading">
        <div><p className="eyebrow">LEVELS 3—6</p><h3>Joint-specific<br />ELDOA.</h3></div>
      </div>
      {referenceLevels.map(({ level, title, scope }) => {
        const items = references.filter((item) => item.level === level);
        return (
          <section className="level-section" key={level}>
            <header className="level-heading">
              <p>LEVEL {level}</p><div><h4>{title}</h4><span>{scope}</span></div>
            </header>
            <div className="reference-grid">
              {items.map((item, index) => (
                <article className={`reference-card ${item.group === "TMJ" ? "featured" : ""}`} key={item.name}>
                  <div className="reference-blank"><span>{item.video ? "SCREENSHOT NEEDED" : "REFERENCE NEEDED"}</span><b>{pad(index + 1)}</b></div>
                  <div className="reference-meta">
                    <p>{item.group}</p><h4>{item.name}</h4>
                    <div>
                      <span>{item.source ?? "REFERENCE NEEDED"}</span>
                      {item.video && <a href={item.video} target="_blank" rel="noreferrer">Open video ↗</a>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </section>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<Filter>("All 23");
  const visible = useMemo(() => filterExercises(filter), [filter]);
  const [activeId, setActiveId] = useState(visible[0].id);
  const active = visible.find((item) => item.id === activeId) ?? visible[0];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter(({ isIntersecting }) => isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActiveId(current.target.id);
    }, { rootMargin: "-25% 0px -55% 0px", threshold: [0.05, 0.35, 0.7] });

    visible.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [visible]);

  const selectFilter = (next: Filter) => {
    const first = filterExercises(next)[0];
    setFilter(next);
    setActiveId(first.id);
  };

  return (
    <main>
      <header className="masthead">
        <div><p className="eyebrow">QUICK REFERENCE</p><h1>ELDOA<br />Reference.</h1></div>
        <div className="header-meta"><p>1 minute per exercise</p></div>
      </header>
      <nav className="filters" aria-label="Exercise filters">
        {filters.map((name) => <button key={name} className={filter === name ? "selected" : ""} onClick={() => selectFilter(name)}>{name}</button>)}
      </nav>
      <div className="layout">
        <section className="sequence" aria-live="polite">
          {visible.map((item, index) => <ExerciseCard item={item} index={index} total={visible.length} key={item.id} />)}
        </section>
        <SpineNavigator active={active} exercises={visible} onSelect={jumpTo} />
      </div>
      <ReferenceIndex />
    </main>
  );
}
