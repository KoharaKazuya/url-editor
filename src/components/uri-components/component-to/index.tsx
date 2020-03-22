import { FunctionalComponent, h } from "preact";
import Component from "../component";

type Props = {
  value: string[];
};

const ComponentTo: FunctionalComponent<Props> = ({ value: values }) => {
  const value = values.join(",");
  return <Component type="to" value={value} />;
};

export default ComponentTo;
