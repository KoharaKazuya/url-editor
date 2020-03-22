import { FunctionalComponent, h } from "preact";
import Component from "../component";

type Props = {
  value: { [key: string]: string } | undefined;
};

const ComponentHeaders: FunctionalComponent<Props> = ({ value: headers }) => {
  const value = headers
    ? Object.entries(headers)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => `${k}=${v}`)
        .join("&")
    : undefined;
  return <Component type="headers" value={value} />;
};

export default ComponentHeaders;
