// features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const AgencySlice = createSlice({
  name: "agency",
  initialState: {
    agencyData : null,
    token:null
  },
  reducers: {
    setAgency: (state, action) => {
     state.agencyData = action.payload.agency;
     state.token = action.payload.token;
    },
    updateAgencyDetails(state, action) {
      // Update user details in the state
      console.log(action);
      state.agencyData = action.payload;
    },
    clearAgency: (state) => {
      state.agencyData = null;
      state.token = null;
    },
  },
});

export const { setAgency, updateAgencyDetails,clearAgency } = AgencySlice.actions;

export default AgencySlice.reducer;
