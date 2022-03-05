import { Box, Container, Typography } from "@mui/material";
import JoinSession from "./Session/JoinSession";
import StartNewSession from "./Session/StartNewSession";

const Home: React.FC = () => {
  return (
    <Container>
      <h1>Let's get the scrumbles!</h1>
      <Typography variant="subtitle2">
        Estimate scrumbles or the stories like a pro scrum team
      </Typography>
      <StartNewSession />
      <Box sx={{ mt: 3 }}>
        <JoinSession></JoinSession>
      </Box>
    </Container>
  );
};

export default Home;
