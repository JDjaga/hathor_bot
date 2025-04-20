import { createContext, useState, useContext, ReactNode } from 'react';

type WalletType = 'metamask' | 'walletconnect' | 'coinbase' | 'none';

interface WalletContextType {
  isConnected: boolean;
  walletType: WalletType;
  walletAddress: string | null;
  connectWallet: (type: WalletType) => void;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletType, setWalletType] = useState<WalletType>('none');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = (type: WalletType) => {
    // Simulate wallet connection
    setWalletType(type);
    setWalletAddress(`0x${Math.random().toString(16).slice(2, 12)}...${Math.random().toString(16).slice(2, 6)}`);
  };

  const disconnectWallet = () => {
    setWalletType('none');
    setWalletAddress(null);
  };

  return (
    <WalletContext.Provider 
      value={{ 
        isConnected: walletAddress !== null, 
        walletType, 
        walletAddress, 
        connectWallet, 
        disconnectWallet 
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};