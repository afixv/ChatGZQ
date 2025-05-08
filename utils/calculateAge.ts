/**
 * Utility function to calculate the age in months based on the given birth date and optional comparison date.
 * @param birthDate - The birth date of the individual as a string (e.g., "YYYY-MM-DD").
 * @param comparisonDate - Optional comparison date as a string (e.g., "YYYY-MM-DD"). Defaults to the current date.
 * @returns Age in months as a number.
 */
export function calculateAgeInMonths(
  birthDate: string,
  comparisonDate?: string,
): number {
  const birthDateObj = new Date(birthDate);
  const comparisonDateObj = comparisonDate
    ? new Date(comparisonDate)
    : new Date();

  const birthYear = birthDateObj.getFullYear();
  const birthMonth = birthDateObj.getMonth();

  const comparisonYear = comparisonDateObj.getFullYear();
  const comparisonMonth = comparisonDateObj.getMonth();

  return (comparisonYear - birthYear) * 12 + (comparisonMonth - birthMonth);
}
