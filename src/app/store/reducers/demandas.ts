
import { Demanda, demandaGetProps } from "@/app/types/demandas";
import parsePeriodToDates from "@/app/utils/convertPeriodToDate";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
	editingDemanda: Demanda;
	demandas: demandaGetProps[];
	editDialogOpen: boolean;
	newDialogOpen: boolean;
	maxProd: number;
}

const initialState:initialStateProps = {
	editingDemanda: {
		id: 0,
		totalPlan: 0,
		totalProd: 0,
		status: "PLANEJAMENTO",
		dataFim: new Date(),
		dataInicio: new Date(),
		latinhas: [
			{
				id: 1,
				descricao: "Latinha 1",
				Sku: 1,
				TotalPlan: 1000,
			}
		],
	} as Demanda,
	demandas: [
		{
      "id": 1,
      "periodo": "07/10/2023 - 07/10/2023",
      "totalPlan": 100,
      "totalProd": 0,
      "status": "CONCLUÍDO",
      "SKUs": 1
    },
    {
      "id": 2,
      "periodo": "07/10/2023 - 07/10/2023",
      "totalPlan": 0,
      "totalProd": 0,
      "status": "PLANEJAMENTO",
      "SKUs": 0
    }
	],
	editDialogOpen: false,
	newDialogOpen: false,
	maxProd: 0,
}

export const DemandasSlice = createSlice({
	name: "DemandasSlice",
	initialState,
	reducers: {
    SET_DEMANDAS(state, { payload }: { payload: demandaGetProps[] }) {
      state.demandas = payload;
    },
		SET_EDIT_DIALOG_OPEN(state, { payload }: { payload: boolean }) {
			state.editDialogOpen = payload;
		},
		SET_NEW_DIALOG_OPEN(state, { payload }: { payload: boolean }) {
			state.newDialogOpen = payload;
		},
		SET_EDITING_DEMANDA(state, { payload }: { payload: Demanda }) {
			state.editingDemanda = payload;
		},
		SET_MAX_PROD(state, { payload }: { payload: number }) {
			state.maxProd = payload;
		}
	},
});