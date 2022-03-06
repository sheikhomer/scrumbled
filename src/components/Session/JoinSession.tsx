import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { reset } from "../../store/slices/session";

const JoinSession: React.FC<JoinSessionProps> = ({ sessionId }) => {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const getTypography = () => {
    if (sessionId) {
      return <Typography variant="h6">Join session: {sessionId}</Typography>;
    }
    return <Typography variant="h6">Join a session</Typography>;
  };
  const leaveSessionHandler = () => {
    sessionStorage.removeItem("sessionId");
    dispatch(reset());
  };
  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (userName && sessionId && typeof +sessionId === 'number') {
      //submit form
    }
    else if(userName && !sessionId){
      //invalid sessionId field
    }else if(!userName && sessionId){
      //invalid userName
    }
  };
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  return (
    <Paper variant="outlined" sx={{ pl: 1, pb: 1 }}>
      {getTypography()}
      <form onSubmit={handleSubmit}>
        {!sessionId && <TextField label="Session Id" sx={{ mr: 1 }} />}
        <TextField
          label="Your Name"
          sx={{ mr: 1 }}
          error={!!!userName}
          value={userName}
          onChange={handleUserNameChange}
        />
        <Button type="submit" variant="contained" sx={{ m: 1 }}>
          Join
        </Button>
        <Button
          type="button"
          variant="contained"
          sx={{ m: 1 }}
          onClick={leaveSessionHandler}
        >
          Leave
        </Button>
      </form>
    </Paper>
  );
};

export interface JoinSessionProps {
  sessionId?: string;
}

export default JoinSession;
