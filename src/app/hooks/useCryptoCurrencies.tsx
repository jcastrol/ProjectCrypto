import { useEffect, useRef, useState } from 'react';
import CryptoRepositoryInterface from '../domain/repositories/CryptoRepositoryInterface';
import CryptoCurrencyEntity from '../domain/entities/CryptoEntity';
import GetCryptoCurrenciesUseCase from '../domain/usecases/GetCryptoCurrenciesUseCase';
import { FiltersCrypto, SortParams } from '../domain/Interfaces/FiltersCrypto';
import GetCryptoFilterAndSortUseCase from '../domain/usecases/GetCryptoFilterAndSortUseCase';


/* The code defines a custom hook called `useCryptoCurrencies` that takes a `cryptoRepository` as a
parameter. */
export const useCryptoCurrencies = (cryptoRepository: CryptoRepositoryInterface) => {
  const [cryptoCurrencies, setCryptoCurrencies] = useState<CryptoCurrencyEntity[]>([]);
  const [error, setError] = useState<boolean>(false);
  const cryptoInitial = useRef<CryptoCurrencyEntity[]>([])

  useEffect(() => {
    /**
     * The function fetchCryptoCurrencies is an asynchronous function that fetches data from a crypto
     * repository and sets the fetched data to the state variable cryptoCurrencies.
     */
    const fetchCryptoCurrencies = async () => {
      try {
        const getCryptoCurrenciesUseCase = new GetCryptoCurrenciesUseCase(cryptoRepository);
        const data = await getCryptoCurrenciesUseCase.execute();
        setCryptoCurrencies(data);
        cryptoInitial.current=data
      } catch (error) {
        setError(true);
      }
    };
    fetchCryptoCurrencies();
  }, [cryptoRepository]);

  /**
   * The function `getCryptoFilterAndSort` takes in filters and sort parameters, uses a use case to
   * filter and sort crypto data, and updates the state with the filtered and sorted data.
   * @param {FiltersCrypto} filters - The `filters` parameter is an object that contains the filter
   * criteria for the cryptocurrencies. It could include properties such as `name`, `symbol`, `price`,
   * `marketCap`, etc. These properties are used to filter the cryptocurrencies based on the specified
   * criteria.
   * @param {SortParams} sortParams - The `sortParams` parameter is an object that contains the sorting
   * parameters for the cryptocurrencies. It could include properties such as `sortBy` (the field to
   * sort by, e.g., "price", "marketCap"), and `sortOrder` (the order of sorting, e.g., "asc
   */
  const getCryptoFilterAndSort = async (
    filters: FiltersCrypto,
    sortParams: SortParams
  ): Promise<void> => {
    try {
      const getCryptoFilterAndSortUseCase = new GetCryptoFilterAndSortUseCase(cryptoRepository);
      const filteredAndSortedData = await getCryptoFilterAndSortUseCase.execute(
        cryptoInitial.current,
        filters,
        sortParams
      );
       setCryptoCurrencies(filteredAndSortedData);
    } catch (error) {
      setError(true); // Return the original list in case of an error
    }
  };


  return { cryptoCurrencies, getCryptoFilterAndSort ,error };
};
