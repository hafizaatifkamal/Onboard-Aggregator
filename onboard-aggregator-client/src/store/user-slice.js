import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    listAllUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
