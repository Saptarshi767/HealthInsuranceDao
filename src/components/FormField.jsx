import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FormField = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  placeholder,
  required = false,
  className = '',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  const handleChange = (e) => {
    setHasValue(!!e.target.value);
    onChange?.(e);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? placeholder : ''}
          className={`
            w-full px-4 py-3 rounded-xl
            backdrop-blur-xl bg-white/10 dark:bg-black/10
            border-2 transition-all duration-300
            text-gray-800 dark:text-gray-200
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none
            ${error 
              ? 'border-red-500/50 focus:border-red-500' 
              : 'border-white/20 dark:border-white/10 focus:border-purple-500/50'
            }
            ${isFocused ? 'bg-white/20 dark:bg-black/20' : ''}
          `}
          {...props}
        />
        
        {/* Floating Label */}
        <motion.label
          animate={{
            y: isFocused || hasValue ? -28 : 0,
            scale: isFocused || hasValue ? 0.85 : 1,
            color: error 
              ? '#ef4444' 
              : isFocused 
                ? '#8b5cf6' 
                : '#6b7280'
          }}
          transition={{ duration: 0.2 }}
          className={`
            absolute left-4 top-3 pointer-events-none
            font-medium origin-left
            ${isFocused || hasValue ? 'dark:text-gray-300' : 'dark:text-gray-400'}
          `}
        >
          {label} {required && '*'}
        </motion.label>
      </div>
      
      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-sm text-red-500"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormField;