import { useState } from 'react';
import { motion } from 'framer-motion';
import { NFT } from '../../context/NFTContext';
import NFT3DViewer from '../3d/NFT3DViewer';

interface NFTCardProps {
  nft: NFT;
  showModel?: boolean;
  onPurchase?: () => void;
}

const NFTCard = ({ nft, showModel = false, onPurchase }: NFTCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [view3D, setView3D] = useState(false);

  const handleCardClick = () => {
    setShowDetails(!showDetails);
  };

  const handle3DClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setView3D(!view3D);
  };

  return (
    <motion.div
      className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover-card interactive-hover"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layoutId={`nft-card-${nft.id}`}
    >
      <div className="relative" onClick={handleCardClick}>
        {view3D && nft.model ? (
          <div className="h-60 w-full relative">
            <NFT3DViewer modelPath={nft.model} />
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <img 
              src={nft.image} 
              alt={nft.name} 
              className="w-full h-60 object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        
        {showModel && nft.model && (
          <motion.button
            className="absolute top-3 right-3 bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 p-2 rounded-full shadow-md hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handle3DClick}
          >
            <span className="text-xs font-bold">{view3D ? '2D' : '3D'}</span>
          </motion.button>
        )}
        
        {nft.isTicket && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-md text-xs transform hover:scale-105 transition-transform duration-300">
            Ticket
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">{nft.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">{nft.collection}</p>
        
        {nft.isTicket && nft.eventDate && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Event Date:</span> {new Date(nft.eventDate).toLocaleDateString()}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-3">
          <div className="text-sm group">
            <span className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">Price:</span>
            <span className="ml-1 font-bold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">{nft.price} ETH</span>
          </div>
          
          {onPurchase && (
            <motion.button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onPurchase();
              }}
            >
              Purchase
            </motion.button>
          )}
        </div>
      </div>
      
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300"
        >
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300">{nft.description}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="group">
              <span className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">Creator:</span>
              <span className="ml-1 text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">{nft.creator}</span>
            </div>
            <div className="group">
              <span className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">Chain:</span>
              <span className="ml-1 text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">{nft.blockchain}</span>
            </div>
            <div className="group">
              <span className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">Token ID:</span>
              <span className="ml-1 text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">{nft.tokenId}</span>
            </div>
            {nft.isTicket && nft.venue && (
              <div className="group">
                <span className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">Venue:</span>
                <span className="ml-1 text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">{nft.venue}</span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NFTCard;