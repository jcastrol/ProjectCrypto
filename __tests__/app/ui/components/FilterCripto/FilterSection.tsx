import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { FilterSection } from '../../../../../src/app/ui/components/FilterCripto';


describe('FilterSection', () => {
  const mockFilters = {
    minPriceUsd: 100,
    maxPriceUsd: 1000,
    minVolume24: 10000,
    maxVolume24: 50000,
  };

  const mockOnChangeFilter = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the FilterSection component with the correct placeholder texts', () => {
    // Arrange
    const { getByPlaceholderText } = render(
      <FilterSection filters={mockFilters} onChangeFilter={mockOnChangeFilter} />
    );

    // Act & Assert
    expect(getByPlaceholderText('Min Price (USD)').props.value).toBe('100');
    expect(getByPlaceholderText('Max Price (USD)').props.value).toBe('1000');
    expect(getByPlaceholderText('Min Volume 24h').props.value).toBe('10000');
    expect(getByPlaceholderText('Max Volume 24h').props.value).toBe('50000');
  });

  it('should call onChangeFilter with the correct field and value when input values change', () => {
    // Arrange
    const { getByPlaceholderText } = render(
      <FilterSection filters={mockFilters} onChangeFilter={mockOnChangeFilter} />
    );

    // Act
    fireEvent.changeText(getByPlaceholderText('Min Price (USD)'), '500');
    fireEvent.changeText(getByPlaceholderText('Max Price (USD)'), '2000');
    fireEvent.changeText(getByPlaceholderText('Min Volume 24h'), '200');
    fireEvent.changeText(getByPlaceholderText('Max Volume 24h'), '800');

    // Assert
    expect(mockOnChangeFilter).toHaveBeenCalledTimes(4);
    expect(mockOnChangeFilter).toHaveBeenCalledWith('minPriceUsd', 500);
    expect(mockOnChangeFilter).toHaveBeenCalledWith('maxPriceUsd', 2000);
    expect(mockOnChangeFilter).toHaveBeenCalledWith('minVolume24', 200);
    expect(mockOnChangeFilter).toHaveBeenCalledWith('maxVolume24', 800);
  });

  it('should call onChangeFilter with undefined value when input value is empty', () => {
    // Arrange
    const { getByPlaceholderText } = render(
      <FilterSection filters={mockFilters} onChangeFilter={mockOnChangeFilter} />
    );

    // Act
    fireEvent.changeText(getByPlaceholderText('Min Price (USD)'), '');
    fireEvent.changeText(getByPlaceholderText('Max Price (USD)'), '');
    fireEvent.changeText(getByPlaceholderText('Min Volume 24h'), '');
    fireEvent.changeText(getByPlaceholderText('Max Volume 24h'), '');

    // Assert
    expect(mockOnChangeFilter).toHaveBeenCalledTimes(4);
    expect(mockOnChangeFilter).toHaveBeenCalledWith('minPriceUsd', undefined);
    expect(mockOnChangeFilter).toHaveBeenCalledWith('maxPriceUsd', undefined);
    expect(mockOnChangeFilter).toHaveBeenCalledWith('minVolume24', undefined);
    expect(mockOnChangeFilter).toHaveBeenCalledWith('maxVolume24', undefined);
  });
});
