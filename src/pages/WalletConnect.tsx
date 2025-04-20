import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { Copy, CheckCircle, Wallet as WalletIcon, BarChart, History, LogOut } from 'lucide-react';

const walletOptions = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: '🦊',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    id: 'walletconnect',
<<<<<<< HEAD
    name: 'WalletConnect',
=======
    name: 'HatherNetwork',
>>>>>>> c01c5ea0a2540a294c73f3f81c8bb420bdb8b8d5
    icon: '🔗',
    color: 'from-blue-500 to-purple-500',
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: '🪙',
    color: 'from-blue-400 to-blue-600',
  }
];

const WalletConnect = () => {
  const navigate = useNavigate();
  const { isConnected, walletType, walletAddress, disconnectWallet } = useWallet();
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<'assets' | 'activity'>('assets');
  
  const copyToClipboard = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWalletSelect = (walletId: string) => {
    navigate(`/wallet/verify/${walletId}`);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Wallet</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Connect and manage your blockchain wallet
        </p>
      </motion.div>

      {!isConnected ? (
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Connect Wallet</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {walletOptions.map((option) => (
              <motion.button
                key={option.id}
                className="flex items-center p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors duration-200 hover-card"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
                onClick={() => handleWalletSelect(option.id)}
              >
                <div className={`flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r ${option.color} mr-4`}>
                  <span className="text-2xl">{option.icon}</span>
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-800 dark:text-white">{option.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Connect using {option.name}</p>
                </div>
              </motion.button>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              By connecting your wallet, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={`flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r ${
                  walletOptions.find(w => w.id === walletType)?.color || 'from-purple-500 to-blue-500'
                } mr-4`}>
                  <span className="text-2xl">
                    {walletOptions.find(w => w.id === walletType)?.icon || '👛'}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    {walletOptions.find(w => w.id === walletType)?.name || 'Wallet'} Connected
                  </h3>
                  <div className="flex items-center mt-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{walletAddress}</p>
                    <button 
                      className="ml-2 text-purple-600 dark:text-purple-400 focus:outline-none"
                      onClick={copyToClipboard}
                    >
                      {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                onClick={disconnectWallet}
              >
                <LogOut size={16} className="mr-1" />
                <span className="text-sm">Disconnect</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;