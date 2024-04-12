// features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const GuideSlice = createSlice({
  name: "guide",
  initialState: {
    guideData:null,
    token:null,
  },
  reducers: {
    setGuide: (state, action) => {
      // console.log(action)
      state.guideData = action.payload.guide
      state.token = action.payload.token;
    },
    updateGuideDetails(state, action) {
      // Update user details in the state
      console.log(action);
      state.guideData = action.payload;
    },
    clearGuide: (state) => {
      state.guideData = null;
      state.token = null
    },
  },
});

export const { setGuide, clearGuide,updateGuideDetails } = GuideSlice.actions;

export default GuideSlice.reducer;
