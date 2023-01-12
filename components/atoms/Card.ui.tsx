import { PropsWithChildren } from "react";
import { PropsWithClassName } from "types";

interface CardProps {
  small?: boolean;
}

export function Card({
  className,
  children,
  small = false,
}: PropsWithChildren<PropsWithClassName<CardProps>>) {
  return (
    <div
      className={`${
        className || ""
      } border border-slate-500/50 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg w-full ${
        small ? `p-3` : `p-6`
      }`}
    >
      {children}
    </div>
  );
}
