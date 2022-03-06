import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./slices/session";
import uiSlice from "./slices/ui";

const rootReducers = combineReducers({
  sessionData: sessionSlice.reducer,
  uiState: uiSlice.reducer
});

export const store = configureStore({
  reducer: rootReducers,
});

export type IRootState = ReturnType<typeof rootReducers>;
