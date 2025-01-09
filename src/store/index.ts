import { configureStore } from "@reduxjs/toolkit";
import candidateReducer from "../features/candidates/candidateSlice.ts";

const store = configureStore({
  reducer: {
    candidates: candidateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
