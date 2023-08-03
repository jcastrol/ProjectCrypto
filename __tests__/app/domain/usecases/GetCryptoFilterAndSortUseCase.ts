import { FiltersCrypto, SortField, SortOrder, SortParams } from "../../../../src/app/domain/Interfaces/FiltersCrypto";
import CryptoCurrencyEntity from "../../../../src/app/domain/entities/CryptoEntity";
import CryptoRepositoryInterface from "../../../../src/app/domain/repositories/CryptoRepositoryInterface";
import GetCryptoFilterAndSortUseCase from "../../../../src/app/domain/usecases/GetCryptoFilterAndSortUseCase";


describe('GetCryptoFilterAndSortUseCase', () => {
  // Arrange
  const mockCryptoCurrencies: CryptoCurrencyEntity[] = [
    /* ... Define your mock data here ... */
  ];
  const mockFilters: FiltersCrypto = {
    /* ... Define your mock filters here ... */
  };
  const mockSortParams: SortParams = {
    field: 'name' as SortField,
    order: 'asc' as SortOrder,
  }
  it('should call filterCryptoCurrencies method of CryptoRepositoryInterface with the correct parameters', async () => {
   
    // Create a mock of CryptoRepositoryInterface
    const mockCryptoRepository: CryptoRepositoryInterface = {
      filterCryptoCurrencies: jest.fn().mockResolvedValue(mockCryptoCurrencies),
      getCryptoCurrencyDetail: jest.fn().mockResolvedValue(null),
      getCryptoCurrencies: jest.fn().mockResolvedValue([]),
    };

    // Create an instance of GetCryptoFilterAndSortUseCase with the mock repository
    const getCryptoFilterAndSortUseCase = new GetCryptoFilterAndSortUseCase(mockCryptoRepository);

    // Act
    const result = await getCryptoFilterAndSortUseCase.execute(
      mockCryptoCurrencies,
      mockFilters,
      mockSortParams
    );

    // Assert
    expect(mockCryptoRepository.filterCryptoCurrencies).toHaveBeenCalledWith(
      mockCryptoCurrencies,
      mockFilters,
      mockSortParams
    );
    expect(result).toEqual(mockCryptoCurrencies);
  });

  it('should handle error if CryptoRepositoryInterface throws an exception', async () => {
    // Arrange
    const mockError = new Error('Error filtering and sorting crypto currencies');
   
    const mockCryptoRepository: CryptoRepositoryInterface = {
      filterCryptoCurrencies: jest.fn().mockRejectedValue(mockError),
      getCryptoCurrencyDetail: jest.fn().mockResolvedValue(null),
      getCryptoCurrencies: jest.fn().mockResolvedValue([]),
    };

    // Create an instance of GetCryptoFilterAndSortUseCase with the mock repository
    const getCryptoFilterAndSortUseCase = new GetCryptoFilterAndSortUseCase(mockCryptoRepository);

    // Act & Assert
    await expect(
      getCryptoFilterAndSortUseCase.execute(mockCryptoCurrencies, mockFilters, mockSortParams)
    ).rejects.toThrowError(mockError);
  });
});