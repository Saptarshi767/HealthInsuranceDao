import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            404
          </div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block"
          >
            <Search className="w-16 h-16 text-purple-500/50" />
          </motion.div>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GlassCard className="p-8 md:p-12" glow={true} glowColor="purple">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Oops! Page Not Found
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              The page you're looking for seems to have wandered off into the digital void. 
              Don't worry though, we'll help you find your way back to safety!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/">
                <Button size="lg" className="group">
                  <Home className="w-5 h-5 mr-2" />
                  Go Home
                </Button>
              </Link>
              
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={() => navigate(-1)}
                className="group"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Or try one of these popular pages:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link to="/about">
                  <Button variant="ghost" size="sm">
                    About Us
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="ghost" size="sm">
                    Services
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="ghost" size="sm">
                    Contact
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;