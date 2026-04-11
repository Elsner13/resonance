// src/components/quiz/archetypes.ts

export type ArchetypeKey = 'episteme' | 'techne' | 'phronesis' | 'nous'

export interface Archetype {
  key: ArchetypeKey
  name: string
  subtitle: string
  greek: string
  tagline: string
  profile: string
  constraint: string
  methods: string[]
  pdfSlug: string
}

export const ARCHETYPES: Record<ArchetypeKey, Archetype> = {
  episteme: {
    key: 'episteme',
    name: 'Episteme',
    subtitle: 'The Theorist',
    greek: 'ἐπιστήμη',
    tagline: 'You understand deeply. The doing resists.',
    profile:
      'You approach every skill through the lens of understanding first. You research, you model, you map the territory before you act. The knowledge is real — the gap is in translation. When it comes time to execute, the understanding you worked so hard to build somehow doesn\'t transfer.',
    constraint:
      'Your core constraint is cognitive overload. The map has become the territory. Your mind floods the movement with analysis at the moment execution demands instinct. The thinking that made you good at learning theory is exactly what blocks embodied skill.',
    methods: [
      'Perceptual anchoring — identify one thing to feel, not one thing to think',
      'Constraint-led practice — design drills that make correct execution the only option',
      'Gradual complexity reduction — strip conditions until you can do it, then add back',
      'Direct exposure before theory — practice first, conceptualize second',
      'Attentional focus research (Wulf) — external focus beats internal focus in execution',
    ],
    pdfSlug: 'attune-episteme-profile',
  },
  techne: {
    key: 'techne',
    name: 'Techne',
    subtitle: 'The Craftsman',
    greek: 'τέχνη',
    tagline: 'You outwork everyone. The ceiling feels arbitrary.',
    profile:
      'You learn by doing. More reps, more time, more volume — this is your language. You have strong hands, strong instincts, and a genuine love for the work itself. But at some point the reps stop translating. You\'re working harder than people around you who seem to be improving faster. The effort is real. The results feel like they should be different.',
    constraint:
      'Your core constraint is repetition without variability. You\'ve built a high volume of nearly identical practice conditions. Your nervous system has optimized for that specific context. What you need isn\'t more reps — it\'s reps designed by information: what changes when I vary this? What does the movement need to encounter to adapt?',
    methods: [
      'Variability of practice — vary conditions systematically, not randomly',
      'Representative practice design — practice must mirror the demands of the real performance',
      'Ecological constraints — use the environment to shape the movement, not just verbal instruction',
      'Feedback loop design — tie feedback to meaningful outcomes, not micro-mechanics',
      'Desirable difficulties (Bjork) — introduce challenges that feel harder but accelerate retention',
    ],
    pdfSlug: 'attune-techne-profile',
  },
  phronesis: {
    key: 'phronesis',
    name: 'Phronesis',
    subtitle: 'The Practitioner',
    greek: 'φρόνησις',
    tagline: 'You\'re sharp in context. Something shifts when it changes.',
    profile:
      'You have genuine skill — you\'ve proven it. In the right conditions, with the right variables in place, you perform at a level that surprises people. But reproduce those conditions exactly and you deliver. Shift one variable — the environment, the stakes, who\'s watching — and something falls apart. Your best days feel far from your worst days.',
    constraint:
      'Your learning is coupled too tightly to specific context cues. You\'ve mastered a version of the skill, not the skill. The conditions of your practice have become load-bearing — you\'re performing the context as much as the skill. Transfer requires that you deliberately vary the context until the skill decouples from any single environment.',
    methods: [
      'Context-varied practice — systematically change environment, stakes, and observation conditions',
      'Pressure inoculation — introduce stress variables before you need to perform under them',
      'Random vs. blocked practice scheduling — random practice feels harder, produces better transfer',
      'Representative task design — practice must contain the key decision demands of performance',
      'Differential learning (Schöllhorn) — exploit variation, don\'t try to repeat a fixed form',
    ],
    pdfSlug: 'attune-phronesis-profile',
  },
  nous: {
    key: 'nous',
    name: 'Nous',
    subtitle: 'The Intuitive',
    greek: 'νοῦς',
    tagline: 'You feel it deeply. Building on it deliberately is the gap.',
    profile:
      'You have something that can\'t be taught directly — a feel for the work, an attunement to subtle cues, a way of absorbing skill by proximity rather than instruction. People around you notice it. The problem is you can\'t diagnose it. When it\'s working, it\'s effortless and invisible. When it stalls, you have no lever to pull. Explicit instruction feels like it misses the point.',
    constraint:
      'Your core constraint is the mismatch between implicit learning style and explicit instruction environments. Your nervous system learns through discovery, analogy, and osmosis — not through being told. Most skill development environments are built around explicit instruction, which is the worst possible input for the way you\'re wired.',
    methods: [
      'Implicit learning protocols — discovery-based practice, avoid explicit rules during acquisition',
      'Analogical constraints — use metaphors and images to shape movement without cognitive interference',
      'Modeling over instruction — watch skilled performers in context, don\'t analyze yet',
      'Questioning over telling — coach yourself with questions ("what did that feel like?"), not corrections',
      'Reduced augmented feedback — limit real-time external feedback during initial learning',
    ],
    pdfSlug: 'attune-nous-profile',
  },
}

export interface Question {
  id: number
  text: string
  answers: { text: string; archetype: ArchetypeKey }[]
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'When you start learning something new, you\'re most drawn to...',
    answers: [
      { text: 'Understanding the theory and research behind it before I touch it', archetype: 'episteme' },
      { text: 'Getting into it immediately and figuring it out by doing', archetype: 'techne' },
      { text: 'Watching someone skilled do it in real, high-stakes conditions', archetype: 'phronesis' },
      { text: 'Sitting with it — letting understanding emerge on its own terms', archetype: 'nous' },
    ],
  },
  {
    id: 2,
    text: 'Your biggest frustration in practice is...',
    answers: [
      { text: 'I understand everything conceptually but it won\'t translate into what I actually do', archetype: 'episteme' },
      { text: 'I\'m putting in the reps but I don\'t know what to focus on or why it won\'t click', archetype: 'techne' },
      { text: 'I\'m sharp in practice but something shifts when conditions are different', archetype: 'phronesis' },
      { text: 'I feel like I\'m improving but I can\'t describe what I\'ve learned or why it\'s working', archetype: 'nous' },
    ],
  },
  {
    id: 3,
    text: 'When you hit a wall, your first instinct is...',
    answers: [
      { text: 'Research — better frameworks, techniques, mental models', archetype: 'episteme' },
      { text: 'Volume — more reps, longer sessions, more time', archetype: 'techne' },
      { text: 'Context — change something about your environment or the conditions of practice', archetype: 'phronesis' },
      { text: 'Patience — step back, trust it, let something shift', archetype: 'nous' },
    ],
  },
  {
    id: 4,
    text: 'Which of these is most true?',
    answers: [
      { text: 'I overthink before I act', archetype: 'episteme' },
      { text: 'I act and worry about why later', archetype: 'techne' },
      { text: 'My results depend heavily on who\'s watching or where I am', archetype: 'phronesis' },
      { text: 'I learn best by watching or absorbing, not by being instructed', archetype: 'nous' },
    ],
  },
  {
    id: 5,
    text: 'Your natural practice approach tends to be...',
    answers: [
      { text: 'Structured, planned, informed by what I\'ve read or researched', archetype: 'episteme' },
      { text: 'High volume, hands-on, jump straight in', archetype: 'techne' },
      { text: 'Situational — adjusted to the environment and conditions I\'ll actually face', archetype: 'phronesis' },
      { text: 'Open and exploratory — space to observe, feel, and reflect', archetype: 'nous' },
    ],
  },
  {
    id: 6,
    text: 'What gets in your way most?',
    answers: [
      { text: 'The gap between knowing something and actually being able to do it', archetype: 'episteme' },
      { text: 'Not knowing what specifically to change when progress stalls', archetype: 'techne' },
      { text: 'Inconsistency — results that don\'t transfer when anything in the context changes', archetype: 'phronesis' },
      { text: 'Not being able to articulate what\'s working or replicate it deliberately', archetype: 'nous' },
    ],
  },
  {
    id: 7,
    text: 'The kind of feedback that moves you most is...',
    answers: [
      { text: 'Detailed, mechanistic explanation of what\'s happening and why', archetype: 'episteme' },
      { text: 'Clear, immediate correction right after each attempt', archetype: 'techne' },
      { text: 'Context-rich feedback that shows when and why to apply what', archetype: 'phronesis' },
      { text: 'Space to discover it yourself — minimal direct instruction, maximum exploration', archetype: 'nous' },
    ],
  },
  {
    id: 8,
    text: 'Which of these sounds most like your learning story?',
    answers: [
      { text: 'I consume enormous amounts about my craft. I\'m still stuck in the doing.', archetype: 'episteme' },
      { text: 'I outwork everyone around me. Others seem to progress faster with less.', archetype: 'techne' },
      { text: 'My progress is uneven — inexplicably great some days, inexplicably off on others.', archetype: 'phronesis' },
      { text: 'People say I have natural ability. I don\'t know how to build on it deliberately.', archetype: 'nous' },
    ],
  },
]

// Q8 (index 7) is weighted ×2
export function calculateArchetype(answers: (ArchetypeKey | null)[]): ArchetypeKey {
  const scores: Record<ArchetypeKey, number> = { episteme: 0, techne: 0, phronesis: 0, nous: 0 }
  answers.forEach((answer, index) => {
    if (!answer) return
    const weight = index === 7 ? 2 : 1
    scores[answer] += weight
  })
  return (Object.keys(scores) as ArchetypeKey[]).reduce((a, b) =>
    scores[a] >= scores[b] ? a : b
  )
}

export function getScores(answers: (ArchetypeKey | null)[]): Record<ArchetypeKey, number> {
  const scores: Record<ArchetypeKey, number> = { episteme: 0, techne: 0, phronesis: 0, nous: 0 }
  answers.forEach((answer, index) => {
    if (!answer) return
    const weight = index === 7 ? 2 : 1
    scores[answer] += weight
  })
  return scores
}
