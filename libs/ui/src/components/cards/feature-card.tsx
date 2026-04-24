import React from 'react'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  id: string
  icon: LucideIcon
  title: string
  description: string
  hoverRotation?: number
  className?: string
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  id,
  icon: Icon,
  title,
  description,
  hoverRotation = 10,
  className = '',
}) => {
  return (
    <motion.div
      aria-labelledby={`feature-title-${id}`}
      className={`group relative p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/5 hover:border-emerald-500/30 hover:bg-black/30 transition-all duration-300 cursor-default ${className}`}
      data-testid={`feature-card-${id}`}
      key={id}
      role="region"
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
    >
      <motion.div
        className="flex justify-center mb-4"
        initial={{ rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 17,
          duration: 0.3,
        }}
        whileHover={{
          rotate: hoverRotation,
          scale: 1.1,
        }}
      >
        <Icon aria-hidden="true" className="h-9 w-9 text-emerald-300/90" />
      </motion.div>

      <h3
        className="text-sm font-semibold text-white text-center"
        id={`feature-title-${id}`}
      >
        {title}
      </h3>

      <p className="mt-2 text-xs text-teal-100/60 text-center">
        {description}
      </p>
    </motion.div>
  )
}

FeatureCard.displayName = 'FeatureCard'

export const MemoizedFeatureCard = React.memo(
  FeatureCard,
  (prev, next) => {
    return (
      prev.id === next.id &&
      prev.title === next.title &&
      prev.description === next.description &&
      prev.hoverRotation === next.hoverRotation &&
      prev.icon === next.icon
    )
  }
)
