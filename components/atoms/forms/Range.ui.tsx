import { InputProps } from "./Input.ui";

export function Range({ id, label, controller }: InputProps) {
  const [value, setValue] = controller;
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        id={id}
        type="range"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        min="0"
        max="100"
        step="1"
        className="slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
}
