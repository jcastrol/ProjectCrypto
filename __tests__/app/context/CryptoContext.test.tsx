import { render, renderHook } from '@testing-library/react-native';
import React from 'react';
import CryptoProvider, { useCryptoContext } from '../../../src/app/context/CryptoContext';
import CryptoRepository from '../../../src/app/data/repositories/CryptoRepository';
import { Text } from 'react-native';



describe('useCryptoContext', () => {
  it('should throw an error if used outside of CryptoProvider', () => {
    // Arrange & Act
    let error;
    try {
      renderHook(() => useCryptoContext());
    } catch (err) {
      error = err;
    }

    // Assert
    expect(error).toBeDefined();
    expect(error.message).toBe('useCryptoContext must be used within a CryptoProvider');
  });

  it('should return the CryptoContext value when used within CryptoProvider', () => {
    // Arrange
    const mockCryptoRepository = new CryptoRepository();
    const wrapper = (props: { children: React.ReactElement<any, string | React.JSXElementConstructor<any>> }) => (
      <CryptoProvider cryptoRepository={mockCryptoRepository}>
        {props.children}
      </CryptoProvider>
    );

    // Act
    const { result } = renderHook(() => useCryptoContext(), { wrapper });

    // Assert
    expect(result.current.cryptoRepository).toBe(mockCryptoRepository);
  });
});

describe('CryptoProvider', () => {
  it('should provide the correct cryptoRepository value through the context', () => {
    // Arrange
    const mockCryptoRepository = new CryptoRepository();
    const TestComponent: React.FC = () => {
      const cryptoContext = useCryptoContext();
      return <Text>{cryptoContext.cryptoRepository.toString()}</Text>;
    };

    // Act
    const { getByText } = render(
      <CryptoProvider cryptoRepository={mockCryptoRepository}>
        <TestComponent />
      </CryptoProvider>
    );

    // Assert
    const renderedText = getByText(mockCryptoRepository.toString());
    expect(renderedText).toBeDefined();
  });
});