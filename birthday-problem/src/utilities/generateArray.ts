/**
 * Returns an array populated with the return of the callback function
 *
 * @param amount - number of elements to generate
 * @param callback - function to create items for the array
 */
export function generateArray<T>(
  amount: number,
  callback: (index: number, array: T[]) => T
) {
  const array = new Array<T>(amount);

  for (let index = 0; index < amount; index++) {
    array[index] = callback(index, array);
  }

  return array;
}
