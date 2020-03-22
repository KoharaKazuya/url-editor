import { FunctionalComponent, h } from "preact";
import Component from "../component";

type Props = {
  value: string | number | undefined;
};

const ComponentPort: FunctionalComponent<Props> = ({ value: port }) => {
  const value = typeof port === "number" ? String(port) : port;
  return <Component type="port" value={value} />;
};

export default ComponentPort;
