import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";

type Props = {
  message: string;
};

const Error: FunctionalComponent<Props> = ({ message }) => (
  <div class={style.card}>
    <div class={style.title}>URL Parse Error</div>
    <div class={style.message}>{message}</div>
  </div>
);

export default Error;
