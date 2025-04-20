import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Store, 
  Ticket, 
  Wallet, 
  Settings, 
  Gem,
  ChevronLeft, 
  ChevronRight,
  Users,
  Gamepad2,
  Vote,
  BarChart 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/marketplace', icon: <Store size={20} />, label: 'Marketplace' },
    { path: '/tickets', icon: <Ticket size={20} />, label: 'My Tickets' },
    { path: '/wallet', icon: <Wallet size={20} />, label: 'Wallet' },
    { path: '/visualization', icon: <BarChart size={20} />, label: 'Visualization' },
    { 
      path: '/community', 
      icon: <Users size={20} />, 
      label: 'Community',
      badge: 'New'
    },
    { 
      path: '/gaming', 
      icon: <Gamepad2 size={20} />, 
      label: 'Gaming',
      badge: 'New'
    },
    { 
      path: '/governance', 
      icon: <Vote size={20} />, 
      label: 'Governance',
      badge: 'New'
    },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <motion.aside
      className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-64'
      }`}
      layout
    >
      <div className="flex flex-col h-full">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} h-16 px-4`}>
          {!collapsed && (
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Gem className="text-purple-600" size={24} />
              <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">HatherNet</span>
            </motion.div>
          )}
          {collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Gem className="text-purple-600" size={24} />
            </motion.div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 dark:text-gray-400 focus:outline-none"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 mt-6 px-2">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-purple-50 dark:bg-gray-700 text-purple-600 dark:text-purple-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <span className="text-current">{item.icon}</span>
                  {!collapsed && (
                    <motion.div className="flex items-center justify-between flex-1">
                      <span className="ml-4 font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-1 text-xs font-medium text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  )}
                  {!collapsed && location.pathname === item.path && (
                    <motion.div
                      className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-r-lg"
                      layoutId="activeIndicator"
                    />
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4">
          <motion.div
            className={`flex items-center ${
              collapsed ? 'justify-center' : 'justify-start'
            } p-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600`}
            whileHover={{ scale: 1.02 }}
          >
            {collapsed ? (
              <span className="text-white text-xl">🤖</span>
            ) : (
              <div>
                <span className="text-white text-xl mr-2">🤖</span>
                <span className="text-white font-medium">TG Bot Enabled</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;