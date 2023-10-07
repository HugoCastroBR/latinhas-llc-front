
import { createSlice } from "@reduxjs/toolkit";

export const AppSlice = createSlice({
	name: "AppSlice",
	initialState: {
		darkMode: false,
	},
	reducers: {
		SET_DARK_MODE(state,{payload}:{payload:boolean}){
      state.darkMode = payload
    },
	},
});