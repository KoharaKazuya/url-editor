import * as clipboard from "clipboard-polyfill";
import { FunctionalComponent, h } from "preact";
import { render } from "preact-render-to-string";
import { useCallback, useEffect, useState } from "preact/hooks";
import ActionButton from "../action-button";
import ContentEditable from "../content-editable";
import { useUriContext } from "../context";
import CopyNotificator from "../copy-notificator";
import HighlightedUri from "../highlighted-uri";
import Icon from "../icon";
import { useHasMounted } from "../prerender";
import * as style from "./style.css";

const UriInputBox: FunctionalComponent = () => {
  const { raw: uri, parsed, setRaw: setUri } = useUriContext();

  const handleHtmlChange = useHandleHtmlChange(uri, setUri);
  const visitable =
    !parsed.error &&
    (parsed.scheme === "http" || parsed.scheme === "https") &&
    (parsed.reference === "absolute" || parsed.reference === "uri");
  const [copy, showNotification] = useCopy(uri);
  const paste = usePaste(setUri);
  const isPasteSupported = useIsPasteSupported();

  return (
    <div class={style.container}>
      <ContentEditable
        html={render(<HighlightedUri raw={uri} parsed={parsed} />)}
        onChange={handleHtmlChange}
        id="url-text"
        class={style.box}
      />
      {visitable ? (
        <a
          href={uri}
          target="_blank"
          rel="noopener noreferrer"
          class={style["visit-link"]}
          aria-label="visit"
        >
          <Icon icon="new-tab" size={16} />
        </a>
      ) : (
        <ActionButton
          label="visit"
          icon="new-tab"
          class={style["visit-button"]}
          disabled
        />
      )}
      {!isPasteSupported || uri ? (
        <ActionButton
          label="copy"
          icon="copy"
          class={style["copy-button"]}
          onClick={copy}
        />
      ) : (
        <ActionButton
          label="paste"
          icon="clipboard"
          class={style["copy-button"]}
          onClick={paste}
        />
      )}
      {showNotification ? <CopyNotificator /> : null}
    </div>
  );
};

export default UriInputBox;

function useHandleHtmlChange(uri: string, setUri: (raw: string) => void) {
  return useCallback(
    (text: string) => {
      if (text !== uri) setUri(text);
    },
    [uri, setUri]
  );
}

function useCopy(uri: string) {
  const [shows, setShows] = useState<number[]>([]);

  const copy = useCallback(() => {
    clipboard
      .writeText(uri)
      .then(() => {
        const id = Math.random();
        setShows((state) => [...state, id]);
        setTimeout(() => {
          setShows((state) => state.filter((s) => s !== id));
        }, 1000);
      })
      .catch((e) => {
        console.error(e);
        alert(e);
      });
  }, [uri, setShows]);
  const showNotification = shows.length > 0;

  return [copy, showNotification] as const;
}

function usePaste(setUri: (raw: string) => void) {
  return useCallback(() => {
    navigator.clipboard
      .readText()
      .then((text) => {
        setUri(text);
      })
      .catch((e) => {
        console.error(e);
        alert(e);
      });
  }, [setUri]);
}

function useIsPasteSupported() {
  const hasMounted = useHasMounted();

  const [support, setSupport] = useState(false);
  useEffect(() => {
    if (!hasMounted) return;
    if (navigator.clipboard && navigator.clipboard.readText instanceof Function)
      setSupport(true);
  }, [hasMounted]);

  return support;
}
