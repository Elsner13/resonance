interface PillarCardProps {
  index: number
  total: number
  title: string
  body: string
}

export default function PillarCard({ index, total, title, body }: PillarCardProps) {
  const num = String(index).padStart(2, '0')
  const tot = String(total).padStart(2, '0')

  return (
    <div
      style={{
        background: '#080001',
        padding: '24px',
      }}
    >
      <span
        style={{
          display: 'block',
          fontFamily: 'var(--font-inter)',
          fontSize: '11px',
          fontWeight: 400,
          letterSpacing: '0.05em',
          color: '#CC1133',
          marginBottom: '10px',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {num}/{tot}
      </span>
      <span
        style={{
          display: 'block',
          fontFamily: 'var(--font-inter)',
          fontSize: '11px',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#F0F0F0',
          marginBottom: '10px',
        }}
      >
        {title}
      </span>
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '15px',
          fontWeight: 400,
          lineHeight: 1.85,
          color: '#888888',
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  )
}
