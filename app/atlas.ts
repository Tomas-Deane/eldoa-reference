export type Region = "cervical" | "thoracic" | "lumbar";

export type Exercise = {
  id: string;
  upper: string;
  lower: string;
  region: Region;
  y: number;
  disc: string;
  image?: string;
  video: string;
  common?: boolean;
};

type ExerciseOptions = { common?: boolean; image?: false };

const exercise = (
  id: string,
  upper: string,
  lower: string,
  region: Region,
  y: number,
  disc: string,
  options: ExerciseOptions = {},
): Exercise => ({
  id,
  upper,
  lower,
  region,
  y,
  disc,
  common: options.common,
  image: options.image === false ? undefined : `/poses/${id}.avif`,
  video: `https://nwfeldoaonlinemembers.vhx.tv/nwf-eldoa-exercises/videos/${id}`,
});

export const exercises = [
  exercise("c2-c3", "C2", "C3", "cervical", 11.06, "rect48"),
  exercise("c3-c4", "C3", "C4", "cervical", 13.41, "rect46"),
  exercise("c4-c5", "C4", "C5", "cervical", 15.74, "rect44", { common: true }),
  exercise("c5-c6", "C5", "C6", "cervical", 17.89, "path42", { image: false }),
  exercise("c6-c7", "C6", "C7", "cervical", 20.38, "path40"),
  exercise("c7-t1", "C7", "T1", "cervical", 22.34, "path38", { common: true }),
  exercise("t1-t2", "T1", "T2", "thoracic", 24.76, "path26", { common: true }),
  exercise("t2-t3", "T2", "T3", "thoracic", 27.25, "path36"),
  exercise("t3-t4", "T3", "T4", "thoracic", 29.97, "path34"),
  exercise("t4-t5", "T4", "T5", "thoracic", 32.77, "path32", { common: true }),
  exercise("t5-t6", "T5", "T6", "thoracic", 35.84, "path30"),
  exercise("t6-t7", "T6", "T7", "thoracic", 39.46, "path28", { common: true }),
  exercise("t7-t8", "T7", "T8", "thoracic", 42.95, "rect24"),
  exercise("t8-t9", "T8", "T9", "thoracic", 46.35, "rect22", { common: true }),
  exercise("t9-t10", "T9", "T10", "thoracic", 49.97, "rect20"),
  exercise("t10-t11", "T10", "T11", "thoracic", 53.21, "rect18"),
  exercise("t11-t12", "T11", "T12", "thoracic", 56.39, "rect16"),
  exercise("t12-l1", "T12", "L1", "thoracic", 59.83, "rect14", { common: true }),
  exercise("l1-l2", "L1", "L2", "lumbar", 63.43, "rect12"),
  exercise("l2-l3", "L2", "L3", "lumbar", 67.46, "rect10"),
  exercise("l3-l4", "L3", "L4", "lumbar", 71.67, "rect8", { common: true }),
  exercise("l4-l5", "L4", "L5", "lumbar", 76.08, "rect6", { common: true }),
  exercise("l5-s1", "L5", "S1", "lumbar", 79.87, "rect4", { common: true }),
];

export const vertebraParts: Record<string, [string, string]> = {
  C2: ["path52", "path104"], C3: ["path54", "path106"], C4: ["path56", "path108"],
  C5: ["path58", "path110"], C6: ["path60", "path112"], C7: ["path62", "path114"],
  T1: ["path64", "path116"], T2: ["path66", "path118"],
  // T3 and T4 share one posterior-element path in the source SVG.
  T3: ["path68", "path120"],
  T4: ["path70", "path120"], T5: ["path72", "path122"], T6: ["path74", "path124"],
  T7: ["path76", "path126"], T8: ["path78", "path128"], T9: ["path80", "path130"],
  T10: ["path82", "path132"], T11: ["path84", "path134"], T12: ["path86", "path136"],
  L1: ["path88", "path138"], L2: ["path90", "path140"], L3: ["path92", "path142"],
  L4: ["path94", "path144"], L5: ["path96", "path146"], S1: ["path98", "path148"],
};

export const filters = ["All 23", "Common 10", "Cervical", "Thoracic", "Lumbar"] as const;
export type Filter = (typeof filters)[number];

export const filterExercises = (filter: Filter) => exercises.filter((item) => {
  if (filter === "All 23") return true;
  if (filter === "Common 10") return item.common;
  return item.region === filter.toLowerCase();
});

export type Reference = {
  level: 3 | 4 | 5 | 6;
  group: string;
  name: string;
  video?: string;
  source?: string;
};

export const referenceLevels = [
  { level: 3, title: "Peripheral joints", scope: "Hip · shoulder · ribs and sternum" },
  { level: 4, title: "Pelvis", scope: "Sacroiliac joint · pubic symphysis · sacrum" },
  { level: 5, title: "Upper cervical & TMJ", scope: "Lumbar pathologies · upper cervical spine · TMJ" },
  { level: 6, title: "Cranial bones", scope: "Cranial-bone ELDOA" },
] as const;

export const references: Reference[] = [
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
  { level: 4, group: "Pelvis", name: "Pubic symphysis" },
  { level: 5, group: "Upper cervical", name: "C0—C1—C2", video: "https://www.youtube.com/watch?v=3fBe9Q8Y3Ek", source: "Visual explanation" },
  { level: 5, group: "Upper cervical", name: "C1—C2", video: "https://www.youtube.com/watch?v=mpPJDI4hddA", source: "Position demonstration" },
  { level: 5, group: "TMJ", name: "Temporomandibular joint", video: "https://www.youtube.com/watch?v=OAJ5Xc7LdH8", source: "Assessment + ELDOA" },
  { level: 6, group: "Cranial bones", name: "Cranial-bone ELDOA positions" },
];
