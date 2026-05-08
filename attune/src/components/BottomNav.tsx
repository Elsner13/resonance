'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Foundations', href: '/foundations' },
  { label: 'Coaching', href: '/coaching' },
  { label: 'About', href: '/about' },
  { label: 'Signal/Noise', href: 'https://findthesignal.substack.com', external: true },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#000000',
        borderTop: '1px solid #1a1a1a',
        padding: '16px 0',
        zIndex: 100,
      }}
    >
      <ul
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {links.map(({ label, href, external }, index) => {
          const isActive = !external && pathname === href

          return (
            <React.Fragment key={href}>
              {index > 0 && (
                <li
                  aria-hidden="true"
                  style={{
                    color: '#333333',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '10px',
                    userSelect: 'none',
                  }}
                >
                  |
                </li>
              )}
              <li>
                {external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '10px',
                      fontWeight: 400,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: '#555555',
                      textDecoration: 'none',
                      transition: 'color 150ms',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#F0F0F0'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#555555'
                    }}
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    href={href}
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '10px',
                      fontWeight: 400,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: isActive ? '#CC1133' : '#555555',
                      textDecoration: 'none',
                      transition: 'color 150ms',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = '#F0F0F0'
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = '#555555'
                    }}
                  >
                    {label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          )
        })}
      </ul>
    </nav>
  )
}
