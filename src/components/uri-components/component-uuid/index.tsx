import { FunctionalComponent, h } from "preact";
import Component from "../component";

type Props = {
  value: string | undefined;
};

const ComponentUuid: FunctionalComponent<Props> = ({ value }) => {
  return <Component type="uuid" value={value} />;
};

export default ComponentUuid;
