'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { BOOKING_URL } from '@/lib/utils'

const SLIDES = [
  {
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600&q=85&fit=crop&auto=format',
    alt: 'Luxury facial treatment at New Beauty Med Spa',
    headline: 'Redefine\nYour Beauty',
    sub: 'Expert medical aesthetics in the heart of Encino. Advanced treatments, natural results.',
    label: 'Facial Treatments',
  },
  {
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=85&fit=crop&auto=format',
    alt: 'Advanced skin care treatment',
    headline: 'Science\nMeets Luxury',
    sub: 'Medical-grade aesthetics delivered with a personal touch. Your skin, elevated.',
    label: 'Skin Rejuvenation',
  },
  {
    type: 'video' as const,
    youtubeId: 'U7mPqycQ0tQ',
    poster: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=1600&q=85&fit=crop&auto=format',
    alt: 'Spa treatment video',
    headline: 'Feel the\nDifference',
    sub: 'Non-surgical. Non-invasive. Transformative. Discover our signature treatments.',
    label: 'Our Experience',
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [isPlaying, next])

  const slide = SLIDES[current]

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background media */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          {slide.type === 'video' ? (
            <>
              {/* YouTube iframe background */}
              <div className="absolute inset-0 overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${slide.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${slide.youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1`}
                  title="Spa treatment video"
                  allow="autoplay; encrypted-media"
                  className="absolute w-[300%] h-[300%] -top-[100%] -left-[100%] pointer-events-none"
                  style={{ opacity: 0.7 }}
                />
                {/* Fallback poster in case iframe blocked */}
                <Image
                  src={slide.poster}
                  alt={slide.alt}
                  fill
                  className="object-cover object-center -z-10"
                  sizes="100vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal/75 via-espresso/55 to-charcoal/70" />
            </>
          ) : (
            <>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={current === 0}
                className="object-cover object-center"
                sizes="100vw"
                style={{ animation: 'kenburns 12s ease-in-out forwards' }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal/75 via-espresso/55 to-charcoal/70" />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Decorative vertical lines */}
      <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-gold/40 to-transparent z-10 hidden md:block" />
      <div className="absolute top-1/3 right-8 w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent z-10 hidden md:block" />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            <p className="section-label text-gold mb-6">
              Luxury Medical Aesthetics · Encino, Los Angeles
            </p>
            <h1 className="font-cormorant text-display text-ivory font-light leading-none mb-6 whitespace-pre-line">
              {slide.headline.split('\n')[0]}<br />
              <em className="italic text-champagne">{slide.headline.split('\n')[1]}</em>
            </h1>
            <span className="gold-line" />
            <p className="font-manrope text-base text-ivory/70 max-w-xl mx-auto mb-10 leading-relaxed">
              {slide.sub}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-10 py-4 text-sm"
          >
            Book Your Consultation
          </a>
          <a
            href="/face"
            className="btn-outline text-ivory border-ivory/40 px-10 py-4 text-sm hover:bg-ivory hover:text-espresso hover:border-ivory"
          >
            Explore Treatments
          </a>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        {/* Dots */}
        <div className="flex items-center gap-3">
          {SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setIsPlaying(false) }}
              aria-label={`Go to slide ${i + 1}: ${s.label}`}
              className="group flex flex-col items-center gap-1"
            >
              <span className={`block transition-all duration-500 rounded-full ${i === current ? 'w-8 h-1 bg-gold' : 'w-2 h-1 bg-ivory/40 group-hover:bg-ivory/60'}`} />
            </button>
          ))}
        </div>
        {/* Current label */}
        <AnimatePresence mode="wait">
          <motion.span
            key={`label-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="font-manrope text-xs tracking-widest uppercase text-ivory/40"
          >
            {SLIDES[current].label}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Left/right arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/60 hover:border-gold hover:text-gold transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/60 hover:border-gold hover:text-gold transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-8 z-10 hidden md:flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent animate-float" />
      </div>
    </section>
  )
}
