import { Container, Typography, Box, ListItem, ListItemButton } from "@mui/joy";
import { usePageEffect } from "../core/page";
// get monsters from json
import monsters from "./monsters/_data.json";
import { Link } from "react-router-dom";


export const Component = function Monsters(): JSX.Element {
  usePageEffect({ title: "Monsters" });
  return (
    <Container sx={{ py: 2 }} >

      <Typography level="h2" gutterBottom>
        Monsters
      </Typography>


      <Box>
        {monsters.monsters.map((monster) => (
          <Box key={monster.name}>
            <Typography level="h3" gutterBottom>
              {monster.name}
            </Typography>
            <Typography level="body1" gutterBottom>
              {monster.description}
            </Typography>


            <ListItem>
              <ListItemButton component={Link} to={monster.link}>
                see {monster.name}
              </ListItemButton>
            </ListItem>


          </Box>
        ))}
      </Box>

    </Container>
  );
};
