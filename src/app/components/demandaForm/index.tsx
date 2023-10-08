'use client';

import { Box, FormLabel, Input, } from "@mui/material";
import React from "react";
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form';
import './styles.css'

interface DemandaFormProps {
  register: UseFormRegister<{ dataFim: Date; totalPlan: number; totalProd: number; dataInicio: Date; }>;
}

const DemandaForm = ({register}:DemandaFormProps) => {



  return (
    <Box>
      
        <FormLabel htmlFor="dataInicio">
          Data Inicial:
        </FormLabel>
        <input
          id="dataInicio"
          className="inputText"
          placeholder="Data Inicial"
          type="date"
          {...register('dataInicio')}
        />
        <FormLabel htmlFor="dataFim">
          Data Final:
        </FormLabel>
        <input
          id="dataFim"
          className="inputText"
          placeholder="Data Final"
          type="date"
          {...register('dataFim')}
        />
        <FormLabel htmlFor="totalPlan">
          Total Planejado(TON):
        </FormLabel>
        <input
          id="totalPlan"
          className="inputText"
          placeholder="Total Planejado"
          type="number"
          {...register('totalPlan')}
        />
        <FormLabel htmlFor="totalProd">
          Total Produzido(TON):
        </FormLabel>
        <input
          id="totalProd"
          className="inputText"
          placeholder="Total Produzido"
          type="number"
          {...register('totalProd')}
        />
        {/* <button
          className="button"
          type="submit"
          style={
            {
              backgroundColor: 'green',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              width: '120px',
              margin: '5px',
              border: 'none',
            }
          }
        >
          Salvar
        </button> */}

      
    </Box>
  )
};

export default DemandaForm;