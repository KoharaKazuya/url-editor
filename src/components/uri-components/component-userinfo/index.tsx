import { FunctionalComponent, h } from "preact";
import Component from "../component";
import UserinfoEditor from "./userinfo-editor";

type Props = {
  value: string | undefined;
  onInput?: (value: string) => void;
};

const ComponentUserinfo: FunctionalComponent<Props> = ({ value, onInput }) => {
  return (
    <Component type="userinfo" value={value}>
      <UserinfoEditor value={value || ""} onInput={onInput} />
    </Component>
  );
};

export default ComponentUserinfo;
