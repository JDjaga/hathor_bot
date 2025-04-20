import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Send, Gift, Crown, ArrowRight } from 'lucide-react';

const Community = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'payments',
      title: 'P2P Payments',
      icon: <Send size={24} />,
      description: 'Send and receive payments within the community',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'tipping',
      title: 'Community Tipping',
      icon: <Gift size={24} />,
      description: 'Reward valuable contributions with tips',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'membership',
      title: 'Token Membership',
      icon: <Crown size={24} />,
      description: 'Exclusive benefits for token holders',
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          <Users size={32} className="text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Community</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Engage with token-based community features
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover-card"
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedFeature(feature.id)}
          >
            <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                  {feature.icon}
                </div>
                <ArrowRight size={20} className="text-gray-400" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedFeature && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {features.find(f => f.id === selectedFeature)?.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400">1</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Connect your wallet</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400">2</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Choose amount to send</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400">3</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Confirm transaction</span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Coming Soon
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                This feature is currently in development. Stay tuned for updates!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Community;