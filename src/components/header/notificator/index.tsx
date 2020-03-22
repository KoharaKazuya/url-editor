import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useHasMounted } from "../../prerender";
import * as style from "./style.css";

const Notificator: FunctionalComponent = () => {
  const message = useMessage();
  return (
    <div class={style.container}>
      <div class={`${style.notificator} ${message ? style.active : ""}`}>
        {message}
      </div>
    </div>
  );
};

export default Notificator;

function useMessage() {
  const hasMounted = useHasMounted();

  const [sw, setSw] = useState(false);
  useEffect(() => {
    if (!hasMounted) return;

    navigator.serviceWorker.ready.then(() => {
      setSw(true);
    });
  }, [hasMounted]);

  const [online, setOnline] = useState(true);
  useEffect(() => {
    if (!hasMounted) return;

    setOnline(navigator.onLine);
    const onlineListener = () => setOnline(true);
    const offlineListener = () => setOnline(false);
    window.addEventListener("online", onlineListener);
    window.addEventListener("offline", offlineListener);
    return () => {
      window.removeEventListener("online", onlineListener);
      window.removeEventListener("offline", offlineListener);
    };
  }, [hasMounted]);

  return !online ? "offline" : sw ? "offline available" : null;
}
