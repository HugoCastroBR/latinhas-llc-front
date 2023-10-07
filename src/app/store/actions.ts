
import { Demanda } from '../types/demandas';
import { AppActions, DemandasActions} from './index';

export const SetDemandas = (value: Demanda[]) => {
  return DemandasActions.SET_DEMANDAS(value)
}