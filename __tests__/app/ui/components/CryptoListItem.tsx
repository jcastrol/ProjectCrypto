import { render } from '@testing-library/react-native';
import React from 'react';
import CryptoListItem from '../../../../src/app/ui/components/CryptoListItem';
import CryptoCurrency from '../../../../src/app/data/models/CryptoModel';


describe('CryptoListItem', () => {
  const cryptoCurrency = {
    name: 'Bitcoin',
    symbol: 'BTC',
    priceUsd: 100000,
  };

  it('should render correctly', () => {
    const { getByText } = render(<CryptoListItem cryptoCurrency={cryptoCurrency as CryptoCurrency} />);
    const nameText = getByText('Bitcoin');
    expect(nameText).toBeTruthy();

    const symbolText = getByText('BTC');
    expect(symbolText).toBeTruthy();

    const priceText = getByText('Price (USD): $ 100.000,00');
    expect(priceText).toBeTruthy();
  });

  it('should apply formatNumber to display the price correctly', () => {
    const { getByText } = render(<CryptoListItem cryptoCurrency={cryptoCurrency as CryptoCurrency} />);

    const priceText = getByText('Price (USD): $ 100.000,00');
    expect(priceText).toBeTruthy();


  });
});
