'use client'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedHeading({
  as: Tag = 'h2',
  children,
  className,
  delay = 0,
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`
          el.classList.add('opacity-100', 'translate-y-0')
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <Tag
      ref={ref}
      className={cn(
        'opacity-0 translate-y-7 transition-all duration-700 ease-luxury',
        className
      )}
    >
      {children}
    </Tag>
  )
}
