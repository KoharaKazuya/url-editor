import { FunctionalComponent, h, JSX } from "preact";
import Icon from "../icon";
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
  disabled,
}) => (
  <button
    type="button"
    class={`${style.button} ${additionalClass || ""}`}
    aria-label={label}
    onClick={onClick}
    disabled={disabled}
  >
    <Icon icon={icon} size={16} />
  </button>
);

export default ActionButton;
