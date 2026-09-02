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
  setup?: string[];
  hold?: string[];
};

type ExerciseOptions = Pick<Partial<Exercise>, "common" | "setup" | "hold"> & { image?: false | string };

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
  image: options.image === false ? undefined : options.image ?? `/poses/${id}.avif`,
  video: `https://nwfeldoaonlinemembers.vhx.tv/nwf-eldoa-exercises/videos/${id}`,
});

export const exercises = [
  exercise("c2-c3", "C2", "C3", "cervical", 11.06, "rect48", {
    image: "/poses/c2-c3.png",
    setup: [
      "Exhale: press the belly button down, reach the tailbone away, tuck the chin and lengthen the neck.",
      "Bring both legs to tabletop, with the ankles slightly higher than the knees.",
      "Grip the inside of the knees or shins. Use the hands to lift the head as high as possible.",
      "Keep the chin tucked and slowly roll the neck toward the floor.",
    ],
    hold: [
      "Reach the bone beneath the skull toward the wall behind you; keep the chin close to the chest.",
      "Arms outside the hips, palms reaching past the hips. Pull the fingers and toes back.",
      "Press the palms down, spread the fingers and reach the hands away. Push the back of the head toward the wall.",
    ],
  }),
  exercise("c3-c4", "C3", "C4", "cervical", 13.41, "rect46", {
    image: "/poses/c3-c4.png",
    setup: [
      "Take a deep breath. Press the belly button down into the ground.",
      "As you breathe out, stabilize the pelvis and push the tailbone away from the head.",
      "Pull the chin down to the ground; lengthen the back of the neck away and off the shoulders.",
      "Bring both legs to tabletop, feet slightly higher than the knees. Knees shoulder-width—or two fists—apart.",
      "Pull the pinky toes back toward the shins.",
    ],
    hold: [
      "Hips push away; head pushes off the shoulders.",
      "Externally rotate the arms. Fingers point toward the feet; shoulder blades lift off the ground.",
      "Hands beside the knees, reaching toward the heels. Palms reach toward the feet; wrists pull back.",
      "Eyes look down between the knees. Spread the fingers so the palms get tight.",
      "Keep the belly button down, toes toward the shins and tailbone pushing away from the head.",
    ],
  }),
  exercise("c4-c5", "C4", "C5", "cervical", 15.74, "rect44", {
    common: true,
    image: "/poses/c4-c5.png",
    setup: [
      "Take a deep breath. As you exhale, push the belly button down into the ground and stabilize the pelvis.",
      "Push the tailbone away from the head. Pull the chin down toward the ground and lengthen the back of the neck.",
      "Bring both legs to tabletop, feet slightly higher than the knees. Keep about two fists’ width between the knees.",
      "Pull both pinky toes back toward the shins. Get long through the spine.",
    ],
    hold: [
      "Bring both arms toward the ceiling. Externally rotate: elbow creases point toward the head; fingers point toward the feet.",
      "Reach the hands to the ceiling. Shoulder blades come off the ground while the spine stays flat.",
      "Keep the hands directly over the shoulders. Head reaches off the shoulders; tailbone pushes away from the head.",
      "Pull the pinky toes back harder and spread the fingers as hard as you can.",
      "Eyes look down between the knees. Reach the hands away.",
    ],
  }),
  exercise("c5-c6", "C5", "C6", "cervical", 17.89, "path42", {
    image: "/poses/c5-c6.png",
    setup: [
      "Lengthen the crown of the head first. Eyes look down and stay open.",
      "Tuck the tail back, maintain the lumbar spine down and stabilize the pelvis.",
      "Bring both legs to tabletop, feet a little above the knees. Pull the pinky toes back.",
      "Keep the eyes down and the back of the neck long. Bring the arms over the chest into external rotation.",
      "Push the arms up to create tension.",
    ],
    hold: [
      "Take the arms overhead about 45 degrees. Reach the palms off the shoulders and away from the body.",
      "Push the crown of the head away. Palms go away at an angle; tail stays tucked; butt pushes away from the palms.",
      "Keep pushing the palms off the shoulders. Back of the neck stays long; toes come back toward the knees.",
      "Keep reaching and pushing. Eyes stay down and the jaw stays relaxed.",
      "Breathe in; breathe out.",
    ],
  }),
  exercise("c6-c7", "C6", "C7", "cervical", 20.38, "path40", {
    image: "/poses/c6-c7.png",
    setup: [
      "Tuck the pelvis back and maintain that fixed position: sacrum, belly button and lumbar spine flat against the floor.",
      "Eyeballs stay down; back of the neck stays long. Lengthen through the crown of the head.",
      "Bring both legs to tabletop, toes just above the knees. Pinky toes come back into eversion.",
      "Bring the arms alongside the body into external rotation. Elbow creases face up; wrists extend.",
    ],
    hold: [
      "Push the palms alongside the body, away from the head. Lengthen the head off the shoulders.",
      "Create tension between the palms and the head.",
      "Pull the toes back. Push the butt away from the head and the head away from the bottom.",
      "Palms push down and away; shoulders maintain the tension.",
      "Keep a soft jaw, eyes down and tail tucked. Breathe and maintain the long spine.",
    ],
  }),
  exercise("c7-t1", "C7", "T1", "cervical", 22.34, "path38", {
    common: true,
    image: "/poses/c7-t1.png",
    setup: [
      "Push the belly button down into the ground; make the spine as flat to the floor as possible.",
      "Pull the chin down toward the floor and lengthen the back of the neck off the shoulders.",
      "Push the tailbone away and stabilize the pelvis.",
      "Bring both legs to tabletop, feet just above the knees. Keep about two fists’ width between the knees.",
      "Pull the toes down toward the shins. Bring both hands up toward the ceiling.",
    ],
    hold: [
      "Push both arms toward the ceiling. Shoulders come off the floor while the spine stays flat.",
      "Move the arms out to the sides into a Y.",
      "Reach the hands away and push the head off the shoulders.",
      "Push the pelvis away from the head and the back of the head away from the pelvis.",
      "Reach the palms away from the heart at an angle. Spread the fingers; pull the pinky toes toward the shins; breathe.",
    ],
  }),
  exercise("t1-t2", "T1", "T2", "thoracic", 24.76, "path26", {
    common: true,
    image: "/poses/t1-t2.png",
    setup: [
      "Push the belly button down into the ground. Bring the chin down and lengthen the neck away from the shoulders.",
      "Push the tailbone away and stabilize the pelvis.",
      "Bring both legs to tabletop, feet above the knees. Keep about two fists’ width between the knees.",
      "Pull the pinky toes harder toward the shins; lengthen the head off the shoulders.",
      "Bring both hands toward the ceiling. Externally rotate the arms so the fingers point toward the toes.",
    ],
    hold: [
      "Gently take both arms overhead. Reach the hands away from the hips.",
      "Eyes look down between the knees. Pinky toes stay pulled toward the shins.",
      "Get as long as possible from the tailbone to the palms. Keep the belly button pushed down.",
      "Keep the spine flat to the floor and long from the tailbone to the back of the head.",
      "Take deep breaths. Reach the hands away and pull the toes back harder.",
    ],
  }),
  exercise("t2-t3", "T2", "T3", "thoracic", 27.25, "path36", {
    image: "/poses/t2-t3.png",
    setup: [
      "Start in quadruped. Curl the toes under and sit the butt back almost into child’s pose.",
      "Keep the tail tucked as you sit back.",
      "Walk the hands out, maintaining external rotation.",
      "Pull the wrists back and press the palms away while pushing the butt back.",
      "Drop the head so it stays in line with the rest of the spine.",
    ],
    hold: [
      "Push the crown of the head away. Push the butt away from the head and the head away from the butt.",
      "Maintain maximum external rotation of the shoulder girdle; press the palms away.",
      "Keep the tail tucked. Lengthen the back as the palms push forward and away.",
      "Keep pushing the crown of the head away and the butt back.",
    ],
  }),
  exercise("t3-t4", "T3", "T4", "thoracic", 29.97, "path34", {
    image: "/poses/t3-t4.png",
    setup: [
      "Start in quadruped: arms under the shoulder blades and knees under the hips. Flex the feet.",
      "Tuck the tail. Push the butt back and the head away while maintaining a flat spine.",
      "Stabilize through the right shoulder.",
      "Externally rotate the left arm. Push the palm back and away, reaching the arm back by the hip.",
    ],
    hold: [
      "Keep the head moving forward as the palm pushes back by the hip.",
      "Do not rotate: maintain a straight spine and keep the tail tucked.",
      "Separate the head and palm. Push the head off the shoulders and the palm away.",
      "Stabilize through the opposite side. Breathe and lengthen.",
    ],
  }),
  exercise("t4-t5", "T4", "T5", "thoracic", 32.77, "path32", {
    common: true,
    image: "/poses/t4-t5.png",
    setup: [
      "Start in quadruped: hands directly under the shoulders and knees under the hips.",
      "Flex the feet so the heels are up. Tuck the tail and find a neutral spine.",
      "Push the bottom half back and the crown of the head away.",
      "Stabilize through the left shoulder. Take the right arm out about 45 degrees from the shoulder.",
    ],
    hold: [
      "Reach the right palm away toward the corner as the head pushes forward.",
      "Tuck the tail and push the butt back. Stabilize through the opposite shoulder.",
      "Keep the spine straight. Eyes look down but stay open.",
      "Lengthen through the crown of the head and keep reaching the palm away.",
      "Breathe through the tension; keep pushing and lengthening.",
    ],
  }),
  exercise("t5-t6", "T5", "T6", "thoracic", 35.84, "path30", {
    image: "/poses/t5-t6.png",
    setup: [
      "Start in quadruped: knees directly under the hips and hands directly under the shoulders. Bend the ankles.",
      "Find a flat spine. Bring the chin back and lengthen from the back of the head to the tailbone.",
      "Externally rotate the hands so the fingers point out to the sides.",
      "Take the left arm up by the ear and reach it away.",
    ],
    hold: [
      "Keep the head back and the spine as long as possible. Spread the fingers and breathe.",
      "Keep the spine in a straight line. Reach the back of the head off the shoulders.",
      "Reach the hand as far away from the tailbone as possible.",
      "Stay straight without twisting the spine. Keep reaching away and take deep breaths.",
    ],
  }),
  exercise("t6-t7", "T6", "T7", "thoracic", 39.46, "path28", {
    common: true,
    image: "/poses/t6-t7.png",
    setup: [
      "Sit cross-legged, crossing the legs or ankles. Use pads if needed; extend the legs if hip or knee motion is limited.",
      "Bring the ankles in. Grab the shins and lengthen up through the crown of the head into a tall spine.",
      "Push the knees down. Pull the toes back into eversion if space and mobility allow.",
      "Bring the arms forward in prayer hands and press the palms together. Draw the elbows back with the palms in front of the chest.",
    ],
    hold: [
      "Bring the hands over the head. Push the elbows wide and lift the rib cage.",
      "Push the fingertips toward the ceiling. Lock the elbows—not the thumbs—and keep the palms together.",
      "Lengthen through the crown of the head. Push the knees down and pull the toes back.",
      "Inhale the spine up; exhale and hold the space. Stay tall through the back of the neck and along the gravity line.",
      "After the hold, lower the palms and switch the crossed-leg position.",
    ],
  }),
  exercise("t7-t8", "T7", "T8", "thoracic", 42.95, "rect24", {
    image: "/poses/t7-t8.png",
    setup: [
      "Sit on a pad if needed to keep the gravity line as straight up and down as possible.",
      "Lift the chest. Bring the chin down and make the back of the neck long.",
      "Bend both knees and bring the feet back. Keep the feet and knees touching.",
      "Pull the feet as close to the butt as possible while staying up in the gravity line.",
      "Reach both hands forward, then up toward the ceiling and out about 45 degrees. Pull the hands back.",
    ],
    hold: [
      "Reach the hands away from the heart. Stay tall with the chest up.",
      "Keep the knees together and the arches of the feet together.",
      "Breathe the rib cage up off the pelvis. Keep the fingers spread.",
      "Look down toward the toes and keep fighting to hold the knees together.",
      "Stay tall; do not let the ribs fall back down toward the hips.",
    ],
  }),
  exercise("t8-t9", "T8", "T9", "thoracic", 46.35, "rect22", {
    common: true,
    image: "/poses/t8-t9.png",
    setup: [
      "Sit with both knees bent, vertical and parallel, pointing toward the ceiling. Keep the arches flat on the ground.",
      "Use the hands to pull the chest tall. Bring the chin down and the back of the head toward the ceiling.",
      "Breathe the rib cage up off the pelvis. Press the arches of the feet hard into the ground.",
      "Reach both arms forward. Externally rotate the humerus so the elbow creases point up; spread the fingers.",
      "Reach the hands forward as the head pushes toward the ceiling, then take both hands up toward the sky.",
    ],
    hold: [
      "Reach the hands toward the ceiling. Keep the knees vertical and parallel.",
      "Look down toward the feet. Keep the arches flat and pressing into the ground.",
      "Breathe the rib cage up off the pelvis and reach hard toward the ceiling.",
      "Lengthen the back of the head. Get as tall as possible from the tailbone to the palms.",
      "Spread the fingers, breathe and keep reaching.",
    ],
  }),
  exercise("t9-t10", "T9", "T10", "thoracic", 49.97, "rect20", {
    image: "/poses/t9-t10.png",
    setup: [
      "Sit up tall in the gravity line. Bend the right knee to 90 degrees and pull it in.",
      "Use the hands to pull the chest tall. Bring the chin down, lengthen the back of the neck and look toward the toes.",
      "Straighten the left knee. Pull the toes toward the shin, internally rotate the left knee and reach the heel away from the hips.",
      "Reach both hands forward. Externally rotate the arms so the elbow creases face the ceiling; pull the wrists back and spread the fingers.",
      "Take both hands toward the ceiling.",
    ],
    hold: [
      "Open the arms about 45 degrees. Reach the hands away from the heart as the heel pushes away and the head gets tall.",
      "Rest the left arm on the leg. Reach the right hand away and the left heel away.",
      "Stay tall in the gravity line. Keep the right knee bent and vertical; press the arches of the feet into the ground.",
      "Reach the hand and heel as far away from each other as possible. Breathe the rib cage up off the pelvis.",
      "As you exhale, do not let the ribs fall toward the hips. Keep the eyes down and the back of the head tall to the ceiling.",
    ],
  }),
  exercise("t10-t11", "T10", "T11", "thoracic", 53.21, "rect18", {
    image: "/poses/t10-t11.png",
    setup: [
      "Sit on pads if needed to establish a tall gravity line. Tuck the pelvis and lift the rib cage off the pelvis.",
      "Keep the left knee bent and vertical; hold the left shin. Extend the right leg slightly wide.",
      "Dorsiflex the right ankle, internally rotate the leg and push the right heel away.",
      "Lift the right big toe and press the arch down so the right knee stays straight ahead.",
      "Externally rotate the arms with palms forward and cheekbones over collarbones; raise both arms overhead.",
    ],
    hold: [
      "Keep the left knee vertical. Drop the right arm and let it relax; keep the left palm reaching up.",
      "Reach the left palm upward and the right heel outward, away from each other.",
      "Keep the right big toe lifted and the right knee straight ahead.",
      "Lift the rib cage off the pelvis and lengthen the crown of the head toward the sky.",
      "Breathe and maintain the opposing reach through the palm and heel.",
    ],
  }),
  exercise("t11-t12", "T11", "T12", "thoracic", 56.39, "rect16", {
    image: "/poses/t11-t12.png",
    setup: [
      "Sit tall in the gravity line. Use the hands on the shins to pull up; chin down, cheekbones over collarbones and head reaching toward the sky.",
      "Extend both legs. Bend the left knee slightly and let it fall out to the side; keep the right knee straight.",
      "Pull the right toes back and push the right heel away. Press the left leg down and pull the left toes back toward the shin.",
      "Reach both hands forward with the elbow creases toward the ceiling; look down toward the toes.",
      "Raise both hands, then open the arms about 45 degrees and reach away from the heart.",
    ],
    hold: [
      "Lower the right hand to the thigh and let it relax.",
      "Reach the left palm away and the right heel away; get as long as possible from palm to heel.",
      "Keep the left knee pressing down and the left toes pulling back toward the shin.",
      "Reach the back of the head toward the sky and breathe the rib cage up off the pelvis.",
      "Stay tall as you exhale; do not let the ribs fall back toward the hips.",
    ],
  }),
  exercise("t12-l1", "T12", "L1", "thoracic", 59.83, "rect14", {
    common: true,
    image: "/poses/t12-l1.png",
    setup: [
      "Sit on pads if needed. Bend both knees, rock the pelvis and establish a tall gravity line; cheekbones over collarbones and head toward the sky.",
      "Straighten the left leg and open it wide. Keep the chest tall.",
      "Let the right knee fall out and hold it with the hand. Pull the toes back pinky-toe first into eversion.",
      "Push the left heel away with the leg internally rotated in pseudo-inversion.",
      "Reach both arms forward in external rotation, pressing the palms away; then raise both arms evenly toward the sky.",
    ],
    hold: [
      "Keep the right arm reaching up. Drop the left arm and let it relax.",
      "Push the right palm away from the left heel.",
      "Maintain tension through the right knee; arch of the foot forward and pinky toe pulled back.",
      "Lift the rib cage up and off the pelvis. Maintain axial extension through T12–L1.",
      "Keep the right palm and left heel reaching apart; breathe and hold.",
    ],
  }),
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
