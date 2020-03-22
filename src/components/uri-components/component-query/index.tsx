import { FunctionalComponent, h } from "preact";
import Component from "../component";
import QueryEditor from "./query-editor";

type Props = {
  value: string | undefined;
  onInput?: (value: string) => void;
};

const ComponentQuery: FunctionalComponent<Props> = ({ value, onInput }) => {
  return (
    <Component type="query" value={value}>
      <QueryEditor value={value || ""} onInput={onInput} />
    </Component>
  );
};

export default ComponentQuery;
