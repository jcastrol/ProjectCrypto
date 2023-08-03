import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ColoredButton from '../../../../../src/app/ui/components/common/ColoredButton';

describe('ColoredButton', () => {
  const mockOnPress = jest.fn();
  const mockTitle = 'Press Me';
  const mockColor = 'blue';

  it('renders correctly with the provided title and color', () => {
    // Arrange & Act
    const {getByText } = render(
      <ColoredButton onPress={mockOnPress} title={mockTitle} color={mockColor} />
    );

    // Assert
    const button = getByText(mockTitle);
    expect(button).toBeDefined();
  });

  it('calls the onPress function when pressed', () => {
    // Arrange
    const { getByText } = render(
      <ColoredButton onPress={mockOnPress} title={mockTitle} color={mockColor} />
    );

    // Act
    const button = getByText(mockTitle);
    fireEvent.press(button);

    // Assert
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});