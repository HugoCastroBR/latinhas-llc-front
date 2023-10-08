import { Demanda } from "./demandas";

export type latinha = {
  id: number;
  Sku: number;
  descricao: string;
  TotalPlan: number;
  demanda: Demanda;
}

export type latinhaOutputProps = {
  Sku: number;
  descricao: string;
  TotalPlan: number;
  demandaId: 0;
}
