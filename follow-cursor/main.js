// ==================== Configs ====================
/**
 * Class to apply effect to
 */
const selector = ".follow"
/**
 * How often to update in milliseconds
 */
const updateFrequency = 1000 / 1
/**
 * How many degrees of movement
 */
const amplitude = 80



// ==================== Setup ====================

const watched = document.querySelectorAll(selector)

/**
 * @description The calling signature of our update functions
 * 
 * @callback UpdateCallback
 * @param {{x: number, y: number}} position - Position of the mouse
 * @returns {void}
 */

/**
 * Array for storing our update functions
 * 
 * @type {UpdateCallback[]}
 */
const callbacks = []

// Create a new function for each element and store it
watched.forEach(element => callbacks.push(
  (position) => {
    // TODO: Actually figure out how to get the correct angle

    // Compute angle between element and mouse
    const difference = position.x - element.getBoundingClientRect().x

    const angle = mapRange(position.x, 0, window.innerWidth, -amplitude, amplitude)

    // set transform to new angle
    element.style.transform = `rotate3d(0, 1, 0, ${angle}deg)`
  }
))

/**
 * The way this is setup this function will run
 * whenever the mouse moves.
 * 
 * And each time it does we need to go through every element
 * do some calculations and then we need to
 * update the DOM with the new information.
 * 
 * Fair to say, this can be a lot of work if we have multiple elements.
 * While the calculations themself are not that expensive,
 * the DOM updates are.
 * 
 * Hence we have created a mechanism for limiting the amount
 * of times this runs each second.
 */
const throttledFunction = throttle(
  (mouse) => {
    
    callbacks.forEach(callback => callback({x: mouse.x, y: mouse.y}))
  },
  updateFrequency
)

document.addEventListener("mousemove", (mouse) => throttledFunction(mouse))



// ========================= Helpers =========================

/**
 * Decorates a function so it only runs once each time window
 * Also known as throttling
 * 
 * Before trying to create these yourself do some reading
 * @link [MDN this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
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
 * @returns 
 */
function throttle(func, delay) {
  // Store the time of the last call
  let lastCall = 0;

  // Function that is returned
  return (...arguments) => {
    // Get the current time
    const now = new Date().getTime();

    // Check if current time is greater than the delay
    if (!(now - lastCall >= delay)) return

    // Ensure the function gets called with the correct context and arguments
    func.apply(this, arguments);

    // Update the timestamp
    lastCall = now;
  };
}

/**
 * Mathy function for taking a range of numbers and "scaling" (mapping)
 * it to a smaller or larger range
 * 
 * You can read  up on it here
 * @link [Wikipedia Map(Mathematics)](https://en.wikipedia.org/wiki/Map_(mathematics))
 * 
 * @param {number} value 
 * @param {number} fromMin 
 * @param {number} fromMax 
 * @param {number} toMin 
 * @param {number} toMax 
 * @returns 
 */
function mapRange(value, fromMin, fromMax, toMin, toMax) {
  // Clamp the value within the input range
  value = Math.min(Math.max(value, fromMin), fromMax);

  // Calculate the normalized position of the value in the input range
  const normalizedPosition = (value - fromMin) / (fromMax - fromMin);

  // Map the normalized position to the output range
  const mappedValue = normalizedPosition * (toMax - toMin) + toMin;

  return mappedValue;
}