import CryptoRepositoryInterface from '../repositories/CryptoRepositoryInterface';
import CryptoCurrencyEntity from '../entities/CryptoEntity';

/* The GetCryptoCurrenciesUseCase class is responsible for executing the use case of retrieving a list
of crypto currencies. */
class GetCryptoCurrenciesUseCase {
  private cryptoRepository: CryptoRepositoryInterface;

  constructor(cryptoRepository: CryptoRepositoryInterface) {
    this.cryptoRepository = cryptoRepository;
  }

  async execute(): Promise<CryptoCurrencyEntity[]> {
    return this.cryptoRepository.getCryptoCurrencies();
  }
}

export default GetCryptoCurrenciesUseCase;


 








