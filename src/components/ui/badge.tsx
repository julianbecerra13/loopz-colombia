import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-[var(--primary)] text-[var(--primary-foreground)]',
        secondary: 'border-transparent bg-[var(--secondary)] text-[var(--secondary-foreground)]',
        destructive: 'border-transparent bg-[var(--destructive)] text-[var(--destructive-foreground)]',
        outline: 'text-[var(--foreground)]',
        neon: 'border-transparent bg-[#00FF88] text-[#0A1628] font-bold shadow-[0_0_10px_rgba(0,255,136,0.5)]',
        new: 'border-transparent bg-[#00FF88] text-[#0A1628] shadow-[0_0_10px_rgba(0,255,136,0.5)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
