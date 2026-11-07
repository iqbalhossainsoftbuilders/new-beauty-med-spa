'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageRevealProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export function ImageReveal({ src, alt, className, priority = false }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('clip-revealed')
          observer.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'overflow-hidden',
        '[clip-path:inset(100%_0_0_0)]',
        'transition-[clip-path] duration-900 ease-luxury',
        'clip-revealed:[clip-path:inset(0%_0_0_0)]',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  )
}
