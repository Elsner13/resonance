export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid #1a1a1a',
        padding: '24px',
        textAlign: 'center',
        fontFamily: 'var(--font-inter)',
        fontSize: '11px',
        color: '#333333',
      }}
    >
      © {new Date().getFullYear()} Attune
    </footer>
  )
}
