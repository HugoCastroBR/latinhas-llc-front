
import { Demanda } from '../types/demandas';
import { latinha } from '../types/latinhas';
import { AppActions, DemandasActions, LatinhasActions} from './index';

export const SetDemandas = (value: Demanda[]) => {
  return DemandasActions.SET_DEMANDAS(value)
}

export const SetEditDialogOpen = (value: boolean) => {
  return DemandasActions.SET_EDIT_DIALOG_OPEN(value)
}

export const SetNewDialogOpen = (value: boolean) => {
  return DemandasActions.SET_NEW_DIALOG_OPEN(value)
}

export const SetLatinhas = (value: latinha[]) => {
  return LatinhasActions.SET_LATINHAS(value)
}

export const SetLatinhasAddOpen = (value: boolean) => {
  return LatinhasActions.SET_NEW_DIALOG_OPEN(value)
}