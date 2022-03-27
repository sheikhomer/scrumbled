import { createSlice } from "@reduxjs/toolkit";
import { Action } from "./type";

interface SessionFormData {
  sessionId: string;
  userName: string;
  isUserNameValid?: boolean;
  isSessionIdValid: boolean;
  isFormValid: boolean;
}

const initialState: SessionFormData = {
  sessionId: "",
  userName: "",
  isUserNameValid: true,
  isSessionIdValid: true,
  isFormValid: false,
};

const sessionFormSlice = createSlice({
  name: "session-form",
  initialState: initialState,
  reducers: {
    validate: (state) => {
      state.isUserNameValid = !!state.userName;
      state.isSessionIdValid = !!state.sessionId;
      state.isFormValid = state.isSessionIdValid && state.isUserNameValid;
    },
    setFormData: (state, data: Action<Partial<SessionFormData>>) => {
      return { ...state, ...data.payload };
    },
  },
});

export const { validate, setFormData } = sessionFormSlice.actions;
export default sessionFormSlice;
