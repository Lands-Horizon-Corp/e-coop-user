import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';

type AnimationType = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'blur' | 'slideUp' | 'none';

// Define animation variants with enhanced easing
const animationVariants: Record<AnimationType, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  fadeRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)' }
  },
  slideUp: {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 }
  },
  none: {
    hidden: {},
    visible: {}
  }
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  once?: boolean;
}

// Main wrapper for sections that animate on scroll
export function AnimatedSection({ 
  children, 
  className, 
  animation = 'fadeUp', 
  delay = 0, 
  duration = 0.7,
  once = true
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.15 });

  return (
    <motion.div
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
      initial="hidden"
      ref={ref}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      variants={animationVariants[animation]}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayStart?: number;
}

// For staggered children animations
export function StaggerContainer({ 
  children, 
  className, 
  staggerDelay = 0.1, 
  delayStart = 0 
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
      initial="hidden"
      ref={ref}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delayStart,
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  animation?: AnimationType;
}

export function StaggerItem({ children, className, animation = 'fadeUp' }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: animationVariants[animation].hidden,
        visible: {
          ...animationVariants[animation].visible,
          transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Magnetic hover effect wrapper
interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <motion.div
      className={className}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={ref}
      style={{ willChange: 'transform' }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}

// Parallax wrapper
interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function Parallax({ children, className, speed = 0.5 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);

  return (
    <motion.div className={className} ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

