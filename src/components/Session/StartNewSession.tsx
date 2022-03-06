import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { Session } from "../../models/session";
import { create } from "../../store/slices/session";

const StartNewSession: React.FC = () => {
  const dispatch = useDispatch();
  const handleNewSessionClick = async () => {
    const response = await fetch("http://localhost:5179/session", {
      method: "POST",
    });
    const createdSession: Session = await response.json();
    sessionStorage.setItem("sessionId", createdSession.sessionId!);
    dispatch(create(createdSession));
  };

  return (
    <Button variant="contained" sx={{ mt: 1 }} onClick={handleNewSessionClick}>
      Start a new session
    </Button>
  );
};
export default StartNewSession;
