import Image from 'next/image'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { modules } from '@/lib/modules'

export default async function DashboardPage() {
  const user = await currentUser()
  const completed = (user?.publicMetadata?.completedModules as string[]) ?? []
  const completedCount = completed.length

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* UserButton */}
      <div style={{ position: 'fixed', top: '20px', right: '24px', zIndex: 10 }}>
        <UserButton />
      </div>

      {/* Centered content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '480px',
          margin: 'auto',
          padding: '48px 24px',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ position: 'relative', width: '52px', height: '52px', marginBottom: '20px', flexShrink: 0, display: 'block' }}>
          <Image src="/attune-logo.png" alt="Attune" fill style={{ objectFit: 'contain' }} priority />
        </Link>

        {/* Heading */}
        <p
          style={{
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: '10px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#999999',
            marginBottom: '6px',
            textAlign: 'center',
          }}
        >
          Foundations
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: 'clamp(18px, 2vw, 22px)',
            fontWeight: 600,
            color: '#000000',
            textAlign: 'center',
            marginBottom: '4px',
            lineHeight: 1.2,
          }}
        >
          Eight modules. One shift.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-montserrat-alternates)',
            fontSize: '12px',
            color: '#aaaaaa',
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          {completedCount} of {modules.length} complete
        </p>

        {/* Module list */}
        <div
          style={{
            width: '100%',
            border: '1px solid rgba(0,0,0,0.10)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {modules.map((mod, i) => {
            const done = completed.includes(mod.slug)
            return (
              <Link
                key={mod.slug}
                href={`/dashboard/${mod.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 20px',
                  borderBottom: i < modules.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
                  opacity: done ? 0.42 : 1,
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                {/* Number */}
                <span
                  style={{
                    fontFamily: 'var(--font-montserrat-alternates)',
                    fontSize: '10px',
                    color: '#cccccc',
                    minWidth: '18px',
                    letterSpacing: '0.06em',
                  }}
                >
                  {mod.num}
                </span>

                {/* Check indicator */}
                {done ? (
                  <div
                    style={{
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                      background: '#000000',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <polyline
                        points="1,3 3,5 7,1"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <div
                    style={{
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                      border: '1.5px solid rgba(0,0,0,0.18)',
                      flexShrink: 0,
                    }}
                  />
                )}

                {/* Title */}
                <span
                  style={{
                    fontFamily: 'var(--font-montserrat-alternates)',
                    fontSize: '12px',
                    color: '#000000',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {mod.title}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
