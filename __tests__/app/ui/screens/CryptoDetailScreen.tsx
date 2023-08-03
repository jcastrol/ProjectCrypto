import React from 'react';

import { useCryptoContext } from '../../../../src/app/context/CryptoContext';
import { act, render, waitFor } from '@testing-library/react-native';
import CryptoDetailScreen from '../../../../src/app/ui/screens/CryptoDetailScreen';
import { NativeBaseProvider } from 'native-base';


jest.mock('../../../../src/app/context/CryptoContext', () => ({
  useCryptoContext: jest.fn(() => ({
    cryptoRepository: {
      getCryptoCurrencyDetail: jest.fn(),
    },
  })),
}));
const navigationMock = {
  navigate: jest.fn()
}

describe('CryptoDetailScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render the CryptoDetailScreen without errors', async () => {

    const mockCryptoCurrency = {
      id: 'Bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      priceUsd: 40000,
      rank: 1,
      percentChange24h: 5,
      percentChange1h: 1,
      percentChange7d: 10,
      marketCapUsd: 80000000000,
      volume24: 20000000000,
      circulatingSupply: 18000000,
      priceBtc: 1,
      totalSupply: 21000000,
      maxSupply: 21000000,
    };


    const mockGetCryptoCurrencyDetail = jest.fn(() => Promise.resolve(mockCryptoCurrency));
    (useCryptoContext as jest.Mock).mockReturnValue({
      cryptoRepository: {
        getCryptoCurrencyDetail: mockGetCryptoCurrencyDetail,
      },
    });

    const { getByText } = render(<CryptoDetailScreen navigation={navigationMock} route={{ params: { id: 'bitcoin' } }} />);
    expect(getByText('Loading...')).toBeDefined();
    let nameElement
    await waitFor(() => {
      nameElement = getByText('Bitcoin');

    })
    expect(nameElement).toBeTruthy();
    expect(getByText('Bitcoin')).toBeDefined();


    expect(getByText('Price: $ 40.000,00')).toBeDefined();


    expect(getByText('Change (24h): 5%')).toBeDefined();
  });

  it('should show loading while fetching data', async () => {

    (useCryptoContext as jest.Mock).mockReturnValue({
      cryptoRepository: {
        getCryptoCurrencyDetail: jest.fn(() => new Promise(() => { })),
      },
    });


    const { getByText } = render(<CryptoDetailScreen navigation={navigationMock} route={{ params: { id: 'bitcoin' } }} />);


    expect(getByText('Loading...')).toBeDefined();
  });


});