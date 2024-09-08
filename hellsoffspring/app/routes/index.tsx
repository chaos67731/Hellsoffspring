/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { createElement } from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/joy";
import { usePageEffect } from "../core/page";
import { TaskList } from "../components/task-list";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { BaseLayout, MainLayout, RootError } from "../components";

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
      { path: "monsters/:monsterName", lazy: () => import("./monsters/monster") }, // Dynamic monster route


      // just sub pages of task
      { path: "tasks/subtask1", lazy: () => import("./tasks/subtask1") },
      { path: "tasks/subtask2", lazy: () => import("./tasks/subtask2") },

      { path: "messages", lazy: () => import("./messages") },
    ],
  },
]);

// { path: "tasks/subtask1", lazy: () => import("./tasks/subtask1") },
// { path: "tasks/:taskId/:subtaskId", lazy: () => import("./tasks/subtask1") }, // Dynamic subtask route
// { path: "tasks/:taskId", lazy: () => import("./tasks/subtask1") }, // Dynamic task route


export function Home(): JSX.Element {
  usePageEffect({ title: "Home" });

  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ mb: 2 }} level="h2">
      Home
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        <Card>
          <CardContent sx={{ minHeight: 150 }}>
            <Typography level="h3">Home Card title  1111</Typography>
            <Typography> Home Card content</Typography>
            <TaskList />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export function Router(): JSX.Element {
  return createElement(RouterProvider, { router });
}

// Clean up on module reload (HMR)
// https://vitejs.dev/guide/api-hmr
if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
