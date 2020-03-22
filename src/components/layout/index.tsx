import { FunctionalComponent, h, JSX } from "preact";
import * as style from "./style.css";

type Props = {
  header: JSX.Element;
  main: JSX.Element;
  footer: JSX.Element;
};

const Layout: FunctionalComponent<Props> = ({ header, main, footer }) => (
  <div class={style.container}>
    <header class={style.header}>{header}</header>
    <main class={style.main}>{main}</main>
    <footer class={style.footer}>{footer}</footer>
  </div>
);

export default Layout;
