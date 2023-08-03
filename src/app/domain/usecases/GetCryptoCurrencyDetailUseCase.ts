import CryptoRepositoryInterface from '../repositories/CryptoRepositoryInterface';
import CryptoCurrencyEntity from '../entities/CryptoEntity';

/* The GetCryptoCurrencyDetailUseCase class is responsible for retrieving detailed information about a
specific cryptocurrency. */
class GetCryptoCurrencyDetailUseCase {
  private cryptoRepository: CryptoRepositoryInterface;

  constructor(cryptoRepository: CryptoRepositoryInterface) {
    this.cryptoRepository = cryptoRepository;
  }

  async execute(id: string): Promise<CryptoCurrencyEntity | null> {
    return this.cryptoRepository.getCryptoCurrencyDetail(id);
  }
}

export default GetCryptoCurrencyDetailUseCase;
