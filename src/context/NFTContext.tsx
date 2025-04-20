import { createContext, useState, useContext, ReactNode } from 'react';
import { mockNFTs, mockTickets } from '../data/mockData';

export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  model?: string; // URL to 3D model
  collection: string;
  creator: string;
  owner: string;
  price: number;
  tokenId: string;
  blockchain: string;
  isTicket?: boolean;
  eventDate?: string;
  venue?: string;
}

interface NFTContextType {
  nfts: NFT[];
  tickets: NFT[];
  marketplaceItems: NFT[];
  addNFT: (nft: NFT) => void;
  purchaseTicket: (ticketId: string) => void;
}

const NFTContext = createContext<NFTContextType | undefined>(undefined);

export const NFTProvider = ({ children }: { children: ReactNode }) => {
  const [nfts, setNfts] = useState<NFT[]>(mockNFTs);
  const [tickets, setTickets] = useState<NFT[]>(mockTickets);
  const [marketplaceItems, setMarketplaceItems] = useState<NFT[]>([...mockNFTs, ...mockTickets].filter(item => item.owner !== 'user'));

  const addNFT = (nft: NFT) => {
    if (nft.isTicket) {
      setTickets(prev => [...prev, nft]);
    } else {
      setNfts(prev => [...prev, nft]);
    }
  };

  const purchaseTicket = (ticketId: string) => {
    const ticket = marketplaceItems.find(item => item.id === ticketId);
    if (ticket) {
      const updatedTicket = { ...ticket, owner: 'user' };
      setTickets(prev => [...prev, updatedTicket]);
      setMarketplaceItems(prev => prev.filter(item => item.id !== ticketId));
    }
  };

  return (
    <NFTContext.Provider 
      value={{ 
        nfts, 
        tickets, 
        marketplaceItems, 
        addNFT, 
        purchaseTicket 
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};

export const useNFTs = () => {
  const context = useContext(NFTContext);
  if (context === undefined) {
    throw new Error('useNFTs must be used within a NFTProvider');
  }
  return context;
};