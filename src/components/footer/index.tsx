import { FunctionalComponent, h } from "preact";
import Icon from "../icon";
import * as style from "./style.css";

const Footer: FunctionalComponent = () => (
  <footer class={style.footer}>
    <div class={style.field}>&copy; 2020 KoharaKazuya.</div>
    <div class={style.field}>
      <ExternalLink href="https://www.koharakazuya.net/" label="Blog" />
    </div>
    <div class={style.field}>
      <ExternalLink
        href="https://github.com/KoharaKazuya/url-editor"
        label="GitHub"
      />
    </div>
  </footer>
);

export default Footer;

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" class={style.link}>
      {label} <Icon icon="new-tab" size={16} />
    </a>
  );
}
