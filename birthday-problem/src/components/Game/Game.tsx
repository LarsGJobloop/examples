import { useState, useMemo } from "react";
import * as createPrng from "../../utilities/prng";
import { generateArray } from "../../utilities/generateArray";
import type { CSSClasses } from "../../types";
import { mapMonth } from "../../utilities/mapMonth";

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
  const calendar = generateBirthdayDistribution(persons, numberOfDays, prng);

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
        totalDays={numberOfDays}
        birthdaysByDay={calendar}
        className="flex flex-wrap justify-center gap-10 mx-4"
      />
    </div>
  );
}

// Color map for the number of birthday collisions
const frequencyMap = {
  5: "bg-red-900",
  4: "bg-red-800",
  3: "bg-red-600",
  2: "bg-red-400",
  1: "bg-green-400",
  0: "bg-amber-100",
} as const;

interface CalendarProps {
  /**
   * Days to generate
   */
  totalDays: number;
  /**
   * A list representing the distribution of birthdays
   */
  birthdaysByDay: number[];
  className?: CSSClasses;
}

/**
 * A calander component displaying a number of days and how many birthdays are
 * on that day, grouped by month
 */
function Calendar({ totalDays, birthdaysByDay, className }: CalendarProps) {
  // Generate a list of boxes for each day and fill it with birthdays
  const listOfDays = generateArray(totalDays, (index) => {
    return (
      <li key={index}>
        <DayBox birthdays={birthdaysByDay[index]} colorMap={frequencyMap} />
      </li>
    );
  });

  // Divide the days up by month
  const daysOfMonth = mapMonth((name, days, startingDay) => {
    return (
      <li key={name}>
        <h3>{name}</h3>
        <ol className="flex flex-wrap max-w-xs gap-1">
          {listOfDays.slice(startingDay, startingDay + days)}
        </ol>
      </li>
    );
  });

  return <ol className={className ?? className}>{daysOfMonth}</ol>;
}

interface DayBoxProps {
  /**
   * Number of birthdays on this day
   */
  birthdays: number;
  /**
   * A mapping of number of birthdays to a css class representing colors
   */
  colorMap: { [key: number]: CSSClasses };
}

/**
 * Displays a single day along with color coded number of birthdays on that day
 */
function DayBox({ birthdays, colorMap }: DayBoxProps) {
  // Clamp birthdays to range of colorMap
  const clamped = Math.min(birthdays, Object.keys(colorMap).length - 1); // Birthdays can be zero, Object.length starts at 1
  const color = colorMap[clamped];

  return (
    <div
      className={`grid w-8 h-8 text-xs rounded place-items-center  shadow-md border-slate-200 border ${color}`}
    >
      <span className="text-gray-600 select-none">{birthdays}</span>
    </div>
  );
}

/**
 * Generates a list of days representing the distribution of birthdays across days
 *
 * @param numberOfPersons Total number of peoples
 * @param numberOfDays Total number of days
 * @param randomGenerator A function that generates random numbers between 0 and 1
 * @returns {number[]} An array representing the number of birthdays on each day
 *
 * @example
 * // Birthdays for 10 people spread across 31 days
 * const birthdaysInJanuary = getBirthdaySet(10, 30, Math.random)
 * console.log(birthdaysInJanuary)
 */
function generateBirthdayDistribution(
  numberOfPersons: number,
  numberOfDays: number,
  randomGenerator: () => number
) {
  // Create an array representing each day
  const calander: number[] = new Array(numberOfDays).fill(0);
  // For each possible person give them a birthday
  for (let index = 0; index < numberOfPersons; index++) {
    const birthday = Math.floor(
      Math.abs(randomGenerator()) * (numberOfDays - 1)
    );
    calander[birthday]++;
  }

  return calander;
}
