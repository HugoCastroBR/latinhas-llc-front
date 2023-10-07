
import { Demanda } from "@/app/types/demandas";
import { createSlice } from "@reduxjs/toolkit";

export const DemandasSlice = createSlice({
	name: "DemandasSlice",
	initialState: {
		demandas: [] as Demanda[],
	},
	reducers: {
    SET_DEMANDAS(state, { payload }: { payload: Demanda[] }) {
      state.demandas = payload;
    }
	},
});