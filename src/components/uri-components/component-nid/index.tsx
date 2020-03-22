import { FunctionalComponent, h } from "preact";
import Component from "../component";

type Props = {
  value: string | undefined;
};

const ComponentNid: FunctionalComponent<Props> = ({ value }) => {
  return <Component type="nid" value={value} />;
};

export default ComponentNid;
