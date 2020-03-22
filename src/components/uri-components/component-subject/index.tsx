import { FunctionalComponent, h } from "preact";
import Component from "../component";

type Props = {
  value: string | undefined;
};

const ComponentSubject: FunctionalComponent<Props> = ({ value }) => {
  return <Component type="subject" value={value} />;
};

export default ComponentSubject;
