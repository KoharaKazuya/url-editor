import { FunctionalComponent, h } from "preact";
import { useCallback } from "preact/hooks";
import { serialize, URIComponents } from "uri-js";
import { MailtoComponents } from "uri-js/dist/esnext/schemes/mailto";
import { URNComponents } from "uri-js/dist/esnext/schemes/urn";
import { UUIDComponents } from "uri-js/dist/esnext/schemes/urn-uuid";
import { useUriContext } from "../context";
import ComponentBody from "./component-body";
import ComponentFragment from "./component-fragment";
import ComponentHeaders from "./component-headers";
import ComponentHost from "./component-host";
import ComponentNid from "./component-nid";
import ComponentNss from "./component-nss";
import ComponentPath from "./component-path";
import ComponentPort from "./component-port";
import ComponentQuery from "./component-query";
import ComponentScheme from "./component-scheme";
import ComponentSubject from "./component-subject";
import ComponentTo from "./component-to";
import ComponentUserinfo from "./component-userinfo";
import ComponentUuid from "./component-uuid";
import Error from "./error";

const UriComponents: FunctionalComponent = () => {
  const { parsed, setRaw } = useUriContext();

  if (parsed.error) return <Error message={parsed.error} />;
  switch (parsed.scheme) {
    case "mailto": {
      const c = parsed as MailtoComponents;
      return (
        <div>
          <ComponentScheme value={c.scheme} />
          <ComponentTo value={c.to} />
          <ComponentHeaders value={c.headers} />
          <ComponentSubject value={c.subject} />
          <ComponentBody value={c.body} />
        </div>
      );
    }
    case "urn": {
      if (!("uuid" in parsed)) {
        const c = parsed as URNComponents;
        return (
          <div>
            <ComponentScheme value={c.scheme} />
            <ComponentNid value={c.nid} />
            <ComponentNss value={c.nss} />
          </div>
        );
      } else {
        const c = parsed as UUIDComponents;
        return (
          <div>
            <ComponentScheme value={c.scheme} />
            <ComponentNid value={c.nid} />
            <ComponentUuid value={c.uuid} />
          </div>
        );
      }
    }
    default: {
      const onUserinfoInput = useOnUserinfoInput(parsed, setRaw);
      const onHostInput = useOnHostInput(parsed, setRaw);
      const onPathInput = useOnPathInput(parsed, setRaw);
      const onQueryInput = useOnQueryInput(parsed, setRaw);

      const c = parsed;
      return (
        <div>
          <ComponentScheme value={c.scheme} />
          <ComponentUserinfo value={c.userinfo} onInput={onUserinfoInput} />
          <ComponentHost value={c.host} onInput={onHostInput} />
          <ComponentPort value={c.port} />
          <ComponentPath value={c.path} onInput={onPathInput} />
          <ComponentQuery value={c.query} onInput={onQueryInput} />
          <ComponentFragment value={c.fragment} />
        </div>
      );
    }
  }
};

export default UriComponents;

function useOnUserinfoInput(
  parsed: URIComponents,
  setRaw: (raw: string) => void
) {
  return useCallback(
    (userinfo: string) => {
      const newUri = { ...parsed, userinfo };
      setRaw(serialize(newUri));
    },
    [parsed, setRaw]
  );
}

function useOnHostInput(parsed: URIComponents, setRaw: (raw: string) => void) {
  return useCallback(
    (host: string) => {
      const newUri = { ...parsed, host };
      setRaw(serialize(newUri));
    },
    [parsed, setRaw]
  );
}

function useOnPathInput(parsed: URIComponents, setRaw: (raw: string) => void) {
  return useCallback(
    (path: string) => {
      const newUri = { ...parsed, path };
      setRaw(serialize(newUri));
    },
    [parsed, setRaw]
  );
}

function useOnQueryInput(parsed: URIComponents, setRaw: (raw: string) => void) {
  return useCallback(
    (query: string) => {
      const newUri = { ...parsed, query };
      setRaw(serialize(newUri));
    },
    [parsed, setRaw]
  );
}
