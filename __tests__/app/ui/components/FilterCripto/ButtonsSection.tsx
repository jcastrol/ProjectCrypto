import { fireEvent, render } from "@testing-library/react-native";
import { ButtonsSection } from "../../../../../src/app/ui/components/FilterCripto";

describe('ButtonsSection', () => {
  it('renders correctly', () => {
    // Arrange
    const mockOnApplyFilters = jest.fn();
    const mockOnCancel = jest.fn();

    // Act
    const { getByText } = render(
      <ButtonsSection onApplyFilters={mockOnApplyFilters} onCancel={mockOnCancel} />
    );

    // Assert
    const applyButton = getByText('Apply Filters');
    const closeButton = getByText('Close');
    expect(applyButton).toBeDefined();
    expect(closeButton).toBeDefined();
  });

  it('calls onApplyFilters function when Apply Filters button is pressed', () => {
    // Arrange
    const mockOnApplyFilters = jest.fn();
    const mockOnCancel = jest.fn();
    const { getByText } = render(
      <ButtonsSection onApplyFilters={mockOnApplyFilters} onCancel={mockOnCancel} />
    );

    // Act
    const applyButton = getByText('Apply Filters');
    fireEvent.press(applyButton);

    // Assert
    expect(mockOnApplyFilters).toHaveBeenCalledTimes(1);
    expect(mockOnCancel).not.toHaveBeenCalled();
  });

  it('calls onCancel function when Close button is pressed', () => {
    // Arrange
    const mockOnApplyFilters = jest.fn();
    const mockOnCancel = jest.fn();
    const { getByText } = render(
      <ButtonsSection onApplyFilters={mockOnApplyFilters} onCancel={mockOnCancel} />
    );

    // Act
    const closeButton = getByText('Close');
    fireEvent.press(closeButton);

    // Assert
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    expect(mockOnApplyFilters).not.toHaveBeenCalled();
  });
});






