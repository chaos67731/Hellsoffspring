/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Container, Typography, List, ListItem, ListItemButton } from "@mui/joy";
// import { Link } from "@remix-run/react";
import { Link } from "react-router-dom";
import { usePageEffect } from "../../core/page";
import { useParams } from "react-router-dom";

export const Component = function subtask2(): JSX.Element {
  usePageEffect({ title: "subtask2" });
  const { taskId, subtaskId } = useParams();
  return (

    <Container sx={{ py: 2 }}>
      <Typography level="h2" gutterBottom>
        subtask2
        -
        {taskId}

      </Typography>
    </Container>
  );
};
