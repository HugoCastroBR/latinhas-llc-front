import { latinha } from '@/app/types/latinhas';

export type Demanda = {
  id: number;
  dataInicio: Date;
  dataFim: Date;
  totalPlan: number;
  totalProd: number;
  status: string;
  latinhas?: latinha[];
}
