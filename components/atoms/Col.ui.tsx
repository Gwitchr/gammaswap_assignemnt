import { PropsWithChildren } from "react";
import { PropsWithClassName } from "types";

export function Col({
  children,
  className,
}: PropsWithChildren<PropsWithClassName<{}>>) {
  return <div className={`${className || ""}`}>{children}</div>;
}
