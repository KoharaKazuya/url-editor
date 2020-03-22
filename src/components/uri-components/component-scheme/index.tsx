import { FunctionalComponent, h } from "preact";
import Component from "../component";

type Props = {
  value: string | undefined;
};

const ComponentScheme: FunctionalComponent<Props> = ({ value }) => {
  return <Component type="scheme" value={value} />;
};

export default ComponentScheme;
