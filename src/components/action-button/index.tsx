import { FunctionalComponent, h, JSX } from "preact";
import * as style from "./style.css";

type Props = {
  label: string;
  icon: string;
  class?: string;
  onClick?: JSX.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const ActionButton: FunctionalComponent<Props> = ({
  label,
  icon,
  class: additionalClass,
  onClick,
  disabled
}) => (
  <button
    type="button"
    class={`${style.button} ${additionalClass || ""}`}
    aria-label={label}
    onClick={onClick}
    disabled={disabled}
  >
    <i class={icon} aria-hidden="true" />
  </button>
);

export default ActionButton;
