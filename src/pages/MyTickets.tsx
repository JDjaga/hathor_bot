import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNFTs } from '../context/NFTContext';
import { Calendar, MapPin, Share2 } from 'lucide-react';

const TicketCard = ({ ticket }: { ticket: any }) => {
  return (
    <motion.div
      className="relative flex flex-col bg-white dark:bg-gray-800 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ translateY: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {/* Ticket header with tear effect */}
      <div className="relative h-32 bg-gradient-to-r from-purple-600 to-blue-600 p-4">
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-white dark:bg-gray-800">
          <div className="flex justify-between">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="h-4 w-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600" 
                style={{ transform: 'translateY(50%)' }}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-white">{ticket.name}</h3>
            <p className="text-purple-200 text-sm">{ticket.collection}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-white text-xs">
            #{ticket.tokenId}
          </div>
        </div>
      </div>
      
      {/* Ticket details */}
      <div className="p-4 flex-1">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-3">
          <Calendar size={16} className="mr-2" />
          <span>{new Date(ticket.eventDate).toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
          <MapPin size={16} className="mr-2" />
          <span>{ticket.venue}</span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300">{ticket.description}</p>
      </div>
      
      {/* QR code for ticket */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
          <div className="h-14 w-14 bg-gradient-to-tr from-black to-gray-800 dark:from-white dark:to-gray-200 rounded-md" />
        </div>
        
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            <Share2 size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const MyTickets = () => {
  const { tickets } = useNFTs();
  const [view, setView] = useState<'upcoming' | 'past'>('upcoming');
  
  const now = new Date();
  const userTickets = tickets.filter(ticket => ticket.owner === 'user');
  
  const upcomingTickets = userTickets.filter(ticket => new Date(ticket.eventDate!) > now);
  const pastTickets = userTickets.filter(ticket => new Date(ticket.eventDate!) <= now);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Tickets</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Manage your digital event tickets
        </p>
      </motion.div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`flex-1 py-4 text-center font-medium ${
              view === 'upcoming'
                ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            onClick={() => setView('upcoming')}
          >
            Upcoming ({upcomingTickets.length})
          </button>
          <button
            className={`flex-1 py-4 text-center font-medium ${
              view === 'past'
                ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            onClick={() => setView('past')}
          >
            Past ({pastTickets.length})
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {view === 'upcoming' ? (
              upcomingTickets.length > 0 ? (
                upcomingTickets.map(ticket => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">No upcoming tickets</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Visit the marketplace to find upcoming events
                  </p>
                </div>
              )
            ) : (
              pastTickets.length > 0 ? (
                pastTickets.map(ticket => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">No past tickets</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Your attended events will appear here
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTickets;