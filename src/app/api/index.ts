import { Demanda, demandaGetProps,demandaOutputProps,demandasGetAllProps } from "../types/demandas";
import { latinhasGetAllProps } from "../types/latinhas";

const apiUrl = 'http://localhost:4444'; // Substitua pela URL correta da sua API


export const getDemandas = async (page: number, itemsPerPage: number) => {
  try {
    const url = `${apiUrl}/demandas?page=${page}&itemsPerPage=${itemsPerPage}`;
    const response = await fetch(url, { mode: 'cors' });
    const data = await response.json();
    return data as demandasGetAllProps;
  } catch (error) {
    throw error;
  }
};
export const getOneDemanda = async (demandaId: number) => {
  try {
    const url = `${apiUrl}/demandas/${demandaId}`;
    const response = await fetch(url, { mode: 'cors' });
    const data = await response.json();

    if (response.ok) {
      return data as Demanda;
    } else {
      throw new Error(`Erro ao buscar a demanda: ${response.statusText}`);
    }
  } catch (error) {
    throw error;
  }
};

export const createDemanda = async (demandaData: demandaOutputProps) => {
  try {
    const url = `${apiUrl}/demandas`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(demandaData),
    });
    if (response.ok) {
      const data = await response.json();
      return data as demandasGetAllProps;

    } else {
      throw new Error(`Erro na criação da demanda: ${response.statusText}`);
    }
  } catch (error) {
    throw error;
  }
};

export const getLatinhas = async (demandaId: number, page: number, itemsPerPage: number) => {
  try {
    const url = `${apiUrl}/demandas/${demandaId}/latinhas?page=${page}&itemsPerPage=${itemsPerPage}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return data as latinhasGetAllProps;
    } else {
      throw new Error(`Erro ao buscar latinhas: ${response.statusText}`);
    }
  } catch (error) {
    throw error;
  }
};


export const createLatinha = async (demandaId: number, latinhaData: any) => {
  try {
    const url = `${apiUrl}/demandas/${demandaId}/latinhas`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(latinhaData),
    });

    if (response.ok) {
      const data = await response.json();
      return data as latinhasGetAllProps;
    } else {
      throw new Error(`Erro ao adicionar latinha: ${response.statusText}`);
    }
  } catch (error) {
    throw error;
  }
};

export const removeLatinha = async (demandaId: number, latinhaId: number) => {
  try {
    const url = `${apiUrl}/demandas/${demandaId}/latinhas/${latinhaId}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log(`Linha com ID ${latinhaId} removida com sucesso.`);
    } else {
      throw new Error(`Erro ao remover latinha: ${response.statusText}`);
    }
  } catch (error) {
    throw error;
  }
};

export const updateTotalProd = async (demandaId: number, novoTotalProd: number) => {
  const endpoint = `${apiUrl}/demandas/${demandaId}`;

  const requestBody = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ totalProd: novoTotalProd }),
  };

  try {
    const response = await fetch(endpoint, requestBody);

    if (response.ok) {
      console.log('TotalProd atualizado com sucesso.');
    } else {
      console.error('Erro ao atualizar TotalProd:', response.statusText);
    }
  } catch (error) {
    console.error('Erro ao atualizar TotalProd:', error);
  }
};