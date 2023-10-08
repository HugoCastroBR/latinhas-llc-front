
import { Demanda, demandaGetProps } from '../types/demandas';
import { latinha, latinhaGetProps } from '../types/latinhas';
import { AppActions, DemandasActions, LatinhasActions} from './index';

export const SetDemandas = (value: demandaGetProps[]) => {
  return DemandasActions.SET_DEMANDAS(value)
}

export const SetEditDialogOpen = (value: boolean) => {
  return DemandasActions.SET_EDIT_DIALOG_OPEN(value)
}

export const SetNewDialogOpen = (value: boolean) => {
  return DemandasActions.SET_NEW_DIALOG_OPEN(value)
}

export const SetEdidingDemanda = (value: Demanda) => {
  return DemandasActions.SET_EDITING_DEMANDA(value)
}

export const SetMaxProd = (value: number) => {
  return DemandasActions.SET_MAX_PROD(value)
}

export const SetLatinhas = (value: latinhaGetProps[]) => {
  return LatinhasActions.SET_LATINHAS(value)
}

export const SetLatinhasAddOpen = (value: boolean) => {
  return LatinhasActions.SET_NEW_DIALOG_OPEN(value)
}

