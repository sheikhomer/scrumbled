import { createSlice } from "@reduxjs/toolkit";
import { Session } from "../../models/session";

const initialSession: Session = {};
const sessionSlice = createSlice({
  name: "session",
  initialState: initialSession,
  reducers: {
    create: (state, data: Action) => {
      state.sessionId = data.payload.sessionId;
      state.participants = data.payload.participants;
    },
    reset: (state) => {
      state.sessionId = initialSession.sessionId;
      state.participants = initialSession.participants;
    },
  },
});

interface Action {
  payload: Session;
  type: string;
}

export const { create, reset } = sessionSlice.actions;
export default sessionSlice;
