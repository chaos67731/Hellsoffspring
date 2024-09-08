import {
  require_jsx_runtime
} from "./chunk-7VLZMIRJ.js";
import {
  Emotion$1,
  createEmotionProps,
  hasOwnProperty,
  require_hoist_non_react_statics_cjs
} from "./chunk-2I7KULOH.js";
import {
  require_react
} from "./chunk-NFISVTRL.js";
import {
  __toESM
} from "./chunk-LQ2VYIYD.js";

// ../.yarn/__virtual__/@emotion-react-virtual-34d79653b6/5/.yarn/berry/cache/@emotion-react-npm-11.11.3-5802f4fe7f-10.zip/node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js
var ReactJSXRuntime = __toESM(require_jsx_runtime());
var import_react = __toESM(require_react());
var import_hoist_non_react_statics = __toESM(require_hoist_non_react_statics_cjs());
var Fragment2 = ReactJSXRuntime.Fragment;
function jsx2(type, props, key) {
  if (!hasOwnProperty.call(props, "css")) {
    return ReactJSXRuntime.jsx(type, props, key);
  }
  return ReactJSXRuntime.jsx(Emotion$1, createEmotionProps(type, props), key);
}
function jsxs2(type, props, key) {
  if (!hasOwnProperty.call(props, "css")) {
    return ReactJSXRuntime.jsxs(type, props, key);
  }
  return ReactJSXRuntime.jsxs(Emotion$1, createEmotionProps(type, props), key);
}
export {
  Fragment2 as Fragment,
  jsx2 as jsx,
  jsxs2 as jsxs
};
//# sourceMappingURL=@emotion_react_jsx-runtime.js.map
