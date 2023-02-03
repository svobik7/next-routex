'use client'
import { useState } from 'react'

type FooterProps = { currentLocale: string }
export function Footer({ currentLocale }: FooterProps) {
  const [state, setState] = useState(0)
  const onClick = () => setState(state + 1)
  return (
    <div>
      THis is simple header server component - {currentLocale}
      <button onClick={onClick}>Click me {state}</button>
    </div>
  )
}
