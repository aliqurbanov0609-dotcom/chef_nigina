import { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  active?: boolean;
}

export function ClayButton({ children, active, className = '', ...props }: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`clay-btn px-6 py-3 font-semibold text-gray-700 flex items-center justify-center gap-2 ${
        active ? 'clay-btn-active !text-soft-purple' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

interface CardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

export function ClayCard({ children, className = '', onClick, ...props }: CardProps) {
  return (
    <motion.div
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`clay-card p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

