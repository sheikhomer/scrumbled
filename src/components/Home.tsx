import { Box, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Session } from "../models/session";
import { IRootState } from "../store";
import { create } from "../store/slices/session";
import JoinSession from "./Session/JoinSession";
import StartNewSession from "./Session/StartNewSession";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const session = useSelector((state: IRootState) => state.sessionData);
  const { sessionId } = session;

  useEffect(() => {
    const getSession: (sessionId: string) => Promise<Session> = async (
      sessionId: string
    ) => {
      const response = await fetch(
        `http://localhost:5179/session/${sessionId}`,
        {
          method: "GET",
        }
      );
      return await response.json();
    };
    const storedSessionId = sessionStorage.getItem("sessionId");
    if (storedSessionId) {
      getSession(storedSessionId)
        .then((data: Session) => {
          dispatch(create(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch]);
  return (
    <Container sx={{ mt: 3 }}>
      {sessionId ? (
        <JoinSession sessionId={sessionId}></JoinSession>
      ) : (
        <>
          <h1>Let's start scrumbling!</h1>
          <Typography variant="subtitle2">
            Estimate scrumbles or stories like a pro team
          </Typography>
          <StartNewSession />
          <Box sx={{ mt: 3 }}>
            <JoinSession></JoinSession>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Home;
