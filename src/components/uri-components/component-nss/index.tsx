import { FunctionalComponent, h } from "preact";
import Component from "../component";

type Props = {
  value: string | undefined;
};

const ComponentNss: FunctionalComponent<Props> = ({ value }) => {
  return <Component type="nss" value={value} />;
};

export default ComponentNss;
