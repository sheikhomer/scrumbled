import { createSlice } from "@reduxjs/toolkit";

export interface UiState {
  newSessionRequired: boolean;
}

const initialState: UiState = {
  newSessionRequired: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setNewSessionRequired: (state) => {
      state.newSessionRequired = true;
    },
    reset:(state)=>{
      state.newSessionRequired = false;
    }
  },
});

export const {setNewSessionRequired} = uiSlice.actions;
export default uiSlice;
