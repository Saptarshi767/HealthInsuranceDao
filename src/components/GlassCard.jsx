import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ 
  children, 
  className = '', 
  hover = true, 
  glow = false,
  glowColor = 'purple',
  ...props 
}) => {
  const glowColors = {
    purple: 'hover:shadow-purple-500/25',
    blue: 'hover:shadow-blue-500/25',
    pink: 'hover:shadow-pink-500/25',
    green: 'hover:shadow-green-500/25',
  };

  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      whileTap={{ scale: 0.98 }}
      className={`
        backdrop-blur-xl bg-white/10 dark:bg-black/10 
        border border-white/20 dark:border-white/10
        rounded-2xl shadow-xl
        transition-all duration-300
        ${hover ? 'hover:bg-white/20 dark:hover:bg-black/20' : ''}
        ${glow ? `hover:shadow-2xl ${glowColors[glowColor]}` : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;