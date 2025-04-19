import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNFTs } from '../context/NFTContext';
import NFTCard from '../components/ui/NFTCard';
import { Search, Filter, Tag } from 'lucide-react';

const Marketplace = () => {
  const { marketplaceItems, purchaseTicket } = useNFTs();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'nft' | 'ticket'>('all');
  
  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.collection.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || 
                          (filterType === 'nft' && !item.isTicket) || 
                          (filterType === 'ticket' && item.isTicket);
    return matchesSearch && matchesFilter;
  });
  
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
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Marketplace</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Discover and purchase unique NFTs and event tickets
        </p>
      </motion.div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search items..."
              className="w-full pl-10 pr-4 py-2 rounded-lg text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Filter size={18} className="text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Filter:</span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1 text-sm rounded-md ${
                filterType === 'all' 
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
              onClick={() => setFilterType('all')}
            >
              All
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1 text-sm rounded-md ${
                filterType === 'nft' 
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
              onClick={() => setFilterType('nft')}
            >
              NFTs
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1 text-sm rounded-md ${
                filterType === 'ticket' 
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
              onClick={() => setFilterType('ticket')}
            >
              Tickets
            </motion.button>
          </div>
        </div>
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Tag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">No items found</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your search or filter</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredItems.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <NFTCard 
                  nft={item} 
                  showModel={!item.isTicket}
                  onPurchase={() => purchaseTicket(item.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;