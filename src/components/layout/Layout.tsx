import { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { theme } = useTheme();

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <motion.main 
          className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default Layout;