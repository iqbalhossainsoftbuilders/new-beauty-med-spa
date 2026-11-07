import { cn } from '@/lib/utils'

interface GlassPanelProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function GlassPanel({ children, className, as: Tag = 'div' }: GlassPanelProps) {
  return (
    <Tag className={cn('glass-panel rounded-2xl p-6', className)}>
      {children}
    </Tag>
  )
}
