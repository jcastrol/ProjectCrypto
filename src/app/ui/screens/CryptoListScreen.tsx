import React, { useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CryptoListItem from '../components/CryptoListItem';
import { useCryptoContext } from '../../context/CryptoContext';
import { ROUTES_APP } from '../../constants/Routes';
import { ErrorBoundary } from '../containers/ErrorBoundary';
import ColoredButton from '../components/common/ColoredButton';
import { useCryptoCurrencies } from '../../hooks/useCryptoCurrencies';
import CustomModal, { dialogCloseSubject$, dialogOpenSubject$ } from '../containers/CustomModal';
import { FilterCripto } from '../components/FilterCripto';
import { Button } from 'native-base';
import { FiltersCrypto, SortParams } from '../../domain/Interfaces/FiltersCrypto';

/* The code defines a functional component called `CryptoListScreen` which is a screen component in a
React Native app. It takes a `navigation` prop as input. */

const CryptoListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { cryptoRepository } = useCryptoContext();
  const { cryptoCurrencies, error, getCryptoFilterAndSort } = useCryptoCurrencies(cryptoRepository);

  /* The `handleCryptoPress` function is created using the `React.useCallback` hook. It is a memoized
  version of the function that is only recreated when the `navigation` dependency changes. 
   it is used to navigate to the `CRYPTODETAIL` screen and pass the `id` of the selected cryptocurrency 
   as a parameter. */
  const handleCryptoPress = React.useCallback(
    (id: string) => {
      navigation.navigate(ROUTES_APP.CRYPTODETAIL, { id: id });
    },
    [navigation],
  );
  /* The `handleReset` function is created using the `React.useCallback` hook. It is a memoized version
  of the function that is only recreated when the `navigation` dependency changes. */
  const handleReset = React.useCallback(() => {
    navigation.replace(ROUTES_APP.CRYPTOLIST);
  },
    [navigation],
  );

  const openModal = () => {
    dialogOpenSubject$.setSubject = true;
  };

  const closeModal = React.useCallback(() => {
    dialogCloseSubject$.setSubject = true;
  }, [])

  /* The `handleApplyFilterAndSort` function is defined as a callback function using the `useCallback`
  hook. It takes two parameters: `filters` of type `FiltersCrypto` and `sortParams` of type
  `SortParams`.
  The `getCryptoFilterAndSort(filters, sortParams)` function is called to filter and sort the list
  of cryptocurrencies based on the provided `filters` and `sortParams` parameters. It is a function
  that is defined in the `useCryptoCurrencies` hook and is responsible for fetching the filtered
  and sorted list of cryptocurrencies from the crypto repository.  */

  const handleApplyFilterAndSort: (filters: FiltersCrypto, sortParams: SortParams) => void = useCallback((filters: FiltersCrypto, sortParams: SortParams) => {
    getCryptoFilterAndSort(filters, sortParams)
    closeModal()
  }, [getCryptoFilterAndSort, closeModal])

  return (
    <ErrorBoundary
      fallBackComponent={<ColoredButton onPress={handleReset} title="Try again" color="red" />}
      resetCondition={cryptoCurrencies}
      error={error}
    >
      <CustomModal>
        <FilterCripto onApplyFilters={handleApplyFilterAndSort} onCancel={closeModal} />
      </CustomModal>
      <View style={styles.container}>
        <View style={{ paddingBottom: 20 }}>
          <Button onPress={openModal} variant="subtle" >FILTERS</Button>
        </View>
        <FlatList
          data={cryptoCurrencies}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          initialNumToRender={10}
          windowSize={5}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCryptoPress(item.id)}>
              <CryptoListItem cryptoCurrency={item} />
            </TouchableOpacity>
          )}
        />

      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
});

export default CryptoListScreen;