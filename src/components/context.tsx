import { createContext, FunctionalComponent, h } from "preact";
import { useCallback, useContext, useState } from "preact/hooks";
import { parse } from "uri-js";
import { useHasMounted } from "./prerender";

const initialValue = {
  raw: "",
  parsed: parse(""),
  setRaw: (() => undefined) as (raw: string) => void,
};

const UriContext = createContext(initialValue);

export function useUriContext() {
  return useContext(UriContext);
}

export const UriContextProvider: FunctionalComponent = ({ children }) => {
  const uri = useUri();
  return <UriContext.Provider value={uri}>{children}</UriContext.Provider>;
};

function useUri() {
  const hasMounted = useHasMounted();

  const [raw, setRaw] = useState(
    () =>
      (typeof window !== "undefined" &&
        new URL(String(document.location)).searchParams.get("url")) ||
      ""
  );
  const setRawWrapped = useCallback(
    (raw: string) => {
      const v = raw.replace(/\r|\n/g, "");
      setRaw(v);

      const envUrl = new URL(String(document.location));
      if (v) {
        envUrl.searchParams.set("url", v);
      } else {
        envUrl.searchParams.delete("url");
      }
      history.replaceState(null, "", envUrl.toString());
    },
    [setRaw]
  );
  const parsed = parse(raw);

  return hasMounted ? { raw, parsed, setRaw: setRawWrapped } : initialValue;
}
