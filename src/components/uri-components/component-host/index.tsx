import { FunctionalComponent, h } from "preact";
import { useCallback } from "preact/hooks";
import { toASCII, toUnicode } from "punycode";
import Component from "../component";
import HostEditor from "./host-editor";

type Props = {
  value: string | undefined;
  onInput?: (value: string) => void;
};

const ComponentHost: FunctionalComponent<Props> = ({
  value: encodedValue,
  onInput: outerOnInput,
}) => {
  const [value, onInput] = useOnInput(encodedValue, outerOnInput);
  return (
    <Component type="host" value={encodedValue}>
      <HostEditor value={value} onInput={onInput} />
    </Component>
  );
};

export default ComponentHost;

function useOnInput(
  outerValue: string | undefined,
  outerOnInput: ((value: string) => void) | undefined
) {
  let value = "";
  try {
    value = toUnicode(outerValue || "");
  } catch {}
  const onInput = useCallback(
    (value: string) => {
      if (outerOnInput) outerOnInput(toASCII(value));
    },
    [outerOnInput]
  );
  return [value, onInput] as const;
}
