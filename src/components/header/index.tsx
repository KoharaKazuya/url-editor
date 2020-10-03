import { Fragment, FunctionalComponent, h } from "preact";
import { useCallback, useEffect } from "preact/hooks";
import Icon from "../icon";
import { useHasMounted } from "../prerender";
import * as style from "./style.css";

const Header: FunctionalComponent = () => {
  const onClick = useOnClick();
  useAutoFocus();

  return (
    <Fragment>
      {/* <Notificator /> オフラインで利用できることを通知する重要性がそんなに高くないので、UI の一等地に配置するほどではない */}
      <h1 class={style["site-title"]} onClick={onClick}>
        <Icon icon="link" size={32} />
        <span class={style["site-title-text"]}>URL Editor</span>
      </h1>
    </Fragment>
  );
};

export default Header;

function useOnClick() {
  return useCallback((event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    focusUriInputBox();
  }, []);
}

/**
 * simulates the `autofocus` attribute for <URIInputBox />
 *
 * `autofocus` attribute can focus on `contenteditable` element, but caret
 * position is at the beginning of text.
 */
function useAutoFocus() {
  const hasMounted = useHasMounted();
  useEffect(() => {
    if (!hasMounted) return;
    if (location.hash && location.hash !== "#url-text") return;
    focusUriInputBox();
  }, [hasMounted]);
}

function focusUriInputBox() {
  const target = document.querySelector("#url-text");
  if (!(target instanceof HTMLElement)) return;

  const selection = window.getSelection();
  if (!selection) return;
  selection.removeAllRanges();

  const children = target.childNodes;
  if (children.length === 0) {
    target.focus();
  } else {
    const range = document.createRange();
    range.setStartAfter(children[children.length - 1]);
    selection.addRange(range);
  }
}
