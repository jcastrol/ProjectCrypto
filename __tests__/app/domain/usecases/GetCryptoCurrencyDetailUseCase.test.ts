import CryptoCurrencyEntity from "../../../../src/app/domain/entities/CryptoEntity";
import CryptoRepositoryInterface from "../../../../src/app/domain/repositories/CryptoRepositoryInterface";
import GetCryptoCurrencyDetailUseCase from "../../../../src/app/domain/usecases/GetCryptoCurrencyDetailUseCase";


describe('GetCryptoCurrencyDetailUseCase', () => {
    it('should call getCryptoCurrencyDetail method of CryptoRepositoryInterface with the correct ID', async () => {
        // Arrange
        const mockId = 'crypto123'; // Mock ID for testing
        const mockCryptoCurrency = {
            /* ... Define your mock data here ... */
            id: mockId
        };


        // Create a mock of CryptoRepositoryInterface
        const mockCryptoRepository: CryptoRepositoryInterface = {
            getCryptoCurrencyDetail: jest.fn().mockResolvedValue(mockCryptoCurrency),
            getCryptoCurrencies: jest.fn().mockResolvedValue([]),
            filterCryptoCurrencies: jest.fn().mockResolvedValue([])
        };

        // Create an instance of GetCryptoCurrencyDetailUseCase with the mock repository
        const getCryptoCurrencyDetailUseCase = new GetCryptoCurrencyDetailUseCase(mockCryptoRepository);

        // Act
        const result = await getCryptoCurrencyDetailUseCase.execute(mockId);

        // Assert
        expect(mockCryptoRepository.getCryptoCurrencyDetail).toHaveBeenCalledWith(mockId);
        expect(result).toEqual(mockCryptoCurrency);
    });

    it('should handle error if CryptoRepositoryInterface throws an exception', async () => {
        // Arrange
        const mockError = new Error('Error fetching crypto currency detail');
        const mockId = 'crypto123'; // Mock ID for testing
        const mockCryptoRepository: CryptoRepositoryInterface = {
            getCryptoCurrencyDetail: jest.fn().mockRejectedValue(mockError),
            getCryptoCurrencies: jest.fn().mockResolvedValue([]),
            filterCryptoCurrencies: jest.fn().mockResolvedValue([])
        };

        // Create an instance of GetCryptoCurrencyDetailUseCase with the mock repository
        const getCryptoCurrencyDetailUseCase = new GetCryptoCurrencyDetailUseCase(mockCryptoRepository);

        // Act & Assert
        await expect(getCryptoCurrencyDetailUseCase.execute(mockId)).rejects.toThrowError(mockError);
    });

    it('should return null if CryptoRepositoryInterface returns null', async () => {
        // Arrange
        const mockId = 'crypto123'; // Mock ID for testing
        const mockCryptoRepository: CryptoRepositoryInterface = {
            getCryptoCurrencyDetail: jest.fn().mockResolvedValue(null),
            getCryptoCurrencies: jest.fn().mockResolvedValue([]),
            filterCryptoCurrencies: jest.fn().mockResolvedValue([])
        };

        // Create an instance of GetCryptoCurrencyDetailUseCase with the mock repository
        const getCryptoCurrencyDetailUseCase = new GetCryptoCurrencyDetailUseCase(mockCryptoRepository);

        // Act
        const result = await getCryptoCurrencyDetailUseCase.execute(mockId);

        // Assert
        expect(mockCryptoRepository.getCryptoCurrencyDetail).toHaveBeenCalledWith(mockId);
        expect(result).toBeNull();
    });
});