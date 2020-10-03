// react-icomoon を参考に実装する
// @see https://github.com/aykutkardas/React-IcoMoon/blob/abbdf9278dd9b5fd69c352a05fe3e6df4d5fbbc3/src/index.js
// ライブラリを使わないのは React 前提で、preact に対応していないため

import { createElement, FunctionalComponent } from "preact";
import iconSet from "./selection.json";

type Props = {
  icon: string;
  size?: string | number;
  disableFill?: boolean;
};

const Icon: FunctionalComponent<Props> = ({
  icon,
  size,
  disableFill,
  ...props
}) => {
  const currentIcon = iconSet.icons.find(
    (item) => item.properties.name === icon
  );

  if (!currentIcon) {
    console.warn(`"${icon}" icon not found.`);
    return null;
  }

  const style = {
    display: "inline-block",
    stroke: "currentColor",
    fill: "currentColor",
    ...(size
      ? {
          width: size,
          height: size,
        }
      : {}),
  };

  const { width = "1024" } = currentIcon.icon;

  const paths = currentIcon.icon.paths.map((path, index) =>
    createElement("path", {
      d: path,
      key: icon + index,
      ...(!disableFill ? currentIcon.icon.attrs[index] : {}),
    })
  );

  return createElement(
    "svg",
    { ...props, style, viewBox: `0 0 ${width} 1024` },
    paths
  );
};

export default Icon;
