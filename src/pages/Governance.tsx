import { useState } from 'react';
import { motion } from 'framer-motion';
import { Vote, ChevronRight, Users, BarChart3, Lock } from 'lucide-react';

const Governance = () => {
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);

  const proposals = [
    {
      id: 'prop-1',
      title: 'Community Treasury Allocation',
      description: 'Proposal to allocate 1000 tokens for community development',
      votes: { for: 65, against: 35 },
      status: 'active',
      endTime: '2d 5h remaining'
    },
    {
      id: 'prop-2',
      title: 'New Gaming Features',
      description: 'Add new game modes and reward mechanisms',
      votes: { for: 82, against: 18 },
      status: 'active',
      endTime: '5d 12h remaining'
    },
    {
      id: 'prop-3',
      title: 'Token Burning Mechanism',
      description: 'Implement monthly token burning schedule',
      votes: { for: 45, against: 55 },
      status: 'ended',
      endTime: 'Ended 2 days ago'
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
          <Vote size={32} className="text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Governance</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Participate in community decisions and DAO voting
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Active Proposals</h2>
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <motion.div
                key={proposal.id}
                className={`p-4 rounded-lg border-2 transition-colors duration-200 hover-card cursor-pointer ${
                  selectedProposal === proposal.id
                    ? 'border-purple-500 dark:border-purple-400 bg-purple-50 dark:bg-purple-900/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                }`}
                onClick={() => setSelectedProposal(proposal.id)}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">{proposal.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{proposal.description}</p>
                  </div>
                  <ChevronRight className="text-gray-400" />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      proposal.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {proposal.status.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{proposal.endTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 dark:bg-purple-400"
                        style={{ width: `${proposal.votes.for}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {proposal.votes.for}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Your Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Lock className="text-purple-600" size={20} />
                  <span className="text-gray-600 dark:text-gray-300">Voting Power</span>
                </div>
                <span className="font-medium text-gray-800 dark:text-white">1,234 tokens</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="text-purple-600" size={20} />
                  <span className="text-gray-600 dark:text-gray-300">Proposals Created</span>
                </div>
                <span className="font-medium text-gray-800 dark:text-white">3</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="text-purple-600" size={20} />
                  <span className="text-gray-600 dark:text-gray-300">Votes Cast</span>
                </div>
                <span className="font-medium text-gray-800 dark:text-white">12</span>
              </div>
            </div>
          </div>

          <motion.button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Create New Proposal
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Governance;