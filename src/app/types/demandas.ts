import { latinha, latinhaGetProps } from '@/app/types/latinhas';
import { type } from 'os';

export type Demanda = {
  id: number;
  dataInicio: Date;
  dataFim: Date;
  totalPlan: number;
  totalProd: number;
  status: string;
  latinhas?: latinhaGetProps[];
}

export type demandaOutputProps = {
  dataInicio: Date;
  dataFim: Date;
  totalPlan: number;
  totalProd: number;
  status: string;
}

export type demandaGetProps = {
  id: number
  periodo: string
  totalPlan: number;
  totalProd: number;
  status: 'PLANEJAMENTO'| 'EM ANDAMENTO'| 'CONCLUÍDO' | '' | 'string'
  SKUs: number
}

export type demandasGetAllProps = {
  "demandas": demandaGetProps[];
  total: number;
  page: string;
  totalPages: number;
}