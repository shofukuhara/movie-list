import { UpdateViewportSize } from "./utils/viewport-utils";

const page = document.querySelector("[data-page]");
const pageAttribute = page.getAttribute("data-page");

// ================
// 共通
// ================
const commonModules = {
  viewport: new UpdateViewportSize(),
};

Object.values(commonModules).forEach((module) => module.init());

// ================
// 各ページ
// ================
const pageModules = {
  home: UpdateViewportSize,
};

if (pageAttribute in pageModules) {
  const instance = new pageModules[pageAttribute]();
  instance.init();
}
