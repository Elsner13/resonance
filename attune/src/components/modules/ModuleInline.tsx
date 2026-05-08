// src/components/modules/ModuleInline.tsx
'use client'
import type React from 'react'
import dynamic from 'next/dynamic'

const inlines: Record<string, Record<string, React.ComponentType>> = {
  'module-1': {
    'symptom-root':      dynamic(() => import('./inline/Inline01SymptomRoot')),
    'effort-rut':        dynamic(() => import('./inline/Inline01EffortRut')),
    'bottleneck-chain':  dynamic(() => import('./inline/Inline01BottleneckChain')),
    'perceptual-layer':  dynamic(() => import('./inline/Inline01_sIdx5')),
    'self-diagnosis':    dynamic(() => import('./inline/Inline01_sIdx7')),
    'solution-process':  dynamic(() => import('./inline/Inline01_sIdx9')),
    'feedback-loop-gap': dynamic(() => import('./inline/Inline01_sIdx11')),
    'nonlinear-path':    dynamic(() => import('./inline/Inline01_sIdx13')),
  },
  'module-2': {
    'differentiation':   dynamic(() => import('./inline/Inline02Differentiation')),
    'expert-perception': dynamic(() => import('./inline/Inline02ExpertPerception')),
    's-curve':           dynamic(() => import('./inline/Inline02SCurve')),
    'adaptive-system':   dynamic(() => import('./inline/Inline02_sIdx5')),
    'the-click':         dynamic(() => import('./inline/Inline02_sIdx7')),
    'expert-traits':     dynamic(() => import('./inline/Inline02_sIdx9')),
    'discrimination':    dynamic(() => import('./inline/Inline02_sIdx11')),
    'perceptual-audit':  dynamic(() => import('./inline/Inline02_sIdx13')),
  },
  'module-3': {
    'affordance':        dynamic(() => import('./inline/Inline03Affordance')),
    'feedback-loop':     dynamic(() => import('./inline/Inline03FeedbackLoop')),
    'affordance-shift':  dynamic(() => import('./inline/Inline03AffordanceShift')),
    'comfort-trap':      dynamic(() => import('./inline/Inline03_sIdx5')),
    'env-audit':         dynamic(() => import('./inline/Inline03_sIdx7')),
    'three-levers':      dynamic(() => import('./inline/Inline03_sIdx9')),
    'affordance-levels': dynamic(() => import('./inline/Inline03_sIdx11')),
    'what-changes':      dynamic(() => import('./inline/Inline03_sIdx13')),
  },
  'module-4': {
    'constraint-flow':      dynamic(() => import('./inline/Inline04ConstraintFlow')),
    'three-constraints':    dynamic(() => import('./inline/Inline04ThreeConstraints')),
    'collapse-sequence':    dynamic(() => import('./inline/Inline04CollapseSequence')),
    'perceptual-chain':     dynamic(() => import('./inline/Inline04_sIdx5')),
    'ruthless-priority':    dynamic(() => import('./inline/Inline04_sIdx7')),
  },
  'module-5': {
    'practice-variability': dynamic(() => import('./inline/Inline05PracticeVariability')),
    'adaptive-capacity':    dynamic(() => import('./inline/Inline05AdaptiveCapacity')),
    'blocked-vs-random':    dynamic(() => import('./inline/Inline05BlockedVsRandom')),
    'struggle-signal':      dynamic(() => import('./inline/Inline05_sIdx5')),
    'variability-expertise': dynamic(() => import('./inline/Inline05_sIdx7')),
    'productive-variability': dynamic(() => import('./inline/Inline05_sIdx9')),
    'the-question':         dynamic(() => import('./inline/Inline05_sIdx11')),
  },
  'module-6': {
    'four-variables':    dynamic(() => import('./inline/Inline06FourVariables')),
    'the-bowl':          dynamic(() => import('./inline/Inline06TheBowl')),
    'parameter-sliders': dynamic(() => import('./inline/Inline06ParameterSliders')),
    'recovery-cycle':    dynamic(() => import('./inline/Inline06_sIdx5')),
    'design-from-failure': dynamic(() => import('./inline/Inline06_sIdx7')),
    'productive-failure': dynamic(() => import('./inline/Inline06_sIdx9')),
    'bowl-fits-you':     dynamic(() => import('./inline/Inline06_sIdx11')),
    'practice-network':  dynamic(() => import('./inline/Inline06_sIdx13')),
  },
  'module-7': {
    'perception-action': dynamic(() => import('./inline/Inline07PerceptionAction')),
    'fidelity-spectrum': dynamic(() => import('./inline/Inline07FidelitySpectrum')),
    'transfer-gap':      dynamic(() => import('./inline/Inline07TransferGap')),
    'failure-modes':     dynamic(() => import('./inline/Inline07_sIdx5')),
    'instruction-limit': dynamic(() => import('./inline/Inline07_sIdx7')),
    'transfer-principles': dynamic(() => import('./inline/Inline07_sIdx9')),
    'specificity':       dynamic(() => import('./inline/Inline07_sIdx11')),
    'variable-practice': dynamic(() => import('./inline/Inline07_sIdx13')),
  },
  'module-8': {
    'before-after':       dynamic(() => import('./inline/Inline08BeforeAfter')),
    'pattern-detect':     dynamic(() => import('./inline/Inline08PatternDetect')),
    'perceptual-change':  dynamic(() => import('./inline/Inline08PerceptualChange')),
    'phase-transitions':  dynamic(() => import('./inline/Inline08_sIdx5')),
    'cant-unsee':         dynamic(() => import('./inline/Inline08_sIdx7')),
    'build-architecture': dynamic(() => import('./inline/Inline08_sIdx9')),
    'after-course':       dynamic(() => import('./inline/Inline08_sIdx11')),
  },
}

export default function ModuleInline({ slug, id }: { slug: string; id: string }) {
  const Inline = inlines[slug]?.[id]
  if (!Inline) return null
  return <Inline />
}
