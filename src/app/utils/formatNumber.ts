/**
 * The `formatNumber` function takes a number as input and returns a string representation of that
 * number with two decimal places.
 * @param {number} number - The `number` parameter is the number that you want to format.
 * @returns The function `formatNumber` returns a string representation of the input number with a
 * minimum of 2 decimal places and a maximum of 2 decimal places.
 */
export const formatNumber = (number: number): string => {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};