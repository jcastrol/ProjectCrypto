import axios from 'axios';
import CryptoAPI from '../../../../src/app/data/api/CryptoAPI';
import { API_BASE_URL } from '../../../../src/app/constants/apis';


jest.mock('axios'); // Mock axios to prevent real HTTP requests

describe('CryptoAPI', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock after each test
  });

  it('fetches crypto currencies data from API', async () => {
    // Arrange
    const mockData = [{ id: 'bitcoin', name: 'Bitcoin' }];
    const mockResponse = { data: { data: mockData } };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    // Act
    const data = await CryptoAPI.fetchCryptoCurrencies();

    // Assert
    expect(data).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(API_BASE_URL);
  });

  it('fetches crypto currency detail by ID from API', async () => {
    // Arrange
    const id = 'bitcoin';
    const mockData = { id: 'bitcoin', name: 'Bitcoin' };
    const mockResponse = { data: { data: [mockData] } };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    // Act
    const data = await CryptoAPI.fetchCryptoCurrencyDetail(id);

    // Assert
    expect(data).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/?id=${id}`);
  });

  it('throws an error if fetching crypto currencies fails', async () => {
    // Arrange
    const errorMessage = 'Error fetching crypto currencies';
    (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(CryptoAPI.fetchCryptoCurrencies()).rejects.toThrow(errorMessage);
  });

  it('throws an error if fetching crypto currency detail fails', async () => {
    // Arrange
    const id = 'bitcoin';
    const errorMessage = 'Error fetching crypto currency detail';
    (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(CryptoAPI.fetchCryptoCurrencyDetail(id)).rejects.toThrow(errorMessage);
  });
});
  