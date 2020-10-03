import * as clipboard from "clipboard-polyfill";
import { FunctionalComponent, h } from "preact";
import { useCallback, useState } from "preact/hooks";
import ActionButton from "../../action-button";
import CopyNotificator from "../../copy-notificator";
import * as style from "./style.css";

const componentKeys = [
  "scheme",
  "userinfo",
  "host",
  "port",
  "path",
  "query",
  "fragment",
];

type Props = {
  type: string;
  value: string | undefined;
};

const Component: FunctionalComponent<Props> = ({ type, value, children }) => {
  const [expansion, toggleExpansion] = useExpansion(type);
  const [copy, showNotification] = useCopy(value || "");
  const color = componentKeys.includes(type) ? type : "other";

  if (!value) return null;
  return (
    <div id={type} class={style.component}>
      <div class={style["component-header"]}>
        <div
          class={style.type}
          style={{ background: `var(--color-component-${color})` }}
        >
          {type}
        </div>
        <div class={style.value}>{value}</div>
        <ActionButton
          label="copy"
          icon="copy"
          class={style["copy-button"]}
          onClick={copy}
        />
        {showNotification ? <CopyNotificator /> : null}
      </div>
      {children ? (
        <div class={style["component-content"]}>
          <div
            class={`${style["component-detail"]} ${
              expansion ? style.expansion : ""
            }`}
          >
            <div class={style["component-detail-wrapper"]}>{children}</div>
          </div>
          <ActionButton
            label={expansion ? "collapse" : "expand"}
            icon={`circle-${expansion ? "up" : "down"}`}
            class={style["expand-button"]}
            onClick={toggleExpansion}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Component;

const initialHash = location.hash;

function useExpansion(type: string) {
  const [expansion, setExpansion] = useState(`#${type}` === initialHash);

  const toggleExpansion = useCallback(() => {
    const newExpansion = !expansion;
    setExpansion(newExpansion);

    const url = new URL(String(document.location));
    url.hash = newExpansion ? `#${type}` : "";
    history.replaceState(null, "", url.toString());
  }, [expansion, setExpansion, type]);

  return [expansion, toggleExpansion] as const;
}

function useCopy(value: string) {
  const [shows, setShows] = useState<number[]>([]);

  const copy = useCallback(() => {
    clipboard
      .writeText(value)
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
  }, [value, setShows]);
  const showNotification = shows.length > 0;

  return [copy, showNotification] as const;
}
