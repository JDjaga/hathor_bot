import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useWallet } from '../../context/WalletContext';
import NotificationPanel from '../ui/NotificationPanel';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { isConnected, walletAddress } = useWallet();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center w-full md:w-64">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search NFTs, collections..."
                className="w-full pl-10 pr-4 py-2 rounded-lg text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            
            {isConnected ? (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center cursor-pointer"
                onClick={() => navigate('/wallet')}
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mr-3 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">W</span>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{walletAddress}</span>
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg"
                onClick={() => navigate('/wallet')}
              >
                Connect Wallet
              </motion.button>
            )}
          </div>
        </div>
      </div>
      
      {showNotifications && (
        <NotificationPanel onClose={() => setShowNotifications(false)} />
      )}
    </header>
  );
};

export default Navbar;