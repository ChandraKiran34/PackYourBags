// features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userData:null,
    token:null,
  },
  reducers: {
    setUser: (state, action) => {
      // console.log(action)
      state.userData = action.payload.user;
      state.token = action.payload.token;
    },
    updateUserDetails(state, action) {
      // Update user details in the state
      state.userData = action.payload;
    },
    clearUser: (state) => {
      state.userData = null;
      state.token = null
    },
  },
});

export const { setUser, updateUserDetails,clearUser } = UserSlice.actions;

export default UserSlice.reducer;
