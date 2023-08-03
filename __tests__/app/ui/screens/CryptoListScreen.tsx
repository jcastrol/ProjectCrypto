import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { useCryptoContext } from '../../../../src/app/context/CryptoContext';
import { useCryptoCurrencies } from '../../../../src/app/hooks/useCryptoCurrencies';
import CryptoListScreen from '../../../../src/app/ui/screens/CryptoListScreen';
import CryptoRepositoryInterface from '../../../../src/app/domain/repositories/CryptoRepositoryInterface';
import { NativeBaseProvider } from 'native-base';


jest.mock('../../../../src/app/context/CryptoContext', () => ({
  useCryptoContext: jest.fn(),
}));
jest.mock('../../../../src/app/hooks/useCryptoCurrencies');
const navigationMock = {
  navigate: jest.fn(),
  replace: jest.fn()
}
const AllTheProviders: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };
  return <NativeBaseProvider initialWindowMetrics={inset}>{children}</NativeBaseProvider>;
};
describe('CryptoListScreen', () => {
  const mockCryptoCurrencies =[

    { id: 'bitcoin', name: 'Bitcoin', priceUsd: '45000' },
    { id: 'ethereum', name: 'Ethereum', priceUsd: '3500' },
  ]

  beforeEach(() => {

    (useCryptoContext as jest.Mock).mockReturnValue({ cryptoRepository: {} });
    (useCryptoCurrencies as jest.Mock).mockReturnValue({
      cryptoCurrencies: mockCryptoCurrencies,
      error: null,
      getCryptoFilterAndSort: jest.fn(),
    });
  });

  it('should render the list of cryptocurrencies', () => {
    const mockCryptoCurrencies2 =[

      { id: 'bitcoin', name: 'Bitcoin', priceUsd: '45000' },
      { id: 'ethereum', name: 'Ethereum', priceUsd: '3500' },
    ]; 
    const mockCryptoRepository: CryptoRepositoryInterface = {
      filterCryptoCurrencies: jest.fn().mockResolvedValue(mockCryptoCurrencies2),
      getCryptoCurrencyDetail: jest.fn().mockResolvedValue(null),
      getCryptoCurrencies: jest.fn().mockResolvedValue([]),
    };
    (useCryptoContext as jest.Mock).mockReturnValue({
      cryptoRepository: mockCryptoRepository
    });
    const { getByText } = render(<AllTheProviders><CryptoListScreen navigation={{ navigate: jest.fn() }} /></AllTheProviders>);

    
    const bitcoinElement = getByText('Bitcoin');
    expect(bitcoinElement).toBeDefined();


    const ethereumElement = getByText('Ethereum');
    expect(ethereumElement).toBeDefined();
  });

  it('should open the filter modal when the "FILTERS" button is pressed', () => {
    const { getByText } = render(<AllTheProviders><CryptoListScreen navigation={{ navigate: jest.fn() }} /></AllTheProviders>);


    const filtersButton = getByText('FILTERS');
    expect(filtersButton).toBeDefined();


    fireEvent.press(filtersButton);


    const filterModal = getByText('Apply Filters');
    expect(filterModal).toBeDefined();
  });
});