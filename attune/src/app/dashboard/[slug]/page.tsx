import Link from 'next/link'
import { notFound } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { getModule, getNextModule } from '@/lib/modules'
import CompleteButton from './CompleteButton'
import ModuleHero from '@/components/modules/ModuleHero'
import ModuleInline from '@/components/modules/ModuleInline'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ModulePage({ params }: Props) {
  const { slug } = await params
  const mod = getModule(slug)
  if (!mod) notFound()

  const user = await currentUser()
  const completed = (user?.publicMetadata?.completedModules as string[]) ?? []
  const isCompleted = completed.includes(slug)
  const nextMod = getNextModule(slug)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#ffffff',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          width: '100%',
          margin: '0 auto',
          padding: '48px clamp(24px, 5vw, 80px) 96px',
        }}
      >
        {/* Back link */}
        <Link
          href="/dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.10em',
            color: '#000000',
            textDecoration: 'none',
            border: '1px solid #000000',
            borderRadius: '4px',
            padding: '8px 16px',
            marginBottom: '40px',
          }}
        >
          ← Dashboard
        </Link>

        {/* Module number + title */}
        <p
          style={{
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: '10px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#cccccc',
            marginBottom: '8px',
          }}
        >
          Module {mod.num}
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: 'clamp(20px, 3vw, 28px)',
            fontWeight: 600,
            color: '#000000',
            lineHeight: 1.2,
            marginBottom: '8px',
          }}
        >
          {mod.title}
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: '13px',
            color: '#888888',
            marginBottom: '48px',
            lineHeight: 1.5,
          }}
        >
          {mod.subtitle}
        </p>

        {/* Module hero animation */}
        <ModuleHero slug={slug} />

        {/* Divider */}
        <div
          style={{
            width: '32px',
            height: '1px',
            background: 'rgba(0,0,0,0.12)',
            marginBottom: '48px',
          }}
        />

        {/* Content sections */}
        {mod.sections.map((section, sIdx) => (
          <div key={section.heading} style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-montserrat-alternates)',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.10em',
                color: '#000000',
                marginBottom: '16px',
              }}
            >
              {section.heading}
            </h2>
            {section.body.map((paragraph, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-montserrat-alternates)',
                  fontSize: '14px',
                  color: '#333333',
                  lineHeight: 1.85,
                  marginBottom: i < section.body.length - 1 ? '16px' : 0,
                }}
              >
                {paragraph}
              </p>
            ))}
            {/* Inline animation — sIdx 0: intro concept */}
            {sIdx === 0 && (
              <div style={{ marginTop: '32px' }}>
                <ModuleInline slug={slug} id={
                  slug === 'module-1' ? 'effort-rut' :
                  slug === 'module-2' ? 'expert-perception' :
                  slug === 'module-3' ? 'feedback-loop' :
                  slug === 'module-4' ? 'three-constraints' :
                  slug === 'module-5' ? 'adaptive-capacity' :
                  slug === 'module-6' ? 'the-bowl' :
                  slug === 'module-7' ? 'fidelity-spectrum' :
                  slug === 'module-8' ? 'pattern-detect' : ''
                } />
              </div>
            )}
            {/* Inline animation — sIdx 2: core mechanism */}
            {sIdx === 2 && (
              <div style={{ marginTop: '32px' }}>
                <ModuleInline slug={slug} id={
                  slug === 'module-1' ? 'symptom-root' :
                  slug === 'module-2' ? 'differentiation' :
                  slug === 'module-3' ? 'affordance' :
                  slug === 'module-4' ? 'constraint-flow' :
                  slug === 'module-5' ? 'practice-variability' :
                  slug === 'module-6' ? 'four-variables' :
                  slug === 'module-7' ? 'perception-action' :
                  slug === 'module-8' ? 'before-after' : ''
                } />
              </div>
            )}
            {/* Inline animation — sIdx 4: deeper application */}
            {sIdx === 4 && (
              <div style={{ marginTop: '32px' }}>
                <ModuleInline slug={slug} id={
                  slug === 'module-1' ? 'bottleneck-chain' :
                  slug === 'module-2' ? 's-curve' :
                  slug === 'module-3' ? 'affordance-shift' :
                  slug === 'module-4' ? 'collapse-sequence' :
                  slug === 'module-5' ? 'blocked-vs-random' :
                  slug === 'module-6' ? 'parameter-sliders' :
                  slug === 'module-7' ? 'transfer-gap' :
                  slug === 'module-8' ? 'perceptual-change' : ''
                } />
              </div>
            )}
            {/* Inline animation — sIdx 5 */}
            {sIdx === 5 && (
              <div style={{ marginTop: '32px' }}>
                <ModuleInline slug={slug} id={
                  slug === 'module-1' ? 'perceptual-layer' :
                  slug === 'module-2' ? 'adaptive-system' :
                  slug === 'module-3' ? 'comfort-trap' :
                  slug === 'module-4' ? 'perceptual-chain' :
                  slug === 'module-5' ? 'struggle-signal' :
                  slug === 'module-6' ? 'recovery-cycle' :
                  slug === 'module-7' ? 'failure-modes' :
                  slug === 'module-8' ? 'phase-transitions' : ''
                } />
              </div>
            )}
            {/* Inline animation — sIdx 7 */}
            {sIdx === 7 && (
              <div style={{ marginTop: '32px' }}>
                <ModuleInline slug={slug} id={
                  slug === 'module-1' ? 'self-diagnosis' :
                  slug === 'module-2' ? 'the-click' :
                  slug === 'module-3' ? 'env-audit' :
                  slug === 'module-4' ? 'ruthless-priority' :
                  slug === 'module-5' ? 'variability-expertise' :
                  slug === 'module-6' ? 'design-from-failure' :
                  slug === 'module-7' ? 'instruction-limit' :
                  slug === 'module-8' ? 'cant-unsee' : ''
                } />
              </div>
            )}
            {/* Inline animation — sIdx 9 */}
            {sIdx === 9 && (
              <div style={{ marginTop: '32px' }}>
                <ModuleInline slug={slug} id={
                  slug === 'module-1' ? 'solution-process' :
                  slug === 'module-2' ? 'expert-traits' :
                  slug === 'module-3' ? 'three-levers' :
                  slug === 'module-4' ? '' :
                  slug === 'module-5' ? 'productive-variability' :
                  slug === 'module-6' ? 'productive-failure' :
                  slug === 'module-7' ? 'transfer-principles' :
                  slug === 'module-8' ? 'build-architecture' : ''
                } />
              </div>
            )}
            {/* Inline animation — sIdx 11 */}
            {sIdx === 11 && (
              <div style={{ marginTop: '32px' }}>
                <ModuleInline slug={slug} id={
                  slug === 'module-1' ? 'feedback-loop-gap' :
                  slug === 'module-2' ? 'discrimination' :
                  slug === 'module-3' ? 'affordance-levels' :
                  slug === 'module-4' ? '' :
                  slug === 'module-5' ? 'the-question' :
                  slug === 'module-6' ? 'bowl-fits-you' :
                  slug === 'module-7' ? 'specificity' :
                  slug === 'module-8' ? 'after-course' : ''
                } />
              </div>
            )}
            {/* Inline animation — sIdx 13 */}
            {sIdx === 13 && (
              <div style={{ marginTop: '32px' }}>
                <ModuleInline slug={slug} id={
                  slug === 'module-1' ? 'nonlinear-path' :
                  slug === 'module-2' ? 'perceptual-audit' :
                  slug === 'module-3' ? 'what-changes' :
                  slug === 'module-4' ? '' :
                  slug === 'module-5' ? '' :
                  slug === 'module-6' ? 'practice-network' :
                  slug === 'module-7' ? 'variable-practice' :
                  slug === 'module-8' ? '' : ''
                } />
              </div>
            )}
          </div>
        ))}

        {/* The Move */}
        <div
          style={{
            borderLeft: '2px solid #000000',
            paddingLeft: '20px',
            marginTop: '48px',
            marginBottom: '56px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-montserrat-alternates)',
              fontSize: '9px',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#aaaaaa',
              marginBottom: '10px',
            }}
          >
            The Move
          </p>
          <p
            style={{
              fontFamily: 'var(--font-montserrat-alternates)',
              fontSize: '13px',
              color: '#333333',
              lineHeight: 1.85,
            }}
          >
            {mod.theMove}
          </p>
        </div>

        {/* Complete / Next button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CompleteButton
            slug={slug}
            isCompleted={isCompleted}
            nextSlug={nextMod?.slug ?? null}
          />
        </div>
      </div>
    </div>
  )
}
