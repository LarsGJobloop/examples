import { useState, useMemo } from "react";
import * as prng from "../../utilities/prng";
import { generateArray } from "../../utilities/generateArray";

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
  numberOfDays?: number;
}

/**
 * Container component
 */
export function Game({ numberOfDays = 365 }: GameProps) {
  const [persons, setPersons] = useState(1);
  const [seed, setSeed] = useState(1234);

  // Setup a PRNG with our seed
  const randomGenerator = prng.simpleLCG(seed);

  // Create an array representing each day
  const days = new Array(numberOfDays).fill(0);
  // For each possible person give them a birthday
  for (let index = 0; index < persons; index++) {
    const birthday = Math.floor(randomGenerator() * (numberOfDays - 1) + 1);
    days[birthday]++;
  }

  function reroll() {
    setSeed(Date.now());
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-3/4">
        <div className="flex flex-col">
          <p>Number of days: {numberOfDays}</p>
          <p>Number of people: {persons}</p>
        </div>

        <div className="flex flex-col gap-2 mb-2">
          <InputRange
            value={persons}
            onChange={(newValue) => setPersons(newValue)}
            min={0}
            max={numberOfDays}
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
      </div>

      <div className="max-w-5xl px-4">
        <Calander amount={numberOfDays} occupied={days} />
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
  label?: string;
}

/**
 * A simpler interface for the input range
 */
function InputRange({ value, onChange, min, max, label }: InputRangeProps) {
  return (
    <div className="flex flex-col">
      <input
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        type="range"
        name="persons"
        id="persons"
        min={min}
        max={max}
      />
      {label ? <label htmlFor="persons">{label}</label> : null}
    </div>
  );
}
