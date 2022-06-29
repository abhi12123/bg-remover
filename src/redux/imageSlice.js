import { createSlice } from "@reduxjs/toolkit";

export const imageSlice = createSlice({
    name:'image',
    initialState:{
        originalFile:'test'
    },
    reducers:{
        setOriginalFile: (state, action) => {
            state.originalFile = action.payload
          },
    }
})

export const {setOriginalFile} = imageSlice.actions;
export default imageSlice.reducer;
