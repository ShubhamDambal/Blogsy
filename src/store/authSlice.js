//authSlice is for, we are asking to this that user is authenticated or not

import { createSlice } from "@reduxjs/toolkit";

//initial state
const initialState = {  
  status: false,   //initially status is false(user logged out)
  userData: null,   //and there is no user
  loading: true  //initial loading is true
}
 
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {   //stores "key: func()" pairs
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      state.loading = false;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const {login, logout, setLoading} = authSlice.actions;

export default authSlice.reducer;