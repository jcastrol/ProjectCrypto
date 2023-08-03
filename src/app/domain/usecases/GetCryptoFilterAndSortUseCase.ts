import CryptoRepositoryInterface from '../repositories/CryptoRepositoryInterface';
import CryptoCurrencyEntity from '../entities/CryptoEntity';
import { FiltersCrypto, SortParams } from '../Interfaces/FiltersCrypto';

/* The GetCryptoFilterAndSortUseCase class is responsible for executing the filtering and sorting of
crypto currencies based on given filters and sort parameters. */
class GetCryptoFilterAndSortUseCase {
  private cryptoRepository: CryptoRepositoryInterface;

  constructor(cryptoRepository: CryptoRepositoryInterface) {
    this.cryptoRepository = cryptoRepository;
  }

  async execute(
    cryptoCurrencies: CryptoCurrencyEntity[], 
    filters: FiltersCrypto, 
    sortParams: SortParams 
  ):Promise<CryptoCurrencyEntity[]> {
    return this.cryptoRepository.filterCryptoCurrencies(
        cryptoCurrencies,
        filters, 
        sortParams
        );
  }
}

export default GetCryptoFilterAndSortUseCase;