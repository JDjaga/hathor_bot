// This file contains type definitions for the app

export type WalletType = 'metamask' | 'walletconnect' | 'coinbase' | 'none';

export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  model?: string;
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

export interface User {
  id: string;
  address: string;
  username?: string;
  avatar?: string;
}