import { FunctionalComponent, h } from "preact";
import InputText from "../../input-text";
import * as style from "./style.css";

type Props = {
  value: string;
  onInput?: (value: string) => void;
};

const HostEditor: FunctionalComponent<Props> = ({ value, onInput }) => {
  return <InputText value={value} onInput={onInput} class={style.input} />;
};

export default HostEditor;
