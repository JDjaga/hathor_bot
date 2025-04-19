import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { BarChart, History, ArrowUpRight, ArrowDownRight, ArrowLeft } from 'lucide-react';

const WalletDashboard = () => {
  const navigate = useNavigate();
  const { walletAddress, walletType } = useWallet();

  const transactions = [
    {
      id: 1,
      type: 'received',
      amount: '0.5 ETH',
      from: '0x42ab...f31e',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      type: 'sent',
      amount: '1.2 ETH',
      to: '0xf712...a23b',
      timestamp: 'Yesterday',
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center"
      >
        <motion.button
          onClick={() => navigate('/wallet')}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mr-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Back</span>
        </motion.button>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Wallet Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Manage your crypto assets and transactions
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Balance</h2>
            <BarChart className="text-purple-600 dark:text-purple-400" size={24} />
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">2.345 ETH</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">≈ $5,234.56 USD</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activity</h2>
            <History className="text-purple-600 dark:text-purple-400" size={24} />
          </div>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  {tx.type === 'received' ? (
                    <ArrowDownRight className="text-green-500 mr-2" size={20} />
                  ) : (
                    <ArrowUpRight className="text-red-500 mr-2" size={20} />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {tx.type === 'received' ? 'Received' : 'Sent'} {tx.amount}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {tx.type === 'received' ? `From: ${tx.from}` : `To: ${tx.to}`}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{tx.timestamp}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WalletDashboard;
