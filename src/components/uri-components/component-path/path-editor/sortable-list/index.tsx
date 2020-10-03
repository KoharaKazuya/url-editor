import { FunctionalComponent, h, toChildArray } from "preact";
import { useCallback } from "preact/hooks";
import Icon from "../../../../icon";
import * as style from "./style.css";

type Props = {
  onSort?: (index: number, move: number) => void;
};

const SortableList: FunctionalComponent<Props> = ({ onSort, children }) => {
  const items = toChildArray(children);
  const onPointerDown = useOnPointerDown(onSort);
  return (
    <div>
      {items.map((item) => (
        // eslint-disable-next-line react/jsx-key
        <div class={style.container}>
          <div
            class={style["drag-handle"]}
            onPointerDown={onPointerDown}
            aria-label="drag-handle"
          >
            <Icon icon="menu2" size={16} />
          </div>
          <div class={style.item}>{item}</div>
        </div>
      ))}
    </div>
  );
};

export default SortableList;

const listenerOpts = { capture: true } as const;

function useOnPointerDown(
  onSort: ((index: number, move: number) => void) | undefined
) {
  return useCallback(
    (event: PointerEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const { pageY: startY } = event;

      const target = (event.currentTarget as HTMLElement).parentElement!;
      const parent = target.parentElement as HTMLElement;
      const children = Array.from(parent.children) as HTMLElement[];

      const index = children.indexOf(target);
      const aboves = children.slice(0, index);
      const belows = children.slice(index + 1);
      let move = 0;
      const targetRect = target.getBoundingClientRect();

      const pointerTracker = (event: PointerEvent) => {
        event.preventDefault();
        event.stopPropagation();

        const { pageY: y } = event;
        const diffY = y - startY;

        move = 0;

        target.style.zIndex = "1";
        target.style.transform = `translate(0, ${diffY}px)`;
        for (const above of aboves.reverse()) {
          const rect = above.getBoundingClientRect();
          if (rect.y < targetRect.y + diffY) {
            above.style.transform = "";
            break;
          }
          above.style.transform = `translate(0, ${targetRect.height}px)`;
          move--;
        }
        for (const below of belows) {
          const rect = below.getBoundingClientRect();
          if (rect.y + rect.height > targetRect.y + targetRect.height + diffY) {
            below.style.transform = "";
            break;
          }
          below.style.transform = `translate(0, -${targetRect.height}px)`;
          move++;
        }
      };
      window.addEventListener("pointermove", pointerTracker, listenerOpts);

      const destructor = (event: PointerEvent) => {
        event.preventDefault();
        event.stopPropagation();

        target.style.zIndex = "";
        for (const c of children) c.style.transform = "";
        if (onSort) onSort(index, move);

        window.removeEventListener("pointermove", pointerTracker, listenerOpts);
        window.removeEventListener("pointerup", destructor, listenerOpts);
      };
      window.addEventListener("pointerup", destructor, listenerOpts);
    },
    [onSort]
  );
}
