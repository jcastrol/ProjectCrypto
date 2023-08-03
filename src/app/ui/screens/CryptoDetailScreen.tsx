import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCryptoContext } from '../../context/CryptoContext';
import useCryptoCurrencyDetail from '../../hooks/useCryptoCurrencyDetail';
import { ErrorBoundary } from '../containers/ErrorBoundary';
import ColoredButton from '../components/common/ColoredButton';
import { ROUTES_APP } from '../../constants/Routes';
import { formatNumber } from '../../utils/formatNumber';
import Loading from '../components/common/Loading';



interface CryptoDetailScreenProps {
  route: any;
  navigation: any
}

/* The code defines a functional component called `CryptoDetailScreen` that takes in two props:
`route` and `navigation`. */
const CryptoDetailScreen: React.FC<CryptoDetailScreenProps> = ({ route, navigation }) => {

  /* The line `const { cryptoRepository } = useCryptoContext();` is using the `useCryptoContext` hook
  to access the `cryptoRepository` object from the CryptoContext. The `cryptoRepository` object
  likely contains methods to managing and retrieving cryptocurrency information. */
  const { cryptoRepository } = useCryptoContext();
  const { cryptoCurrency, error } = useCryptoCurrencyDetail(cryptoRepository, route.params.id);

  const handleReset = React.useCallback(() => {
    navigation.replace(ROUTES_APP.CRYPTODETAIL);
  }, [navigation]);

  /* The code is checking if the `cryptoCurrency` variable is falsy (null, undefined, or false). If it
  is falsy, it means that the cryptocurrency data is not yet loaded or there was an error retrieving
  the data. In this case, the component returns a `<Loading />` component, which is likely a loading
  spinner or indicator to show that the data is being fetched. */
  if (!cryptoCurrency) {
    return (
      <Loading />
    );
  }

  return (
    <ErrorBoundary
      fallBackComponent={<ColoredButton onPress={handleReset} title="Try again" color="red" />}
      resetCondition={cryptoCurrency}
      error={error}
    >
      <View style={styles.container}>
        <Text style={styles.name}>{cryptoCurrency.name}</Text>
        <Text style={styles.infoText}>{cryptoCurrency.symbol}</Text>
        <Text style={styles.infoText}>Price: $ {formatNumber(cryptoCurrency.priceUsd)}</Text>
        <Text style={styles.infoText}>Rank: {formatNumber(cryptoCurrency.rank)}</Text>
        <Text style={styles.infoText}>Change (24h): {cryptoCurrency.percentChange24h}%</Text>
        <Text style={styles.infoText}>Change (1h): {cryptoCurrency.percentChange1h}%</Text>
        <Text style={styles.infoText}>Change (7d): {cryptoCurrency.percentChange7d}%</Text>
        <Text style={styles.infoText}>Market Cap: $ {formatNumber(cryptoCurrency.marketCapUsd)}</Text>
        <Text style={styles.infoText}>Volume (24h): {formatNumber(cryptoCurrency.volume24)}</Text>
        <Text style={styles.infoText}>
          Circulating Supply: {formatNumber(cryptoCurrency.circulatingSupply)}
        </Text>
        <Text style={styles.infoText}>Price (BTC): {formatNumber(cryptoCurrency.priceBtc)}</Text>
        <Text style={styles.infoText}>Total Supply: {formatNumber(cryptoCurrency.totalSupply)}</Text>
        <Text style={styles.infoText}>Max Supply: {formatNumber(cryptoCurrency.maxSupply)}</Text>

      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default CryptoDetailScreen;
