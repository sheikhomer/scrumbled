import { createSlice } from "@reduxjs/toolkit";
import { LocalSession } from "../../models/session";
import { Action } from "./type";

const initialSession: Partial<LocalSession> = {};
const sessionSlice = createSlice({
  name: "session",
  initialState: initialSession,
  reducers: {
    create: (state, data: Action<LocalSession>) => {
      state.sessionId = data.payload.sessionId;
      state.participants = data.payload.participants;
      state.userId = data.payload.userId;
    },
    update:(state, data: Action<LocalSession>) => {
      state.participants = data.payload.participants;
      state.userId = data.payload.userId;
      state.userName = data.payload.userName;
    },
    reset: (state) => {
      state.sessionId = initialSession.sessionId;
      state.participants = initialSession.participants;
    },
  },
});



export const { create, reset, update } = sessionSlice.actions;
export default sessionSlice;
