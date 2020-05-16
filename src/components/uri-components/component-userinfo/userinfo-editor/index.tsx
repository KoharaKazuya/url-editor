import { Fragment, FunctionalComponent, h } from "preact";
import { useCallback } from "preact/hooks";
import InputText from "../../input-text";
import * as style from "./style.css";

type Props = {
  value: string;
  onInput?: (value: string) => void;
};

const UserinfoEditor: FunctionalComponent<Props> = ({ value, onInput }) => {
  const [user, password, setUser, setPassword] = useUserAndPasswordState(
    value,
    onInput
  );

  return (
    <Fragment>
      <label class={style.field}>
        <span class={style.label}>user</span>
        <InputText value={user} onInput={setUser} class={style.input} />
      </label>
      <label class={style.field}>
        <span class={style.label}>password</span>
        <InputText value={password} onInput={setPassword} class={style.input} />
      </label>
    </Fragment>
  );
};

export default UserinfoEditor;

function useUserAndPasswordState(
  value: string,
  onInput: ((value: string) => void) | undefined
) {
  const [user, password] = [
    ...value.split(":").map((x) => {
      try {
        return decodeURIComponent(x);
      } catch {
        return x;
      }
    }),
    "",
  ];

  const setUser = useCallback(
    (value: string) => {
      if (onInput)
        onInput(`${encodeURIComponent(value)}:${encodeURIComponent(password)}`);
    },
    [onInput, password]
  );

  const setPassword = useCallback(
    (value: string) => {
      if (onInput)
        onInput(`${encodeURIComponent(user)}:${encodeURIComponent(value)}`);
    },
    [onInput, user]
  );

  return [user, password, setUser, setPassword] as const;
}
