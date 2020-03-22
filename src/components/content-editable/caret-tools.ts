interface CaretPosition {
  leftText: string;
}

export function getCaretPosition(element: HTMLElement): CaretPosition | null {
  try {
    if (element !== document.activeElement) return null;

    const selection = window.getSelection();
    if (!(selection && selection.rangeCount === 1)) return null;
    const range = selection.getRangeAt(0);
    range.collapse();
    range.setStartBefore(element);
    const leftText = range.toString();
    range.collapse();
    return { leftText };
  } catch (e) {
    console.warn(e);
    return null;
  }
}

export function setCaretPosition(
  element: HTMLElement,
  position: CaretPosition | null
) {
  if (!position) return;
  try {
    const selection = window.getSelection();
    if (!selection) return;
    selection.removeAllRanges();
    const range = document.createRange();

    let remain = position.leftText;
    if (remain === "") {
      range.setStart(element, 0);
      selection.addRange(range);
      return;
    }

    let done = false;
    const walk = (node: Node) => {
      const children = node.childNodes;
      for (let i = 0; !done && i < children.length; i++) {
        if (children[i].nodeType === 3) {
          const text = children[i].textContent || "";
          if (remain.startsWith(text)) {
            remain = remain.replace(text, "");
            if (remain === "") {
              range.setStartAfter(children[i]);
              done = true;
              return;
            }
          } else {
            range.setStart(children[i], remain.length);
            done = true;
            return;
          }
        }
        walk(children[i]);
      }
    };
    walk(element);

    selection.addRange(range);
  } catch (e) {
    console.warn(e);
  }
}
