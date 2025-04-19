import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWallet } from '../context/WalletContext';
import { ArrowLeft, Loader } from 'lucide-react';
import { ShieldCheck, AlertCircle } from 'lucide-react';


const WalletVerification = () => {
  const { walletType } = useParams();
  const navigate = useNavigate();
  const { connectWallet } = useWallet();
  const [walletId, setWalletId] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'input' | 'pending' | 'success' | 'error'>('input');
  const [errorMessage, setErrorMessage] = useState('');

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationStatus('pending');

    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (walletId.length < 8) {
        throw new Error('Invalid wallet ID format');
      }

      // For demo purposes, simulate successful connection
      if (walletType) {
        connectWallet(walletType as any);
        setVerificationStatus('success');
        
        // Navigate to dashboard after successful connection
        setTimeout(() => {
          navigate('/wallet/dashboard');
        }, 1500);
      } else {
        throw new Error('Invalid wallet type');
      }
    } catch (error) {
      setVerificationStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to connect wallet');
    }
  };

  if (verificationStatus === 'input') {
    return (
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => navigate('/wallet')}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Wallet Selection
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Connect {walletType} Wallet
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Enter your wallet ID to continue
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 py-8 px-4 shadow-xl rounded-lg sm:px-10"
        >
          <form className="space-y-6" onSubmit={handleConnect}>
            <div>
              <label htmlFor="wallet-id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Wallet ID
              </label>
              <div className="mt-1">
                <input
                  id="wallet-id"
                  type="text"
                  required
                  value={walletId}
                  onChange={(e) => setWalletId(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your wallet ID"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Connect Wallet
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
          {verificationStatus === 'pending' && 'Connecting to Wallet'}
          {verificationStatus === 'success' && 'Wallet Connected Successfully'}
          {verificationStatus === 'error' && 'Connection Failed'}
        </h2>

        <div className="flex justify-center mb-6">
          {verificationStatus === 'pending' && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader size={48} className="text-purple-500" />
            </motion.div>
          )}
          
          {verificationStatus === 'success' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            >
              <ShieldCheck size={48} className="text-green-500" />
            </motion.div>
          )}
          
          {verificationStatus === 'error' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            >
              <AlertCircle size={48} className="text-red-500" />
            </motion.div>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-300">
          {verificationStatus === 'pending' && `Connecting to ${walletType} wallet...`}
          {verificationStatus === 'success' && 'Your wallet has been connected successfully!'}
          {verificationStatus === 'error' && errorMessage}
        </p>

        {verificationStatus === 'error' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            onClick={() => setVerificationStatus('input')}
          >
            Try Again
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default WalletVerification;