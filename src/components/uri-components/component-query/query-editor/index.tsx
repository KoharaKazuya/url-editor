import { Fragment, FunctionalComponent, h } from "preact";
import { useCallback } from "preact/hooks";
import ActionButton from "../../../action-button";
import InputText from "../../input-text";
import * as style from "./style.css";

type Props = {
  value: string;
  onInput?: (value: string) => void;
};

const QueryEditor: FunctionalComponent<Props> = ({ value, onInput }) => {
  const query = deserializeQuery(value);

  const onAppend = useCallback(() => {
    if (onInput) onInput(`${value}&`);
  }, [value, onInput]);

  return (
    <Fragment>
      {query.map(([k, v], index) => (
        <div key={`${query.length}__${index}`} class={style.entry}>
          <InputText
            class={style.key}
            value={k}
            onInput={(newKey) => {
              if (!onInput) return;
              const newQuery = [
                ...query.slice(0, index),
                [newKey, query[index][1]] as [string, string],
                ...query.slice(index + 1),
              ];
              onInput(serializeQuery(newQuery));
            }}
          />
          <InputText
            class={style.value}
            value={v}
            onInput={(newValue) => {
              if (!onInput) return;
              const newQuery = [
                ...query.slice(0, index),
                [query[index][0], newValue] as [string, string],
                ...query.slice(index + 1),
              ];
              onInput(serializeQuery(newQuery));
            }}
          />
          <ActionButton
            label="delete"
            icon="cancel-circle"
            class={style["remove-button"]}
            onClick={() => {
              if (!onInput) return;
              const newQuery = [
                ...query.slice(0, index),
                ...query.slice(index + 1),
              ];
              onInput(serializeQuery(newQuery));
            }}
          />
        </div>
      ))}
      <div>
        <ActionButton
          label="append"
          icon="plus"
          class={style["append-button"]}
          onClick={onAppend}
        />
      </div>
    </Fragment>
  );
};

export default QueryEditor;

type Query = [string, string][];

function serializeQuery(query: Query): string {
  return query
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

function deserializeQuery(query: string): Query {
  return query
    .split("&")
    .map((entry) =>
      entry.split("=").map((x) => {
        try {
          return decodeURIComponent(x);
        } catch {
          return x;
        }
      })
    )
    .map(([k, v]) => [k, v || ""]);
}
