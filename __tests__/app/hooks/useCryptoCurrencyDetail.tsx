import { act, renderHook } from "@testing-library/react-native";
import CryptoCurrencyEntity from "../../../src/app/domain/entities/CryptoEntity";
import CryptoRepositoryInterface from "../../../src/app/domain/repositories/CryptoRepositoryInterface";
import useCryptoCurrencyDetail from "../../../src/app/hooks/useCryptoCurrencyDetail";


// Mock data for CryptoCurrencyEntity
const mockCryptoCurrency: CryptoCurrencyEntity = 
  new CryptoCurrencyEntity(
    {
      id: "abc123",
      symbol: "XRP",
      name: "XRP",
      nameid: "ripple",
      rank: 5,
      price_usd: "0.684153",
      percent_change_24h: "-2.35",
      percent_change_1h: "0.10",
      percent_change_7d: "-2.38",
      price_btc: "0.000023",
      market_cap_usd: "29356671133.61",
      volume24: "963908605.4734583",
      volume24a: "1470123777.1215587",
      csupply: "42909539227.00",
      tsupply: "99991841593",
      msupply: "100000000000"
    });

describe('useCryptoCurrencyDetail', () => {
  const mockCryptoId = 'abc123';

  it('should fetch crypto currency detail successfully', async () => {
    // Arrange
    const mockCryptoRepository: CryptoRepositoryInterface = {
      getCryptoCurrencyDetail: jest.fn().mockResolvedValue(mockCryptoCurrency),
      getCryptoCurrencies: jest.fn().mockResolvedValue([]),
      filterCryptoCurrencies: jest.fn().mockResolvedValue([]),
    };

    // Act
    const { result } = renderHook(() =>
      useCryptoCurrencyDetail(mockCryptoRepository, mockCryptoId)
    );

    // Assert initial state
    expect(result.current.cryptoCurrency).toBeNull();
    expect(result.current.error).toBe(false);

    // Wait for the state to update
    await act(async () => {
      await result.current.cryptoCurrency;
    });

    // Assert after state update
    expect(mockCryptoRepository.getCryptoCurrencyDetail).toHaveBeenCalledWith(mockCryptoId);
    expect(result.current.cryptoCurrency).toEqual(mockCryptoCurrency);
    expect(result.current.error).toBe(false);
  });

  it('should handle error when fetching crypto currency detail', async () => {
    // Arrange
    const mockError = new Error('Error fetching crypto currency detail');
    const mockCryptoRepository: CryptoRepositoryInterface = {
      getCryptoCurrencyDetail: jest.fn().mockRejectedValue(mockError),
      getCryptoCurrencies: jest.fn().mockResolvedValue([]),
      filterCryptoCurrencies: jest.fn().mockResolvedValue([]),
    };

    // Act
    const { result } = renderHook(() =>
      useCryptoCurrencyDetail(mockCryptoRepository, mockCryptoId)
    );

    // Assert initial state
    expect(result.current.cryptoCurrency).toBeNull();
    expect(result.current.error).toBe(false);

    // Wait for the state to update
    await act(async () => {
      await result.current.cryptoCurrency;
    });

    // Assert after state update
    expect(mockCryptoRepository.getCryptoCurrencyDetail).toHaveBeenCalledWith(mockCryptoId);
    expect(result.current.cryptoCurrency).toBeNull();
    expect(result.current.error).toBe(true);
  });
});
