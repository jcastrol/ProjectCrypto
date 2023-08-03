import CryptoAPI from "../../../../src/app/data/api/CryptoAPI";
import CryptoRepository from "../../../../src/app/data/repositories/CryptoRepository";
import { SortField, SortOrder } from "../../../../src/app/domain/Interfaces/FiltersCrypto";
import CryptoCurrencyEntity from "../../../../src/app/domain/entities/CryptoEntity";


// Mock the CryptoAPI module to avoid real HTTP requests
jest.mock('../../../../src/app/data/api/CryptoAPI');
const mockCryptoCurrencies = [
  new CryptoCurrencyEntity({
    id: "90",
    symbol: "BTC",
    name: "Bitcoin",
    nameid: "bitcoin",
    rank: 1,
    price_usd: "29137.27",
    percent_change_24h: "-0.37",
    percent_change_1h: "0.01",
    percent_change_7d: "-0.28",
    price_btc: "1.00",
    market_cap_usd: "566502466328.72",
    volume24: "16936414583.44178",
    volume24a: "13695799171.2851",
    csupply: "19442540.00",
    tsupply: "19442540",
    msupply: "21000000"
  }),
  new CryptoCurrencyEntity({
    id: "2710",
    symbol: "BNB",
    name: "Binance Coin",
    nameid: "binance-coin",
    rank: 4,
    price_usd: "240.56",
    percent_change_24h: "-2.25",
    percent_change_1h: "-0.17",
    percent_change_7d: "1.16",
    price_btc: "0.008256",
    market_cap_usd: "40125759526.81",
    volume24: "365424517.34842473",
    volume24a: "748188473.2423302",
    csupply: "166801148.00",
    tsupply: "192443301",
    msupply: "200000000"
  },),
  new CryptoCurrencyEntity(
    {
      id: "58",
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
    }),
];
describe('CryptoRepository', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock after each test
  });

  it('fetches crypto currencies from API and returns them as CryptoCurrencyEntity objects', async () => {
    // Arrange
    const mockApiData = [
      { id: 'bitcoin', name: 'Bitcoin', priceUsd: '42000', volume24: '1000' },
      { id: 'ethereum', name: 'Ethereum', priceUsd: '3000', volume24: '500' },
    ];
    (CryptoAPI.fetchCryptoCurrencies as jest.Mock).mockResolvedValue(mockApiData);

    // Act
    const cryptoRepository = new CryptoRepository();
    const cryptoCurrencies = await cryptoRepository.getCryptoCurrencies();

    // Assert
    expect(cryptoCurrencies).toHaveLength(2);
    expect(cryptoCurrencies[0].id).toBe('bitcoin');
    expect(cryptoCurrencies[1].name).toBe('Ethereum');
  });

  it('fetches crypto currency detail from API and returns it as a CryptoCurrencyEntity object', async () => {
    // Arrange
    const mockId = 'bitcoin';
    const mockApiData = { id: 'bitcoin', name: 'Bitcoin', priceUsd: '42000', volume24: '1000' };
    (CryptoAPI.fetchCryptoCurrencyDetail as jest.Mock).mockResolvedValue(mockApiData);

    // Act
    const cryptoRepository = new CryptoRepository();
    const cryptoCurrencyDetail = await cryptoRepository.getCryptoCurrencyDetail(mockId);

    // Assert
    expect(cryptoCurrencyDetail).toBeTruthy();
    expect(cryptoCurrencyDetail?.id).toBe('bitcoin');
    expect(cryptoCurrencyDetail?.name).toBe('Bitcoin');
  });

  it('filters and sorts crypto currencies based on provided filters and sort parameters', async () => {
    // Arrange

    const mockFilters = {
      minPriceUsd: 1,
      maxPriceUsd: 50000,
      minVolume24: 100,
      maxVolume24: 100000000000,
    };
    const mockSortParams = {
      field: 'name' as SortField,
      order: 'asc' as SortOrder,
    };

    // Act
    const cryptoRepository = new CryptoRepository();
    const filteredAndSortedCryptoCurrencies = await cryptoRepository.filterCryptoCurrencies(
      mockCryptoCurrencies,
      mockFilters,
      mockSortParams
    );

    // Assert
    expect(filteredAndSortedCryptoCurrencies).toHaveLength(2);
    expect(filteredAndSortedCryptoCurrencies[0].id).toBe('2710');
    expect(filteredAndSortedCryptoCurrencies[1].id).toBe('90');
  });



  it('should throw an error if there is an error fetching crypto currencies from the API', async () => {
    // Arrange
    (CryptoAPI.fetchCryptoCurrencies as jest.Mock).mockRejectedValue(new Error('API Error'));

    // Act
    const cryptoRepository = new CryptoRepository();

    // Assert
    await expect(cryptoRepository.getCryptoCurrencies()).rejects.toThrowError('Error getting crypto currencies');
  });
  it('should filter and sort crypto currencies based on provided filters and sort parameters', async () => {
    // Arrange

    const filters = { minPriceUsd: 100, maxPriceUsd: 1000, minVolume24: 10000, maxVolume24: 50000 };
    const sortParams = {
      field: 'priceUsd' as SortField,
      order: 'asc' as SortOrder
    };
    const cryptoRepository = new CryptoRepository();

    // Act
    const filteredAndSorted = await cryptoRepository.filterCryptoCurrencies(mockCryptoCurrencies, filters, sortParams);

    // Assert
    expect(filteredAndSorted).toEqual([]);
  });
});