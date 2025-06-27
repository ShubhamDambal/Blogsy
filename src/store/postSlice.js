// postSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for posts
const initialState = {
  posts: [],         // Stores list of posts
  loading: false,    // Tracks loading state during API call
  error: null        // Holds any error from fetch failure
};

// Create slice for posts
const postSlice = createSlice({
  name: 'posts',      // Unique name for this slice
  initialState,       // State defined above
  reducers: {         // Reducers to handle actions
 
    // When fetch starts
    fetchPostsStart: (state) => {
      state.loading = true;
      state.error = null;  // Reset any previous errors
    },

    // When fetch is successful
    fetchPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;  // Set posts from payload
    },

    // When fetch fails
    fetchPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;  // Set error message
    },
    
    //when needs to clear all posts from store
    clearPosts: (state) => {
      state.posts = []
      state.loading = false
      state.error = null
    }
  },
});

// Export actions to be dispatched in components
export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  clearPosts
} = postSlice.actions;

// Export reducer to be used in store.js
export default postSlice.reducer;
