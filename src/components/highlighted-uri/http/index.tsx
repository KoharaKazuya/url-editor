import { Fragment, FunctionalComponent, h, JSX } from "preact";
import { URIComponents } from "uri-js";
import * as style from "./style.css";

const componentKeys = [
  "scheme",
  "userinfo",
  "host",
  "port",
  "path",
  "query",
  "fragment",
] as const;

type Props = {
  text: string;
  uri: URIComponents;
};

const Http: FunctionalComponent<Props> = ({ text, uri }) => {
  let remain = text;
  const elements: JSX.Element[] = [];

  const elementize = (key: string, value: string | number | undefined) => {
    if (value === undefined) return;
    const v = String(value);
    if (v === "") return;

    const index = remain.indexOf(v);
    if (index < 0) return;
    if (index > 0) elements.push(<Fragment>{remain.slice(0, index)}</Fragment>);
    elements.push(
      <span
        class={style.component}
        style={{ color: `var(--color-component-${key})` }}
      >
        {v}
      </span>
    );
    remain = remain.slice(index + v.length);
  };

  for (const key of componentKeys) {
    elementize(key, uri[key]);
  }

  // remain
  elements.push(<Fragment>{remain}</Fragment>);

  return <Fragment>{elements}</Fragment>;
};

export default Http;
