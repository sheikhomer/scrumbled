import { Button, TextField, Typography } from "@mui/material";
import React, { FormEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSignalR from "../../hooks/useSignalR";
import useSignalRConfig from "../../hooks/useSignalRConfig";
import { updateParticipants } from "../../services/api/session";
import { IRootState } from "../../store";
import { reset } from "../../store/slices/session";
import { setFormData, validate } from "../../store/slices/session-form";

const JoinSession: React.FC = () => {
  const dispatch = useDispatch();
  const session = useSelector((state: IRootState) => state.sessionData);
  const sessionFormData = useSelector((state: IRootState) => state.sessionForm);
  const signalRConfig = useSignalRConfig();
  const { sendMessage } = useSignalR(signalRConfig);
  const { sessionId, userId } = session;
  const {
    userName,
    sessionId: sessionNo,
    isUserNameValid,
    isSessionIdValid,
    isFormValid,
  } = sessionFormData;

  const userNameRef = useRef(userName);
  const sessionIdRef = useRef(sessionNo);

  useEffect(() => {
    if (sessionId) {
      dispatch(
        setFormData({
          sessionId: sessionId.toString(),
        })
      );
    }
    if (
      userNameRef.current !== userName ||
      (!sessionId && sessionIdRef.current !== sessionNo)
    ) {
      dispatch(validate());
    }
    userNameRef.current = userName;
    sessionIdRef.current = sessionNo;
  }, [dispatch, sessionId, sessionNo, userName]);

  const getTypography = () => {
    if (sessionId) {
      return (
        <Typography variant="h6" sx={{ pl: 1, pb: 1 }}>
          Join session: {sessionId}
        </Typography>
      );
    }
    return (
      <Typography variant="h6" sx={{ pl: 1, pb: 1 }}>
        Join a session
      </Typography>
    );
  };
  const leaveSessionHandler = () => {
    sessionStorage.removeItem("sessionId");
    dispatch(reset());
  };

  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (isFormValid) {
      const userData = {
        id: sessionNo,
        user: {
          userId: userId!,
          name: userName,
        },
      };
      if (!session) {
        //join existing session
      } else {
        //join new session
        const statusCode = await updateParticipants(userData);
        if (statusCode === 204) {
          await sendMessage({
            name: "JoinSession",
            payload: {
              userId,
              sessionId: sessionId!.toString(),
              userName,
            },
          });
        }
      }
    } else {
      dispatch(validate());
    }
  };
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFormData({
        userName: e.target.value,
      })
    );
  };
  const handleSessionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFormData({
        sessionId: e.target.value,
      })
    );
  };
  return (
    <>
      {getTypography()}
      <form onSubmit={handleSubmit}>
        {!sessionId && (
          <TextField
            label="Session Id"
            sx={{ mr: 1, pl: 1, pb: 1 }}
            error={!isSessionIdValid}
            value={sessionNo}
            onChange={handleSessionIdChange}
          />
        )}
        <TextField
          label="Your Name"
          sx={{ mr: 1, pl: 1, pb: 1 }}
          error={!isUserNameValid}
          value={userName}
          onChange={handleUserNameChange}
        />
        <Button type="submit" variant="contained" sx={{ m: 1 }}>
          Join
        </Button>
        {sessionId && (
          <Button
            type="button"
            variant="contained"
            sx={{ m: 1 }}
            onClick={leaveSessionHandler}
          >
            Leave
          </Button>
        )}
      </form>
    </>
  );
};

export default JoinSession;
