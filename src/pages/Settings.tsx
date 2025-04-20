import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Bell, User, Shield, Bot, Moon, Sun, ToggleLeft, ToggleRight, ChevronRight } from 'lucide-react';

const SettingItem = ({ 
  icon, 
  title, 
  description, 
  action 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  action: React.ReactNode 
}) => {
  return (
    <motion.div 
      className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
      whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
    >
      <div className="flex items-center">
        <div className="text-gray-500 dark:text-gray-400 mr-4">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-gray-800 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      {action}
    </motion.div>
  );
};

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [telegramBot, setTelegramBot] = useState(true);
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Manage your account and application preferences
        </p>
      </motion.div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 dark:bg-gray-700">
            <h2 className="font-semibold text-gray-800 dark:text-white">Account Settings</h2>
          </div>
          
          <SettingItem
            icon={<User size={20} />}
            title="Profile Information"
            description="Manage your account details and preferences"
            action={<ChevronRight className="text-gray-400" size={18} />}
          />
          
          <SettingItem
            icon={<Shield size={20} />}
            title="Security"
            description="Update your password and security settings"
            action={<ChevronRight className="text-gray-400" size={18} />}
          />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 dark:bg-gray-700">
            <h2 className="font-semibold text-gray-800 dark:text-white">App Settings</h2>
          </div>
          
          <SettingItem
            icon={theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            title="Theme"
            description={`Currently using ${theme} mode`}
            action={
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="text-purple-600 dark:text-purple-400"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
            }
          />
          
          <SettingItem
            icon={<Bell size={20} />}
            title="Notifications"
            description="Receive alerts about your NFTs and tickets"
            action={
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="text-purple-600 dark:text-purple-400"
                onClick={() => setNotifications(!notifications)}
              >
                {notifications ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
              </motion.button>
            }
          />
          
          <SettingItem
            icon={<Bot size={20} />}
            title="Telegram Bot"
            description="Receive notifications and manage tickets via Telegram"
            action={
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="text-purple-600 dark:text-purple-400"
                onClick={() => setTelegramBot(!telegramBot)}
              >
                {telegramBot ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
              </motion.button>
            }
          />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Telegram Bot</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Connect your Telegram account to get notifications and manage your NFTs and tickets directly from Telegram.
            </p>
            
            {telegramBot ? (
              <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-sm p-3 rounded-lg flex items-center">
                <CheckCircle className="mr-2" size={16} />
                Telegram bot is active! You'll receive notifications about your NFTs and tickets.
              </div>
            ) : (
              <motion.button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Connect Telegram
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import { CheckCircle } from 'lucide-react';

export default Settings;