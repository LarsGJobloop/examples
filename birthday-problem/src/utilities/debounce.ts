/**
 * Creates a debounced variation of a function
 *
 * @example
 * function expensiveFunction(input: string) {
 *  console.log(`Performing expensive calculation on ${input}`)
 * }
 *
 * const debouncedFunction = debounce(expensiveFunction, 1000)
 *
 * // Only the Bar invocation will be executed
 * debouncedFunction("Foo")
 * debouncedFunction("Bar")
 *
 * @example
 * // Arrow (Lambda) function
 * const debouncedFunction = debounce((input: string) => {
 *  console.log(`Performing expensive calculation on ${input}`)
 * }, 1000)
 *
 * // Only the Bar invocation will be executed
 * debouncedFunction("Foo")
 * debouncedFunction("Bar")
 *
 * A debounced function is a function that will execute
 * only after a certain time has passed since it's laste invocation.
 * It's useful in cases where you have a burst of inputs, but only want
 * to act on the last invocation.
 *
 * Examples includes
 * - user search input,
 * - mouse position
 * - window resizing.
 *
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 */
export function debounce<Func extends (...args: any[]) => void>(
  func: Func,
  delay: number
) {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  return function (this: ThisParameterType<Func>, ...args: Parameters<Func>) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
