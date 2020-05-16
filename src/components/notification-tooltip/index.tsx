import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";

type Props = {
  class?: string;
};

const NotificationTooltip: FunctionalComponent<Props> = ({
  class: additionalClass,
  children,
}) => <div class={`${style.tooltip} ${additionalClass || ""}`}>{children}</div>;

export default NotificationTooltip;
