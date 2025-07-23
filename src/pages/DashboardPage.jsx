import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, DollarSign, Activity, Bell, Settings } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalClaims: 0,
    treasuryValue: 0,
    activeVotes: 0
  });

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setStats({
        totalMembers: 12547,
        totalClaims: 8932,
        treasuryValue: 2847392,
        activeVotes: 23
      });
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const statCards = [
    {
      title: 'Total Members',
      value: stats.totalMembers.toLocaleString(),
      icon: Users,
      color: 'blue',
      change: '+12.5%'
    },
    {
      title: 'Claims Processed',
      value: stats.totalClaims.toLocaleString(),
      icon: Activity,
      color: 'green',
      change: '+8.2%'
    },
    {
      title: 'Treasury Value',
      value: `$${(stats.treasuryValue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: 'purple',
      change: '+15.3%'
    },
    {
      title: 'Active Votes',
      value: stats.activeVotes.toString(),
      icon: BarChart3,
      color: 'pink',
      change: '+4.1%'
    }
  ];

  const recentClaims = [
    {
      id: 'CLM-001',
      patient: '0x1234...5678',
      procedure: 'Chest X-Ray',
      amount: '$1,200',
      status: 'Approved',
      date: '2024-01-15'
    },
    {
      id: 'CLM-002',
      patient: '0x8765...4321',
      procedure: 'Blood Test',
      amount: '$350',
      status: 'Pending',
      date: '2024-01-14'
    },
    {
      id: 'CLM-003',
      patient: '0x9876...1234',
      procedure: 'MRI Scan',
      amount: '$2,800',
      status: 'Under Review',
      date: '2024-01-13'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500/20 to-cyan-500/20 text-blue-500',
      green: 'from-green-500/20 to-emerald-500/20 text-green-500',
      purple: 'from-purple-500/20 to-violet-500/20 text-purple-500',
      pink: 'from-pink-500/20 to-rose-500/20 text-pink-500'
    };
    return colors[color] || colors.purple;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'text-green-600 bg-green-500/20';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-500/20';
      case 'Under Review':
        return 'text-blue-600 bg-blue-500/20';
      default:
        return 'text-gray-600 bg-gray-500/20';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassCard className="p-12 text-center">
          <LoadingSpinner size="xl" color="purple" />
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Welcome back! Here's what's happening with HealthDAO.
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="secondary" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button variant="secondary" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = getColorClasses(stat.color);
            
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <GlassCard className="p-6" glow={true} glowColor={stat.color}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses.split(' ').slice(0, 2).join(' ')}`}>
                      <Icon className={`w-6 h-6 ${colorClasses.split(' ')[2]}`} />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                        {stat.change}
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.title}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Claims */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-6" glow={true} glowColor="blue">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Recent Claims
                </h2>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentClaims.map((claim, index) => (
                  <motion.div
                    key={claim.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 dark:bg-black/5 border border-white/10"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {claim.id}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                          {claim.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {claim.procedure} • {claim.patient}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {claim.date}
                      </div>
                    </div>
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {claim.amount}
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Treasury Chart Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-6" glow={true} glowColor="purple">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Treasury Growth
                </h2>
                <TrendingUp className="w-6 h-6 text-purple-500" />
              </div>
              
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-white/10">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-purple-500/50 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Chart visualization would go here
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Showing treasury growth over time
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <GlassCard className="p-8 text-center" glow={true} glowColor="pink">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Quick Actions
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                File New Claim
              </Button>
              <Button variant="secondary" size="lg">
                Vote on Proposals
              </Button>
              <Button variant="secondary" size="lg">
                View Analytics
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;