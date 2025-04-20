import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Trophy, Sword, Shield, Users } from 'lucide-react';

const Gaming = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    {
      id: 'crypto-warriors',
      title: 'Crypto Warriors',
      description: 'Battle with your NFT characters in this epic adventure',
      players: '1,234',
      rewards: '5.2 ETH',
      image: 'https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'nft-racing',
      title: 'NFT Racing League',
      description: 'Race your NFT vehicles on various tracks',
      players: '956',
      rewards: '3.8 ETH',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'metaverse-quest',
      title: 'Metaverse Quest',
      description: 'Explore the metaverse and complete quests',
      players: '2,567',
      rewards: '7.5 ETH',
      image: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          <Gamepad2 size={32} className="text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gaming</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Play NFT-powered games directly in Telegram
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.map((game) => (
          <motion.div
            key={game.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover-card"
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedGame(game.id)}
          >
            <div className="relative h-48">
              <img 
                src={game.image} 
                alt={game.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white">{game.title}</h3>
                <p className="text-sm text-gray-200">{game.description}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Users size={16} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{game.players} players</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy size={16} className="text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{game.rewards} pool</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedGame && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {games.find(g => g.id === selectedGame)?.title}
            </h2>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Sword size={20} />
                <span>Play Now</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Shield size={20} />
                <span>Tutorial</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">How to Play</h3>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">1. Connect your NFT wallet</p>
                <p className="text-gray-600 dark:text-gray-300">2. Select your character NFT</p>
                <p className="text-gray-600 dark:text-gray-300">3. Join a match or create your own</p>
                <p className="text-gray-600 dark:text-gray-300">4. Compete and earn rewards</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Rewards & Rankings
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Daily Prize Pool</span>
                  <span className="font-medium text-purple-600 dark:text-purple-400">1.5 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Your Rank</span>
                  <span className="font-medium text-purple-600 dark:text-purple-400">#42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Games Played</span>
                  <span className="font-medium text-purple-600 dark:text-purple-400">156</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Gaming;