/**
 * Calls a defined callback function on each month of the year, and returns an array that contains the results.
 *
 * Does not take leap years into account
 *
 * @example
 * const monthData = mapMonth((monthName, days, startingDay) => {
 *  return `${monthName} has ${days} days and the first days is number ${startingDay} of the year`
 * })
 *
 * @param callback A function that accepts up to three arguments. The mapMonth method calls the callback function one time for each month of the year.
 */
export function mapMonth<T>(
  callback: (monthName: string, daysInMonth: number, startingDay: number) => T
): T[] {
  const monthList = [
    { name: "January", days: 31 },
    { name: "February", days: 28 },
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 },
  ];

  let currentDays = 0;

  const month = monthList.map(({ name, days }) => {
    const currentMonth = callback(name, days, currentDays);

    currentDays += days;

    return currentMonth;
  });

  return month;
}
