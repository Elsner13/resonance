import Image from 'next/image'
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '24px',
          width: '100%',
          maxWidth: '480px',
          margin: 'auto',
          padding: '24px',
        }}
      >
        {/* Logo */}
        <div style={{ position: 'relative', width: '52px', height: '52px', flexShrink: 0 }}>
          <Image src="/attune-logo.png" alt="Attune" fill style={{ objectFit: 'contain' }} priority />
        </div>

        {/* Heading */}
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-montserrat-alternates)',
              fontSize: '11px',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#999999',
              marginBottom: '8px',
            }}
          >
            Welcome back.
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-montserrat-alternates)',
              fontSize: 'clamp(18px, 2vw, 24px)',
              fontWeight: 600,
              color: '#000000',
              lineHeight: 1.3,
            }}
          >
            Sign in to access Foundations.
          </h1>
        </div>

        {/* Clerk SignIn */}
        <SignIn
          appearance={{
            variables: {
              colorPrimary: '#000000',
              colorDanger: '#CC1133',
              colorBackground: '#ffffff',
              colorInputBackground: '#ffffff',
              colorText: '#000000',
              colorInputText: '#000000',
              colorTextSecondary: '#555555',
              borderRadius: '2px',
            },
            elements: {
              rootBox: {
                fontFamily: 'var(--font-montserrat-alternates)',
                width: '100%',
                colorScheme: 'light',
                display: 'flex',
                justifyContent: 'center',
              },
              card: {
                boxShadow: 'none',
                border: '1px solid rgba(0,0,0,0.12)',
                borderRadius: '4px',
                background: '#ffffff',
                width: '100%',
                margin: '0 auto',
              },
              headerTitle: { display: 'none' },
              headerSubtitle: { display: 'none' },
              formFieldLabel: {
                fontSize: '10px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#555555',
              },
              formFieldInput: {
                borderRadius: '2px',
                border: '1px solid rgba(0,0,0,0.2)',
                background: '#ffffff',
                color: '#000000',
              },
              socialButtonsBlockButton: {
                border: '1px solid rgba(0,0,0,0.15)',
                borderRadius: '2px',
                color: '#000000',
              },
              socialButtonsBlockButtonText: {
                fontSize: '11px',
                letterSpacing: '0.04em',
              },
              dividerLine: {
                borderColor: 'rgba(0,0,0,0.10)',
              },
              dividerText: {
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#bbbbbb',
              },
              formButtonPrimary: {
                background: '#000000',
                borderRadius: '2px',
                fontFamily: 'var(--font-montserrat-alternates)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              },
              footerActionText: {
                fontSize: '11px',
                color: '#999999',
              },
              footerActionLink: { color: '#000000' },
            },
          }}
          forceRedirectUrl="/dashboard"
        />
      </div>
    </div>
  )
}
