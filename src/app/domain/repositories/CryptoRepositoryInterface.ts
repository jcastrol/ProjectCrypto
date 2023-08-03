import { FiltersCrypto, SortParams } from '../Interfaces/FiltersCrypto';
import CryptoCurrencyEntity from '../entities/CryptoEntity';

/* The `CryptoRepositoryInterface` is an interface in TypeScript that defines the contract for a crypto
repository.  */
interface CryptoRepositoryInterface {
  getCryptoCurrencies (): Promise<CryptoCurrencyEntity[]>;
  getCryptoCurrencyDetail (id: string): Promise<CryptoCurrencyEntity | null>;
  filterCryptoCurrencies (
    cryptoCurrencies: CryptoCurrencyEntity[], 
    filters: FiltersCrypto, 
    sortParams: SortParams 
  ): Promise<CryptoCurrencyEntity[]>;
}

export default CryptoRepositoryInterface;
