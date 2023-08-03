import { formatNumber } from "../../../src/app/utils/formatNumber";

describe('formatNumber', () => {
  it('should format number with two decimal places', () => {
    // Arrange
    const number = 123456.789;

    // Act
    const formattedNumber = formatNumber(number);

    // Assert
    expect(formattedNumber).toBe('123.456,79');
  });

  it('should format number with no decimal places', () => {
    // Arrange
    const number = 1000;

    // Act
    const formattedNumber = formatNumber(number);

    // Assert
    expect(formattedNumber).toBe('1.000,00');
  });

  it('should format number with no decimal part', () => {
    // Arrange
    const number = 42;

    // Act
    const formattedNumber = formatNumber(number);

    // Assert
    expect(formattedNumber).toBe('42,00');
  });
});