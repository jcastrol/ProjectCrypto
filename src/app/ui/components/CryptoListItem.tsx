import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CryptoEntity from '../../domain/entities/CryptoEntity';
import { formatNumber } from '../../utils/formatNumber';

interface CryptoListItemProps {
  cryptoCurrency: CryptoEntity;
}

const CryptoListItem: React.FC<CryptoListItemProps> = ({ cryptoCurrency }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{cryptoCurrency.name}</Text>
      <Text style={styles.symbol}>{cryptoCurrency.symbol}</Text>
      <Text style={styles.price}>Price (USD): $ {formatNumber(cryptoCurrency.priceUsd)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  symbol: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
  },
});

export default CryptoListItem;
