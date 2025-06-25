//authSlice is for, we are asking to this that user is authenticated or not

import { createSlice } from "@reduxjs/toolkit";

//initial state
const initialState = {  
  status: false,   //initially status is false(user logged out)
  userData: null   //and there is no user
}
 
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {   //stores "key: func()" pairs
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    }
  }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;