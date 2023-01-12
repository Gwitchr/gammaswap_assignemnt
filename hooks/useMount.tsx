import { useEffect, useState } from "react";

export function useMount(): boolean {
  const [render, setRender] = useState(false);
  useEffect(() => {
    setRender(true);
  }, []);

  return render;
}
