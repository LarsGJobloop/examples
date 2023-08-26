import { useState, useMemo } from "react";
import * as createPrng from "../../utilities/prng";
import { generateArray } from "../../utilities/generateArray";
import type { CSSClasses } from "../../types";
import { mapMonth } from "../../utilities/mapMonth";

/**
 * Color map for the number of collisions
 */
const frequencyMap = {
  5: "bg-red-900",
  4: "bg-red-800",
  3: "bg-red-600",
  2: "bg-red-400",
  1: "bg-green-400",
  0: "bg-amber-100",
} as const;

interface GameProps {
  numberOfDays?: number;
}

/**
 * Birthday problem display
 */
export function Game({ numberOfDays = 365 }: GameProps) {
  const [persons, setPersons] = useState(1);
  const [seed, setSeed] = useState(1234);

  // Setup pseudo random number generator
  const prng = useMemo(() => createPrng.simpleLCG(seed), [seed]);

  // Create a calender with the birthdays
  const calendar = getBirthdaySet(persons, numberOfDays, prng);

  // Store the number of collisions in this calander
  const numberOfCollisions = calendar.reduce((accumulator, currentValue) =>
    currentValue > 1 ? accumulator + 1 : accumulator
  );

  function updatePersons(newNumber: number) {
    let validNumber = newNumber;

    if (newNumber < 0) {
      validNumber = 0;
    } else if (newNumber > numberOfDays) {
      validNumber = numberOfDays;
    }

    setPersons(validNumber);
  }

  function reroll() {
    setSeed(Date.now());
  }

  return (
    <div className="flex flex-col items-center">
      <header className="w-3/4">
        <div className="flex flex-col">
          <p>Number of days: {numberOfDays}</p>
          <p>
            Number of people:
            <input
              type="number"
              value={persons}
              onChange={(event) => updatePersons(Number(event.target.value))}
            />
          </p>
        </div>

        <div className="flex flex-col max-w-md gap-2 mb-2">
          <div className="flex flex-col">
            <input
              value={persons}
              onChange={(event) => setPersons(Number(event.target.value))}
              type="range"
              name="persons"
              id="persons"
              min={0}
              max={numberOfDays}
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              className="px-2 py-1 bg-orange-400 rounded shadow-lg hover:bg-orange-300"
              onClick={reroll}
            >
              Reroll
            </button>
            <p>Collisions in this set: {numberOfCollisions}</p>
          </div>
        </div>
      </header>

      <Calendar
        amount={numberOfDays}
        occupied={calendar}
        className="flex flex-wrap justify-center gap-10 mx-4"
      />
    </div>
  );
}

interface CalanderProps {
  amount: number;
  className?: CSSClasses;
  occupied: number[];
}

/**
 * List of multiple days
 */
function Calendar({ amount, occupied, className }: CalanderProps) {
  // Generate a list of boxes for each day
  const listOfDays = generateArray(amount, (index) => {
    return (
      <li key={index}>
        <DayBox collisions={occupied[index]} colorMap={frequencyMap} />
      </li>
    );
  });

  const daysOfMonth = mapMonth((name, days, startingDay) => {
    return (
      <li key={name}>
        <h3>{name}</h3>
        <ul className="flex flex-wrap max-w-xs gap-1">
          {listOfDays.slice(startingDay, startingDay + days)}
        </ul>
      </li>
    );
  });

  return <ul className={className ?? className}>{daysOfMonth}</ul>;
}

interface DayBoxProps {
  collisions: number;
  colorMap: { [key: number]: string };
}

/**
 * Displays a single day
 */
function DayBox({ collisions, colorMap }: DayBoxProps) {
  const clamped = Math.min(collisions, Object.keys(colorMap).length - 1);

  const color = colorMap[clamped];

  return (
    <div
      className={
        "grid w-8 h-8 text-xs rounded place-items-center  shadow-md border-slate-200 border " +
        color
      }
    >
      <span className="text-gray-600 select-none">{collisions}</span>
    </div>
  );
}

/**
 * Helper for generating a array with birthdays
 */
function getBirthdaySet(
  numberOfPersons: number,
  numberOfDays: number,
  prng: () => number
) {
  // Create an array representing each day
  const calander: number[] = new Array(numberOfDays).fill(0);
  // For each possible person give them a birthday
  for (let index = 0; index < numberOfPersons; index++) {
    const birthday = Math.floor(prng() * (numberOfDays - 1) + 1);
    calander[birthday]++;
  }

  return calander;
}
