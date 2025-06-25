// fileSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for file uploads
const initialState = {
  files: [],         // Stores list of uploaded files (could store IDs or file objects)
  loading: false,    // Tracks file upload in progress
  error: null        // Holds any upload error
};

// Create slice for file handling
const fileSlice = createSlice({
  name: 'files',      // Unique name for this slice
  initialState,       // State defined above
  reducers: {         // Reducers to handle file actions

    // When upload starts
    uploadFileStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    // When upload is successful
    uploadFileSuccess: (state, action) => {
      state.loading = false;
      state.files.push(action.payload);  // Add new file to files array
    },

    // When upload fails
    uploadFileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;  // Set error
    }
  },
});

// Export actions to be dispatched in components
export const {
  uploadFileStart,
  uploadFileSuccess,
  uploadFileFailure,
  clearFiles
} = fileSlice.actions;

// Export reducer to be used in store.js
export default fileSlice.reducer;
