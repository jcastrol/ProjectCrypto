
import CryptoRepositoryInterface from '../../../src/app/domain/repositories/CryptoRepositoryInterface';
import CryptoCurrencyEntity from '../../../src/app/domain/entities/CryptoEntity';
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useCryptoCurrencies } from '../../../src/app/hooks/useCryptoCurrencies';
import { FiltersCrypto, SortField, SortOrder, SortParams } from '../../../src/app/domain/Interfaces/FiltersCrypto';



describe('useCryptoCurrencies', () => {
  const mockCryptoRepository: CryptoRepositoryInterface = {
    getCryptoCurrencies: jest.fn().mockResolvedValue([]),
    filterCryptoCurrencies: jest.fn().mockResolvedValue([]),
    getCryptoCurrencyDetail: jest.fn().mockResolvedValue(null),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch crypto currencies on mount', async () => {
    // Arrange
    const mockCryptoCurrencies: CryptoCurrencyEntity[] = [
      /* ... Define your mock data here ... */
    ];
    (mockCryptoRepository.getCryptoCurrencies as jest.Mock).mockResolvedValue(mockCryptoCurrencies);

    // Act
    const { result} = renderHook(() => useCryptoCurrencies(mockCryptoRepository));

    // Assert
    expect(result.current.cryptoCurrencies).toEqual([]);
    expect(result.current.error).toBe(false);

    await waitFor(() => result.current.cryptoCurrencies.length > 0);

    expect(mockCryptoRepository.getCryptoCurrencies).toHaveBeenCalled();
    expect(result.current.cryptoCurrencies).toEqual(mockCryptoCurrencies);
  });

  it('should handle error on initial fetch', async () => {
    // Arrange
    const mockCryptoRepository2: CryptoRepositoryInterface = {
      ...mockCryptoRepository,
      getCryptoCurrencies: jest.fn().mockRejectedValue(new Error('Error fetching crypto currencies')),
    };
    const mockCryptoCurrencies: CryptoCurrencyEntity[] = [
      /* ... Define your mock data here ... */
    ];
   

    // Act
    const { result } = renderHook(() => useCryptoCurrencies(mockCryptoRepository2));

    // Assert
    expect(result.current.cryptoCurrencies).toEqual([]);
    expect(result.current.error).toBe(false);

    await act(async () => {
      await new Promise<void>((resolve) => setImmediate(resolve));
    });

    expect(result.current.cryptoCurrencies).toEqual([]);
    expect(result.current.error).toBe(true);
  });


  it('should filter and sort crypto currencies', async () => {
    // Arrange
    const mockFilters: FiltersCrypto = {
      /* ... Define your mock filters here ... */
    };
    const mockSortParams: SortParams = {
      field: 'name' as SortField,
      order: 'asc' as SortOrder,
    }
    const mockInitialCryptoCurrencies: CryptoCurrencyEntity[] = [
      /* ... Define your initial mock data here ... */
    ];
    const mockFilteredAndSortedCryptoCurrencies: CryptoCurrencyEntity[] = [
      /* ... Define your filtered and sorted mock data here ... */
    ];
    (mockCryptoRepository.getCryptoCurrencies as jest.Mock).mockResolvedValue(mockInitialCryptoCurrencies);
    (mockCryptoRepository.filterCryptoCurrencies as jest.Mock).mockResolvedValue(mockFilteredAndSortedCryptoCurrencies);

    // Act
    const { result } = renderHook(() => useCryptoCurrencies(mockCryptoRepository));

    // Call getCryptoFilterAndSort with some filters and sort parameters
    await act(async () => {
      await result.current.getCryptoFilterAndSort(
        mockFilters,
        mockSortParams
      );
    });

    // Assert
    expect(mockCryptoRepository.filterCryptoCurrencies).toHaveBeenCalledWith(
      mockInitialCryptoCurrencies,
      mockFilters,
      mockSortParams
    );
    expect(result.current.cryptoCurrencies).toEqual(mockFilteredAndSortedCryptoCurrencies);
    expect(result.current.error).toBe(false);
  });

  it('should handle error on filtering and sorting', async () => {
    // Arrange
    const mockFilters: FiltersCrypto = {
      /* ... Define your mock filters here ... */
    };
    const mockSortParams: SortParams = {
      field: 'name' as SortField,
      order: 'asc' as SortOrder,
    }
    const mockInitialCryptoCurrencies: CryptoCurrencyEntity[] = [
      /* ... Define your initial mock data here ... */
    ];
    const mockError = new Error('Error filtering and sorting crypto currencies');
    (mockCryptoRepository.getCryptoCurrencies as jest.Mock).mockResolvedValue(mockInitialCryptoCurrencies);
    (mockCryptoRepository.filterCryptoCurrencies as jest.Mock).mockRejectedValue(mockError);

    // Act
    const { result } = renderHook(() => useCryptoCurrencies(mockCryptoRepository));

    // Call getCryptoFilterAndSort with some filters and sort parameters
    await act(async () => {
      await result.current.getCryptoFilterAndSort(
        mockFilters,
        mockSortParams
      );
    });

    // Assert
    expect(mockCryptoRepository.filterCryptoCurrencies).toHaveBeenCalledWith(
      mockInitialCryptoCurrencies,
      mockFilters,
      mockSortParams
    );
    expect(result.current.cryptoCurrencies).toEqual(mockInitialCryptoCurrencies);
    expect(result.current.error).toBe(true);
  });
});
