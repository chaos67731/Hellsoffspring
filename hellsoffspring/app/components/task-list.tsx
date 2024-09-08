/*
  // How to use this component?
  // <TaskList />
  // How to import this component?
  // import { TaskList } from "../components/task-list";
*/
import { List, ListItem, ListItemButton } from "@mui/joy";
import { Link } from "react-router-dom";

export function TaskList(): JSX.Element {
  return (
    <List>
      <ListItem>
        <ListItemButton component={Link} to="/tasks/subtask1">Subtask 1</ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton component={Link} to="/tasks/subtask2">Subtask 2</ListItemButton>
      </ListItem>
    </List>
  );
}

