import { Fragment, FunctionalComponent, h } from "preact";
import { useCallback } from "preact/hooks";
import ActionButton from "../../../action-button";
import InputCheckbox from "../../input-checkbox";
import InputText from "../../input-text";
import SortableList from "./sortable-list";
import * as style from "./style.css";

type Props = {
  value: string | undefined;
  onInput?: (value: string) => void;
};

const PathEditor: FunctionalComponent<Props> = ({ value, onInput }) => {
  const [entries, leadingSlash, trailingSlash] = destructEntries(value);
  const constructEntries = useConstructEntries(onInput);
  const setLeadingSlash = useSetLeadingSlash(
    entries,
    trailingSlash,
    constructEntries
  );
  const setTrailingSlash = useSetTrailingSlash(
    entries,
    leadingSlash,
    constructEntries
  );
  const replaceEntries = (replacer: (entries: string[]) => string[]) =>
    constructEntries(replacer(entries), leadingSlash, trailingSlash);
  const onSort = useOnSort(replaceEntries);
  const onAppend = useOnAppend(value, onInput);

  return (
    <Fragment>
      <div class={style.checkboxes}>
        <InputCheckbox
          label="leading slash"
          checked={leadingSlash}
          onChange={setLeadingSlash}
        />
        <InputCheckbox
          label="trailing slash"
          checked={trailingSlash}
          onChange={setTrailingSlash}
        />
      </div>
      <SortableList onSort={onSort}>
        {entries.map((entry, index) => (
          <div
            key={
              [...entries.slice(0, index), ...entries.slice(index + 1)].join(
                "/"
              ) + index
            }
            class={style.entry}
          >
            <InputText
              value={entry}
              class={style["entry-input"]}
              onInput={(text) => {
                const newEntries = [
                  ...entries.slice(0, index),
                  text,
                  ...entries.slice(index + 1),
                ];
                replaceEntries(() => newEntries);
              }}
            />
            <ActionButton
              label="delete"
              icon="cancel-circle"
              class={style["remove-button"]}
              onClick={() => {
                const newEntries = [
                  ...entries.slice(0, index),
                  ...entries.slice(index + 1),
                ];
                replaceEntries(() => newEntries);
              }}
            />
          </div>
        ))}
      </SortableList>
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

export default PathEditor;

function destructEntries(value: string | undefined) {
  let remain = value || "";
  let leadingSlash = false;
  let trailingSlash = false;

  if (remain.startsWith("/")) {
    leadingSlash = true;
    remain = remain.slice(1);
  }

  if (remain.endsWith("/")) {
    trailingSlash = true;
    remain = remain.slice(0, remain.length - 1);
  }

  const entries = remain.split("/").map((entry) => {
    try {
      return decodeURIComponent(entry);
    } catch {
      return entry;
    }
  });

  return [entries, leadingSlash, trailingSlash] as const;
}

function useConstructEntries(onInput: ((value: string) => void) | undefined) {
  return useCallback(
    (entries: string[], leadingSlash: boolean, trailingSlash: boolean) => {
      if (!onInput) return;
      let s = "";
      if (leadingSlash) s += "/";
      s += entries.map((entry) => encodeURIComponent(entry)).join("/");
      if (trailingSlash) s += "/";
      onInput(s);
    },
    [onInput]
  );
}

function useSetLeadingSlash(
  entries: string[],
  trailingSlash: boolean,
  constructEntries: ReturnType<typeof useConstructEntries>
) {
  return useCallback(
    (v: boolean) => {
      constructEntries(entries, v, trailingSlash);
    },
    [entries, trailingSlash, constructEntries]
  );
}

function useSetTrailingSlash(
  entries: string[],
  leadingSlash: boolean,
  constructEntries: ReturnType<typeof useConstructEntries>
) {
  return useCallback(
    (v: boolean) => {
      constructEntries(entries, leadingSlash, v);
    },
    [entries, leadingSlash, constructEntries]
  );
}

function useOnSort(
  replaceEntries: (replacer: (entries: string[]) => string[]) => void
) {
  return useCallback(
    (index: number, move: number) => {
      if (move === 0) return;
      replaceEntries((entries) =>
        move < 0
          ? [
              ...entries.slice(0, index + move),
              entries[index],
              ...entries.slice(index + move, index),
              ...entries.slice(index + 1),
            ]
          : [
              ...entries.slice(0, index),
              ...entries.slice(index + 1, index + move + 1),
              entries[index],
              ...entries.slice(index + move + 1),
            ]
      );
    },
    [replaceEntries]
  );
}

function useOnAppend(
  value: string | undefined,
  onInput: ((value: string) => void) | undefined
) {
  return useCallback(() => {
    if (!onInput) return;
    const v = value || "";
    onInput(`${v}/${v.endsWith("/") ? "" : "/"}`);
  }, [value, onInput]);
}
