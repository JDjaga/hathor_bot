import { useState } from 'react'; 
import { motion } from 'framer-motion';
import { useNFTs } from '../context/NFTContext';
import NFTCard from '../components/ui/NFTCard';
import { ChevronDown, ChevronUp, RefreshCw, LayoutGrid, LayoutList } from 'lucide-react';

const Dashboard = () => {
  const { nfts, tickets } = useNFTs();
  const [nftsExpanded, setNftsExpanded] = useState(true);
  const [ticketsExpanded, setTicketsExpanded] = useState(true);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  
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
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Manage your NFT portfolio and event tickets
        </p>
      </motion.div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">My NFTs</h2>
            <button 
              className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setNftsExpanded(!nftsExpanded)}
            >
              {nftsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              className={`p-2 rounded-lg ${viewType === 'grid' 
                ? 'bg-purple-100 dark:bg-gray-700 text-purple-600 dark:text-purple-400' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              onClick={() => setViewType('grid')}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              className={`p-2 rounded-lg ${viewType === 'list' 
                ? 'bg-purple-100 dark:bg-gray-700 text-purple-600 dark:text-purple-400' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              onClick={() => setViewType('list')}
            >
              <LayoutList size={18} />
            </button>
            <button 
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>
        
        {nftsExpanded && (
          viewType === 'grid' ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {nfts.filter(nft => nft.owner === 'user').map((nft) => (
                <motion.div
                  key={nft.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  className="transition-all duration-300 transform hover:shadow-xl rounded-xl"
                >
                  <NFTCard nft={nft} showModel={true} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {nfts.filter(nft => nft.owner === 'user').map((nft) => (
                <motion.div 
                  key={nft.id}
                  variants={itemVariants} 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-all duration-300 transform hover:shadow-xl"
                >
                  <img src={nft.image} alt={nft.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-800 dark:text-white">{nft.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{nft.collection}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-800 dark:text-white">{nft.price} ETH</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{nft.blockchain}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">My Tickets</h2>
            <button 
              className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setTicketsExpanded(!ticketsExpanded)}
            >
              {ticketsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>
        
        {ticketsExpanded && (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {tickets.filter(ticket => ticket.owner === 'user').map((ticket) => (
              <motion.div
                key={ticket.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="transition-all duration-300 transform hover:shadow-xl rounded-xl"
              >
                <NFTCard nft={ticket} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
