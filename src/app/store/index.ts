import { configureStore } from "@reduxjs/toolkit"
import { AppSlice } from "./reducers/app";
import { DemandasSlice } from "./reducers/demandas";

const store = configureStore({
  reducer:{
    App:AppSlice.reducer,
    Demandas: DemandasSlice.reducer
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>

export const AppActions = AppSlice.actions
export const DemandasActions = DemandasSlice.actions