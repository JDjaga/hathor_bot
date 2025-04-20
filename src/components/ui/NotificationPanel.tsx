import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationPanel = ({ onClose }: NotificationPanelProps) => {
  const notifications = [
    {
      id: 1,
      title: 'New Ticket Available',
      message: 'Crypto Summit 2025 tickets are now available in the marketplace.',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: 2,
      title: 'Event Reminder',
      message: 'NFT Summer Festival starts in 3 days. Don\'t forget your ticket!',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 3,
      title: 'Price Alert',
      message: 'Cosmic Dreamer #42 has increased in value by 20%.',
      time: '1 day ago',
      read: true,
    },
    {
      id: 4,
      title: 'Transaction Confirmed',
      message: 'Your purchase of Digital Nomad #137 has been confirmed.',
      time: '2 days ago',
      read: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute right-4 top-16 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Notifications</h3>
        <button
          onClick={onClose}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
            className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer ${
              notification.read ? 'opacity-70' : ''
            }`}
          >
            <div className="flex justify-between">
              <h4 className="text-sm font-medium text-gray-800 dark:text-white flex items-center">
                {notification.title}
                {!notification.read && (
                  <span className="ml-2 h-2 w-2 rounded-full bg-blue-500"></span>
                )}
              </h4>
              <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
        <button className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300">
          Mark all as read
        </button>
      </div>
    </motion.div>
  );
};

export default NotificationPanel;