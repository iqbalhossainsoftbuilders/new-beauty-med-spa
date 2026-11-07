'use client'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { trackBookingClick } from '@/lib/analytics'

interface ButtonProps {
  href: string
  variant?: 'primary' | 'outline' | 'dark' | 'gold'
  className?: string
  children: React.ReactNode
  treatmentSlug?: string
  ctaLocation?: string
  external?: boolean
}

export function Button({
  href,
  variant = 'primary',
  className,
  children,
  treatmentSlug,
  ctaLocation = 'unknown',
  external = false,
}: ButtonProps) {
  const variantClass = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    dark: 'btn-dark',
    gold: 'btn-gold',
  }[variant]

  const handleClick = () => {
    if (ctaLocation) {
      trackBookingClick({ treatmentSlug, location: ctaLocation })
    }
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={cn(variantClass, className)}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} onClick={handleClick} className={cn(variantClass, className)}>
      {children}
    </Link>
  )
}
