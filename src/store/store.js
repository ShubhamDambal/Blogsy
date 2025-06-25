import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice';
import postSlice from './postSlice';
import fileSlice from './fileSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postSlice,
    files: fileSlice,
  }
})

export default store;