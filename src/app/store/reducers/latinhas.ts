
import { latinha } from "@/app/types/latinhas";
import { createSlice } from "@reduxjs/toolkit";

export const LatinhasSlice = createSlice({
	name: "LatinhasSlice",
	initialState: {
		latinhas: [] as latinha[],
		newDialogOpen: false,
	},
	reducers: {
    SET_LATINHAS(state, { payload }: { payload: latinha[] }) {
      state.latinhas = payload;
    },
		SET_NEW_DIALOG_OPEN(state, { payload }: { payload: boolean }) {
			state.newDialogOpen = payload;
		},
	},
});