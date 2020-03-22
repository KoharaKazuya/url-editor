// refer to <https://github.com/lovasoa/react-contenteditable>

import { FunctionalComponent, h } from "preact";
import { Ref, useCallback, useLayoutEffect, useRef } from "preact/hooks";
import { getCaretPosition, setCaretPosition } from "./caret-tools";

type Props = {
  html: string;
  onChange?: (text: string) => void;
  id?: string;
  class?: string;
};

const ContentEditable: FunctionalComponent<Props> = ({
  html,
  onChange,
  ...props
}) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const emitChange = useEmitChange(elementRef, onChange);
  const onInput = useOnInput(emitChange);
  useHtmlSync(elementRef, html);

  // workaround for registering as compositionend event listener
  //
  // In Preact type definition, element has onCompositionEnd. Unfortunately
  // onCompositionEnd does not works. Preact checks if the dom has a lowercase
  // oncompositionend property, and since it doesn't exist, it registers an
  // listener for uppercase CompositionEnd event. Such an event does not exist.
  // Lowercase compositionend events will work, so I register to bypass type
  // checking.
  // @see https://github.com/preactjs/preact/issues/1978
  //
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props as any).oncompositionend = emitChange;

  return (
    <div
      {...props}
      contentEditable
      ref={elementRef}
      onInput={onInput as (event: Event) => void}
      onBlur={emitChange}
      role="textbox"
      /* autofocus={true} // simulated by <../header/index.tsx> */
    />
  );
};

export default ContentEditable;

function useEmitChange(
  elementRef: Ref<HTMLDivElement | null>,
  onChange: ((text: string) => void) | undefined
) {
  return useCallback(() => {
    if (!onChange) return;

    const element = elementRef.current;
    if (!element) return;

    onChange(element.textContent || "");
  }, [elementRef, onChange]);
}

function useOnInput(emitChange: () => void) {
  return useCallback(
    (event: InputEvent) => {
      if (event.isComposing) return;
      if (event.inputType === "insertCompositionText") return;
      emitChange();
    },
    [emitChange]
  );
}

function useHtmlSync(elementRef: Ref<HTMLDivElement | null>, html: string) {
  useLayoutEffect(
    () => {
      const element = elementRef.current;
      if (!element) return;

      if (element.innerHTML === html) return;

      const position = getCaretPosition(element);
      element.innerHTML = html;
      setCaretPosition(element, position);
    }
    /* html に変更があってもなくても実行したいので、第二引数は設定しない。
       return キーなど、innerHTML が変わったが html が変更されないパターンがある */
  );
}
