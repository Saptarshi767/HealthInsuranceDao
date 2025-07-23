import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Brain, Eye, Stethoscope, Pill, Check } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Modal from '../components/Modal';

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      icon: Heart,
      title: 'Cardiology Coverage',
      description: 'Comprehensive heart health coverage including preventive care, diagnostics, and treatments.',
      features: ['24/7 Emergency Care', 'Preventive Screenings', 'Specialist Consultations', 'Surgical Procedures'],
      price: '$299/month',
      color: 'red'
    },
    {
      icon: Brain,
      title: 'Neurology Care',
      description: 'Advanced neurological care covering brain and nervous system conditions.',
      features: ['MRI & CT Scans', 'Neurological Assessments', 'Treatment Plans', 'Rehabilitation Support'],
      price: '$349/month',
      color: 'purple'
    },
    {
      icon: Eye,
      title: 'Vision Care',
      description: 'Complete eye care services from routine exams to complex procedures.',
      features: ['Annual Eye Exams', 'Prescription Coverage', 'Surgery Coverage', 'Emergency Care'],
      price: '$99/month',
      color: 'blue'
    },
    {
      icon: Stethoscope,
      title: 'General Medicine',
      description: 'Primary healthcare coverage for everyday medical needs and wellness.',
      features: ['Primary Care Visits', 'Preventive Care', 'Lab Tests', 'Prescription Drugs'],
      price: '$199/month',
      color: 'green'
    },
    {
      icon: Pill,
      title: 'Pharmacy Benefits',
      description: 'Comprehensive prescription drug coverage with preferred pricing.',
      features: ['Generic Medications', 'Brand Name Drugs', 'Specialty Medications', 'Mail Order Pharmacy'],
      price: '$79/month',
      color: 'pink'
    },
    {
      icon: Shield,
      title: 'Emergency Care',
      description: 'Round-the-clock emergency medical coverage for urgent situations.',
      features: ['ER Visits', 'Ambulance Services', 'Urgent Care', 'Emergency Surgery'],
      price: '$149/month',
      color: 'orange'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      red: 'from-red-500/20 to-rose-500/20 text-red-500',
      purple: 'from-purple-500/20 to-violet-500/20 text-purple-500',
      blue: 'from-blue-500/20 to-cyan-500/20 text-blue-500',
      green: 'from-green-500/20 to-emerald-500/20 text-green-500',
      pink: 'from-pink-500/20 to-rose-500/20 text-pink-500',
      orange: 'from-orange-500/20 to-amber-500/20 text-orange-500'
    };
    return colors[color] || colors.purple;
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
              Our Services
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive healthcare coverage tailored to your needs. Choose from our range of 
            specialized services or create a custom plan that works for you.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colorClasses = getColorClasses(service.color);
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 h-full flex flex-col" glow={true} glowColor={service.color}>
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${colorClasses.split(' ').slice(0, 2).join(' ')} mb-4 w-fit`}>
                    <Icon className={`w-6 h-6 ${colorClasses.split(' ')[2]}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
                    {service.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                      {service.price}
                    </div>
                    <ul className="space-y-1">
                      {service.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-200 font-medium">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button
                    variant="secondary"
                    className="w-full mt-auto"
                    onClick={() => setSelectedService(service)}
                  >
                    Learn More
                  </Button>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-12 text-center" glow={true} glowColor="purple">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Need a Custom Plan?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 max-w-2xl mx-auto font-medium">
              Our team can work with you to create a personalized healthcare plan that fits 
              your specific needs and budget.
            </p>
            <Button size="lg">
              Contact Our Specialists
            </Button>
          </GlassCard>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <Modal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title}
        size="lg"
      >
        {selectedService && (
          <div>
            <div className="flex items-center mb-6">
              {React.createElement(selectedService.icon, {
                className: `w-8 h-8 ${getColorClasses(selectedService.color).split(' ')[2]} mr-3`
              })}
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {selectedService.price}
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {selectedService.description}
            </p>
            
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              What's Included:
            </h3>
            
            <ul className="space-y-3 mb-8">
              {selectedService.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-700 dark:text-gray-200 font-medium">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <div className="flex gap-4">
              <Button className="flex-1">
                Get Started
              </Button>
              <Button variant="secondary" className="flex-1">
                Compare Plans
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ServicesPage;