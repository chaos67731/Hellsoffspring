import { Container, Typography, List, ListItem, ListItemButton } from "@mui/joy";
import { Link } from "react-router-dom";
import { usePageEffect } from "../core/page";
import { TaskList } from "../components/task-list";
export const Component = function Tasks(): JSX.Element {
  usePageEffect({ title: "Tasks" });

  return (
    <Container sx={{ py: 2 }} >
      <Typography level="h2" gutterBottom>
        Tasks
      </Typography>
      <TaskList />
    </Container>
  );
};
