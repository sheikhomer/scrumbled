import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { LocalSession, Session } from "../../models/session";
import { createSession } from "../../services/api/session";
import { create } from "../../store/slices/session";

const StartNewSession: React.FC = () => {
  const dispatch = useDispatch();
  const handleNewSessionClick = async () => {
    const createdSession: Session = await createSession();
    const localSession: LocalSession = {
      ...createdSession,
      userId: createdSession.participants[0].userId,
    };
    localStorage.setItem("sessionData", JSON.stringify(localSession));
    dispatch(create(localSession));
  };

  return (
    <Button variant="contained" sx={{ mt: 1 }} onClick={handleNewSessionClick}>
      Start a new session
    </Button>
  );
};
export default StartNewSession;
