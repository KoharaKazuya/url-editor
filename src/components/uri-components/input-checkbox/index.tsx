import { FunctionalComponent, h, JSX } from "preact";
import { useCallback } from "preact/hooks";
import * as style from "./style.css";

type Props = {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

const InputCheckbox: FunctionalComponent<Props> = ({
  label,
  checked,
  onChange: outerOnChange,
}) => {
  const onChange: JSX.GenericEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (outerOnChange) outerOnChange(event.currentTarget.checked);
    },
    [outerOnChange]
  );

  return (
    <label class={`${style.label} ${checked ? style.checked : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        class={style.input}
      />
      <span class={style.text}>{label}</span>
    </label>
  );
};

export default InputCheckbox;
