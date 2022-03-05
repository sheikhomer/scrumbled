import { Button, Paper, TextField, Typography } from "@mui/material";

const joinSession: React.FC = () => {
  const handleSubmit = () => {};
  return (
    <Paper variant="outlined" sx={{ pl: 1, pb: 1 }}>
      <Typography variant="h6">Join a session</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Session Id" sx={{ mr: 1 }}/>
        <TextField label="Your Name" sx={{ mr: 1 }}/>
        <Button variant="contained" sx={{ m: 1 }}>
          Click to join
        </Button>
      </form>
    </Paper>
  );
};
export default joinSession;
