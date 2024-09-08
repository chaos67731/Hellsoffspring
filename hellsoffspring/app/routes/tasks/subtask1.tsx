/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Container, Typography, List, ListItem, ListItemButton } from "@mui/joy";
// import { Link } from "@remix-run/react";
import { Link } from "react-router-dom";
import { usePageEffect } from "../../core/page";
import { useParams } from "react-router-dom";

export const Component = function Subtask1(): JSX.Element {
  usePageEffect({ title: "Subtask1" });
  const { taskId, subtaskId } = useParams();
  return (

    <Container sx={{ py: 2 }}>
      <Typography level="h2" gutterBottom>
        Subtask 1
        -
        {taskId} ----090

      </Typography>
    </Container>
  );
};



// function Tasks() {
//   const { taskId, subtaskId } = useParams();

//   return (
//     <div>
//       <h1>Task: {taskId}</h1>
//       {subtaskId && <h2>Subtask: {subtaskId}</h2>}
//     </div>
//   );
// }
