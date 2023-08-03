import React, { createContext, useContext } from 'react';
import CryptoRepository from '../data/repositories/CryptoRepository';

interface CryptoContextValue {
  cryptoRepository: CryptoRepository;
}
type CryptoProviderType=CryptoContextValue & {children:React.ReactNode}

const CryptoContext = createContext<CryptoContextValue | null>(null);

export const useCryptoContext = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error('useCryptoContext must be used within a CryptoProvider');
  }
  return context;
};

const CryptoProvider: React.FC<CryptoProviderType> = ({ children, cryptoRepository }) => {
  return (
    <CryptoContext.Provider value={{ cryptoRepository }}>
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoProvider;
