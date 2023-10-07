import { configureStore } from "@reduxjs/toolkit"
import { AppSlice } from "./reducers/app";
import { DemandasSlice } from "./reducers/demandas";
import { LatinhasSlice } from "./reducers/latinhas";

const store = configureStore({
  reducer:{
    App:AppSlice.reducer,
    Demandas: DemandasSlice.reducer,
    Latinhas: LatinhasSlice.reducer,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>

export const AppActions = AppSlice.actions
export const DemandasActions = DemandasSlice.actions
export const LatinhasActions = LatinhasSlice.actions