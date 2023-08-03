import { useEffect, useState } from 'react';
import CryptoCurrencyEntity from '../domain/entities/CryptoEntity';
import GetCryptoCurrencyDetailUseCase from '../domain/usecases/GetCryptoCurrencyDetailUseCase';
import CryptoRepositoryInterface from '../domain/repositories/CryptoRepositoryInterface';


/**
 * The `useCryptoCurrencyDetail` function is a custom React hook that fetches and returns the details
 * of a specific cryptocurrency using the provided `cryptoRepository` and `cryptoId`, while also
 * handling any errors that may occur.
 * @param {CryptoRepositoryInterface} cryptoRepository - The `cryptoRepository` parameter is an
 * instance of a class that implements the `CryptoRepositoryInterface`. This interface defines the
 * methods for interacting with the crypto currency data, such as fetching the details of a specific
 * crypto currency.
 * @param {string} cryptoId - The `cryptoId` parameter is a string that represents the unique
 * identifier of a cryptocurrency. It is used to fetch the details of a specific cryptocurrency from
 * the `cryptoRepository`.
 * @returns The function `useCryptoCurrencyDetail` returns an object with two properties:
 * `cryptoCurrency` and `error`.
 */
const useCryptoCurrencyDetail = (cryptoRepository: CryptoRepositoryInterface,cryptoId: string) => {
  
  const [cryptoCurrency, setCryptoCurrency] = useState<CryptoCurrencyEntity | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getCryptoCurrencyDetail = async () => {
      try {
      const getCryptoCurrencyDetailUseCase = new GetCryptoCurrencyDetailUseCase(cryptoRepository);
      const data = await getCryptoCurrencyDetailUseCase.execute(cryptoId);
      setCryptoCurrency(data);
      } catch (error) {
        setError(true);
      }
    };

    getCryptoCurrencyDetail();
  }, [cryptoId]);

  return { cryptoCurrency, error };
};

export default useCryptoCurrencyDetail;