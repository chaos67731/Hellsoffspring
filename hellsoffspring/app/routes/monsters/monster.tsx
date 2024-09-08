import { Container, Typography, Box } from "@mui/joy";
import { usePageEffect } from "../../core/page";
import { useParams, useLocation } from "react-router-dom";
import monsters from "./_data.json";
import { useState, useEffect } from "react";

export const Component = function Monster(): JSX.Element {
  const params = useParams();
  const location = useLocation();
  const [monster, setMonster] = useState<any | null>(null);

  useEffect(() => {
    const monsterName = location.pathname.split('/').pop();

    if (monsterName) {
      const foundMonster = monsters.monsters.find(m =>
        m.name.toLowerCase() === monsterName.toLowerCase()
      );
       setMonster(foundMonster || null);
    }
  }, [location]);

  usePageEffect({ title: monster ? `Monster: ${monster.name}` : "Monster Not Found" });

  if (!monster) {
    return (
      <Container sx={{ py: 2 }}>
        <Typography level="h2" gutterBottom>
          404 - Monster Not Found
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 2 }}>
      <Typography level="h2" gutterBottom>
        {monster.name}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography level="body1">
          {monster.description}
        </Typography>
      </Box>
     </Container>
  );
};
