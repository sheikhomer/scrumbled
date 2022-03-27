import { Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import { updateVotingData, VotingData } from "../../store/slices/voting";
import VotingButton from "../layout/VotingButton";
import VoterList from "./VoterList";

const getfibonacci = (limit: number) => {
  const fib = [];
  fib[0] = 0;
  fib[1] = 1;
  for (let i = 2; i <= limit; i++) {
    fib[i] = fib[i - 2] + fib[i - 1];
  }
  return fib;
};

const VotingPanel: React.FC = () => {
  const dispatch = useDispatch();
  const session = useSelector((state: IRootState) => state.sessionData);
  const { userId, userName } = session;
  const fibSeries = Array.from(new Set(getfibonacci(10)));
  const votingClickHandler = async (vote: string) => {
    const votingData: VotingData = {
      userId: userId!,
      userName: userName!,
      vote,
      isVoted: true,
    };
    dispatch(updateVotingData(votingData));
  };
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Grid container spacing={1} justifyContent="center">
            {fibSeries.map((n) => (
              <Grid key={n} item>
                <Paper variant="outlined">
                  <VotingButton
                    onVote={votingClickHandler}
                    value={n.toString()}
                    key={n}
                  ></VotingButton>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Paper variant="outlined" sx={{ mt: 3 }}>
        <VoterList></VoterList>
      </Paper>
    </>
  );
};
export default VotingPanel;
