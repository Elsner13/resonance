interface SectionLabelProps {
  children: React.ReactNode
  color?: string
}

export default function SectionLabel({ children, color = '#CC1133' }: SectionLabelProps) {
  return (
    <span
      style={{
        display: 'block',
        fontFamily: 'var(--font-inter)',
        fontSize: '10px',
        fontWeight: 400,
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        color,
        marginBottom: '16px',
      }}
    >
      {children}
    </span>
  )
}
