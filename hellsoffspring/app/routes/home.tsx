import { Box, Card, CardContent, Container, Typography } from "@mui/joy";
import { TaskList } from "../components/task-list";
import { usePageEffect } from "../core/page";

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
            <Typography level="h3">Home Card title 1111</Typography>
            <Typography> Home Card content</Typography>
            <TaskList />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
