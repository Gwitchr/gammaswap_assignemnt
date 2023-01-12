import { ButtonHTMLAttributes, PropsWithChildren, forwardRef } from "react";
import { EColorVariants } from "types";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  btnColor?: keyof typeof EColorVariants;
  tag?: "a" | "button";
  external?: boolean;
  href?: string;
  isIcon?: boolean;
  outlineBackground?: string;
}

// dark schemes can be added
// dark:focus:ring-pink-200
const availableColorStyles = {
  [EColorVariants.default]: `ext-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium 
	rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none 
	dark:focus:ring-blue-800`,
  [EColorVariants.alternative]: `py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg 
	border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 
	dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white 
	dark:hover:bg-gray-700`,
  [EColorVariants.outline]: "",
  [EColorVariants.transparent]: "",
} as const;

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<IButtonProps>
>(function Button(
  {
    className,
    btnColor = "default",
    tag,
    external,
    children,
    href,
    isIcon,
    outlineBackground,
    ...attributes
  },
  ref
): JSX.Element {
  const elClasses = `${availableColorStyles[btnColor]} ${className ?? ""}`;

  const variableStyle = `${isIcon ? "px-3" : "px-5"}`;

  if (tag === "a") {
    const props = {
      ...(external &&
        tag === "a" && { target: "_blank", rel: "noopener noreferrer" }),
    };
    return (
      <a className={`${elClasses} ${variableStyle}`} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={`${elClasses} ${variableStyle}`}
      {...attributes}
      ref={ref}
    >
      <>{children}</>
    </button>
  );
});
