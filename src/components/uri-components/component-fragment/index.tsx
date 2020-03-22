import { FunctionalComponent, h } from "preact";
import Component from "../component";

type Props = {
  value: string | undefined;
};

const ComponentFragment: FunctionalComponent<Props> = ({ value }) => {
  return <Component type="fragment" value={value} />;
};

export default ComponentFragment;
