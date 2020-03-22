import { Fragment, FunctionalComponent, h } from "preact";
import { URIComponents } from "uri-js";
import Http from "./http";

type Props = {
  raw: string;
  parsed: URIComponents;
};

const HighlightedUri: FunctionalComponent<Props> = ({ raw, parsed }) => {
  switch (parsed.scheme) {
    case "http":
    case "https":
    case undefined: {
      return <Http text={raw} uri={parsed} />;
    }
    default: {
      return <Fragment>{raw}</Fragment>;
    }
  }
};

export default HighlightedUri;
