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
export function InputRange({
  value,
  onChange,
  min,
  max,
  label,
}: InputRangeProps) {
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
