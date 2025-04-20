import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNFTs } from '../context/NFTContext';
import { Calendar, MapPin, Share2 } from 'lucide-react';

const TicketCard = ({ ticket }: { ticket: any }) => {
  return (
    <motion.div
      className="relative flex flex-col bg-white dark:bg-gray-800 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
      whileHover={{ 
        translateY: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        scale: 1.02
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {/* Ticket header with modern gradient */}
      <div 
        className="relative h-40 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-6 overflow-hidden"
        style={{
          backgroundSize: '200% 200%',
          animation: 'gradient-animation 6s ease infinite'
        }}
      >
        <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-300" />
        <div className="relative z-10 flex justify-between items-start">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">{ticket.name}</h3>
            <p className="text-purple-200 text-sm font-medium">{ticket.collection}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm font-medium shadow-lg group-hover:bg-white/30 transition-colors duration-300">
              #{ticket.tokenId}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-white/5 to-transparent" />
      </div>
      
      {/* Ticket details with enhanced layout */}
      <div className="p-6 flex-1 space-y-4">
        <div className="flex items-center text-sm text-gray-700 dark:text-gray-200 font-medium">
          <Calendar size={18} className="mr-3 text-purple-500" />
          <span>{new Date(ticket.eventDate).toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-700 dark:text-gray-200 font-medium">
          <MapPin size={18} className="mr-3 text-purple-500" />
          <span>{ticket.venue}</span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
          {ticket.description}
        </p>
      </div>
      
      {/* Enhanced footer with QR code and actions */}
      <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
        <div className="h-20 w-20 bg-white dark:bg-gray-700 rounded-lg shadow-inner flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
          <div className="h-16 w-16 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-md transform group-hover:rotate-3 transition-transform duration-300" />
        </div>
        
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <Share2 size={20} />
          </motion.button>
        </div>
      </div>

      {/* Add glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-15 blur transition duration-500 group-hover:duration-200" />
    </motion.div>
  );
};

// Add keyframes for gradient animation
const style = document.createElement('style');
style.textContent = `
  @keyframes gradient-animation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;
document.head.appendChild(style);

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