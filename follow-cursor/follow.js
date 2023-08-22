import { throttle } from "./utilities.js"

// ==================== Type definitions ====================

/**
 * The calling signature of our update functions
 * 
 * @callback UpdateFunction
 * @param {Element} element - The element to update
 * @param {{x: number, y: number}} position - Position of the mouse
 * @returns {void}
 */

/**
 * Option object
 * 
 * Often used to allow for extension after deployment,
 * without causing breakage in earlier versions
 * 
 * @typedef {Object} OptionObject
 * @property {number?} OptionObject.updateFrequency - How often the function should trigger in milliseconds
 */



// ==================== The function ====================

/**
 * Takes a list of elements and triggers the provided function
 * whenever the mouse moves.
 * 
 * You can pass in option to adjust behavior.
 * The defult update frequenzy is 60 times per second
 * 
 * @param {NodeListOf<Element>} elements 
 * @param {UpdateFunction} updateFunction
 * @param {OptionObject?} options
 * @returns - A function to clear out the event listners
 */
export function setup(elements, updateFunction, options) {
  // Config options
  const updateFrequency = options?.updateFrequency ? options.updateFrequency : (1000 / 60)

  /**
   * Array for storing our update functions
   * @type {((postition: {x: number, y: number}) => void)[]}
   */
  const callbacks = []
  
  // Create a new function for each element and store it
  elements.forEach(element => callbacks.push((position) => updateFunction(element, position)))

  const throttledFunction = throttle(
    (mouse) => {
      callbacks.forEach(callback => callback({x: mouse.x, y: mouse.y}))
    },
    updateFrequency
  )

  // Add the event listner
  document.addEventListener("mousemove", throttledFunction)

  // Return a method for removing the event listner
  return () => document.removeEventListener("mousemove", throttledFunction)
}