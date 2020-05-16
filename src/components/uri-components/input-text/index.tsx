import { FunctionalComponent, h, JSX } from "preact";
import { useCallback } from "preact/hooks";
import * as style from "./style.css";

type Props = {
  value: string;
  onInput?: (value: string) => void;
  class?: string;
};

const InputText: FunctionalComponent<Props> = ({
  value,
  onInput: outerOnInput,
  class: additionalClass,
}) => {
  const onInput: JSX.GenericEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const v = event.currentTarget.value;
      if (outerOnInput) outerOnInput(v);
    },
    [outerOnInput]
  );
  return (
    <input
      type="text"
      value={value}
      onInput={onInput}
      class={`${style.input} ${additionalClass || ""}`}
    />
  );
};

export default InputText;
