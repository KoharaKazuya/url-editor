import { FunctionalComponent, h } from "preact";
import Component from "../component";
import PathEditor from "./path-editor";

type Props = {
  value: string | undefined;
  onInput?: (value: string) => void;
};

const ComponentPath: FunctionalComponent<Props> = ({ value, onInput }) => {
  return (
    <Component type="path" value={value}>
      <PathEditor value={value} onInput={onInput} />
    </Component>
  );
};

export default ComponentPath;
