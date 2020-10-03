import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";

precacheAndRoute(self.__WB_MANIFEST);

// URL クエリ文字列が状態に合わせて変化するため、オフライン利用中のリロードによって
// /index.html がキャッシュから返せなくなる問題がある。
// これを防ぐため、全てのナビゲーションリクエストに対して /index.html を返す。
// @see https://developers.google.com/web/tools/workbox/modules/workbox-routing#how_to_register_a_navigation_route
const handler = createHandlerBoundToURL("/index.html");
const navigationRoute = new NavigationRoute(handler);
registerRoute(navigationRoute);
