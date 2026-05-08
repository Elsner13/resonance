'use client'

interface CTAProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function CTA({ href, children, className = '' }: CTAProps) {
  return (
    <a
      href={href}
      className={className}
      style={{
        display: 'inline-block',
        background: 'transparent',
        border: '1px solid #CC1133',
        borderRadius: 0,
        padding: '12px 24px',
        color: '#F0F0F0',
        fontFamily: 'var(--font-inter)',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'border-color 150ms',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = '#FF1A3E'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = '#CC1133'
      }}
    >
      {children}
    </a>
  )
}
