
import { latinha, latinhaGetProps } from "../../types/latinhas";
import { createSlice } from "@reduxjs/toolkit";

export const LatinhasSlice = createSlice({
	name: "LatinhasSlice",
	initialState: {
		latinhas: [] as latinhaGetProps[],
		newDialogOpen: false,
	},
	reducers: {
    SET_LATINHAS(state, { payload }: { payload: latinhaGetProps[] }) {
      state.latinhas = payload;
    },
		SET_NEW_DIALOG_OPEN(state, { payload }: { payload: boolean }) {
			state.newDialogOpen = payload;
		},
	},
});