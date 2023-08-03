import { FiltersCrypto, SortParams } from '../../domain/Interfaces/FiltersCrypto';
import CryptoCurrencyEntity from '../../domain/entities/CryptoEntity';
import CryptoRepositoryInterface from '../../domain/repositories/CryptoRepositoryInterface';
import CryptoAPI from '../api/CryptoAPI';
import CryptoCurrency from '../models/CryptoModel';

/* The `CryptoRepository` class is responsible for fetching and filtering crypto currencies data. */
class CryptoRepository implements CryptoRepositoryInterface {
 /**
  * The function getCryptoCurrencies retrieves a list of crypto currencies from an API and returns them
  * as an array of CryptoCurrencyEntity objects.
  * @returns a Promise that resolves to an array of CryptoCurrencyEntity objects.
  */
  async getCryptoCurrencies(): Promise<CryptoCurrencyEntity[]> {
    try {
      const apiResponse = await CryptoAPI.fetchCryptoCurrencies();
      const cryptoCurrencies = apiResponse.map((data: any) => new CryptoCurrency(data));
      return cryptoCurrencies;
    } catch (error) {
      throw new Error('Error getting crypto currencies');
    }
  }

 /**
  * The function getCryptoCurrencyDetail retrieves the details of a cryptocurrency using its ID and
  * returns a Promise that resolves to a CryptoCurrencyEntity object or null if the cryptocurrency is
  * not found.
  * @param {string} id - The `id` parameter is a string that represents the unique identifier of a
  * cryptocurrency. It is used to fetch the details of a specific cryptocurrency from an API.
  * @returns a Promise that resolves to either a CryptoCurrencyEntity object or null.
  */
  async getCryptoCurrencyDetail(id: string): Promise<CryptoCurrencyEntity | null> {
    try {
      const apiResponse = await CryptoAPI.fetchCryptoCurrencyDetail(id);
      return new CryptoCurrency(apiResponse);
    } catch (error) {
      throw new Error('Error getting crypto currency detail');
    }
  }

  /* The `filterCryptoCurrencies` function is responsible for filtering and sorting an array of
  `CryptoCurrencyEntity` objects based on the provided filters and sort parameters. */
  async filterCryptoCurrencies(
    cryptoCurrencies: CryptoCurrencyEntity[],
    filters: FiltersCrypto,
    sortParams: SortParams 
  ):Promise<CryptoCurrencyEntity[]> {

    /* The code block is filtering an array of `CryptoCurrencyEntity` objects based on the provided
    filters. */
    const filteredCryptoCurrencies = cryptoCurrencies.filter((cryptoCurrency) => {
      const { priceUsd, volume24 } = cryptoCurrency;
      const { minPriceUsd, maxPriceUsd, minVolume24, maxVolume24 } = filters;
  
      if (
        (minPriceUsd && priceUsd < minPriceUsd) ||
        (maxPriceUsd && priceUsd > maxPriceUsd) ||
        (minVolume24 && volume24 < minVolume24) ||
        (maxVolume24 && volume24 > maxVolume24)
      ) {
        return false;
      }
  
      return true;
    });
  
    
    /* The code block you provided is responsible for sorting the filtered crypto currencies based on
    the provided sort parameters. */
    const { field, order } = sortParams;
    const sortedCryptoCurrencies = filteredCryptoCurrencies.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
  
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        // If types are different, leave them in their current order
        return 0;
      }
    });
  
    return sortedCryptoCurrencies;
  }
}

export default CryptoRepository

