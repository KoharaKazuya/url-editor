import { FunctionalComponent, h } from "preact";
import NotificationTooltip from "../notification-tooltip";
import * as style from "./style.css";

const CopyNotificator: FunctionalComponent = () => (
  <NotificationTooltip class={style.tooltip}>copied!</NotificationTooltip>
);

export default CopyNotificator;
