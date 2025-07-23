import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  loading = false,
  ...props 
}) => {
  const variants = {
    primary: `
      bg-gradient-to-r from-purple-600 to-pink-600 
      hover:from-purple-700 hover:to-pink-700
      text-white shadow-lg hover:shadow-purple-500/25
    `,
    secondary: `
      backdrop-blur-xl bg-white/10 dark:bg-black/10 
      border border-white/20 dark:border-white/10
      hover:bg-white/20 dark:hover:bg-black/20
      text-gray-800 dark:text-gray-200
    `,
    ghost: `
      hover:bg-white/10 dark:hover:bg-black/10
      text-gray-700 dark:text-gray-300
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-red-600
      hover:from-red-600 hover:to-red-700
      text-white shadow-lg hover:shadow-red-500/25
    `,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`
        rounded-xl font-medium transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-purple-500/50
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;