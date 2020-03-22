import { FunctionalComponent, h } from "preact";
import Component from "../component";

type Props = {
  value: string | undefined;
};

const ComponentBody: FunctionalComponent<Props> = ({ value }) => {
  return <Component type="body" value={value} />;
};

export default ComponentBody;
