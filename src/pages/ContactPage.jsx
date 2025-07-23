import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import FormField from '../components/FormField';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'support@healthdao.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      description: '24/7 support available'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '123 Healthcare Ave, Medical District',
      description: 'San Francisco, CA 94102'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions about our services? Need help with your account? 
            We're here to help you every step of the way.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-8" glow={true} glowColor="purple">
              <div className="flex items-center mb-6">
                <MessageCircle className="w-6 h-6 text-purple-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Send us a Message
                </h2>
              </div>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-700 dark:text-green-300"
                >
                  <div className="flex items-center">
                    <Send className="w-5 h-5 mr-2" />
                    Thank you! Your message has been sent successfully.
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                  />
                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />
                </div>
                
                <FormField
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
                  required
                />
                
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`
                      w-full px-4 py-3 rounded-xl resize-none
                      backdrop-blur-xl bg-white/10 dark:bg-black/10
                      border-2 transition-all duration-300
                      text-gray-800 dark:text-gray-200
                      placeholder-gray-500 dark:placeholder-gray-400
                      focus:outline-none
                      ${errors.message 
                        ? 'border-red-500/50 focus:border-red-500' 
                        : 'border-white/20 dark:border-white/10 focus:border-purple-500/50'
                      }
                      focus:bg-white/20 dark:focus:bg-black/20
                    `}
                    placeholder="Tell us how we can help you..."
                  />
                  <motion.label
                    animate={{
                      y: formData.message ? -28 : 12,
                      scale: formData.message ? 0.85 : 1,
                      color: errors.message 
                        ? '#ef4444' 
                        : formData.message 
                          ? '#8b5cf6' 
                          : '#6b7280'
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-4 pointer-events-none font-medium origin-left"
                  >
                    Message *
                  </motion.label>
                  {errors.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500"
                    >
                      {errors.message}
                    </motion.div>
                  )}
                </div>
                
                <Button
                  type="submit"
                  size="lg"
                  className="w-full group"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {!isSubmitting && (
                    <>
                      Send Message
                      <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </GlassCard>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <GlassCard className="p-6" hover={false}>
                    <div className="flex items-start">
                      <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 mr-4">
                        <Icon className="w-6 h-6 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1 text-gray-800 dark:text-gray-200">
                          {info.title}
                        </h3>
                        <p className="text-purple-600 dark:text-purple-300 font-semibold mb-1">
                          {info.content}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GlassCard className="p-6" hover={false}>
                <div className="flex items-start">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 mr-4">
                    <Clock className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-gray-800 dark:text-gray-200">
                      Business Hours
                    </h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-200 font-medium">Monday - Friday:</span>
                        <span className="text-gray-900 dark:text-gray-100 font-semibold">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-200 font-medium">Saturday:</span>
                        <span className="text-gray-900 dark:text-gray-100 font-semibold">10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-200 font-medium">Sunday:</span>
                        <span className="text-gray-900 dark:text-gray-100 font-semibold">Closed</span>
                      </div>
                      <div className="pt-2 border-t border-white/20 mt-3">
                        <span className="text-purple-600 dark:text-purple-300 font-semibold">
                          Emergency Support: 24/7
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;