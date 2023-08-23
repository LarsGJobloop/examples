/**
 * Decorates a function so it only runs once each time window
 * Also known as throttling
 * @link [Decorator Pattern](https://blog.logrocket.com/understanding-javascript-decorators/)
 * 
 * Before trying to create these yourself do some reading
 * @link [MDN "this"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
 * 
 * @example
 * // Create a function that runs at most once a second
 * const throttled = throttle(
 *  () => console.log("Ran"),
 *  1000
 * )
 * 
 * // Only one of these will run
 * throttled()
 * throttled()
 * 
 * @param {Function} func function to throttle
 * @param {number} delay - size of window in milliseconds
 * @returns {Function}
 */
export function throttle(func, delay) {
  // Store the time of the last call
  let lastCall = 0;

  // Function that is returned
  // Using argument spreading to be able to return a function which can take a
  // variable amount of arguments (a variadic function)
  return function(...args) {
    // Get the current time
    const now = new Date().getTime();

    // Check if current time is greater than the delay
    if (!(now - lastCall >= delay)) return

    // Ensure the function gets called with the correct context and arguments
    const result = func.apply(this, args);

    // Update the timestamp
    lastCall = now;

    // Return any result from our function
    return result
  };
}

/**
 * Math function for taking a range of numbers and "scaling" (mapping)
 * it to a smaller or larger range
 * 
 * It's a simplified version of taking the 3D Earth and creating a 2D map.
 * 
 * Here we are just going from a 1D range of numbers to another 1D range of numbers
 * 
 * You can read  up on it here
 * @link [Wikipedia Map(Mathematics)](https://en.wikipedia.org/wiki/Map_(mathematics))
 * 
 * @example
 * // scaledValue is 5
 * const scaledValue = mapRange(50, 0, 100, 0, 10)
 * 
 * @example
 * // scaledValue is 50
 * const scaledValue = mapRange(5, 0, 10, 0, 100)
 * 
 * @param {number} value - The value we want to scale
 * @param {number} fromMin - Minimum value of from Range
 * @param {number} fromMax - Maximum value of from Range
 * @param {number} toMin - Minimum value of to Range
 * @param {number} toMax - Maximum value of to Range
 * @returns 
 */
export function mapRange(value, fromMin, fromMax, toMin, toMax) {
  // Clamp the value within the input range
  value = Math.min(Math.max(value, fromMin), fromMax);

  // Calculate the normalized position of the value in the input range
  const normalizedPosition = (value - fromMin) / (fromMax - fromMin);

  // Map the normalized position to the output range
  const mappedValue = normalizedPosition * (toMax - toMin) + toMin;

  return mappedValue;
}