import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./slices/session";
import sessionFormSlice from "./slices/session-form";
import votingSlice from "./slices/voting";

const rootReducers = combineReducers({
  sessionData: sessionSlice.reducer,
  sessionForm: sessionFormSlice.reducer,
  votingData: votingSlice.reducer
});

export const store = configureStore({
  reducer: rootReducers,
});

export type IRootState = ReturnType<typeof rootReducers>;
