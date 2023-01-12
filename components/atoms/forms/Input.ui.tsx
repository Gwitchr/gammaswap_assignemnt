import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

type StringNumber = string | number;

export interface InputProps extends Partial<HTMLInputElement> {
  label: string;
  id: string;
  icon?: FontAwesomeIconProps["icon"];
  placeholder?: string;
  controller: [StringNumber, (val: StringNumber) => void];
  labelClassName?: string;
}

export function Input({
  label,
  id,
  icon,
  placeholder,
  type,
  controller,
  labelClassName,
}: InputProps) {
  const [value, setValue] = controller;
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
          labelClassName || ""
        }`}
      >
        {label}
      </label>
      <div className="relative mb-6">
        {icon ? (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FontAwesomeIcon className="w-4" icon={icon} />
          </div>
        ) : null}
        <input
          type={type}
          onChange={(e) => setValue(e.target.value)}
          id={id}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          value={value}
        />
      </div>
    </div>
  );
}
