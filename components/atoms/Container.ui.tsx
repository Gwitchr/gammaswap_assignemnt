import { PropsWithChildren } from "react";

interface IContainerProps {
  className?: string;
  fluid?: boolean;
}

export function Container({
  children,
  className,
  fluid,
}: PropsWithChildren<IContainerProps>): JSX.Element {
  return (
    <div
      className={`${className || ""} ${
        fluid ? "max-w-full" : "max-w-7xl px-6 py-4 md:px-8 lg:px-8"
      } container mx-auto`}
    >
      {children}
    </div>
  );
}
