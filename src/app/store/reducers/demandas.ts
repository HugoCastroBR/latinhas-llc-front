
import { Demanda } from "@/app/types/demandas";
import { createSlice } from "@reduxjs/toolkit";

export const DemandasSlice = createSlice({
	name: "DemandasSlice",
	initialState: {
		demandas: [] as Demanda[],
		editDialogOpen: false,
		newDialogOpen: false,
	},
	reducers: {
    SET_DEMANDAS(state, { payload }: { payload: Demanda[] }) {
      state.demandas = payload;
    },
		SET_EDIT_DIALOG_OPEN(state, { payload }: { payload: boolean }) {
			state.editDialogOpen = payload;
		},
		SET_NEW_DIALOG_OPEN(state, { payload }: { payload: boolean }) {
			state.newDialogOpen = payload;
		},
	},
});