import { Button } from "@mui/material";

const StartNewSession: React.FC = () => {
    const handleNewSessionClick = () =>{

    }
  return (
    <Button variant="contained" sx={{ mt: 1 }} onClick={handleNewSessionClick}>
      Start a new session
    </Button>
  );
};
export default StartNewSession;
