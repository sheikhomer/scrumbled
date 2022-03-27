import { Box, Container, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocalSession, Session } from "../models/session";
import { getSession } from "../services/api/session";
import { IRootState } from "../store";
import { create } from "../store/slices/session";
import JoinSession from "./session/JoinSession";
import StartNewSession from "./session/StartNewSession";
import VotingPanel from "./voting/VotingPanel";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const session = useSelector((state: IRootState) => state.sessionData);

  useEffect(() => {
    const localSession: LocalSession =
      localStorage.getItem("sessionData") &&
      JSON.parse(localStorage.getItem("sessionData")!);
    if (localSession?.sessionId) {
      getSession(localSession.sessionId)
        .then((data: Session) => {
          dispatch(
            create({
              ...data,
              userId: data.participants[0].userId,
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch]);

  return (
    <Container sx={{ mt: 3 }}>
      {Object.keys(session).includes("userName") ? (
        <>
          <Box sx={{ mt: 3 }}>
            <VotingPanel></VotingPanel>
          </Box>

         
        </>
      ) : (
        <Paper variant="outlined">
          {Object.keys(session).includes("sessionId") ? (
            <JoinSession></JoinSession>
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
        </Paper>
      )}
    </Container>
  );
};

export default Home;
