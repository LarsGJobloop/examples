/**
 * PRNG with support for seeding
 * Part of the Linear Congruential Generators family
 *
 * @link [Wikipedia LCG](https://en.wikipedia.org/wiki/Linear_congruential_generator)
 */
export function simpleLCG(seed: number) {
  let state = seed;

  return function () {
    state = (1664525 * state + 1013904223) % Math.pow(2, 32);
    return state / Math.pow(2, 32);
  };
}
