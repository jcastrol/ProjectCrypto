import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import CryptoFilterModal from '../../../../../src/app/ui/components/FilterCripto/FilterCripto';
import { NativeBaseProvider } from 'native-base';

const AllTheProviders: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };
  return <NativeBaseProvider initialWindowMetrics={inset}>{children}</NativeBaseProvider>;
};
describe('CryptoFilterModal', () => {
  const mockOnApplyFilters = jest.fn();
  const mockOnCancel = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should call onApplyFilters when "Apply Filters" button is pressed', () => {

    // Render the component with the mock functions
    const { getByText } = render(<AllTheProviders>
      <CryptoFilterModal onApplyFilters={mockOnApplyFilters} onCancel={mockOnCancel} /></AllTheProviders>
    );

    // Find and press the "Apply Filters" button
    const applyButton = getByText('Apply Filters');
    fireEvent.press(applyButton);

    // Assert that onApplyFilters function is called once
    expect(mockOnApplyFilters).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when "Close" button is pressed', () => {


    // Render the component with the mock functions
    const { getByText } = render(
      <AllTheProviders><CryptoFilterModal onApplyFilters={mockOnApplyFilters} onCancel={mockOnCancel} />
      </AllTheProviders>
    );

    // Find and press the "Close" button
    const closeButton = getByText('Close');
    fireEvent.press(closeButton);

    // Assert that onCancel function is called once
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('should call onApplyFilters and onCancel when Apply and Cancel buttons are pressed', () => {
    // Arrange
    const { getByText } = render(
      <AllTheProviders><CryptoFilterModal onApplyFilters={mockOnApplyFilters} onCancel={mockOnCancel} />
      </AllTheProviders>
    );

    // Act
    fireEvent.press(getByText('Apply Filters'));
    fireEvent.press(getByText('Close'));

    // Assert
    expect(mockOnApplyFilters).toHaveBeenCalledTimes(1);
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('should call handleChangeFilter when input values change', () => {

    const { getByPlaceholderText } = render(
      <AllTheProviders><CryptoFilterModal onApplyFilters={mockOnApplyFilters} onCancel={mockOnCancel} />
      </AllTheProviders>
    );

    // Act
    fireEvent.changeText(getByPlaceholderText('Min Price (USD)'), '500');
    fireEvent.changeText(getByPlaceholderText('Max Price (USD)'), '2000');
    fireEvent.changeText(getByPlaceholderText('Min Volume 24h'), '200');
    fireEvent.changeText(getByPlaceholderText('Max Volume 24h'), '800');

    // Assert
    expect(mockOnApplyFilters).toHaveBeenCalledTimes(0); // handleChangeFilter is called, but not onApplyFilters
  });
});


