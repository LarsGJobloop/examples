import { useState, useMemo } from "react";

/**
 * Coloring based on how many collisions
 */
const frequencyMap = {
  5: "bg-red-900",
  4: "bg-red-800",
  3: "bg-red-600",
  2: "bg-red-400",
  1: "bg-green-400",
  0: "bg-red-50",
};

interface GameProps {
  numbers?: number;
}

/**
 * Container component
 */
export function Game({ numbers = 365 }: GameProps) {
  const [persons, setPersons] = useState(1);
  const [seed, setSeed] = useState(1234);

  // Setup a simple PRNG that supports seeding
  const prng = simpleLCG(seed);

  // Create an array representing each day
  const days = new Array(numbers).fill(0);

  // For each possible person give them a birthday
  for (let index = 0; index < persons; index++) {
    const birthday = Math.floor(prng() * (numbers - 1) + 1);
    days[birthday]++;
  }

  function reroll() {
    setSeed(Date.now());
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <p>Number of people: {persons}</p>
        <p>Number of days: {numbers}</p>
      </div>

      <div className="flex flex-col items-center gap-2 mb-2">
        <InputRange
          value={persons}
          onChange={(newValue) => setPersons(newValue)}
          min={0}
          max={numbers}
        />

        <div className="flex gap-2">
          <button
            className="px-2 py-1 bg-orange-400 rounded shadow-lg hover:bg-orange-300"
            onClick={reroll}
          >
            Reroll
          </button>
        </div>
      </div>

      <div className="px-4">
        <Calander amount={numbers} occupied={days} />
      </div>
    </div>
  );
}

interface CalanderProps {
  amount: number;
  occupied: number[];
}

/**
 * Contains a list of boxes
 */
function Calander({ amount, occupied }: CalanderProps) {
  const openings = useMemo(
    () =>
      generateArray(amount, (index) => {
        return (
          <DayBox
            key={index}
            collisions={occupied[index]}
            colorMap={frequencyMap}
          />
        );
      }),
    [amount, occupied]
  );

  return <ul className="flex flex-wrap gap-1">{openings}</ul>;
}

interface DayBoxProps {
  collisions: number;
  colorMap: { [key: number]: string };
}

/**
 * Simple box
 */
function DayBox({ collisions, colorMap }: DayBoxProps) {
  const clamped = Math.min(collisions, Object.keys(colorMap).length - 1);

  const color = colorMap[clamped] ? colorMap[clamped] : "bg-amber-200";

  return (
    <li
      onClick={() =>
        console.log(
          `Number of birthdays: ${collisions}\nClamped value: ${clamped}`
        )
      }
      className={
        "grid w-5 h-5 text-xs rounded place-items-center  shadow-md border-slate-200 border " +
        color
      }
    >
      <span className="text-gray-600 select-none">{collisions}</span>
    </li>
  );
}

interface InputRangeProps {
  value: number;
  onChange: (newValue: number) => void;
  min: number;
  max: number;
}

/**
 * A nicer interface for the input range
 */
function InputRange({ value, onChange, min, max }: InputRangeProps) {
  return (
    <div className="flex flex-col max-w-xl">
      <input
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        type="range"
        name="persons"
        id="persons"
        min={min}
        max={max}
      />
      <label htmlFor="persons">Number of Persons</label>
    </div>
  );
}

/**
 * Returns an array populated with the return of the callback function
 *
 * @param amount - number of elements to generate
 * @param callback - function to create items for the array
 */
function generateArray<T>(
  amount: number,
  callback: (index: number, array: T[]) => T
) {
  const array = new Array<T>(amount);

  for (let index = 0; index < amount; index++) {
    array[index] = callback(index, array);
  }

  return array;
}

/**
 * PRNG with support for seeding
 * Part of the Linear Congruential Generators
 *
 * @link [Wikipedia LCG](https://en.wikipedia.org/wiki/Linear_congruential_generator)
 */
function simpleLCG(seed: number) {
  let state = seed;

  return function () {
    state = (1664525 * state + 1013904223) % Math.pow(2, 32);
    return state / Math.pow(2, 32);
  };
}
