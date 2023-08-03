import { FiltersCrypto, SortParams } from "../../../../src/app/domain/Interfaces/FiltersCrypto";
import CryptoCurrencyEntity from "../../../../src/app/domain/entities/CryptoEntity";
import CryptoRepositoryInterface from "../../../../src/app/domain/repositories/CryptoRepositoryInterface";
import GetCryptoCurrenciesUseCase from "../../../../src/app/domain/usecases/GetCryptoCurrenciesUseCase";


describe('GetCryptoCurrenciesUseCase', () => {
  
  it('should call getCryptoCurrencies method of CryptoRepositoryInterface and return the result', async () => {
    // Arrange
    const mockCryptoCurrencies: CryptoCurrencyEntity[] = [
      /* ... Define your mock data here ... */
    ];

    // Create a mock of CryptoRepositoryInterface
    const mockCryptoRepository: CryptoRepositoryInterface = {
        getCryptoCurrencies: jest.fn().mockResolvedValue(mockCryptoCurrencies),
        getCryptoCurrencyDetail: jest.fn().mockResolvedValue(null),
        filterCryptoCurrencies: jest.fn().mockResolvedValue([])
    };

    // Create an instance of GetCryptoCurrenciesUseCase with the mock repository
    const getCryptoCurrenciesUseCase = new GetCryptoCurrenciesUseCase(mockCryptoRepository);

    // Act
    const result = await getCryptoCurrenciesUseCase.execute();

    // Assert
    expect(mockCryptoRepository.getCryptoCurrencies).toHaveBeenCalled();
    expect(result).toEqual(mockCryptoCurrencies);
  });


  it('should handle error if CryptoRepositoryInterface throws an exception', async () => {
    // Arrange
    const mockError = new Error('Error fetching crypto currencies');
    const mockCryptoRepository: CryptoRepositoryInterface = {
        getCryptoCurrencies: jest.fn().mockRejectedValue(mockError),
        getCryptoCurrencyDetail: function (_id: string): Promise<CryptoCurrencyEntity | null> {
            return new Promise(()=>null)
        },
        filterCryptoCurrencies: function (_cryptoCurrencies: CryptoCurrencyEntity[], _filters: FiltersCrypto, _sortParams: SortParams): Promise<CryptoCurrencyEntity[]> {
            throw new Error("Function not implemented.");
        }
    };

    let error
    // Create an instance of GetCryptoCurrenciesUseCase with the mock repository
      const getCryptoCurrenciesUseCase = new GetCryptoCurrenciesUseCase(mockCryptoRepository);
    try {
      
      await getCryptoCurrenciesUseCase.execute()
    } catch (err) {
      error=err
    }
    

    // Act & Assert
     expect(error).toBeDefined();
  });

});

 








