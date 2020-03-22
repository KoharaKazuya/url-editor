import { useLayoutEffect, useState } from "preact/hooks";

/**
 * for two pass rendering
 * @see https://joshwcomeau.com/react/the-perils-of-rehydration/
 */
export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useLayoutEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}
