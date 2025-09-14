import { configureStore, createSlice } from "@reduxjs/toolkit";

const pollSlice = createSlice({
  name: "poll",
  initialState: {
    currentPoll: null,
  },
  reducers: {
    setPoll(state, action) {
      state.currentPoll = action.payload;
    },
  },
});

export const { setPoll } = pollSlice.actions;

const store = configureStore({
  reducer: {
    poll: pollSlice.reducer,
  },
});

export default store;
