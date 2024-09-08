import { createElement } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { BaseLayout, MainLayout, RootError } from "../components";
import { Home } from "./home";
/**
 * Application routes
 * https://reactrouter.com/en/main/routers/create-browser-router
 */
export const router = createBrowserRouter([
  {
    path: "",
    element: <BaseLayout />,
    errorElement: <RootError />,
    children: [
      // { index: true, element: <Home /> },
      { path: "login", lazy: () => import("./login") },
      { path: "privacy", lazy: () => import("./privacy") },
      { path: "terms", lazy: () => import("./terms") },
    ],
  },
  {
    path: "",
    element: <MainLayout />,
    errorElement: <RootError />,
    children: [
      { index: true, element: <Home /> },
      { path: "dashboard", lazy: () => import("./dashboard") },
      { path: "tasks", lazy: () => import("./tasks") },
      { path: "monsters", lazy: () => import("./monsters") },
      { path: "monsters/:taskId", lazy: () => import("./monsters/monster") }, // Dynamic task route
      {
        path: "monsters/:monsterName",
        lazy: () => import("./monsters/monster"),
      }, // Dynamic monster route

      // just sub pages of task
      { path: "tasks/subtask1", lazy: () => import("./tasks/subtask1") },
      { path: "tasks/subtask2", lazy: () => import("./tasks/subtask2") },

      { path: "messages", lazy: () => import("./messages") },
    ],
  },
]);

export function Router(): JSX.Element {
  return createElement(RouterProvider, { router });
}

// Clean up on module reload (HMR)
// https://vitejs.dev/guide/api-hmr
if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
