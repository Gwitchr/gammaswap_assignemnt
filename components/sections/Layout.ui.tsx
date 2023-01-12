import { PropsWithChildren } from "react";
import { Nav } from "components/molecules";

export function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
